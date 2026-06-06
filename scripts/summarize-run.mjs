#!/usr/bin/env node
// Print a short, evidence-first summary of a seed run from its manifest + ledger.
// Usage: node scripts/summarize-run.mjs --seed-id <seed-id>
import fs from "node:fs";
import path from "node:path";

const args = process.argv.slice(2);
const seedId = (() => {
  const i = args.indexOf("--seed-id");
  return i >= 0 ? args[i + 1] : null;
})();
if (!seedId) {
  console.error("Usage: node scripts/summarize-run.mjs --seed-id <seed-id>");
  process.exit(1);
}

const runDir = path.join(".tgf", "seeds", seedId);
const manifestPath = path.join(runDir, "manifest.json");
if (!fs.existsSync(manifestPath)) {
  console.error(`No run found at ${runDir}`);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
const ledgerPath = path.join(runDir, "execution-ledger.jsonl");
const rows = fs.existsSync(ledgerPath)
  ? fs.readFileSync(ledgerPath, "utf8").trim().split("\n").filter(Boolean).map((l) => JSON.parse(l))
  : [];
const last = rows[rows.length - 1];

console.log(`# Seed run: ${manifest.seed_id}`);
console.log(`- phase:        ${manifest.current_phase}`);
console.log(`- thesis:       ${manifest.game_thesis_path || "(not compiled)"}`);
console.log(`- engine ADR:   ${manifest.engine_decision_path || "(not decided)"}`);
console.log(`- child game:   ${manifest.child_game_path || "(none — not created)"}`);
console.log(`- ledger rows:  ${rows.length}`);
if (last) console.log(`- last event:   ${last.phase}/${last.event} (${last.status})`);
if (manifest.resume_point) {
  console.log(`- next action:  ${manifest.resume_point.reason}`);
  console.log(`                -> ${manifest.resume_point.artifact_path}`);
}
