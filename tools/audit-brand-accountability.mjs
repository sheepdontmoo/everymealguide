import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const generator = await readFile(join(root, "tools", "generate-pages.mjs"), "utf8");
const accountability = await readFile(join(root, "BRAND_ACCOUNTABILITY.md"), "utf8");

function extractObject(source, marker) {
  const start = source.indexOf(marker);
  if (start === -1) throw new Error(`Missing marker: ${marker}`);

  const open = source.indexOf("{", start);
  let depth = 0;

  for (let index = open; index < source.length; index += 1) {
    const char = source[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return source.slice(open, index + 1);
  }

  throw new Error(`Could not parse object for marker: ${marker}`);
}

function topLevelKeys(objectSource) {
  const keys = [];
  const pattern = /^\s*(?:"([^"]+)"|([A-Za-z][A-Za-z0-9 ]*))\s*:\s*\{/gm;
  let match;

  while ((match = pattern.exec(objectSource))) {
    keys.push(match[1] || match[2]);
  }

  return keys;
}

function profileBlock(objectSource, brand) {
  const escaped = brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const startPattern = new RegExp(`(?:^|\\n)\\s*(?:"${escaped}"|${escaped})\\s*:\\s*\\{`, "m");
  const startMatch = startPattern.exec(objectSource);
  if (!startMatch) return "";

  const open = objectSource.indexOf("{", startMatch.index);
  let depth = 0;

  for (let index = open; index < objectSource.length; index += 1) {
    const char = objectSource[index];
    if (char === "{") depth += 1;
    if (char === "}") depth -= 1;
    if (depth === 0) return objectSource.slice(open, index + 1);
  }

  return "";
}

const affiliatePrograms = extractObject(generator, "const affiliatePrograms");
const brandProfiles = extractObject(generator, "const brandProfiles");
const affiliateBrands = topLevelKeys(affiliatePrograms);
const profileBrands = topLevelKeys(brandProfiles);
const failures = [];

for (const brand of affiliateBrands) {
  if (!profileBrands.includes(brand)) {
    failures.push(`${brand}: missing from brandProfiles`);
    continue;
  }

  const block = profileBlock(brandProfiles, brand);
  for (const field of ["checkedOffer", "sourceUrl", "sourceLabel", "bestFor", "watchOut", "verdict"]) {
    if (!new RegExp(`${field}:\\s*"[^"]+?"`, "m").test(block)) {
      failures.push(`${brand}: missing or empty ${field}`);
    }
  }

  if (!accountability.includes(`| ${brand} |`)) {
    failures.push(`${brand}: missing from BRAND_ACCOUNTABILITY.md matrix`);
  }
}

const freshNLeanTopPickPattern = /\[[^\]]*"Fresh N Lean"[^\]]*\]/;
if (freshNLeanTopPickPattern.test(extractObject(generator, "const pages"))) {
  failures.push("Fresh N Lean: appears in generated page picks even though it is watchlist-only");
}

if (failures.length) {
  console.error("Brand accountability audit failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Brand accountability audit passed for ${affiliateBrands.length} companies.`);
