#!/usr/bin/env node
// Doctrine non-negotiable: no content expansion before fun-lock. Blocks edits to
// content/level/narrative authoring paths unless .factory/FUN_LOCK exists.
// Narrative-first packs (declared in guards/guard-config.json) get a structural
// allowance: their loop cannot be proven without story content, so pre-fun-lock
// content edits are allowed once playtest evidence exists — content trails play,
// never leads it. Content-farming ahead of any playtest still blocks.
import fs from "node:fs";
import { changedPaths, block, allow, playtestReports, readJsonSafe } from "./lib/guard.mjs";

const CONTENT_RE = /(^|\/)(content|narrative|levels|maps|story|quests)\//;
const touchesContent = changedPaths().some((p) => CONTENT_RE.test(p));
const funLock = fs.existsSync(".factory/FUN_LOCK");
const register = readJsonSafe("guards/guard-config.json")?.design_register ?? "mechanics-first";

if (touchesContent && !funLock) {
  if (register === "narrative-first" && playtestReports().length > 0) allow();
  block(register === "narrative-first"
    ? "story/content authoring before any playtest report exists (narrative-first: content trails play evidence; fun-lock lifts the guard)."
    : "content/level authoring before .factory/FUN_LOCK (fun-lock gate).");
}
allow();
