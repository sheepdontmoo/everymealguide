import { readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const [brand, url, status = "approved"] = process.argv.slice(2);

if (!brand || !url) {
  console.error("Usage: npm.cmd run affiliate:set -- \"Brand Name\" \"https://approved-affiliate-url\" [approved|paused|apply]");
  process.exit(1);
}

if (!/^https?:\/\//i.test(url)) {
  console.error("Affiliate URL must start with http:// or https://");
  process.exit(1);
}

if (!["approved", "paused", "apply"].includes(status)) {
  console.error("Status must be one of: approved, paused, apply");
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

const updated = source.replace(blockPattern, `$1"${status}"$2"${url}"`);
await writeFile(generatorPath, updated, "utf8");

console.log(`Updated ${brand} affiliate URL with status "${status}".`);
console.log("Next: npm.cmd run build, then confirm the /go/ route before publishing.");
