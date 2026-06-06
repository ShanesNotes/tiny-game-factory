#!/usr/bin/env node
// Blocks opaque assets unless a nearby .provenance.md/json exists.
// Pass asset paths as args.
import fs from "node:fs";
import path from "node:path";

let bad = [];
for (const p of process.argv.slice(2)) {
  if (!/\.(png|jpg|jpeg|webp|psd|blend|fbx|glb|gltf|wav|mp3|ogg)$/i.test(p)) continue;
  const dir = path.dirname(p);
  const base = path.basename(p).replace(/\.[^.]+$/, "");
  const candidates = [
    path.join(dir, `${base}.provenance.md`),
    path.join(dir, `${base}.provenance.json`),
    path.join(dir, "ASSET_PROVENANCE.md")
  ];
  if (!candidates.some(fs.existsSync)) bad.push(p);
}
if (bad.length) {
  console.error("[TGF asset_provenance] BLOCK: opaque asset(s) without provenance:", bad.join(", "));
  process.exit(2);
}
process.exit(0);
