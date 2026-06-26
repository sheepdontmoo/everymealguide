import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "seo", "global-brand-universe.csv");
const indexPath = path.join(root, "seo", "comparison-page-index.csv");
const reportPath = path.join(root, "reports", "comparison-page-generation.json");
const sitemapPath = path.join(root, "sitemap.xml");
const vsRoot = path.join(root, "vs");
const candidateLimit = Math.max(5, Number(process.argv[2] || 21));

const countryLabels = {
  us: "United States",
  uk: "United Kingdom",
  ireland: "Ireland",
  australia: "Australia",
  canada: "Canada",
  "new-zealand": "New Zealand",
  germany: "Germany",
  france: "France",
  netherlands: "Netherlands",
  spain: "Spain",
  italy: "Italy",
  sweden: "Sweden",
  denmark: "Denmark",
  norway: "Norway",
  belgium: "Belgium",
  switzerland: "Switzerland",
  austria: "Austria",
  poland: "Poland",
  finland: "Finland",
  uae: "UAE",
  singapore: "Singapore",
  "south-africa": "South Africa",
  "hong-kong": "Hong Kong",
  india: "India",
  global: "Global"
};

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;
  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];
    if (char === '"') {
      if (quoted && next === '"') {
        value += '"';
        i += 1;
      } else {
        quoted = !quoted;
      }
    } else if (char === "," && !quoted) {
      row.push(value);
      value = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") i += 1;
      row.push(value);
      if (row.some((cell) => cell.length)) rows.push(row);
      row = [];
      value = "";
    } else {
      value += char;
    }
  }
  if (value.length || row.length) {
    row.push(value);
    if (row.some((cell) => cell.length)) rows.push(row);
  }
  return rows;
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows) {
  return `${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

function slugify(value) {
  return String(value)
    .toLowerCase()
    .replace(/&/g, "and")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function htmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function normalizeCountry(country) {
  const raw = String(country || "global").trim();
  const lower = raw.toLowerCase();
  const slug = lower === "us" || lower === "usa" || lower === "united states" ? "us" : slugify(raw);
  return {
    slug,
    label: countryLabels[slug] || raw.replace(/\b\w/g, (char) => char.toUpperCase())
  };
}

function categoryRoute(category) {
  const value = String(category || "meal delivery").toLowerCase();
  if (value.includes("budget") || value.includes("cheap")) return "cheap-meal-delivery";
  if (value.includes("high protein") || value.includes("fitness") || value.includes("meal prep")) return "high-protein-meal-prep";
  if (value.includes("diet")) return "diet-meal-delivery";
  if (value.includes("frozen")) return "frozen-meal-delivery";
  if (value.includes("kids") || value.includes("child")) return "kids-meal-delivery";
  if (value.includes("grocery") || value.includes("recipe")) return "grocery-dinner-delivery";
  if (value.includes("meal kit")) return "meal-kits";
  if (value.includes("prepared") || value.includes("ready")) return "prepared-meal-delivery";
  return slugify(category);
}

function categoryLabel(category) {
  const value = String(category || "meal delivery").toLowerCase();
  if (value.includes("budget") || value.includes("cheap")) return "cheap meal delivery";
  if (value.includes("high protein") || value.includes("fitness") || value.includes("meal prep")) return "high-protein meal prep";
  if (value.includes("diet")) return "diet meal delivery";
  if (value.includes("frozen")) return "frozen meal delivery";
  if (value.includes("kids") || value.includes("child")) return "kids meal delivery";
  if (value.includes("grocery") || value.includes("recipe")) return "grocery dinner delivery";
  if (value.includes("meal kit")) return "meal kits";
  if (value.includes("prepared") || value.includes("ready")) return "prepared meal delivery";
  return category;
}

function priorityScore(record) {
  const raw = String(record.priority || "").toLowerCase();
  if (raw.includes("p0") || raw === "1") return 1;
  if (raw.includes("p1") || raw === "2") return 2;
  if (raw.includes("p2") || raw === "3") return 3;
  if (raw.includes("p3") || raw === "4") return 4;
  return 9;
}

function isActive(record) {
  return String(record.site_status || "").toLowerCase().includes("active");
}

function reviewUrl(record) {
  return `/reviews/${slugify(record.brand)}/`;
}

function goUrl(record) {
  return `/go/${slugify(record.brand)}/`;
}

function availabilityNote(record) {
  const status = `${record.site_status || ""} ${record.evidence_status || ""}`.toLowerCase();

  if (/inactive|legacy/.test(status)) return "Check whether this company still accepts orders before relying on it.";
  if (/active/.test(status)) return "Listed as an available option, but delivery area and current menu still need checking.";
  if (/pending|needs|watch|planned|source_list_seen|news_seen/.test(status)) {
    return "Confirm the official site, delivery area, current menu, and terms before choosing.";
  }

  return "Check delivery coverage, menu availability, and current terms before ordering.";
}

function offerNote(record) {
  const target = `${record.affiliate_program_target || ""} ${record.affiliate_action || ""}`.toLowerCase();

  if (/yes|affiliate|direct partnership|retail affiliate/.test(target)) {
    return "Check the current offer and confirm the normal price after any intro deal.";
  }

  if (/no|needs|research|pending|placeholder/.test(target)) {
    return "Use the offer check as a buying checklist until current terms are confirmed.";
  }

  return "Compare offer terms, delivery fees, renewal price, and cancellation rules.";
}

function chooseIf(record, country, catLabel) {
  const category = String(record.category || "").toLowerCase();
  const role = record.market_role || record.why_it_matters || "";

  if (category.includes("prepared") || category.includes("ready")) {
    return `${record.brand} is the better starting point if you want ${catLabel} with minimal cooking in ${country.label}. ${role || "Check delivery, menu depth, and normal weekly price before ordering."}`;
  }

  if (category.includes("meal kit") || category.includes("recipe")) {
    return `${record.brand} is the better starting point if you still want to cook but want recipes and ingredients planned for you. ${role || "Check recipe choice, serving count, and skip rules first."}`;
  }

  if (category.includes("protein") || category.includes("fitness") || category.includes("meal prep")) {
    return `${record.brand} is the better starting point if protein, routine, or structured meal prep matters most. ${role || "Check macros, portion size, and delivery cadence first."}`;
  }

  if (category.includes("frozen")) {
    return `${record.brand} is the better starting point if you want freezer-friendly meals for busy weeks. ${role || "Check storage, delivery timing, and per-meal price first."}`;
  }

  if (category.includes("diet") || category.includes("medical")) {
    return `${record.brand} is the better starting point if the diet fit is more important than a headline discount. ${role || "Check ingredients, suitability, and terms before choosing."}`;
  }

  return `${record.brand} is the better starting point if its delivery area, meal format, price, and terms fit your routine better than the alternative. ${role}`;
}

function sourceLink(record) {
  if (!record.official_url) return "Official source needed";
  return `<a href="${htmlEscape(record.official_url)}" rel="nofollow noopener">${htmlEscape(record.brand)} official source</a>`;
}

function comparisonSlug(a, b, countrySlug, route) {
  const base = `${slugify(a.brand)}-vs-${slugify(b.brand)}`;
  if (countrySlug === "global") return `${base}-${route}`;
  return `${base}-${countrySlug}-${route}`;
}

function winner(a, b) {
  if (isActive(a) && !isActive(b)) return a;
  if (!isActive(a) && isActive(b)) return b;
  if (priorityScore(a) < priorityScore(b)) return a;
  if (priorityScore(b) < priorityScore(a)) return b;
  return a.brand.length <= b.brand.length ? a : b;
}

function pageHtml({ a, b, country, category, route, slug }) {
  const catLabel = categoryLabel(category);
  const pick = winner(a, b);
  const other = pick === a ? b : a;
  const title = `${a.brand} vs ${b.brand}: Which is better in ${country.label}?`;
  const description = `Compare ${a.brand} vs ${b.brand} for ${catLabel} in ${country.label}. Get a 60-second recommendation, best-fit notes, review links, and current offer checks.`;
  const url = `/vs/${slug}/`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    about: [
      { "@type": "Organization", name: a.brand, url: a.official_url },
      { "@type": "Organization", name: b.brand, url: b.official_url }
    ],
    mainEntityOfPage: `https://www.everymealguide.com${url}`
  };

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${htmlEscape(title)} | Every Meal Guide</title>
    <meta name="description" content="${htmlEscape(description)}" />
    <link rel="canonical" href="https://www.everymealguide.com${url}" />
    <link rel="stylesheet" href="/styles.css" />
    <script type="application/ld+json">${JSON.stringify(jsonLd)}</script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand-mark" href="/">Every Meal Guide</a>
      <nav>
        <a href="/best/meal-delivery-services/">Top Picks</a>
        <a href="/#deals">Deals</a>
        <a href="/vs/">Compare</a>
        <a href="/all-brands/">All Brands</a>
      </nav>
    </header>
    <main class="page-shell">
      <section class="hero page-hero">
        <div>
          <span class="eyebrow">${htmlEscape(country.label)} ${htmlEscape(catLabel)} comparison</span>
          <h1>${htmlEscape(a.brand)} vs ${htmlEscape(b.brand)}</h1>
          <p>${htmlEscape(description)}</p>
          <div class="hero-actions">
            <a class="button primary" href="${goUrl(pick)}">Check ${htmlEscape(pick.brand)}</a>
            <a class="button ghost" href="#comparison-table">Compare details</a>
          </div>
        </div>
        <aside class="deal-card">
          <span class="eyebrow">60-second verdict</span>
          <h3>${htmlEscape(pick.brand)} is the first option to check</h3>
          <p>Start with ${htmlEscape(pick.brand)} if it serves your address and the normal weekly price works after the first-order deal. Keep ${htmlEscape(other.brand)} on the shortlist if its menu, diet fit, or cancellation terms suit you better.</p>
        </aside>
      </section>
      <section class="comparison-verdict-strip" aria-label="60-second comparison verdict">
        <article>
          <span>Best first click</span>
          <strong>${htmlEscape(pick.brand)}</strong>
          <p>${htmlEscape(chooseIf(pick, country, catLabel))}</p>
          <a class="button primary" href="${goUrl(pick)}">Check ${htmlEscape(pick.brand)}</a>
        </article>
        <article>
          <span>Still compare</span>
          <strong>${htmlEscape(other.brand)}</strong>
          <p>${htmlEscape(other.brand)} may be the better fit if it has stronger local delivery, a better standard weekly price, or a menu style closer to how you actually eat.</p>
          <a class="button ghost" href="${goUrl(other)}">Check ${htmlEscape(other.brand)}</a>
        </article>
        <article>
          <span>Skip both if</span>
          <strong>The basics fail</strong>
          <p>Do not order from either brand until you have confirmed delivery to your address, the recurring price after discounts, minimum order rules, and how easy it is to skip or cancel.</p>
        </article>
        <article>
          <span>Compare alternatives</span>
          <strong>Format beats brand</strong>
          <p>If you want no-cook prepared meals, a meal kit may frustrate you. If you enjoy cooking, ready-made trays may feel repetitive. Pick the format first.</p>
          <a class="button ghost" href="/best/meal-delivery-services/">See top picks</a>
        </article>
      </section>
      <section class="page-proof-grid comparison-proof" aria-label="Comparison proof">
        <article>
          <span>First option</span>
          <strong>${htmlEscape(pick.brand)}</strong>
          <p>This is a practical shortcut for the first brand to check, not a fake taste-test score.</p>
        </article>
        <article>
          <span>Trust boundary</span>
          <strong>No fake certainty</strong>
          <p>We help narrow the decision, then point you to live menus, delivery coverage, current prices, and cancellation terms before ordering.</p>
        </article>
        <article>
          <span>Affiliate disclosure</span>
          <strong>Some links may earn us commission</strong>
          <p>Where links are commercial, they should not change your price. We do not claim a partner relationship unless it is clearly stated.</p>
        </article>
      </section>

      <section class="content-section" id="comparison-table">
        <div class="section-heading">
          <span class="eyebrow">Decision table</span>
          <h2>Which one should you choose?</h2>
          <p>Use this table for the practical buying factors: meal format, availability, offer checks, and deeper review pages.</p>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Factor</th>
                <th>${htmlEscape(a.brand)}</th>
                <th>${htmlEscape(b.brand)}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Best for</td>
                <td>${htmlEscape(a.market_role || a.category)}</td>
                <td>${htmlEscape(b.market_role || b.category)}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>${htmlEscape(a.category)}</td>
                <td>${htmlEscape(b.category)}</td>
              </tr>
              <tr>
                <td>Availability note</td>
                <td>${htmlEscape(availabilityNote(a))}</td>
                <td>${htmlEscape(availabilityNote(b))}</td>
              </tr>
              <tr>
                <td>Before you click</td>
                <td>${htmlEscape(offerNote(a))}</td>
                <td>${htmlEscape(offerNote(b))}</td>
              </tr>
              <tr>
                <td>Check offer</td>
                <td><a href="${goUrl(a)}">Check ${htmlEscape(a.brand)}</a></td>
                <td><a href="${goUrl(b)}">Check ${htmlEscape(b.brand)}</a></td>
              </tr>
              <tr>
                <td>Review</td>
                <td><a href="${reviewUrl(a)}">${htmlEscape(a.brand)} review</a></td>
                <td><a href="${reviewUrl(b)}">${htmlEscape(b.brand)} review</a></td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section class="content-section">
        <div class="brand-grid">
          <article class="brand-card">
            <span class="eyebrow">Choose ${htmlEscape(a.brand)} if</span>
            <h3>${htmlEscape(a.brand)} fits this brief</h3>
            <p>${htmlEscape(chooseIf(a, country, catLabel))}</p>
            <div class="hero-actions compact-actions">
              <a class="button primary" href="${goUrl(a)}">Check current offer</a>
              <a class="button ghost" href="${reviewUrl(a)}">Read review</a>
            </div>
          </article>
          <article class="brand-card">
            <span class="eyebrow">Choose ${htmlEscape(b.brand)} if</span>
            <h3>${htmlEscape(b.brand)} fits this brief</h3>
            <p>${htmlEscape(chooseIf(b, country, catLabel))}</p>
            <div class="hero-actions compact-actions">
              <a class="button primary" href="${goUrl(b)}">Check current offer</a>
              <a class="button ghost" href="${reviewUrl(b)}">Read review</a>
            </div>
          </article>
        </div>
      </section>

      <section class="content-section">
        <h2>How to choose safely</h2>
        <p>Use this page to compare format, delivery area, menu style, normal price after intro offers, and cancellation terms. We do not claim a partner relationship unless it is clearly stated.</p>
      </section>

      <section class="content-section money-upgrade-panel">
        <div class="section-heading">
          <span class="eyebrow">Trust check</span>
          <h2>What to verify before choosing</h2>
          <p>Before ordering, check current menus, delivery coverage, normal weekly pricing after discounts, cancellation rules, and whether the offer terms still match your needs.</p>
        </div>
        <div class="source-chip-grid">
          ${sourceLink(a)}
          ${sourceLink(b)}
        </div>
        <div class="money-faq-grid">
          <article>
            <h3>Which is better for most people?</h3>
            <p>${htmlEscape(pick.brand)} is the first option to check from this guide, but the right choice depends on delivery area, meal format, price after intro deals, and diet fit.</p>
          </article>
          <article>
            <h3>Which is cheaper?</h3>
            <p>Do not judge by the first-box discount alone. Compare the normal weekly price, delivery fees, minimum order, and how easy it is to skip or cancel.</p>
          </article>
          <article>
            <h3>Are these affiliate links?</h3>
            <p>Some links may be offer-check pages before a brand relationship is active. We do not claim an affiliate relationship unless it is clearly stated.</p>
          </article>
        </div>
      </section>
    </main>
  </body>
</html>
`;
}

function indexHtml(rows) {
  const featuredCards = rows
    .slice(0, 12)
    .map((row) => `
          <article class="brand-card">
            <span class="eyebrow">${htmlEscape(row.country)} ${htmlEscape(row.category_cluster)}</span>
            <h3>${htmlEscape(row.brand_a)} vs ${htmlEscape(row.brand_b)}</h3>
            <p>Suggested first check: <strong>${htmlEscape(row.winner)}</strong>. Use this as a quick buying shortcut, then confirm delivery, price, menu fit, and cancellation terms.</p>
            <div class="hero-actions compact-actions">
              <a class="button primary" href="${row.url}">Open comparison</a>
            </div>
          </article>`)
    .join("");
  const visibleRows = rows
    .slice(0, 900)
    .map((row) => `
              <tr>
                <td><a href="${row.url}">${htmlEscape(row.brand_a)} vs ${htmlEscape(row.brand_b)}</a></td>
                <td>${htmlEscape(row.country)}</td>
                <td>${htmlEscape(row.category_cluster)}</td>
                <td>${htmlEscape(row.winner)}</td>
              </tr>`)
    .join("");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Meal Delivery Comparisons | Every Meal Guide</title>
    <meta name="description" content="Browse Every Meal Guide brand-versus-brand meal delivery comparisons by country and category." />
    <link rel="canonical" href="https://www.everymealguide.com/vs/" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <header class="site-header">
      <a class="brand-mark" href="/">Every Meal Guide</a>
      <nav>
        <a href="/#rankings">Rankings</a>
        <a href="/#deals">Deals</a>
        <a href="/vs/">Comparisons</a>
        <a href="/#methodology">Methodology</a>
      </nav>
    </header>
    <main class="page-shell">
      <section class="hero page-hero">
        <div>
          <span class="eyebrow">Comparison hub</span>
          <h1>Meal delivery brand comparisons</h1>
          <p>Compare meal delivery brands head to head before you spend money. Each guide helps you pick the better first option, check alternatives, and avoid bad-fit deals.</p>
        </div>
        <aside class="deal-card">
          <span class="eyebrow">Current coverage</span>
          <h3>${rows.length} head-to-head guides</h3>
          <p>Start with featured matchups below, or open the longer index when you already know which brands you want to compare.</p>
        </aside>
      </section>
      <section class="content-section">
        <div class="section-heading">
          <span class="eyebrow">Start here</span>
          <h2>Featured comparison pages</h2>
          <p>Start with the clearest matchups first. The full index is there for people searching for a specific brand pair.</p>
        </div>
        <div class="brand-grid">${featuredCards}</div>
      </section>
      <section class="content-section compact-ledger">
        <div class="section-heading">
          <span class="eyebrow">Full comparison index</span>
          <h2>Browse more matchups</h2>
          <p>Use the full directory when you already have two brands in mind and want the quickest route to the relevant guide.</p>
        </div>
        <details class="ledger-details">
          <summary>View first ${Math.min(rows.length, 900)} comparison rows</summary>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Comparison</th>
                  <th>Country</th>
                  <th>Category</th>
                  <th>First option</th>
                </tr>
              </thead>
              <tbody>${visibleRows}
              </tbody>
            </table>
          </div>
        </details>
      </section>
    </main>
  </body>
</html>
`;
}

const csv = parseCsv(fs.readFileSync(sourcePath, "utf8"));
const header = csv[0];
const records = csv.slice(1).map((row) =>
  Object.fromEntries(header.map((column, index) => [column, row[index] ?? ""]))
);
const groups = new Map();

for (const record of records) {
  if (!record.brand || !record.category) continue;
  const country = normalizeCountry(record.country);
  const route = categoryRoute(record.category);
  const key = `${country.slug}::${route}`;
  if (!groups.has(key)) {
    groups.set(key, { country, route, category: record.category, records: [] });
  }
  groups.get(key).records.push(record);
}

const generatedRows = [];
const seenSlugs = new Set();
let created = 0;
let existing = 0;

for (const group of [...groups.values()].sort((a, b) => `${a.country.slug}/${a.route}`.localeCompare(`${b.country.slug}/${b.route}`))) {
  const deduped = new Map();
  for (const record of group.records) {
    const slug = slugify(record.brand);
    const current = deduped.get(slug);
    if (!current || priorityScore(record) < priorityScore(current)) deduped.set(slug, record);
  }
  const candidates = [...deduped.values()]
    .sort((a, b) => Number(isActive(b)) - Number(isActive(a)) || priorityScore(a) - priorityScore(b) || a.brand.localeCompare(b.brand))
    .slice(0, candidateLimit);
  if (candidates.length < 2) continue;

  for (let i = 0; i < candidates.length; i += 1) {
    for (let j = i + 1; j < candidates.length; j += 1) {
      const a = candidates[i];
      const b = candidates[j];
      const slug = comparisonSlug(a, b, group.country.slug, group.route);
      if (seenSlugs.has(slug)) continue;
      seenSlugs.add(slug);
      const dir = path.join(vsRoot, slug);
      const file = path.join(dir, "index.html");
      fs.mkdirSync(dir, { recursive: true });
      if (fs.existsSync(file)) existing += 1;
      else created += 1;
      fs.writeFileSync(file, pageHtml({ a, b, country: group.country, category: group.category, route: group.route, slug }));
      const pick = winner(a, b);
      generatedRows.push({
        country: group.country.label,
        country_slug: group.country.slug,
        category_cluster: categoryLabel(group.category),
        brand_a: a.brand,
        brand_b: b.brand,
        winner: pick.brand,
        url: `/vs/${slug}/`,
        status: "generated"
      });
    }
  }
}

generatedRows.sort((a, b) => a.url.localeCompare(b.url));
fs.writeFileSync(
  indexPath,
  toCsv([
    ["country", "country_slug", "category_cluster", "brand_a", "brand_b", "winner", "url", "status"],
    ...generatedRows.map((row) => [row.country, row.country_slug, row.category_cluster, row.brand_a, row.brand_b, row.winner, row.url, row.status])
  ])
);

fs.mkdirSync(vsRoot, { recursive: true });
fs.writeFileSync(path.join(vsRoot, "index.html"), indexHtml(generatedRows));

if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  const urls = ["https://www.everymealguide.com/vs/", ...generatedRows.map((row) => `https://www.everymealguide.com${row.url}`)];
  for (const loc of urls) {
    if (sitemap.includes(`<loc>${loc}</loc>`)) continue;
    sitemap = sitemap.replace("</urlset>", `  <url>\n    <loc>${loc}</loc>\n  </url>\n</urlset>`);
  }
  fs.writeFileSync(sitemapPath, sitemap);
}

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      sourceRows: records.length,
      groupsConsidered: groups.size,
      candidateLimit,
      comparisonPages: generatedRows.length,
      created,
      existing,
      indexPath: path.relative(root, indexPath)
    },
    null,
    2
  )}\n`
);

console.log(JSON.stringify({ comparisonPages: generatedRows.length, created, existing, indexPath, reportPath }, null, 2));
