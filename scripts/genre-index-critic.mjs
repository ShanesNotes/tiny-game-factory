#!/usr/bin/env node
// Deterministic completeness critic for the Tier-2 design-facet ontology.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { arg } from "./lib/argv.mjs";
import { DESIGN_FACETS, validateGenreIndex } from "./validate-genre-index.mjs";

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export function critiqueGenreIndex(rows) {
  const lines = ["GENRE INDEX COMPLETENESS CRITIC"];
  const findings = [];
  if (rows.length === 0) findings.push("empty corpus");

  for (const facet of DESIGN_FACETS) {
    lines.push(`FACET ${facet}`);
    const memberships = new Map();
    const secondaryCounts = new Map();
    for (const row of rows) {
      const values = new Set([row.design_shape[facet].primary, ...row.design_shape[facet].secondary]);
      for (const value of values) {
        if (!memberships.has(value)) memberships.set(value, []);
        memberships.get(value).push(row);
      }
      for (const value of row.design_shape[facet].secondary) {
        secondaryCounts.set(value, (secondaryCounts.get(value) || 0) + 1);
      }
    }
    for (const value of [...memberships.keys()].sort()) {
      const members = memberships.get(value).sort((a, b) => a.id.localeCompare(b.id));
      const marketGenres = new Set(
        members.flatMap((row) => [row.market_genres.primary, ...row.market_genres.secondary])
      );
      const hybridRows = secondaryCounts.get(value) || 0;
      lines.push(`  ${value}: rows=${members.length}; market_genres=${marketGenres.size}; hybrid_rows=${hybridRows}`);
      if (members.length < 3) findings.push(`${facet}/${value}: floor ${members.length} < 3`);
      if (hybridRows > 0 && marketGenres.size < 2) {
        findings.push(`${facet}/${value}: hybrid market genres ${marketGenres.size} < 2`);
      }
    }
  }

  lines.push("FINDINGS");
  if (findings.length) {
    for (const finding of findings) lines.push(`  - ${finding}`);
    lines.push(`RESULT INCOMPLETE (${findings.length})`);
  } else {
    lines.push("  none");
    lines.push("RESULT CLEAN");
  }
  return { findings, report: `${lines.join("\n")}\n` };
}

function main() {
  const result = validateGenreIndex({
    rowsDir: path.resolve(arg("rows-dir") || path.join(REPO, "docs/reference-games/genre-index")),
    indexPath: null,
    schemaPath: path.resolve(arg("schema") || path.join(REPO, "schemas/genre-index-row.schema.json")),
    cardsDir: path.resolve(arg("cards-dir") || path.join(REPO, "docs/reference-games/cards"))
  });
  if (result.errors.length) {
    console.error("GENRE INDEX COMPLETENESS CRITIC");
    for (const error of result.errors) console.error(`  VALIDATION: ${error}`);
    console.error(`RESULT INVALID (${result.errors.length})`);
    process.exit(1);
  }
  const critique = critiqueGenreIndex(result.rows);
  process.stdout.write(critique.report);
  process.exit(critique.findings.length ? 1 : 0);
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main();
