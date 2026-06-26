import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const sourcePath = path.join(root, "seo", "global-brand-universe.csv");
const goRoot = path.join(root, "go");
const queuePath = path.join(root, "seo", "affiliate-application-master-queue.csv");
const approvedLinksPath = path.join(root, "APPROVED_AFFILIATE_LINKS.json");
const approvedRouteMapPath = path.join(root, "seo", "approved-affiliate-route-map.csv");

function parseCsv(csvText) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const next = csvText[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field);
      field = "";
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      continue;
    }

    field += char;
  }

  row.push(field);
  if (row.some((cell) => cell.trim())) rows.push(row);

  const headers = rows.shift()?.map((header) => header.trim()) || [];

  return rows.map((cells) =>
    headers.reduce((entry, header, index) => {
      entry[header] = (cells[index] || "").trim();
      return entry;
    }, {})
  );
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function publicText(value) {
  return String(value ?? "")
    .replace(/cash route ready/gi, "check current offer")
    .replace(/trackable internal route/gi, "offer check")
    .replace(/automatic partner redirect/gi, "current offer link")
    .replace(/automatic offer check/gi, "current offer check")
    .replace(/owner-approved tracking URL/gi, "approved offer link")
    .replace(/affiliate program approves/gi, "offer details are confirmed")
    .replace(/partner redirect/gi, "current offer link")
    .replace(/partner route/gi, "offer check")
    .replace(/tracked route/gi, "offer check")
    .replace(/cash route/gi, "offer check")
    .replace(/money route/gi, "offer check")
    .replace(/affiliate approval pending/gi, "offer check in progress")
    .replace(/legacy prepared meals/gi, "prepared meals")
    .replace(/legacy meal kit/gi, "meal kit")
    .replace(/partner approval is pending/gi, "current offer is being checked")
    .replace(/approved affiliate URLs/gi, "current offer links")
    .replace(/partner readiness/gi, "availability notes")
    .replace(/partnership readiness/gi, "availability notes")
    .replace(/commercially ready/gi, "ready to compare")
    .replace(/monetization path/gi, "what to check");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function priorityScore(row) {
  const priority = Number.parseInt(row.priority || "999", 10);
  const countryWeight = {
    US: 0,
    UK: 1,
    Australia: 2,
    Canada: 3,
    Ireland: 4,
    Global: 5,
  }[row.country] ?? 6;

  return priority * 10 + countryWeight;
}

function categoryCompareUrl(categories) {
  const value = String(categories || "").toLowerCase();

  if (value.includes("prepared") || value.includes("ready")) return "/best/prepared-meal-delivery/";
  if (value.includes("meal kit") || value.includes("recipe")) return "/best/meal-kits/";
  if (value.includes("protein") || value.includes("fitness") || value.includes("meal prep")) return "/best/high-protein-meal-delivery/";
  if (value.includes("frozen")) return "/best/frozen-meal-delivery/";
  if (value.includes("diet") || value.includes("medical")) return "/best/meal-delivery-for-weight-loss/";
  if (value.includes("plant") || value.includes("vegan") || value.includes("vegetarian")) return "/best/vegan-meal-delivery/";
  if (value.includes("kids") || value.includes("baby") || value.includes("family")) return "/best/family-meal-delivery/";
  return "/best/meal-delivery-services/";
}

function approvedLinkMap() {
  if (!fs.existsSync(approvedLinksPath)) return new Map();

  const store = JSON.parse(fs.readFileSync(approvedLinksPath, "utf8"));
  const links = Array.isArray(store.links) ? store.links : [];
  const map = new Map();

  for (const [index, link] of links.entries()) {
    const label = `APPROVED_AFFILIATE_LINKS.json links[${index}]`;
    const required = ["brand", "url", "country", "destinationType", "sourceNetwork", "approvalDate"];

    for (const field of required) {
      if (!String(link[field] || "").trim()) {
        throw new Error(`${label} missing required field: ${field}`);
      }
    }

    if (link.ownerConfirmation !== true) {
      throw new Error(`${label} must set ownerConfirmation: true before activation`);
    }

    if (!/^https:\/\//i.test(link.url)) {
      throw new Error(`${label} url must be https`);
    }

    const brandSlug = slugify(link.brand);
    const existing = map.get(brandSlug);

    if (!existing || String(link.approvalDate) > String(existing.approvalDate)) {
      map.set(brandSlug, link);
    }
  }

  return map;
}

function approvedPrimaryLink({ safeBrand, officialUrl, approvedLink }) {
  if (approvedLink) {
    return `<a class="button primary" data-track="affiliate-click" data-brand="${safeBrand}" data-affiliate-status="approved" href="${escapeHtml(approvedLink.url)}" rel="sponsored nofollow noopener">Check current offer</a>`;
  }

  if (/^https?:\/\//i.test(officialUrl || "")) {
    return `<a class="button primary" data-track="affiliate-click" data-brand="${safeBrand}" data-affiliate-status="not-approved" href="${escapeHtml(officialUrl)}" rel="nofollow noopener">Check official site</a>`;
  }

  return "";
}

function routeTemplate({ brand, slug, status, countries, categories, marketRole, officialUrl, approvedLink }) {
  const safeBrand = escapeHtml(brand);
  const safeCountries = escapeHtml(countries || "Multiple markets");
  const safeCategories = escapeHtml(categories || "Meal delivery");
  const safeFitNote = /legacy|inactive|closed|historical/i.test(marketRole || "")
    ? "Confirm current availability before relying on older reviews or deals."
    : "Compare delivery area, menu style, price, and cancellation terms before ordering.";
  const safeReviewUrl = `/reviews/${escapeHtml(slug)}/`;
  const safeCompareUrl = escapeHtml(categoryCompareUrl(categories));
  const primaryLink = approvedPrimaryLink({ safeBrand, officialUrl, approvedLink });
  const officialSecondaryLink = approvedLink && /^https?:\/\//i.test(officialUrl || "")
    ? `<a class="button secondary" href="${escapeHtml(officialUrl)}" rel="nofollow noopener">Official site</a>`
    : "";
  const affiliationCopy = approvedLink
    ? `Every Meal Guide may earn a commission from this approved ${safeBrand} partner link. We still prioritize fit, availability, price, and terms before deals.`
    : `Every Meal Guide may earn a commission from some partner links. We do not claim affiliation with ${safeBrand} unless it is clearly stated on this page.`;
  const trustAffiliationCopy = approvedLink
    ? `Approved partner link active. Offer terms can still change, so confirm price, delivery, and subscription details before ordering.`
    : `Not affiliated unless stated. We clearly label partner links and still recommend based on fit, availability, and transparent terms.`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex,follow" />
    <title>${safeBrand} Offer Check | Every Meal Guide</title>
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body data-page-type="offer-check" data-partner-brand="${safeBrand}">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="/"><span class="brand-mark">EM</span><span>Every Meal Guide</span></a>
      <nav class="main-nav" aria-label="Primary navigation">
        <a href="/best/meal-delivery-services/">Best</a>
        <a href="/vs/hellofresh-vs-gousto/">Compare</a>
        <a href="/reviews/factor/">Reviews</a>
        <a href="/deals/best-meal-delivery-deals/">Deals</a>
        <a href="/countries/">Countries</a>
      </nav>
      <a class="nav-action" href="/#matcher">Find My Best Match</a>
    </header>
    <main class="money-page" id="main">
      <section class="affiliate-disclosure"><p>${affiliationCopy}</p></section>
      <section class="page-hero compact">
        <div>
          <span class="page-kicker">Before you click</span>
          <h1>${safeBrand} Offer Check</h1>
          <p>Use this page as a quick buying checkpoint before leaving Every Meal Guide. The best deal is only useful if the service fits your address, routine, budget, and cancellation comfort.</p>
        </div>
        <div class="partner-hold">
          <span>Check current offer terms</span>
          <p>Meal delivery offers change often. Before ordering, confirm delivery area, current menu, normal price after discounts, and cancellation rules.</p>
          <dl class="partner-route-facts">
            <div><dt>Markets</dt><dd>${safeCountries}</dd></div>
            <div><dt>Type</dt><dd>${safeCategories}</dd></div>
            <div><dt>Fit check</dt><dd>${escapeHtml(safeFitNote)}</dd></div>
            <div><dt>Before buying</dt><dd>Confirm delivery area, menu, full price, and cancellation rules.</dd></div>
          </dl>
          <div>
            ${primaryLink}
            <a class="button secondary" href="${safeReviewUrl}">Read ${safeBrand} review</a>
            <a class="button secondary" href="${safeCompareUrl}">Compare similar services</a>
            ${officialSecondaryLink}
            <a class="button secondary" href="/affiliate-disclosure/">How partner links work</a>
          </div>
        </div>
      </section>
      <section class="review-verdict-strip" aria-label="${safeBrand} offer decision guide">
        <article>
          <span>Continue if</span>
          <strong>${safeBrand} fits the job</strong>
          <p>Click through when the service appears to match your country, meal format, diet needs, and weekly routine.</p>
        </article>
        <article>
          <span>Compare first if</span>
          <strong>You are unsure on format</strong>
          <p>If you are choosing between no-cook prepared meals, cook-yourself kits, family boxes, frozen meals, or high-protein prep, compare similar services before opening an offer.</p>
        </article>
        <article>
          <span>Skip for now if</span>
          <strong>The terms are unclear</strong>
          <p>Do not order until you can confirm delivery area, normal recurring price, minimum order, skip rules, and cancellation timing.</p>
        </article>
      </section>
      <section class="quick-answer route-section">
        <div>
          <h2>Quick answer</h2>
          <p>Only click through if ${safeBrand} serves your area, matches the way you want to eat, and still looks fair after the first-order discount ends. If any of those are uncertain, compare similar services first.</p>
        </div>
      </section>
      <section class="buying-checklist">
        <h2>Four checks before ordering</h2>
        <ol>
          <li><span>1. Delivery area</span><p>Confirm your postcode, ZIP code, or region before trusting any national ranking.</p></li>
          <li><span>2. Real weekly price</span><p>Check the normal price after intro offers, delivery fees, serving count, and minimum order.</p></li>
          <li><span>3. Meal fit</span><p>Make sure the service matches your routine: heat-and-eat, cook-yourself, high-protein, diet, frozen, family, or grocery-style help.</p></li>
          <li><span>4. Subscription rules</span><p>Look for skip, pause, cancellation, delivery-window, and refund terms before paying.</p></li>
        </ol>
      </section>
      <section class="source-notes">
        <h2>Trust note</h2>
        <div>
          <article><span>Affiliation</span><p>${trustAffiliationCopy}</p></article>
          <article><span>Recommendation standard</span><p>We prioritize fit, availability, source checks, and transparent terms before any deal or commission.</p></article>
        </div>
      </section>
    </main>
    <footer class="footer">
      <p>Every Meal Guide</p>
      <nav aria-label="Footer navigation">
        <a href="/best/meal-delivery-services/">Best</a>
        <a href="/vs/hellofresh-vs-gousto/">Compare</a>
        <a href="/reviews/factor/">Reviews</a>
        <a href="/deals/best-meal-delivery-deals/">Deals</a>
        <a href="/meal-delivery-comparisons/">All Comparisons</a>
        <a href="/latest-offer-checks/">Offer Checks</a>
        <a href="/methodology/">Methodology</a>
        <a href="/affiliate-disclosure/">Affiliate Disclosure</a>
        <a href="/company-accountability/">Company Accountability</a>
        <a href="/privacy/">Privacy</a>
        <a href="/contact/">Contact</a>
      </nav>
      <p>Affiliate links may earn us a commission. Rankings are editorial and deal-aware.</p>
    </footer>
    <script src="/script.js"></script>
  </body>
</html>
`;
}

if (!fs.existsSync(sourcePath)) {
  throw new Error(`Missing brand universe: ${sourcePath}`);
}

fs.mkdirSync(goRoot, { recursive: true });

const rows = parseCsv(fs.readFileSync(sourcePath, "utf8")).filter((row) => row.brand);
const byBrand = new Map();
const approvedLinks = approvedLinkMap();

for (const row of rows) {
  const slug = slugify(row.brand);
  if (!slug) continue;

  const current = byBrand.get(slug) || {
    slug,
    brand: row.brand,
    countries: new Set(),
    categories: new Set(),
    marketRoles: new Set(),
    officialUrl: row.official_url,
    affiliateTarget: row.affiliate_program_target,
    nextAction: row.next_action,
    bestPriority: Number.POSITIVE_INFINITY,
  };

  current.countries.add(row.country);
  current.categories.add(row.category);
  if (row.market_role) current.marketRoles.add(row.market_role);
  if (!current.officialUrl && row.official_url) current.officialUrl = row.official_url;
  if (!current.affiliateTarget && row.affiliate_program_target) current.affiliateTarget = row.affiliate_program_target;
  if (!current.nextAction && row.next_action) current.nextAction = row.next_action;
  current.bestPriority = Math.min(current.bestPriority, priorityScore(row));

  byBrand.set(slug, current);
}

let generated = 0;
let existing = 0;
let approvedRoutes = 0;
const approvedRouteMapRows = [
  ["brand", "route", "approved_url", "country", "destination_type", "source_network", "approval_date"],
];

for (const brand of byBrand.values()) {
  const routeDir = path.join(goRoot, brand.slug);
  const routePath = path.join(routeDir, "index.html");
  const approvedLink = approvedLinks.get(brand.slug);

  if (fs.existsSync(routePath)) existing += 1;
  fs.mkdirSync(routeDir, { recursive: true });
  fs.writeFileSync(
    routePath,
    routeTemplate({
      brand: brand.brand,
      status: brand.affiliateTarget || "apply",
      countries: [...brand.countries].sort().join(", "),
      categories: [...brand.categories].sort().join(", "),
      marketRole: [...brand.marketRoles].sort().slice(0, 3).join(", "),
      officialUrl: brand.officialUrl,
      approvedLink,
    })
  );
  generated += 1;

  if (approvedLink) {
    approvedRoutes += 1;
    approvedRouteMapRows.push([
      brand.brand,
      `/go/${brand.slug}/`,
      approvedLink.url,
      approvedLink.country,
      approvedLink.destinationType,
      approvedLink.sourceNetwork,
      approvedLink.approvalDate,
    ]);
  }
}

const queueHeaders = [
  "priority_rank",
  "brand",
  "route",
  "countries",
  "categories",
  "market_roles",
  "official_url",
  "affiliate_target",
  "next_action",
  "cash_status",
];

const queueRows = [...byBrand.values()]
  .sort((a, b) => a.bestPriority - b.bestPriority || a.brand.localeCompare(b.brand))
  .map((brand, index) => [
    index + 1,
    brand.brand,
    `/go/${brand.slug}/`,
    [...brand.countries].sort().join("; "),
    [...brand.categories].sort().join("; "),
    [...brand.marketRoles].sort().join("; "),
    brand.officialUrl || "",
    brand.affiliateTarget || "",
    brand.nextAction || "Apply to affiliate program and swap approved URL after acceptance.",
    "route_ready_affiliate_pending",
  ]);

fs.writeFileSync(
  queuePath,
  [queueHeaders, ...queueRows].map((row) => row.map(csvEscape).join(",")).join("\n") + "\n"
);

fs.writeFileSync(
  approvedRouteMapPath,
  approvedRouteMapRows.map((row) => row.map(csvEscape).join(",")).join("\n") + "\n"
);

console.log(
  JSON.stringify(
    {
      uniqueBrands: byBrand.size,
      generatedRoutes: generated,
      existingRoutes: existing,
      approvedRoutes,
      queuePath,
      approvedRouteMapPath,
    },
    null,
    2
  )
);
