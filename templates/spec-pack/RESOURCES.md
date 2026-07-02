# {{SEED_ID}} resources

Trusted sources for building this game. Annotate every entry — a bare link is
useless in three months. Prune what turns out shallow.

## Knowledge

- [`SPEC.md`](./SPEC.md) + [`GAME_THESIS.md`](./GAME_THESIS.md)
  The argument for this game and its decomposition. Use for: scope, acceptance,
  and why each slice exists.
- [`decisions/0001-engine-profile.md`](./decisions/0001-engine-profile.md)
  The chosen engine profile and its reversal triggers. Use for: what to build on
  and when to reconsider.

## Wisdom (Communities)

- (none yet — add the chosen engine's highest-signal community here)

## Agentic tooling (possibilities, not defaults)

CLI coding agents building this pack may have game-dev tooling beyond the
compiler. None of it is assumed — probe before trusting, and the pack's guards
(asset provenance, content-before-fun-lock, art fidelity cap) still govern:

- **Engine runtime MCPs** — e.g. a Godot MCP offering headless scene edits,
  screenshots, input simulation, and runtime scripts. If present for the chosen
  engine, wire it in early: it turns playtest evidence from a chore into a loop.
- **Engine skill suites** — deep per-engine skill libraries (e.g. a Godot 4.x
  suite covering player controllers, state machines, audio, shaders, testing).
  Check the host's skill listing before the first slice.
- **Asset-generation services** — 3D (Meshy/Tripo-class), concept/reference
  (Ludo-class), image and audio models. These are *post-fun-lock* tools:
  opaque assets require the provenance recipe and the art-direction lock. When
  a design canon is declared in `guards/guard-config.json`, generated assets
  must follow its prompt kit, not free-style.

## Gaps

- Official documentation for the engine chosen in `decisions/0001-engine-profile.md`.
- A high-signal community for that engine (forum, Discord, or subreddit).
- A reference game that nails the core loop's feel, worth studying before slice 1.
