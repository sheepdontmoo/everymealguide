import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const reviewsRoot = path.join(root, "reviews");
const sitemapPath = path.join(root, "sitemap.xml");
const reportPath = path.join(root, "reports", "brand-review-coverage-generation.json");

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

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function categoryFormat(category) {
  const value = String(category || "").toLowerCase();

  if (value.includes("meal kit") || value.includes("recipe kit") || value.includes("starter kit")) return "Meal kit you cook yourself";
  if (value.includes("protein") || value.includes("fitness")) return "High-protein or fitness meals";
  if (value.includes("plant") || value.includes("vegan") || value.includes("vegetarian")) return "Plant-based meals";
  if (value.includes("diet") || value.includes("medical")) return "Diet or specialist meals";
  if (value.includes("kid") || value.includes("baby")) return "Kids or baby meals";
  if (value.includes("frozen")) return "Frozen meals";
  if (value.includes("prepared") || value.includes("ready") || value.includes("smoothie")) return "Prepared heat-and-eat meals";
  if (value.includes("grocery") || value.includes("produce")) return "Grocery or produce dinner box";

  return category || "Meal delivery company";
}

function joinForSentence(values) {
  if (values.length === 0) return "markets we are still checking";
  if (values.length === 1) return values[0];
  return `${values.slice(0, -1).join(", ")} and ${values.at(-1)}`;
}

function officialSourceLink(rows) {
  const official = rows.find((row) => /^https?:\/\//i.test(row.official_url || ""))?.official_url;

  if (!official) {
    return `<span>Official source pending manual verification</span>`;
  }

  return `<a href="${escapeHtml(official)}" rel="nofollow">Official site source</a>`;
}

function pageTemplate({ brand, slug, rows, alternatives }) {
  const countries = unique(rows.map((row) => row.country)).sort();
  const categories = unique(rows.map((row) => row.category)).sort();
  const formats = unique(categories.map(categoryFormat)).sort();
  const marketRoles = unique(rows.map((row) => row.market_role)).sort();
  const evidenceStatuses = unique(rows.map((row) => row.evidence_status || row.site_status)).sort();
  const nextActions = unique(rows.map((row) => row.next_action)).slice(0, 4);
  const primaryFormat = formats[0] || "Meal delivery company";
  const primaryCountry = countries[0] || "";
  const countryHref = primaryCountry ? `/countries/${slugify(primaryCountry === "UK" ? "uk" : primaryCountry)}/best-meal-delivery/` : "/best/meal-delivery-services/";
  const countryLabel = primaryCountry || "your country";
  const partnerRoute = `/go/${slug}/`;
  const title = `${brand} Review, Alternatives, and Deals | Every Meal Guide`;
  const description = `Check what ${brand} is, where it fits, meal type, country coverage, alternatives, and current offer notes before choosing a meal delivery service.`;
  const altRows = alternatives
    .slice(0, 5)
    .map(
      (alt) => `<tr><td><a href="/reviews/${escapeHtml(alt.slug)}/">${escapeHtml(alt.brand)}</a></td><td>${escapeHtml(alt.country)}</td><td>${escapeHtml(categoryFormat(alt.category))}</td><td><a data-track="affiliate-click" data-brand="${escapeHtml(alt.brand)}" data-affiliate-status="apply" href="/go/${escapeHtml(alt.slug)}/" rel="sponsored nofollow">Check current offer</a></td></tr>`
    )
    .join("");

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <link rel="canonical" href="https://www.everymealguide.com/reviews/${escapeHtml(slug)}/" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://www.everymealguide.com/reviews/${escapeHtml(slug)}/" />
    <meta name="theme-color" content="#d8412f" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/styles.css" />
    <script type="application/ld+json">{
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebPage",
          "name": "${escapeHtml(title)}",
          "description": "${escapeHtml(description)}",
          "url": "https://www.everymealguide.com/reviews/${escapeHtml(slug)}/",
          "publisher": {
            "@type": "Organization",
            "name": "Every Meal Guide",
            "url": "https://www.everymealguide.com"
          }
        },
        {
          "@type": "BreadcrumbList",
          "itemListElement": [
            {"@type": "ListItem", "position": 1, "name": "Every Meal Guide", "item": "https://www.everymealguide.com/"},
            {"@type": "ListItem", "position": 2, "name": "Reviews", "item": "https://www.everymealguide.com/reviews/"},
            {"@type": "ListItem", "position": 3, "name": "${escapeHtml(brand)}", "item": "https://www.everymealguide.com/reviews/${escapeHtml(slug)}/"}
          ]
        }
      ]
    }</script>
  </head>
  <body data-page-type="review">
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
      <section class="affiliate-disclosure"><p>Every Meal Guide may earn a commission when you click partner links. This page does not claim a hands-on product test unless we clearly say so.</p></section>
      <section class="freshness-bar"><p><span>Last updated</span>June 24, 2026</p><p>Brand reviews are built to answer one buying question fast: should you choose this service, compare alternatives, or skip it for your situation?</p></section>
      <section class="page-hero compact">
        <div>
          <span class="page-kicker">Review verdict</span>
          <h1>${escapeHtml(brand)} Review and Alternatives</h1>
          <p>${escapeHtml(brand)} is listed in Every Meal Guide as ${escapeHtml(primaryFormat)} across ${escapeHtml(joinForSentence(countries))}. Use this page to check fit, alternatives, delivery availability, and deal notes.</p>
        </div>
        <aside class="hero-verdict-card">
          <span>60-second verdict</span>
          <strong>Check fit before chasing a deal</strong>
          <p>Meal format, country coverage, and cancellation rules matter more than the biggest first-order headline.</p>
          <a data-track="affiliate-click" data-brand="${escapeHtml(brand)}" data-affiliate-status="apply" href="${escapeHtml(partnerRoute)}" rel="sponsored nofollow">Check current offer</a>
        </aside>
      </section>
      <section class="review-verdict-strip" aria-label="${escapeHtml(brand)} quick verdict">
        <article>
          <span>Choose ${escapeHtml(brand)} if</span>
          <strong>You want ${escapeHtml(primaryFormat.toLowerCase())}</strong>
          <p>It belongs on your shortlist when this format matches your routine and the service actually delivers in your area.</p>
        </article>
        <article>
          <span>Skip it if</span>
          <strong>The format is wrong</strong>
          <p>Do not use a first-order deal to justify the wrong type of service. Meal kits, prepared meals, diet plans, and frozen options solve different problems.</p>
        </article>
        <article>
          <span>Compare first if</span>
          <strong>You are unsure</strong>
          <p>Open similar brands below before ordering. The better choice may be cheaper, more local, faster, or easier to pause.</p>
        </article>
      </section>
      <section class="review-proof-grid" aria-label="Review trust proof">
        <article>
          <span>Meal format</span>
          <strong>${escapeHtml(primaryFormat)}</strong>
          <p>${escapeHtml(brand)} is classified by meal format, so meal kits, prepared meals, diet plans, frozen meals, kids food, and grocery shortcuts stay separated.</p>
        </article>
        <article>
          <span>Market coverage</span>
          <strong>${escapeHtml(countries.slice(0, 3).join(" / ") || "Checking")}</strong>
          <p>Coverage is based on listed markets and source checks. Regional delivery, postcode checks, and current menu depth should still be confirmed before ordering.</p>
        </article>
        <article>
          <span>Offer check</span>
          <strong>Offer notes</strong>
          <p>Use this page to compare ${escapeHtml(brand)} against current offer notes, availability checks, and better-fit alternatives before ordering.</p>
        </article>
      </section>
      <section class="quick-answer"><div><h2>Quick answer</h2><p>${escapeHtml(brand)} should be compared as ${escapeHtml(primaryFormat)}. Before ordering, check delivery coverage, ongoing price after any first-order deal, meal format, skip/cancel rules, and whether a better-fit alternative exists in your country.</p></div></section>
      <section class="route-section">
        <div class="section-heading">
          <span>Faster decision</span>
          <h2>What should you compare against ${escapeHtml(brand)}?</h2>
          <p>Do not stop at one brand page. Pick the route that matches how you actually want to eat, then compare current offers only after the fit is clear.</p>
        </div>
        <div class="review-proof-grid">
          <article>
            <span>If you want no cooking</span>
            <strong>Prepared meals</strong>
            <p>Use heat-and-eat meals if time, cleanup, and convenience matter more than cooking from scratch.</p>
            <a href="/best/prepared-meal-delivery/">Compare prepared meals</a>
          </article>
          <article>
            <span>If you want to cook</span>
            <strong>Meal kits</strong>
            <p>Use meal kits if you want recipes and ingredients delivered, but still want the cooking experience.</p>
            <a href="/best/meal-kits/">Compare meal kits</a>
          </article>
          <article>
            <span>If protein matters</span>
            <strong>Fitness meals</strong>
            <p>Use high-protein options when macros, gym routine, or repeatable weekday meals are the priority.</p>
            <a href="/best/high-protein-meal-delivery/">Compare high-protein meals</a>
          </article>
          <article>
            <span>If location decides it</span>
            <strong>${escapeHtml(countryLabel)} options</strong>
            <p>Delivery coverage can beat brand hype. Start with services that actually serve your market.</p>
            <a href="${escapeHtml(countryHref)}">Compare by country</a>
          </article>
        </div>
      </section>
      <section class="fit-section">
        <h2>${escapeHtml(brand)} at a glance</h2>
        <div>
          <article><span>Meal format</span><p>${escapeHtml(formats.join(", ") || "Meal delivery company")}</p></article>
          <article><span>Markets in our data</span><p>${escapeHtml(countries.join(", ") || "Source pending")}</p></article>
          <article><span>Best for</span><p>${escapeHtml(primaryFormat)} across ${escapeHtml(joinForSentence(countries))}.</p></article>
        </div>
      </section>
      <section class="comparison-section route-section decision-module">
        <div class="comparison-copy"><h2>Before you choose ${escapeHtml(brand)}</h2><p>Use this table as a decision checkpoint. We keep these pages honest with source checks, current offer reminders, and clear alternatives.</p></div>
        <div class="decision-stack">
          <article><span>Offer check</span><strong>Compare before ordering</strong><p>Review fit, country availability, menu type, delivery terms, and current offer notes before choosing.</p></article>
          <article><span>Source check</span><strong>Verify before checkout</strong><p>Final prices, delivery areas, menus, and cancellation terms can change. Always confirm the current offer before buying.</p></article>
        </div>
        <div class="table-wrap"><table><thead><tr><th>Check</th><th>Current note</th><th>Action</th></tr></thead><tbody>
          <tr><td>Category</td><td>${escapeHtml(categories.join(", ") || "Needs classification")}</td><td>Compare by meal type</td></tr>
          <tr><td>Countries</td><td>${escapeHtml(countries.join(", ") || "Needs market check")}</td><td>Confirm delivery area</td></tr>
          <tr><td>Source</td><td>${officialSourceLink(rows)}</td><td>Check latest terms</td></tr>
          <tr><td>Offer check</td><td><a data-track="affiliate-click" data-brand="${escapeHtml(brand)}" data-affiliate-status="apply" href="${escapeHtml(partnerRoute)}" rel="sponsored nofollow">Check current offer</a></td><td>Compare delivery, price, and terms before ordering</td></tr>
        </tbody></table></div>
      </section>
      <section class="buying-checklist">
        <h2>What to check before ordering</h2>
        <ol>
          <li><span>1. Format</span><p>Is this heat-and-eat, cook-yourself, frozen, high-protein, family, or specialist diet?</p></li>
          <li><span>2. Real price</span><p>Compare the second order, delivery fees, serving count, and skipped-week rules.</p></li>
          <li><span>3. Region</span><p>Confirm delivery in your address or postcode before trusting a national ranking.</p></li>
          <li><span>4. Alternatives</span><p>Check similar brands before using a first-order deal as the deciding factor.</p></li>
        </ol>
      </section>
      <section class="source-notes">
        <h2>${escapeHtml(brand)} source notes</h2>
        <p>These notes are based on public source checks and should be refreshed before making a final buying decision.</p>
        <div>
          <article><span>Current source</span><p>${officialSourceLink(rows)}</p></article>
          <article><span>Before buying</span><p>Check delivery area, menu fit, normal price after any intro offer, subscription rules, and cancellation terms.</p></article>
        </div>
      </section>
      <section class="faq-section">
        <h2>${escapeHtml(brand)} FAQ</h2>
        <details><summary>Is ${escapeHtml(brand)} a meal kit or prepared meal company?</summary><p>In our current data, ${escapeHtml(brand)} is classified as: ${escapeHtml(formats.join(", ") || "meal delivery company")}.</p></details>
        <details><summary>Does Every Meal Guide earn from ${escapeHtml(brand)}?</summary><p>Some links may earn a commission if a partner relationship is active. We do not claim a relationship unless it is stated clearly on the page.</p></details>
        <details><summary>What should I compare against ${escapeHtml(brand)}?</summary><p>Compare similar brands in the same country and meal format first, then check intro discounts and ongoing price.</p></details>
      </section>
      <section class="related-links"><h2>Compare alternatives</h2><div><a href="/best/meal-delivery-services/">Best meal delivery services</a><a href="/best/prepared-meal-delivery/">Prepared meals</a><a href="/best/meal-kits/">Meal kits</a><a href="/deals/best-meal-delivery-deals/">Deals</a></div></section>
      <section class="deal-table-section">
        <div class="section-heading"><h2>Similar brands to compare</h2><p>Start with brands that share a country or meal format.</p></div>
        <div class="table-wrap"><table><thead><tr><th>Brand</th><th>Market</th><th>Format</th><th>Offer</th></tr></thead><tbody>${altRows}</tbody></table></div>
      </section>
      <aside class="sticky-deal-bar" aria-label="Quick offer action">
        <span>${escapeHtml(brand)} offer check</span>
        <a data-track="affiliate-click" data-brand="${escapeHtml(brand)}" data-affiliate-status="apply" href="${escapeHtml(partnerRoute)}" rel="sponsored nofollow">Check current offer</a>
      </aside>
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

function ensureSitemapUrls(urls) {
  const existing = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
  const existingUrls = new Set([...existing.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]));
  const nextUrls = [...existingUrls, ...urls].sort();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${nextUrls
    .map((url) => `  <url><loc>${url}</loc></url>`)
    .join("\n")}\n</urlset>\n`;

  fs.writeFileSync(sitemapPath, xml);
}

if (!fs.existsSync(brandUniversePath)) {
  throw new Error(`Missing ${brandUniversePath}`);
}

fs.mkdirSync(reviewsRoot, { recursive: true });

const rows = parseCsv(fs.readFileSync(brandUniversePath, "utf8")).filter((row) => row.brand);
const bySlug = new Map();

for (const row of rows) {
  const slug = slugify(row.brand);
  if (!slug) continue;
  const group = bySlug.get(slug) || { brand: row.brand, slug, rows: [] };
  group.rows.push(row);
  bySlug.set(slug, group);
}

const allBrands = [...bySlug.values()].map((group) => ({
  brand: group.brand,
  slug: group.slug,
  country: unique(group.rows.map((row) => row.country)).join(", "),
  category: unique(group.rows.map((row) => row.category))[0] || "",
}));

let created = 0;
let existing = 0;
let updated = 0;
const sitemapUrls = [];

for (const group of bySlug.values()) {
  const pageDir = path.join(reviewsRoot, group.slug);
  const pagePath = path.join(pageDir, "index.html");

  if (fs.existsSync(pagePath)) {
    existing += 1;
    updated += 1;
    sitemapUrls.push(`https://www.everymealguide.com/reviews/${group.slug}/`);
    continue;
  }

  created += 1;

  const countries = new Set(group.rows.map((row) => row.country));
  const categories = new Set(group.rows.map((row) => categoryFormat(row.category)));
  const alternatives = allBrands.filter((brand) => {
    if (brand.slug === group.slug) return false;
    return (
      [...countries].some((country) => brand.country.includes(country)) ||
      [...categories].some((category) => categoryFormat(brand.category) === category)
    );
  });

  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(
    pagePath,
    pageTemplate({
      brand: group.brand,
      slug: group.slug,
      rows: group.rows,
      alternatives,
    })
  );

  updated += 1;
  sitemapUrls.push(`https://www.everymealguide.com/reviews/${group.slug}/`);
}

ensureSitemapUrls(sitemapUrls);

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(
  reportPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      uniqueBrands: bySlug.size,
      createdReviewPages: created,
      existingReviewPages: existing,
      updatedReviewPages: updated,
      sitemapReviewUrls: sitemapUrls.length,
    },
    null,
    2
  ) + "\n"
);

console.log(
  JSON.stringify(
    {
      uniqueBrands: bySlug.size,
      createdReviewPages: created,
      existingReviewPages: existing,
      updatedReviewPages: updated,
      sitemapReviewUrls: sitemapUrls.length,
      reportPath,
    },
    null,
    2
  )
);
