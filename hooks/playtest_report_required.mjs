#!/usr/bin/env node
// Blocks gameplay completion claims without at least one playtest report.
import fs from "node:fs";
import path from "node:path";

function walk(dir, acc=[]) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, acc);
    else if (e.name === "playtest_report.json") acc.push(p);
  }
  return acc;
}
const reports = walk("playtests");
if (!reports.length) {
  console.error("[TGF playtest_report_required] BLOCK: no playtests/**/playtest_report.json found.");
  process.exit(2);
}
process.exit(0);
