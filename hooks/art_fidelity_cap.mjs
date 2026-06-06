#!/usr/bin/env node
// Blocks opaque/high-fidelity assets before gates.
// Override only by writing .factory/FUN_LOCK and .factory/ART_DIRECTION_LOCK.
import fs from "node:fs";

const args = process.argv.slice(2).join(" ");
const opaque = /\.(png|jpg|jpeg|webp|psd|blend|fbx|glb|gltf|wav|mp3|ogg)$/i.test(args);
const fun = fs.existsSync(".factory/FUN_LOCK");
const art = fs.existsSync(".factory/ART_DIRECTION_LOCK");

if (opaque && !(fun && art)) {
  console.error("[TGF art_fidelity_cap] BLOCK: opaque asset before G1 fun-lock and G2 art-direction.");
  process.exit(2);
}
process.exit(0);
