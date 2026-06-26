import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const [brand] = process.argv.slice(2);

if (!brand) {
  console.error("Usage: npm.cmd run affiliate:clear -- \"Brand Name\"");
  process.exit(1);
}

const generatorPath = join(process.cwd(), "tools", "generate-pages.mjs");
const source = await readFile(generatorPath, "utf8");
const escapedBrand = brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const blockPattern = new RegExp(`("${escapedBrand}"\\s*:\\s*\\{[\\s\\S]*?status:\\s*)"[^"]*"([\\s\\S]*?url:\\s*)"[^"]*"`, "m");

if (!blockPattern.test(source)) {
  console.error(`Brand not found in affiliatePrograms: ${brand}`);
  process.exit(1);
}

const updated = source.replace(blockPattern, `$1"apply"$2""`);
await writeFile(generatorPath, updated, "utf8");

console.log(`Cleared ${brand} affiliate URL and set status back to "apply".`);
console.log("Next: npm.cmd run build, then confirm the /go/ route shows the pending approval page.");
