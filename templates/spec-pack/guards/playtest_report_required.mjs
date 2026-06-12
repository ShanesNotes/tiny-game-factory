#!/usr/bin/env node
// Blocks gameplay completion claims without at least one parseable playtest report.
import { playtestReports, readJsonSafe, block, allow } from "./lib/guard.mjs";

if (!playtestReports().some((p) => readJsonSafe(p))) block("no parseable playtests/**/playtest_report.json found.");
allow();
