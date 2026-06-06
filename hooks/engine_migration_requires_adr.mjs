#!/usr/bin/env node
// Blocks obvious engine package migration without a decision file mention.
import fs from "node:fs";
const args = process.argv.slice(2).join(" ");
const enginePkg = /(package\.json|pnpm-lock|package-lock|Cargo\.toml|project\.godot|vite\.config)/.test(args);
if (!enginePkg) process.exit(0);

const decisions = fs.existsSync("decisions")
  ? fs.readdirSync("decisions").filter(f => /engine|migration|profile/i.test(f))
  : [];
if (!decisions.length) {
  console.error("[TGF engine_migration_requires_adr] BLOCK: engine/tooling change requires decisions/NNNN-engine-*.md.");
  process.exit(2);
}
process.exit(0);
