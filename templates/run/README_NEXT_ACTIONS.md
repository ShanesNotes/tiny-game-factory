# README_NEXT_ACTIONS.md — Seed Run {{SEED_ID}}

Status: initialized (phase: `intake`).

Next agent action:

1. Read `README_AGENT_BOOT.md` and summarize the manifest.
2. Run `node scripts/build-portfolio-digest.mjs --seed-id {{SEED_ID}}`.
3. Complete `intake/office-hours.md` against the digest and
   `schemas/intake-grill.schema.json`.
4. Advance to `toolchain`, run P17 from real probes, then route by the manifest.
5. Record phase transitions with `node scripts/advance-run.mjs`.

Do not:

- write game code (the factory ships a spec pack, not a game);
- create the default spec pack root by hand (only `scripts/package-spec.mjs`
  exports it, at handoff);
- pick an engine before the thesis exists and is design-locked;
- ask the user architecture/engine questions.
