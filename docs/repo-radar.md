# Repo Radar — Borrow Primitives, Do Not Cargo-Cult Repos

The Scout agent uses this file as a starting radar. Every entry is a candidate primitive, not a dependency.

## Strong candidates to inspect

| Repo / family | Primitive to borrow | Adoption status | Guard |
|---|---|---:|---|
| `vibe-stack/ggez` | Three.js/R3F game authoring lane; “Next.js for Three.js games” style project structure. | PROBE | Only for 3D seeds; do not turn visual-wow into false progress. |
| `vibe-stack/three-maps` | Browser 3D blockout/map editor ideas; scene export/import; greybox workflows. | PROBE | Borrow export format, not editor dependency. |
| `vibe-stack/freed` | Browser-side 3D/editor UX patterns. | PROBE | Editor mutation must become diffable project data. |
| `PlayableIntelligence/game-creator` | Phaser/ThreeJS Claude plugin and Playwright QA cadence. | PROBE | Check license and isolate useful skills/prompts. |
| `Claude-Code-Game-Studios` | Large game-dev agent/skill/hook taxonomy. | PROBE | Borrow role taxonomy only; avoid bloated ceremony. |
| `godogen` | Engine-specific game-gen skills for Godot/Bevy/Babylon. | PROBE | Compare adapters with our profiles; do not blindly install. |
| `fcsouza/agent-skills game-dev` | Game-dev plugin skill stack. | PROBE | Harvest skills if concise and non-overlapping. |
| `gamedev-mcp-hub` | MCP tool routing map for game tools. | PROBE | Scout input only; do not adopt wholesale. |

## Scout output contract

Every repo harvest must append:

```md
## <repo> — <date>

Primitive borrowed:
Why it matters:
License:
Install command tested:
Smoke command tested:
Files copied/adapted:
What we explicitly did NOT borrow:
Risks:
Status: rejected | scout-only | adapter-added | dependency-added
```

## Hard rule

A repo is never “good” because it is impressive. It is only useful if it gives the factory a primitive that improves:

- seed compilation
- depth generation
- branch bake-off
- bot playtesting
- code-native assets
- hook enforcement
- engine profile selection
- release reproducibility
