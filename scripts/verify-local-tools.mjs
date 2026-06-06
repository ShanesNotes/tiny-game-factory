#!/usr/bin/env node
// P17 toolchain probe. Verifies tool availability via real commands — never from memory.
// Writes .factory/local_tool_probe.json always; with `--write <ledger.md>` it refreshes a
// generated block inside the curated toolchain ledger without clobbering hand-written rows.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const checks = [
  ["node", ["--version"]],
  ["npm", ["--version"]],
  ["pnpm", ["--version"]],
  ["claude", ["--version"]],
  ["codex", ["--version"]],
  ["omx", ["--version"]],
  ["grok-build", ["--version"]],
  ["npx", ["playwright", "--version"]],
  ["godot", ["--version"]],
  ["godot4", ["--version"]],
  ["cargo", ["--version"]],
  ["git", ["--version"]]
];

const results = [];
for (const [cmd, args] of checks) {
  const r = spawnSync(cmd, args, { encoding: "utf8", shell: process.platform === "win32" });
  results.push({
    command: [cmd, ...args].join(" "),
    ok: r.status === 0,
    stdout: (r.stdout || "").trim().slice(0, 300),
    stderr: (r.stderr || "").trim().slice(0, 300)
  });
}

const iso = new Date().toISOString();
console.log(JSON.stringify({ date: iso, results }, null, 2));
fs.mkdirSync(".factory", { recursive: true });
fs.writeFileSync(".factory/local_tool_probe.json", JSON.stringify({ date: iso, results }, null, 2));

const writeIdx = process.argv.indexOf("--write");
if (writeIdx >= 0 && process.argv[writeIdx + 1]) {
  const ledgerPath = process.argv[writeIdx + 1];
  const START = "<!-- TGF:PROBE:START -->";
  const END = "<!-- TGF:PROBE:END -->";
  let block = `${START}\n\n## Local probe results (generated)\n\n`;
  block += `_Probed ${iso} by \`scripts/verify-local-tools.mjs\`; generated — do not hand-edit._\n\n`;
  block += "| Probe | Available | First line |\n|---|---|---|\n";
  for (const r of results) {
    const note = (r.stdout || r.stderr || "").split("\n")[0].slice(0, 60).replace(/\|/g, "/");
    block += `| \`${r.command}\` | ${r.ok ? "yes" : "no (PROBE)"} | ${note} |\n`;
  }
  block += `\n${END}\n`;

  let md = fs.existsSync(ledgerPath) ? fs.readFileSync(ledgerPath, "utf8") : "";
  if (md.includes(START) && md.includes(END)) {
    md = md.replace(new RegExp(`${START}[\\s\\S]*?${END}`), block.trim());
  } else {
    md = `${md.trimEnd()}\n\n${block}`;
  }
  fs.mkdirSync(path.dirname(ledgerPath), { recursive: true });
  fs.writeFileSync(ledgerPath, md);
  console.error(`[verify-local-tools] refreshed generated probe block in ${ledgerPath}`);
}
