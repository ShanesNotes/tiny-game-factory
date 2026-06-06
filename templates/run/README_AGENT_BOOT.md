# README_AGENT_BOOT.md — Seed Run {{SEED_ID}}

You are resuming a Tiny Game Factory seed run. State lives in this folder; the
`manifest.json` is the source of truth, never the chat history.

## Boot sequence

1. Read the factory `AGENTS.md`, `CONTEXT.md`, and this run's `manifest.json`.
2. Run `.factory/prompts/P17_VERIFY_TOOLCHAIN.md` (or an equivalent toolchain probe)
   before any other phase.
3. Do not write code before `GAME_THESIS.md` is generated from `GAME_SEED.md` (P01).
4. Do not create the default child game root (`/home/ark/tgf-games/{{SEED_ID}}`)
   until a thesis and an engine decision exist.
5. Do not ask the user architecture or engine questions.
6. Record every phase transition in `execution-ledger.jsonl`.

## This run

- Seed: {{SEED}}
- Current phase: see `manifest.json` → `current_phase`.
- Next action: see `README_NEXT_ACTIONS.md`.
