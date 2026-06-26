import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();

const requiredRoutes = [
  "",
  "best/meal-delivery-services",
  "deals/best-meal-delivery-deals",
  "vs/factor-vs-cookunity",
  "reviews/factor",
  "methodology",
  "affiliate-disclosure",
  "privacy",
  "contact",
];

const requiredFiles = [
  "index.html",
  "styles.css",
  "script.js",
  "robots.txt",
  "sitemap.xml",
  "DEPLOY.md",
  "LIVE_LAUNCH_RUNBOOK.md",
  "LAUNCH_CHECKLIST.md",
  "seo/site-architecture.csv",
  "seo/content-briefs.md",
  "seo/technical-audit.md",
  "seo/affiliate-program-targets.csv",
  "seo/analytics-events.md",
  "seo/affiliate-application-kit.md",
];

const results = [];

function pass(name, detail = "") {
  results.push({ status: "PASS", name, detail });
}

function warn(name, detail = "") {
  results.push({ status: "WARN", name, detail });
}

function fail(name, detail = "") {
  results.push({ status: "FAIL", name, detail });
}

async function readText(path) {
  return readFile(join(root, path), "utf8");
}

function routeFile(route) {
  return route ? join(route, "index.html") : "index.html";
}

for (const file of requiredFiles) {
  if (existsSync(join(root, file))) {
    pass(`required file exists: ${file}`);
  } else {
    fail(`required file missing: ${file}`);
  }
}

for (const route of requiredRoutes) {
  const file = routeFile(route);
  if (existsSync(join(root, file))) {
    pass(`required route exists: /${route}`);
  } else {
    fail(`required route missing: /${route}`, file);
  }
}

const sitemap = await readText("sitemap.xml");
for (const route of requiredRoutes.filter(Boolean)) {
  const expected = `/${route}/`;
  if (sitemap.includes(expected)) {
    pass(`sitemap includes ${expected}`);
  } else {
    fail(`sitemap missing ${expected}`);
  }
}

const homepage = await readText("index.html");
const moneyPage = await readText("best/meal-delivery-services/index.html");
const dealsPage = await readText("deals/best-meal-delivery-deals/index.html");
const script = await readText("script.js");
const affiliatePrograms = JSON.parse(await readText("affiliate-programs.json"));

const allHtml = [
  homepage,
  moneyPage,
  dealsPage,
  await readText("vs/factor-vs-cookunity/index.html"),
  await readText("reviews/factor/index.html"),
].join("\n");

const affiliateClickCount = (allHtml.match(/data-track="affiliate-click"/g) || []).length;
const sponsoredCount = (allHtml.match(/rel="sponsored nofollow"/g) || []).length;

if (affiliateClickCount > 0) {
  pass("affiliate CTAs exist", `${affiliateClickCount} tracked links found`);
} else {
  fail("affiliate CTAs missing");
}

if (sponsoredCount >= affiliateClickCount) {
  pass("affiliate CTAs use sponsored nofollow", `${sponsoredCount}/${affiliateClickCount}`);
} else {
  fail("some affiliate CTAs are missing sponsored nofollow", `${sponsoredCount}/${affiliateClickCount}`);
}

if (allHtml.includes("Latest brand checks")) {
  pass("money pages include latest brand checks");
} else {
  fail("money pages missing latest brand checks");
}

if (dealsPage.includes("Deal decision table")) {
  pass("deals page includes deal decision table");
} else {
  fail("deals page missing deal decision table");
}

if (script.includes("affiliate_click") && script.includes("window.dataLayer")) {
  pass("affiliate click event scaffold exists");
} else {
  fail("affiliate click event scaffold missing");
}

if (script.includes("window.plausible") && script.includes("Affiliate Click")) {
  pass("plausible affiliate event adapter exists");
} else {
  warn("plausible affiliate event adapter missing", "Optional if using another analytics provider.");
}

if (allHtml.includes("vs-decision-cards")) {
  pass("vs decision cards exist");
} else {
  fail("vs decision cards missing");
}

if (allHtml.includes("review-decision-cards")) {
  pass("review decision cards exist");
} else {
  fail("review decision cards missing");
}

const approvedPrograms = Object.entries(affiliatePrograms).filter(([, program]) => program.url);
if (approvedPrograms.length) {
  pass("approved affiliate URLs configured", `${approvedPrograms.length} configured`);
} else {
  warn("no approved affiliate URLs configured", "Expected before monetized launch, acceptable before affiliate approval.");
}

if (homepage.includes("https://www.everymealguide.com/") || sitemap.includes("https://www.everymealguide.com/")) {
  warn("default SITE_URL still present", "Set SITE_URL before final production build if using a different domain.");
} else {
  pass("default SITE_URL replaced");
}

if ((await readText("contact/index.html")).includes("hello@everymealguide.com")) {
  warn("default contact email still present", "Set CONTACT_EMAIL before affiliate applications if this mailbox is not active.");
} else {
  pass("default contact email replaced");
}

const failures = results.filter((result) => result.status === "FAIL");
const warnings = results.filter((result) => result.status === "WARN");

for (const result of results) {
  const suffix = result.detail ? ` - ${result.detail}` : "";
  console.log(`${result.status}: ${result.name}${suffix}`);
}

console.log("");
console.log(`Launch audit: ${failures.length} failure(s), ${warnings.length} warning(s).`);

if (failures.length) {
  process.exitCode = 1;
}
