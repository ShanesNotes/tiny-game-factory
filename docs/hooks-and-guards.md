# Hooks & Guardrails

These are policy hooks first and executable scripts second. The included scripts are starter guards; agents may harden them but may not remove them without ADR.

| Guard | Trigger | Block condition |
|---|---|---|
| `scope_brake` | pre-edit / pre-commit | Feature outside current `GAME_THESIS.md` first-slice scope. |
| `art_fidelity_cap` | pre-edit assets | Opaque/high-fidelity asset before G1+G2. |
| `asset_provenance` | pre-edit assets | Opaque asset without prompt/seed/model/version recipe. |
| `mcp_mutation_must_emit_text` | post-MCP | Editor/tool mutation without diffable artifact. |
| `engine_migration_requires_adr` | pre-edit config | Engine/library migration without decision file. |
| `phaser_version_pin` | pre-edit/package scan | Phaser lane uses unpinned/stale major or v3-only API pattern. |
| `playtest_report_required` | turn-stop / merge | Gameplay change without `playtests/**/playtest_report.json`. |
| `afk_heartbeat_required` | routine | Nightly/long run without 300s bot + falsifier report. |

## Hook enforcement philosophy

Warnings are not enough. A guard that protects against sunk-cost, visual-wow, or wrote-it-never-played-it must block the turn/merge.
