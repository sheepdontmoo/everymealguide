import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const slugs = ["meal-delivery-cost-calculator", "hellofresh-cost-calculator", "factor-cost-calculator", "everyplate-cost-calculator", "gousto-cost-calculator"];
const failures = [];
const requireText = (text, pattern, message) => { if (!pattern.test(text)) failures.push(message); };

for (const slug of slugs) {
  const file = path.join(root, "calculators", slug, "index.html");
  if (!fs.existsSync(file)) { failures.push(`${slug}: page missing`); continue; }
  const html = fs.readFileSync(file, "utf8");
  requireText(html, /<link rel="canonical" href="https:\/\/www\.everymealguide\.com\/calculators\//, `${slug}: canonical missing`);
  requireText(html, /<h1>[^<]+Cost Calculator<\/h1>/, `${slug}: H1 missing`);
  requireText(html, /data-meal-cost-form/, `${slug}: calculator form missing`);
  requireText(html, /FAQPage/, `${slug}: FAQ schema missing`);
  requireText(html, /meal-cost-calculator\.js/, `${slug}: calculator script missing`);
  requireText(html, /\/calculators\//, `${slug}: related calculator links missing`);
}

const script = fs.readFileSync(path.join(root, "assets", "meal-cost-calculator.js"), "utf8");
requireText(script, /foodSubtotal \+ shipping \+ fees/, "calculator: recurring fees formula missing");
requireText(script, /recurringWeekly \* 52 \/ 12/, "calculator: average monthly formula missing");
requireText(script, /recurringWeekly \/ servings/, "calculator: true per-serving formula missing");

const sitemap = fs.readFileSync(path.join(root, "sitemap-calculators.xml"), "utf8");
for (const slug of slugs) requireText(sitemap, new RegExp(`<loc>https://www\\.everymealguide\\.com/calculators/${slug}/</loc>`), `${slug}: sitemap entry missing`);
const robots = fs.readFileSync(path.join(root, "robots.txt"), "utf8");
requireText(robots, /Sitemap: https:\/\/www\.everymealguide\.com\/sitemap-calculators\.xml/, "calculator sitemap: robots directive missing");

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}
console.log(`Verified calculator hub, ${slugs.length} calculators, schema, canonicals, sitemap and cost formulas.`);
