#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { arg } from "./lib/argv.mjs";
import { extractFencedJson, isValidSeedId } from "./lib/run-state.mjs";
import { resolveContractsRoot, resolveDesignRoot, resolveGamesRoot } from "./lib/studio-paths.mjs";
import { validate } from "./lib/validate-json-schema.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const seedId = arg("seed-id");

function fail(message) {
  console.error(`[portfolio-digest] ERROR: ${message}`);
  process.exit(1);
}

if (!seedId || !isValidSeedId(seedId)) {
  fail("usage: node scripts/build-portfolio-digest.mjs --seed-id <kebab-id>");
}

const digest = {
  schema_version: "1.0.0",
  seed_id: seedId,
  generated_at: new Date().toISOString(),
  sources: [],
  prior_theses: [],
  games: [],
  skipped: []
};

function skip(source, reason, id = null) {
  digest.skipped.push({ source, ...(id ? { id } : {}), reason });
}

function readDepthVector(runDir, priorId) {
  const file = path.join(runDir, "reviews", "depth-vector.json");
  if (!fs.existsSync(file)) {
    skip("depth-vector", "reviews/depth-vector.json is missing", priorId);
    return { verdict: "UNKNOWN", scores: null };
  }
  try {
    const vector = JSON.parse(fs.readFileSync(file, "utf8"));
    if (!["ADVANCE", "DEEPEN", "KILL"].includes(vector.verdict) || !vector.scores) {
      throw new Error("verdict or scores missing");
    }
    return { verdict: vector.verdict, scores: vector.scores };
  } catch (error) {
    skip("depth-vector", `unreadable depth vector: ${error.message}`, priorId);
    return { verdict: "UNKNOWN", scores: null };
  }
}

function readChosenLoop(runDir, thesis, priorId) {
  const specFile = path.join(runDir, "SPEC.md");
  if (!fs.existsSync(specFile)) {
    skip("chosen-loop", "SPEC.md is missing; no chosen loop is recorded", priorId);
    return null;
  }
  const { obj: spec, error } = extractFencedJson(fs.readFileSync(specFile, "utf8"));
  if (error || typeof spec?.chosen_loop_id !== "string") {
    skip("chosen-loop", error || "SPEC.md has no chosen_loop_id", priorId);
    return null;
  }
  const chosen = thesis.core_loop_candidates?.find((candidate) => candidate.id === spec.chosen_loop_id);
  if (!chosen || !(typeof chosen.verbs === "string" || Array.isArray(chosen.verbs))) {
    skip("chosen-loop", `chosen_loop_id '${spec.chosen_loop_id}' does not resolve to a thesis candidate`, priorId);
    return null;
  }
  return {
    id: chosen.id,
    verbs: chosen.verbs,
    ...(typeof chosen.description === "string" ? { description: chosen.description } : {})
  };
}

const designRoot = resolveDesignRoot(process.cwd());
const seedsRoot = designRoot && path.join(designRoot, ".tgf", "seeds");
if (!seedsRoot || !fs.existsSync(seedsRoot)) {
  digest.sources.push({ source: "design-runs", status: "skipped", reason: "design seed root is missing" });
  skip("design-runs", "design seed root is missing");
} else {
  digest.sources.push({ source: "design-runs", status: "read" });
  for (const priorId of fs.readdirSync(seedsRoot).sort()) {
    if (priorId === seedId) continue;
    const runDir = path.join(seedsRoot, priorId);
    const thesisFile = path.join(runDir, "GAME_THESIS.md");
    if (!fs.existsSync(thesisFile)) continue;
    const { obj: thesis, error } = extractFencedJson(fs.readFileSync(thesisFile, "utf8"));
    if (error) {
      skip("game-thesis", error, priorId);
      continue;
    }
    digest.prior_theses.push({
      seed_id: priorId,
      pitch: typeof thesis.pitch === "string" ? thesis.pitch : "UNKNOWN",
      chosen_loop: readChosenLoop(runDir, thesis, priorId),
      design_register: thesis.design_register ?? "UNKNOWN",
      golden_moment: thesis.golden_moment ?? "UNKNOWN",
      depth_vector: readDepthVector(runDir, priorId)
    });
  }
}

const lifecycles = new Set(["skeleton", "active", "candidate", "done", "archived"]);
const sealedVerdictFields = [
  "schema_version", "ts", "verdict", "by", "game_commit", "manifest_digest", "lock_digest", "report"
];
const contractsRoot = resolveContractsRoot(process.cwd());
const verdictSchemaFile = contractsRoot && path.join(contractsRoot, "verdict-record.schema.json");
let verdictSchema = null;
if (!verdictSchemaFile || !fs.existsSync(verdictSchemaFile)) {
  skip("verdict-contract", "contracts/verdict-record.schema.json is missing");
} else {
  try { verdictSchema = JSON.parse(fs.readFileSync(verdictSchemaFile, "utf8")); }
  catch (error) { skip("verdict-contract", `verdict schema is unreadable: ${error.message}`); }
}

function sealedVerdictErrors(record) {
  const errors = verdictSchema ? validate(verdictSchema, record) : ["sealed verdict contract unavailable"];
  if (sealedVerdictFields.some((field) => !(field in record))) errors.push("required sealed fields are missing");
  for (const field of ["ts", "by", "game_commit", "manifest_digest", "lock_digest"]) {
    if (typeof record[field] !== "string" || !record[field].trim()) errors.push(`${field} must be non-empty`);
  }
  if (typeof record.ts === "string" && Number.isNaN(Date.parse(record.ts))) errors.push("ts must be a date-time");
  if (typeof record.report?.digest !== "string" || !record.report.digest.trim()) errors.push("report.digest must be non-empty");
  return errors;
}
const gamesRoot = resolveGamesRoot(process.cwd());
const indexFile = gamesRoot && path.join(gamesRoot, "INDEX.md");
if (!indexFile || !fs.existsSync(indexFile)) {
  digest.sources.push({ source: "games-index", status: "skipped", reason: "games/INDEX.md is missing" });
  skip("games-index", "games/INDEX.md is missing");
} else {
  digest.sources.push({ source: "games-index", status: "read" });
  const rows = fs.readFileSync(indexFile, "utf8").split("\n")
    .map((line) => line.split("|").slice(1, -1).map((cell) => cell.trim()))
    .filter((cells) => cells.length >= 2 && lifecycles.has(cells[1]))
    .map(([gameId, lifecycle]) => ({ gameId, lifecycle }))
    .sort((a, b) => a.gameId.localeCompare(b.gameId));
  for (const { gameId, lifecycle } of rows) {
    const verdictDir = path.join(gamesRoot, gameId, "playtests", "verdicts");
    let humanVerdict = { verdict: "UNKNOWN" };
    if (!fs.existsSync(verdictDir)) {
      skip("human-verdict", "no sealed verdict record", gameId);
    } else {
      const files = fs.readdirSync(verdictDir).filter((name) => name.endsWith(".json")).sort().reverse();
      if (!files.length) {
        skip("human-verdict", "no sealed verdict record", gameId);
      } else {
        let record = null;
        for (const file of files) {
          try {
            const candidate = JSON.parse(fs.readFileSync(path.join(verdictDir, file), "utf8"));
            const errors = sealedVerdictErrors(candidate);
            if (errors.length) throw new Error(errors.join("; "));
            record = candidate;
            break;
          } catch (error) {
            skip("human-verdict", `invalid sealed verdict ${file}: ${error.message}`, gameId);
          }
        }
        if (record) {
          humanVerdict = {
            verdict: record.verdict,
            ...(typeof record.ts === "string" ? { ts: record.ts } : {}),
            ...(typeof record.by === "string" ? { by: record.by } : {}),
            ...(typeof record.notes_rel === "string" ? { notes_rel: record.notes_rel } : {})
          };
        } else {
          skip("human-verdict", "no schema-valid sealed verdict record", gameId);
        }
      }
    }
    digest.games.push({ game_id: gameId, lifecycle, human_verdict: humanVerdict });
  }
}

const schema = JSON.parse(fs.readFileSync(path.join(REPO, "schemas", "portfolio-digest.schema.json"), "utf8"));
const errors = validate(schema, digest);
if (errors.length) fail(`generated digest is invalid:\n  ${errors.join("\n  ")}`);

const output = path.join(process.cwd(), ".tgf", "seeds", seedId, "intake", "portfolio-digest.json");
fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(digest, null, 2) + "\n");
console.log(`[portfolio-digest] wrote ${path.relative(process.cwd(), output)} (${digest.prior_theses.length} prior theses, ${digest.games.length} games)`);
