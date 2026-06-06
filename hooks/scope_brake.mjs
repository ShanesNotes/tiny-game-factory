#!/usr/bin/env node
// Starter guard: blocks obvious scope drift if a gameplay edit occurs before GAME_THESIS.md.
// Real Claude/Codex/Grok hook adapters should pass changed paths via stdin/env.
import fs from "node:fs";

const thesisExists = fs.existsSync("GAME_THESIS.md");
const args = process.argv.slice(2).join(" ");
const touchesSrc = /(^|\s)(src|assets|packs|server|app)\//.test(args);

if (!thesisExists && touchesSrc) {
  console.error("[TGF scope_brake] BLOCK: implementation before GAME_THESIS.md.");
  process.exit(2);
}
process.exit(0);
