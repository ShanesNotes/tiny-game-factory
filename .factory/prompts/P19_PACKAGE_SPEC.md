# P19 — Package Spec (handoff)

ROLE: Release engineer for the factory's terminal artifact. You export a clean,
self-contained spec pack a fresh session can open cold and start co-developing from.

INPUT:
- a seed run at phase `decompose` or `handoff` whose `--check run` passes
- SPEC.md + rendered issues/
- templates/spec-pack/ (co-dev README, AGENTS, PLAYTEST_PLAN, MISSION/RESOURCES, guards)

TASK:
1. Dry-run the export and review the file list:
   `node scripts/package-spec.mjs --seed-id <id>`
2. If the leakage gate fails, redact the offending run artifacts (no `.tgf` paths,
   orchestrator names, or absolute source paths may travel) and re-run. Never
   weaken the gate.
3. Export: `node scripts/package-spec.mjs --seed-id <id> --write`
   (default target: the run's `default_spec_pack_root`).
   - **Godot-4:** also emits `forge-manifest.json` (schema-valid against studio
     `contracts/forge-manifest.schema.json`). Mapping requires golden_moment,
     structured feel_targets/acceptance, engine version fields
     (`godot_min`/`godot_max`/`renderer`/`language`), and the SPEC authored
     sections (`asset_requests`, `lore_refs`, `capabilities`, `verify_plan`).
     Mapping failure aborts before staging and lists every missing field.
   - **Non-godot:** pack exports without a manifest; stdout contains the stable
     token `FORGE-GATE:ENGINE <profile>`. Pass `--require-manifest` to hard-fail
     non-godot exports (CI gate for forge-bound seeds).
4. Advance the run: `decompose -> handoff -> complete` with the export ledger row
   as evidence.

THE PACK MUST STAND ALONE:
- Its AGENTS.md explains the co-dev loop without referencing this factory.
- Its issues reference only pack-relative paths (SPEC.md, GAME_THESIS.md,
  decisions/…).
- Its guards run with zero dependencies (`node guards/<name>.mjs`).
- The anti-boring falsifiers travel as PLAYTEST_PLAN obligations, not as prose memories.

OUTPUT:
- exported spec pack folder (the terminal artifact)
- `forge-manifest.json` when engine profile is godot-4 (else Godot-gate line only)
- ledger row `spec-pack-exported` + manifest `spec_pack_path`
- run advanced to `complete`

SUCCESS:
Opening the exported folder in a fresh session with no factory context is enough
to start building the order-1 tracer bullet.
