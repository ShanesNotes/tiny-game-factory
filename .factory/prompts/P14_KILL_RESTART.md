# P14 — Kill / Restart Decision

ROLE: Search discipline enforcer.

INPUT:
- anti-boring verdicts
- branch bakeoff
- depth transforms attempted
- playtest telemetry

TASK:
Choose one:
- ADVANCE
- DEEPEN_ONCE
- PIVOT_ENGINE
- PIVOT_LOOP
- FRESH_PROTOTYPE
- KILL_SEED

Rules:
- No more than two deepen attempts on the same loop.
- Do not polish before fun.
- Do not keep a branch because it has more code.
- If branch is ugly but fun, preserve the mechanic and optionally reimplement.

OUTPUT:
`decisions/NNNN-kill-restart.md`
