import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const siteUrl = "https://www.everymealguide.com";
const today = "2026-06-24";

const commonLinks = [
  ["Best meal delivery services", "/best/meal-delivery-services/"],
  ["Prepared meals", "/best/prepared-meal-delivery/"],
  ["Meal kits", "/best/meal-kits/"],
  ["Best deals", "/deals/best-meal-delivery-deals/"],
];

const targets = [
  ["hub", "best/meal-delivery-services", "best meal delivery services", "Best Meal Delivery Services", "Compare the best meal delivery services by meal type, country, budget, diet fit, and first-box versus ongoing cost.", "The best meal delivery service is the one that matches your dinner format first: meal kits if you want to cook, prepared meals if you want no-cook convenience, high-protein plans if macros matter, and cheap boxes only when the second order still makes sense.", "People who need one starting point before choosing a format, country, or brand.", "You already know you only want a local prepared-meal service or a specific brand comparison.", "Global hub for meal kits, prepared meals, diet pages, country pages, deals, and brand comparisons.", commonLinks],
  ["hub", "best/prepared-meal-delivery", "best prepared meal delivery", "Best Prepared Meal Delivery", "Compare prepared meal delivery services for no-cook dinners, high-protein routines, chef-made meals, and real recurring cost.", "Prepared meal delivery is the better lane when you want dinner ready to heat, not ingredients to cook. Start with delivery coverage, meal freshness, diet fit, and normal weekly cost after the first discount.", "Busy buyers who want heat-and-eat meals, work lunches, or structured weekly meals.", "You enjoy cooking and mainly want recipes plus pre-portioned ingredients.", "Prepared meals, ready-made meals, refrigerated meals, frozen meals, and high-protein meal prep.", [["Factor review", "/reviews/factor/"], ["CookUnity review", "/reviews/cookunity/"], ["Factor vs CookUnity", "/vs/factor-vs-cookunity/"], ...commonLinks.slice(0, 2)]],
  ["hub", "best/meal-kits", "best meal kits", "Best Meal Kits", "Compare the best meal kits by recipe choice, family fit, price after discounts, prep time, and delivery country.", "Meal kits are best when you still want to cook but want less planning and shopping. Compare serving count, prep time, recipe variety, dietary filters, and what the same box costs after the intro offer.", "Households that want fresh cooking with less shopping and more recipe structure.", "You want food already cooked or do not want washing pans after work.", "Cook-yourself meal kits, recipe boxes, family boxes, and budget meal kits.", [["HelloFresh vs Gousto", "/vs/hellofresh-vs-gousto/"], ["EveryPlate vs Dinnerly", "/vs/everyplate-vs-dinnerly/"], ["Family meal delivery", "/best/meal-kits-for-families/"], ["Cheap meal delivery", "/best/cheap-meal-delivery/"]]],
  ["use_case", "best/high-protein-meal-delivery", "best high protein meal delivery", "Best High Protein Meal Delivery", "Compare high-protein meal delivery services by prepared meals, meal prep, macro clarity, routine fit, and price risk.", "High-protein meal delivery should be judged by macro clarity, portion size, freshness, delivery coverage, and whether you need prepared meals or meal kits. Do not treat a generic healthy page as proof it fits a protein routine.", "Fitness, busy workweek, and macro-aware buyers who want repeatable meals.", "You need medical nutrition advice or a certified diet plan; verify with a qualified professional.", "High-protein prepared meals, fitness meal prep, macro-friendly plans, and protein-led meal kits.", [["Prepared meals", "/best/prepared-meal-delivery/"], ["Factor review", "/reviews/factor/"], ["Green Chef review", "/reviews/green-chef/"], ["Best deals", "/deals/best-meal-delivery-deals/"]]],
  ["use_case", "best/cheap-meal-delivery", "cheapest meal delivery service", "Cheapest Meal Delivery Service", "Find the cheapest sensible meal delivery service by comparing intro discounts, second-box cost, serving count, and budget meal kits.", "The cheapest meal delivery service is not always the biggest first-box discount. Compare price after the offer, serving count, delivery fees, and whether the service is a budget meal kit or a prepared meal.", "Budget shoppers who will compare the second order before subscribing.", "You need premium prepared meals, strict diet filters, or chef-made menus.", "Budget meal kits, cheap dinner boxes, introductory deals, and low-cost recurring plans.", [["EveryPlate vs Dinnerly", "/vs/everyplate-vs-dinnerly/"], ["EveryPlate review", "/reviews/everyplate/"], ["Dinnerly review", "/reviews/dinnerly/"], ["Best deals", "/deals/best-meal-delivery-deals/"]]],
  ["use_case", "best/meal-kits-for-families", "best meal delivery for families", "Best Meal Delivery for Families", "Compare family meal delivery by serving count, kid fit, leftovers, recipe choice, budget, and cancellation rules.", "The best family meal delivery option is the one your household will repeat. Compare serving count, kid-friendly meals, leftovers, prep time, box two pricing, and whether the service supports skipped weeks.", "Families that need predictable weeknight dinners without too much planning.", "You need single-serving prepared meals or strict specialist diet plans.", "Family meal kits, family prepared meals, kid-friendly dinners, and flexible serving boxes.", [["Best meal kits", "/best/meal-kits/"], ["Cheap meal delivery", "/best/cheap-meal-delivery/"], ["HelloFresh review", "/reviews/hellofresh/"], ["Gousto review", "/reviews/gousto/"]]],
  ["use_case", "best/vegan-meal-delivery", "best vegan meal delivery", "Best Vegan Meal Delivery", "Compare vegan meal delivery services by plant-based focus, prepared meals, meal kits, menu depth, and checkout caveats.", "The best vegan meal delivery service depends on whether you want dedicated plant-based menus or mainstream services with vegan filters. Check ingredients, cross-contact notes, delivery area, and recurring price before choosing.", "Plant-based buyers comparing dedicated vegan services against mainstream filtered menus.", "You need certified allergen or medical diet guarantees without verifying directly.", "Vegan meal kits, plant-based prepared meals, vegetarian alternatives, and diet-filtered menus.", [["Purple Carrot review", "/reviews/purple-carrot/"], ["Vegetarian meal delivery", "/best/vegetarian-meal-delivery/"], ...commonLinks.slice(1, 3)]],
  ["use_case", "best/keto-meal-delivery", "best keto meal delivery", "Best Keto Meal Delivery", "Compare keto-friendly meal delivery by low-carb filters, prepared meals, meal kits, ingredient checks, and price after discounts.", "Keto meal delivery should be treated as keto-friendly menu filtering, not medical advice. Compare current ingredients, carb information, meal format, delivery area, and normal weekly cost.", "Low-carb shoppers who want easier menu filtering and fewer default carb-heavy dinners.", "You need medical diet supervision or guaranteed nutrition claims without direct verification.", "Keto-friendly prepared meals, low-carb meal kits, diet-filtered plans, and high-protein alternatives.", [["High protein delivery", "/best/high-protein-meal-delivery/"], ["Green Chef review", "/reviews/green-chef/"], ["Factor review", "/reviews/factor/"], ...commonLinks.slice(1, 2)]],
  ["use_case", "best/gluten-free-meal-delivery", "best gluten free meal delivery", "Best Gluten Free Meal Delivery", "Compare gluten-free meal delivery options by ingredient transparency, cross-contact caveats, meal format, delivery area, and price.", "Gluten-free meal delivery needs a stricter caveat than normal diet pages. Check current ingredients, cross-contact statements, certification language, delivery area, and whether the menu is prepared or cook-yourself.", "Buyers who need gluten-free filtering and are willing to verify ingredients before checkout.", "You need certified gluten-free medical safety and the service does not clearly provide it.", "Gluten-free prepared meals, gluten-free meal kits, diet-filtered menus, and allergen-aware alternatives.", [["Green Chef review", "/reviews/green-chef/"], ["Methodology", "/methodology/"], ...commonLinks.slice(1, 3)]],
  ["deals", "deals/best-meal-delivery-deals", "best meal delivery deals", "Best Meal Delivery Deals", "Compare meal delivery deals by first-box discount, second-box risk, serving count, cancellation rules, and routine fit.", "The best meal delivery deal is the one you would still use after the first discount. Compare box two, delivery fees, skip rules, serving count, and whether the format matches your routine.", "People choosing a first order who want discount context without getting trapped by renewal pricing.", "You want a final live coupon guarantee without checking the merchant checkout.", "First-box discounts, multi-box offers, free-item promos, offer checks, and clearly disclosed partner links when available.", [["HelloFresh review", "/reviews/hellofresh/"], ["Factor review", "/reviews/factor/"], ["Gousto review", "/reviews/gousto/"], ["CookUnity review", "/reviews/cookunity/"]]],
  ["country", "countries/us/best-meal-delivery", "best meal delivery US", "Best Meal Delivery US", "Compare US meal delivery services by prepared meals, meal kits, cheap plans, high-protein options, and current deal risk.", "For US meal delivery, separate prepared meals from meal kits first. Then compare delivery coverage, meal count, first-box discount, box two cost, and whether a national pick actually fits your ZIP code.", "US buyers comparing national meal kits, prepared meals, budget boxes, and protein plans.", "You need a local city-only provider that is not listed yet.", "US prepared meals, US meal kits, cheap US meal delivery, and high-protein meal prep.", [["US cheap meal delivery", "/countries/us/cheap-meal-delivery/"], ["US meal deals", "/countries/us/meal-delivery-deals/"], ["Factor vs CookUnity", "/vs/factor-vs-cookunity/"], ["HelloFresh review", "/reviews/hellofresh/"]]],
  ["country", "countries/uk/best-meal-kits", "best meal kits UK", "Best Meal Kits UK", "Compare UK meal kits by recipe choice, family fit, budget, intro offers, delivery coverage, and prepared-meal alternatives.", "For UK meal kits, start with recipe choice and delivery coverage, then compare intro offer terms against the normal weekly price. If you do not want to cook, move to prepared meals instead.", "UK households comparing recipe boxes, healthy kits, family boxes, and budget kits.", "You want fully cooked meals rather than ingredients and recipes.", "UK recipe boxes, meal kits, family boxes, vegetarian kits, and budget kits.", [["HelloFresh vs Gousto", "/vs/hellofresh-vs-gousto/"], ["Gousto review", "/reviews/gousto/"], ["Best meal kits", "/best/meal-kits/"], ["Prepared meals", "/best/prepared-meal-delivery/"]]],
  ["country", "countries/canada/best-meal-delivery", "best meal delivery Canada", "Best Meal Delivery Canada", "Compare Canadian meal delivery by province availability, meal kits, prepared meals, price after discounts, and local alternatives.", "For Canada, province and postal-code coverage come before brand fame. Compare meal kits, prepared meals, regional services, recurring price, and whether the service actually delivers where you live.", "Canadian buyers comparing national services with regional prepared-meal options.", "You need a province-specific plan and the page has not yet verified that region.", "Canadian meal kits, prepared meals, regional services, and delivery-area checks.", commonLinks],
  ["country", "countries/australia/best-meal-delivery", "best meal delivery Australia", "Best Meal Delivery Australia", "Compare Australian meal delivery services by ready meals, meal kits, high-protein plans, budget options, and state coverage.", "Australian meal delivery searches split between ready meals, meal kits, and fitness meal prep. Compare state delivery coverage, freshness, macros, price after discounts, and whether the service solves cooking or no-cook convenience.", "Australian buyers choosing between ready meals, meal kits, and high-protein prepared plans.", "You need a postcode-specific verdict that has not been checked at checkout.", "Australian prepared meals, budget meal kits, high-protein meals, and ready-made dinners.", [["Prepared meals", "/best/prepared-meal-delivery/"], ["High protein delivery", "/best/high-protein-meal-delivery/"], ["Deals", "/deals/best-meal-delivery-deals/"]]],
  ["country", "countries/ireland/best-meal-delivery", "best meal delivery Ireland", "Best Meal Delivery Ireland", "Compare Ireland meal delivery by prepared meals, meal kits, local delivery coverage, budget, and offer caveats.", "For Ireland, local delivery proof matters more than global brand fame. Start with services that actually deliver in your area, then compare prepared meals, meal kits, price after discounts, and cancellation rules.", "Irish buyers who need a local availability map before comparing brands.", "You want a final Dublin-only or nationwide verdict without checking the provider directly.", "Ireland prepared meals, meal kits, healthy meal delivery, and local delivery checks.", commonLinks],
  ["country", "countries/new-zealand/best-meal-delivery", "best meal delivery New Zealand", "Best Meal Delivery New Zealand", "Compare New Zealand meal delivery by local meal kits, prepared meals, grocery shortcuts, budget, and delivery coverage.", "For New Zealand, local coverage and delivery frequency should decide the first shortlist. Compare meal kits, prepared meals, budget boxes, delivery area, and recurring price after any welcome offer.", "New Zealand buyers comparing local meal kits and prepared options.", "You need a final city-specific delivery promise that has not been checked on the provider site.", "New Zealand meal kits, prepared meals, budget boxes, and local delivery checks.", [["Best meal kits", "/best/meal-kits/"], ["Cheap meal delivery", "/best/cheap-meal-delivery/"], ["Deals", "/deals/best-meal-delivery-deals/"]]],
  ["comparison", "vs/hellofresh-vs-gousto", "HelloFresh vs Gousto", "HelloFresh vs Gousto", "Compare HelloFresh vs Gousto by UK recipe choice, family fit, price after discounts, prep time, and cancellation risk.", "HelloFresh vs Gousto is mainly a meal-kit decision: choose by recipe range, delivery coverage, family fit, prep time, and what the box costs after the welcome offer.", "UK meal-kit buyers choosing between two mainstream recipe-box options.", "You want prepared meals or no-cook dinners instead of cooking.", "Brand-vs-brand meal-kit comparison.", [["Best meal kits UK", "/countries/uk/best-meal-kits/"], ["HelloFresh review", "/reviews/hellofresh/"], ["Gousto review", "/reviews/gousto/"], ["Best meal kits", "/best/meal-kits/"]]],
  ["comparison", "vs/factor-vs-cookunity", "Factor vs CookUnity", "Factor vs CookUnity", "Compare Factor vs CookUnity for prepared meals, chef-made variety, protein fit, price after discounts, and delivery coverage.", "Factor vs CookUnity is a prepared-meal comparison: Factor is the safer high-protein routine check, while CookUnity is stronger when chef-made variety and taste are the deciding factors.", "No-cook buyers comparing prepared meals rather than meal kits.", "You mainly want budget meal kits or family cooking boxes.", "Brand-vs-brand prepared meal comparison.", [["Prepared meal delivery", "/best/prepared-meal-delivery/"], ["Factor review", "/reviews/factor/"], ["CookUnity review", "/reviews/cookunity/"], ["High protein delivery", "/best/high-protein-meal-delivery/"]]],
  ["comparison", "vs/everyplate-vs-dinnerly", "EveryPlate vs Dinnerly", "EveryPlate vs Dinnerly", "Compare EveryPlate vs Dinnerly for cheap meal kits, price per serving, recipe simplicity, family fit, and offer caveats.", "EveryPlate vs Dinnerly is a budget meal-kit comparison. Choose by normal weekly cost, recipe simplicity, serving size, delivery coverage, and whether the intro offer still looks useful after box one.", "Budget meal-kit shoppers comparing the cheapest sensible cook-yourself options.", "You want no-cook prepared meals or premium recipe variety.", "Brand-vs-brand cheap meal-kit comparison.", [["Cheapest meal delivery", "/best/cheap-meal-delivery/"], ["EveryPlate review", "/reviews/everyplate/"], ["Dinnerly review", "/reviews/dinnerly/"], ["Budget meal kits", "/best/budget-meal-kits/"]]],
  ...["Factor", "HelloFresh", "Gousto", "CookUnity", "EveryPlate", "Dinnerly", "Green Chef", "Purple Carrot"].map((brand) => ["review", `reviews/${slugify(brand)}`, `${brand} review`, `${brand} Review`, `${brand} review with meal format, best-fit buyer, alternatives, offer caveats, source notes, and affiliate route status.`, `${brand} is worth comparing only if its meal format, delivery area, current offer, and recurring price fit your week. This page does not claim hands-on testing unless a real test is documented.`, `${brand} shoppers who want a quick fit check before clicking an offer route.`, "You need a final price, guaranteed availability, or hands-on rating without checking the provider directly.", "Source-led brand review, alternatives, offer caveats, and route status.", commonLinks]),
].map((row, index) => ({
  priority: index + 1,
  type: row[0],
  path: row[1],
  keyword: row[2],
  h1: row[3],
  title: row[3],
  description: row[4],
  quick: row[5],
  bestFor: row[6],
  avoidIf: row[7],
  format: row[8],
  nextLinks: row[9],
}));

function slugify(value) {
  return String(value).toLowerCase().replace(/&/g, "and").normalize("NFKD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
}

function attr(value) {
  return escapeHtml(value).replaceAll("\n", " ");
}

function canonicalFor(target) {
  return `${siteUrl}/${target.path}/`;
}

function replaceOrInsertHeadTag(html, pattern, replacement) {
  if (pattern.test(html)) return html.replace(pattern, replacement);
  return html.replace("</head>", `    ${replacement}\n  </head>`);
}

function quickAnswerBlock(target) {
  return `<section class="quick-answer"><div><h2>Quick answer</h2><p>${escapeHtml(target.quick)}</p></div></section>`;
}

function fastRankBlock(target) {
  const links = target.nextLinks.map(([label, href]) => `<a href="${attr(href)}">${escapeHtml(label)}</a>`).join("");
  const rows = [
    ["Meal format", target.format],
    ["Best for", target.bestFor],
    ["Avoid if", target.avoidIf],
    ["Price check", "Compare the first order against box two, delivery fees, serving count, skip rules, and cancellation rules."],
    ["Reality check", "Offers and prices can change. Confirm the latest total, delivery area, and subscription terms before ordering."],
  ];

  return `<!-- fast-rank:start -->
      <section class="fast-rank-panel" id="fast-rank-intent">
        <div class="section-heading">
          <span class="eyebrow">Fast-rank target</span>
          <h2>Answer for "${escapeHtml(target.keyword)}"</h2>
          <p>${escapeHtml(target.quick)}</p>
        </div>
        <div class="fast-rank-grid">
          <article><span>Best for</span><h3>${escapeHtml(target.bestFor)}</h3><p>Use this page when the query matches the buyer's format, country, and routine.</p></article>
          <article><span>Avoid if</span><h3>${escapeHtml(target.avoidIf)}</h3><p>Move the reader to a better-fit page instead of forcing the wrong recommendation.</p></article>
          <article><span>Format lane</span><h3>${escapeHtml(target.format)}</h3><p>Rank by the actual dinner problem first, then use deals and affiliate routes as secondary signals.</p></article>
        </div>
        <div class="table-wrap fast-rank-table"><table><thead><tr><th>Decision point</th><th>How this page should answer it</th></tr></thead><tbody>${rows.map(([label, copy]) => `<tr><td>${escapeHtml(label)}</td><td>${escapeHtml(copy)}</td></tr>`).join("")}</tbody></table></div>
        <div class="fast-rank-links" aria-label="Best next internal links">${links}</div>
        <div class="fast-rank-faq">
          <article><h3>What should I check first?</h3><p>Check meal format and delivery coverage first. A famous brand is not useful if it does not deliver locally or solves the wrong dinner problem.</p></article>
          <article><h3>How should I compare deals?</h3><p>Compare the recurring price after the introductory offer, not just the largest first-box headline discount.</p></article>
          <article><h3>Are these affiliate rankings?</h3><p>Affiliate links may exist, but this page should not claim partner approval, testing, prices, or revenue unless dashboard evidence confirms it.</p></article>
        </div>
      </section>
      <!-- fast-rank:end -->`;
}

function applyTarget(html, target) {
  const title = `${target.title} | Every Meal Guide`;
  html = replaceOrInsertHeadTag(html, /<title>[\s\S]*?<\/title>/, `<title>${escapeHtml(title)}</title>`);
  html = replaceOrInsertHeadTag(html, /<meta name="description" content="[^"]*"\s*\/?>/, `<meta name="description" content="${attr(target.description)}" />`);
  html = replaceOrInsertHeadTag(html, /<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${attr(canonicalFor(target))}" />`);
  html = replaceOrInsertHeadTag(html, /<meta property="og:title" content="[^"]*"\s*\/?>/, `<meta property="og:title" content="${attr(title)}" />`);
  html = replaceOrInsertHeadTag(html, /<meta property="og:description" content="[^"]*"\s*\/?>/, `<meta property="og:description" content="${attr(target.description)}" />`);
  html = replaceOrInsertHeadTag(html, /<meta property="og:url" content="[^"]*"\s*\/?>/, `<meta property="og:url" content="${attr(canonicalFor(target))}" />`);
  html = /<body\b[^>]*data-page-type=/.test(html)
    ? html.replace(/(<body\b[^>]*data-page-type=")[^"]*(")/, `$1${attr(target.type)}$2`)
    : html.replace(/<body\b([^>]*)>/, `<body$1 data-page-type="${attr(target.type)}">`);
  html = html.replace(/<h1[^>]*>[\s\S]*?<\/h1>/, `<h1>${escapeHtml(target.h1)}</h1>`);

  html = html.replace(/<!-- fast-rank:start -->[\s\S]*?<!-- fast-rank:end -->\s*/g, "");
  const quickPattern = /<section class="quick-answer">[\s\S]*?<\/section>/;
  const replacement = `${quickAnswerBlock(target)}\n      ${fastRankBlock(target)}`;
  if (quickPattern.test(html)) return html.replace(quickPattern, replacement);
  return html.replace(/\n\s*<\/main>/, `\n      ${replacement}\n    </main>`);
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filePath, rows) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, `${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`, "utf8");
}

function updateScorecard(updatedCount) {
  const scorecardPath = path.join(root, "seo", "seven-day-scorecard-2026-06-24.csv");
  if (!fs.existsSync(scorecardPath)) return;
  const lines = fs.readFileSync(scorecardPath, "utf8").trimEnd().split(/\r?\n/);
  const header = lines[0].split(",").map((cell) => cell.replace(/^"|"$/g, ""));
  const pagesIndex = header.indexOf("pages_polished");
  const notesIndex = header.indexOf("notes");
  const updatedLines = lines.map((line, index) => {
    if (index === 0 || !line.startsWith(`"${today}"`)) return line;
    const cells = line.split(",");
    cells[pagesIndex] = `"${updatedCount}"`;
    cells[notesIndex] = `"Fast-rank implementation applied locally to ${updatedCount} priority pages. No deploy or indexing request made."`;
    return cells.join(",");
  });
  fs.writeFileSync(scorecardPath, `${updatedLines.join("\n")}\n`, "utf8");
}

function updateDailyNote(updatedCount, missingCount) {
  const dailyPath = path.join(root, "daily", "2026-06-24.md");
  if (!fs.existsSync(dailyPath)) return;
  const addition = `Fast-rank implementation:

- Applied local fast-rank SEO upgrades to ${updatedCount} priority pages.
- Missing target files: ${missingCount}.
- Created \`seo/fast-rank-indexing-queue-2026-06-24.csv\`.
- Created \`reports/fast-rank-seo-implementation.md\`.
- No deployment, live Search Console indexing request, paid API, or affiliate redirect change was made.
`;
  let text = fs.readFileSync(dailyPath, "utf8");
  text = text.replace(/Fast-rank implementation:[\s\S]*$/g, "").trimEnd();
  fs.writeFileSync(dailyPath, `${text}\n\n${addition}`, "utf8");
}

const applied = [];
const missing = [];

for (const target of targets) {
  const filePath = path.join(root, target.path, "index.html");
  if (!fs.existsSync(filePath)) {
    missing.push(target);
    continue;
  }
  fs.writeFileSync(filePath, applyTarget(fs.readFileSync(filePath, "utf8"), target), "utf8");
  applied.push(target);
}

writeCsv(path.join(root, "seo", "fast-rank-indexing-queue-2026-06-24.csv"), [
  ["priority", "page_type", "target_keyword", "url", "local_path", "deploy_status", "gsc_action", "status", "notes"],
  ...targets.map((target) => [
    target.priority,
    target.type,
    target.keyword,
    canonicalFor(target),
    `${target.path}/index.html`,
    "local_only_not_deployed",
    target.priority <= 10 ? "inspect_after_deploy_then_request_indexing_if_clean" : "inspect_after_top_10",
    applied.includes(target) ? "fast_rank_polished_local" : "missing_file",
    target.type === "review" ? "No fake testing or rating claims; keep source-led." : "Fast long-tail target.",
  ]),
]);

const report = {
  generatedAt: new Date().toISOString(),
  strategy: "fast long-tail first",
  pagesTargeted: targets.length,
  pagesUpdated: applied.length,
  missing: missing.map((target) => target.path),
  noLiveActions: ["no deploy", "no Search Console indexing request", "no affiliate redirect swap", "no paid API"],
  firstTenIndexingCandidates: targets.slice(0, 10).map(canonicalFor),
};

fs.mkdirSync(path.join(root, "reports"), { recursive: true });
fs.writeFileSync(path.join(root, "reports", "fast-rank-seo-implementation.json"), JSON.stringify(report, null, 2), "utf8");
fs.writeFileSync(path.join(root, "reports", "fast-rank-seo-implementation.md"), `# Fast-Rank SEO Implementation - 2026-06-24

- Strategy: fast long-tail first.
- Pages targeted: ${report.pagesTargeted}
- Pages updated locally: ${report.pagesUpdated}
- Missing target files: ${report.missing.length}
- Deployment: not performed.
- Search Console indexing requests: not performed.
- Affiliate redirect swaps: not performed.
- Paid APIs or broad crawls: not used.

## First 10 URLs to inspect after deploy

${report.firstTenIndexingCandidates.map((url, index) => `${index + 1}. ${url}`).join("\n")}

## Missing files

${report.missing.length ? report.missing.map((item) => `- ${item}`).join("\n") : "- None"}
`, "utf8");

updateScorecard(applied.length);
updateDailyNote(applied.length, missing.length);

console.log(JSON.stringify(report, null, 2));
