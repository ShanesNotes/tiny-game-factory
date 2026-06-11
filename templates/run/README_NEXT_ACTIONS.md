# README_NEXT_ACTIONS.md — Seed Run {{SEED_ID}}

Status: initialized (phase: `toolchain`).

Next agent action:

1. Read `README_AGENT_BOOT.md`.
2. `node scripts/summarize-run.mjs --seed-id {{SEED_ID}}` — manifest beats memory.
3. Run `.factory/prompts/P17_VERIFY_TOOLCHAIN.md` and update the toolchain ledger
   from real local probes (not memory).
4. Run `.factory/prompts/P01_SEED_COMPILE.md` to compile `GAME_SEED.md` into
   `GAME_THESIS.md`.
5. Record phase transitions with `node scripts/advance-run.mjs` (do not hand-edit
   `manifest.json` and `execution-ledger.jsonl` separately).

Do not:

- create a child game repo or the default child game root yet;
- pick an engine before `GAME_THESIS.md` exists;
- ask the user architecture/engine questions.
