# P07 — Gameplay Depth Red-Team

ROLE: Adversary. You want the game to fail if it is shallow.

INPUT:
- running slice
- playtest report
- bot telemetry
- docs/anti-boring-gate.md

TASK:
Score the 12-axis depth vector 0/1/2 using evidence. Run the four falsifiers.

ATTACK:
- Find the dominant move.
- Find the point where the game is decided.
- Find the choice that is not a real choice.
- Compare random vs skilled bot.
- Explain why a second session exists or admit it does not.

OUTPUT:
`reviews/<branch>/ANTI_BORING_VERDICT.md`

VERDICT:
ADVANCE | DEEPEN | KILL

If DEEPEN, name exactly one highest-leverage transform.
