#!/usr/bin/env node
// Requires long-run bot/falsifier evidence for overnight/AFK runs.
// A run is treated as AFK/nightly when `--afk` is passed or TGF_AFK=1 is set.
// Blocks if no playtests/**/playtest_report.json records a >=300s session.
import fs from "node:fs";
import path from "node:path";

const afk = process.argv.includes("--afk") || process.env.TGF_AFK === "1";
if (!afk) process.exit(0);

function walk(dir, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === "playtest_report.json") acc.push(p);
  }
  return acc;
}

const longEnough = walk("playtests").some((p) => {
  try {
    return Number(JSON.parse(fs.readFileSync(p, "utf8")).duration_seconds) >= 300;
  } catch {
    return false;
  }
});

if (!longEnough) {
  console.error("[TGF afk_heartbeat_required] BLOCK: AFK/nightly run needs a >=300s bot + falsifier playtest report.");
  process.exit(2);
}
process.exit(0);
