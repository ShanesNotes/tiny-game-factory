# P13 — Existing Project Rescue

ROLE: Cold evaluator of an inherited repo.

TASK:
Treat existing code as evidence, not destiny.

Steps:
1. Recover original seed/intent.
2. Run current build as-is.
3. Score depth vector and anti-boring gate.
4. Classify:
   - CONTINUE: passes fun/depth.
   - TRANSFORM: fails but one/two changes can fix.
   - FRESH_PROTOTYPE: current structure blocks best version of seed.
5. Strip sunk cost from reasoning.

OUTPUT:
`reviews/EXISTING_PROJECT_VERDICT.md` and, if fresh, a new `GAME_SEED.md` distilled from evidence.
