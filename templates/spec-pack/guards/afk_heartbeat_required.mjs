#!/usr/bin/env node
// Requires long-run bot/falsifier evidence for overnight/AFK runs.
// A run is treated as AFK/nightly when `--afk` is passed or GUARD_AFK=1 is set.
// Blocks if no playtests/**/playtest_report.json records a long-enough session.
import { playtestReports, readJsonSafe, hasFlag, block, allow } from "./lib/guard.mjs";

const MIN_AFK_SECONDS = 300; // synced upstream (nightly_bot_session_seconds gate)
const afk = hasFlag("--afk") || process.env.GUARD_AFK === "1";
if (!afk) allow();

const longEnough = playtestReports().some((p) => {
  const r = readJsonSafe(p);
  return r && Number(r.duration_seconds) >= MIN_AFK_SECONDS;
});

if (!longEnough) block(`AFK/nightly run needs a >=${MIN_AFK_SECONDS}s bot + falsifier playtest report.`);
allow();
