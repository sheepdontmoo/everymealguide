import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const routes = [
  { path: "", label: "homepage", required: ["<h1>", "proof-strip", "deal-grid"] },
  { path: "best/meal-delivery-services", label: "best page", required: ["page-hero", "hero-verdict-card", "ranking-card", "pros-cons", "sticky-deal-bar"] },
  { path: "deals/best-meal-delivery-deals", label: "deals page", required: ["deal-warning-grid", "Deal decision table", "sticky-deal-bar"] },
  { path: "vs/factor-vs-cookunity", label: "vs page", required: ["page-hero", "winner-strip", "vs-decision-cards", "verdict-section", "sticky-deal-bar"] },
  { path: "reviews/factor", label: "review page", required: ["review-feature", "score-grid", "review-decision-cards", "sticky-deal-bar"] },
  { path: "methodology", label: "methodology", required: ["page-hero", "legal-page"] },
];

const results = [];

function add(status, route, detail) {
  results.push({ status, route, detail });
}

function fileFor(route) {
  return route.path ? join(root, route.path, "index.html") : join(root, "index.html");
}

for (const route of routes) {
  const html = await readFile(fileFor(route), "utf8");

  if (/<h1[^>]*>[\s\S]+?<\/h1>/.test(html)) {
    add("PASS", route.label, "H1 present");
  } else {
    add("FAIL", route.label, "H1 missing");
  }

  if (/<title>[\s\S]+?<\/title>/.test(html)) {
    add("PASS", route.label, "title present");
  } else {
    add("FAIL", route.label, "title missing");
  }

  for (const token of route.required) {
    if (html.includes(token)) {
      add("PASS", route.label, `${token} present`);
    } else {
      add("FAIL", route.label, `${token} missing`);
    }
  }

  if (html.includes('href="#"')) {
    add("FAIL", route.label, "placeholder # link found");
  } else {
    add("PASS", route.label, "no placeholder # links");
  }
}

const css = await readFile(join(root, "styles.css"), "utf8");
for (const token of ["@media (max-width: 700px)", ".sticky-deal-bar", ".ranking-card", ".decision-module", ".vs-decision-cards", ".review-decision-cards", "prefers-reduced-motion"]) {
  if (css.includes(token)) {
    add("PASS", "css", `${token} present`);
  } else {
    add("FAIL", "css", `${token} missing`);
  }
}

for (const result of results) {
  console.log(`${result.status}: ${result.route} - ${result.detail}`);
}

const failures = results.filter((result) => result.status === "FAIL");
console.log("");
console.log(`Visual preflight: ${failures.length} failure(s).`);

if (failures.length) {
  process.exitCode = 1;
}
