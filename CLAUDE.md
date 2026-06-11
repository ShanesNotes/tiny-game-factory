# CLAUDE.md — Tiny Game Factory (Claude Code entry)

Read `AGENTS.md` first — it is the operating procedure. Then `CONTEXT.md` for
vocabulary. This file exists because `factory.config.toml` lists it as a required
Claude Code bootstrap path; it adds no separate doctrine.

```bash
npm run verify   # lint + validate-artifacts + run-gates + tests
```

To start or resume a seed run:

```bash
node scripts/init-game-run.mjs --seed-id <kebab-id> --seed "<one-line seed>"
node scripts/summarize-run.mjs --seed-id <kebab-id>
node scripts/advance-run.mjs --seed-id <kebab-id> --to <phase> --event <event> --status passed
```