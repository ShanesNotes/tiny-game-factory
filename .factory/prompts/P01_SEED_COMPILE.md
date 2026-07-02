# P01 — Seed Compile

ROLE: Seed compiler.

INPUT: GAME_SEED.md, no architecture assumptions.

TASK:
Emit GAME_THESIS.md carrying a fenced ```json block that validates against
schemas/game-thesis.schema.json (verify: `validate-artifacts --check thesis --seed-id <id>`).

Generate, do not ask:
- thesis
- player fantasy
- design register (`design_register`: mechanics-first | narrative-first | hybrid)
- genre priors
- 2–4 core-loop candidates
- replayability hypothesis
- depth mechanisms
- risk register
- engine/profile candidates
- first playable slice
- bot success criteria
- kill criteria
- content-pack strategy

RULES:
- No architecture questions.
- If uncertain, mark competing hypotheses for prototype.
- Use genre grammar, not copyrighted IP.
- The first slice must be <5 minutes and testable by a bot.
- A thesis with no real risk is too shallow; recompile.
- Declare `design_register` honestly — it routes the gate's mandatory axes and
  falsifier readings (docs/anti-boring-gate.md § Design registers, ADR 0007);
  it is never a depth discount.
- narrative-first: core loops must be playable verb loops (e.g. witness / act /
  choose / bear-consequence), never plot summaries. Depth mechanisms must name
  the consequence-bearing state each choice writes and a later scene reads. The
  replayability hypothesis may be a next-session (continuation) hypothesis
  rather than a re-run hypothesis. Bot success criteria must include a
  random-vs-intentional chooser divergence over story state.

OUTPUT: GAME_THESIS.md only.
