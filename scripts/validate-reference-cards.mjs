#!/usr/bin/env node
// Validate docs/reference-games/cards/*.json against reference-card schema,
// require each card id to appear in CANON.md, and refresh index.jsonl.
// Usage: node scripts/validate-reference-cards.mjs
//        [--cards-dir <path>] [--canon <path>] [--index <path>] [--schema <path>]
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { arg } from "./lib/argv.mjs";
import { validate } from "./lib/validate-json-schema.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

function fail(message, code = 1) {
  console.error(`[reference-cards] ERROR: ${message}`);
  process.exit(code);
}

/** @returns {{ errors: string[], indexLines: string[] }} */
export function validateReferenceCards({
  cardsDir,
  canonPath,
  indexPath,
  schemaPath
}) {
  const errors = [];
  if (!fs.existsSync(schemaPath)) {
    return { errors: [`missing schema: ${schemaPath}`], indexLines: [] };
  }
  if (!fs.existsSync(canonPath)) {
    return { errors: [`missing CANON: ${canonPath}`], indexLines: [] };
  }
  if (!fs.existsSync(cardsDir)) {
    return { errors: [`missing cards dir: ${cardsDir}`], indexLines: [] };
  }

  let schema;
  try {
    schema = JSON.parse(fs.readFileSync(schemaPath, "utf8"));
  } catch (e) {
    return { errors: [`schema parse failed: ${e.message}`], indexLines: [] };
  }

  const canonText = fs.readFileSync(canonPath, "utf8");
  const files = fs.readdirSync(cardsDir)
    .filter((f) => f.endsWith(".json"))
    .sort();

  const summaries = [];
  const seenIds = new Set();

  for (const file of files) {
    const full = path.join(cardsDir, file);
    let card;
    try {
      card = JSON.parse(fs.readFileSync(full, "utf8"));
    } catch (e) {
      errors.push(`${file}: JSON parse failed: ${e.message}`);
      continue;
    }

    const schemaErrs = validate(schema, card);
    for (const e of schemaErrs) errors.push(`${file}: ${e}`);
    if (schemaErrs.length) continue;

    if (seenIds.has(card.id)) {
      errors.push(`${file}: duplicate card id '${card.id}'`);
    }
    seenIds.add(card.id);

    // Canon membership: id must appear as a table-cell token in CANON.md.
    // Match | id | or bare id on its own path segment style; require whole-token
    // occurrence so "garden" does not match "phantom-garden".
    const idToken = new RegExp(`(?:^|[\\s|])${escapeRegExp(card.id)}(?:[\\s|]|$)`, "m");
    if (!idToken.test(canonText)) {
      errors.push(`${file}: card id '${card.id}' not listed in CANON.md`);
    }

    summaries.push({
      id: card.id,
      title: card.title,
      genre_tags: card.genre_tags,
      register_mapping: card.register_mapping,
      status: card.status
    });
  }

  summaries.sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  const indexLines = summaries.map((row) => JSON.stringify(row));

  if (errors.length === 0 && indexPath) {
    fs.mkdirSync(path.dirname(indexPath), { recursive: true });
    const body = indexLines.length ? indexLines.join("\n") + "\n" : "";
    fs.writeFileSync(indexPath, body);
  }

  return { errors, indexLines };
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function main() {
  const cardsDir = path.resolve(arg("cards-dir") || path.join(REPO, "docs/reference-games/cards"));
  const canonPath = path.resolve(arg("canon") || path.join(REPO, "docs/reference-games/CANON.md"));
  const indexPath = path.resolve(arg("index") || path.join(REPO, "docs/reference-games/index.jsonl"));
  const schemaPath = path.resolve(arg("schema") || path.join(REPO, "schemas/reference-card.schema.json"));

  const { errors, indexLines } = validateReferenceCards({
    cardsDir, canonPath, indexPath, schemaPath
  });

  if (errors.length) {
    for (const e of errors) console.error(`  ${e}`);
    fail(`${errors.length} error(s); index not written`);
  }

  console.log(`[reference-cards] OK: ${indexLines.length} card(s); wrote ${path.relative(REPO, indexPath) || indexPath}`);
}

const isMain = process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
