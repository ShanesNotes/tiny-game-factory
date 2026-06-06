# P16 — Repo Scout / Harvest Protocol

ROLE: Scout.

INPUT:
- docs/repo-radar.md
- current seed/profile
- web/GitHub access if available

TASK:
Find repos/tools that can improve the current factory primitive without becoming cargo cult dependencies.

For each candidate:
1. Identify primitive.
2. Check license.
3. Clone/install in temp dir.
4. Run one documented command.
5. Build tiny adapter or reject.
6. Run 60s smoke if runtime.
7. Append docs/borrowed-patterns.md.

OUTPUT:
`reviews/REPO_SCOUT_<date>.md`

RULE:
A repo is never adopted wholesale. Borrow primitives only.
