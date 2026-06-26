import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const sourcePath = path.join(root, "seo", "global-brand-universe.csv");
const indexPath = path.join(root, "seo", "country-category-page-index.csv");
const reportPath = path.join(root, "reports", "country-category-generation.json");
const sitemapPath = path.join(root, "sitemap.xml");

const countryLabels = {
  us: "United States",
  "united-states": "United States",
  usa: "United States",
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
  if (value.includes("high protein") || value.includes("fitness") || value.includes("meal prep")) return "best-high-protein-meal-prep";
  if (value.includes("diet")) return "best-diet-meal-delivery";
  if (value.includes("frozen")) return "best-frozen-meal-delivery";
  if (value.includes("kids") || value.includes("child")) return "best-kids-meal-delivery";
  if (value.includes("grocery") || value.includes("recipe")) return "best-grocery-dinner-delivery";
  if (value.includes("organic")) return "best-organic-meal-kits";
  if (value.includes("seafood")) return "best-seafood-meal-kits";
  if (value.includes("premium")) return "best-premium-meal-kits";
  if (value.includes("meal kit")) return "best-meal-kits";
  if (value.includes("prepared") || value.includes("ready")) return "best-prepared-meal-delivery";
  return `best-${slugify(category)}`;
}

function categoryLabel(category) {
  const value = String(category || "meal delivery").toLowerCase();
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
  return 9;
}

function brandUrl(brand) {
  return `/reviews/${slugify(brand)}/`;
}

function goUrl(brand) {
  return `/go/${slugify(brand)}/`;
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
    return "Check the current offer and compare the normal price after any intro deal.";
  }

  return "Use the offer check as a buying checklist before leaving Every Meal Guide.";
}

function sourceCell(record) {
  if (!/^https?:\/\//i.test(record.official_url || "")) return "Official source to confirm";
  return `<a href="${htmlEscape(record.official_url)}" rel="nofollow noopener">Official source</a>`;
}

function pageHtml({ country, category, records, url }) {
  const catLabel = categoryLabel(category);
  const sorted = records.sort((a, b) => priorityScore(a) - priorityScore(b) || a.brand.localeCompare(b.brand));
  const active = sorted.filter((record) => String(record.site_status || "").includes("active"));
  const topBrands = active.length ? active : sorted;
  const title = `Best ${catLabel} in ${country.label}`;
  const leadNames = topBrands.slice(0, 4).map((record) => record.brand).join(", ");
  const pickLabels = ["Best first check", "Best alternative", "Best specialist fit"];
  const choiceCards = topBrands
    .slice(0, 3)
    .map((record, index) => `
          <article class="curated-pick-card${index === 0 ? " featured" : ""}">
            <span>${htmlEscape(pickLabels[index] || "Shortlist pick")}</span>
            <h3>${htmlEscape(record.brand)}</h3>
            <p>${htmlEscape(record.market_role || "A strong starting point from the Every Meal Guide country and category list.")}</p>
            <div class="hero-actions compact-actions">
              <a class="button primary" href="${goUrl(record.brand)}">Check ${htmlEscape(record.brand)}</a>
              <a class="button ghost" href="${brandUrl(record.brand)}">Review</a>
            </div>
          </article>`)
    .join("");
  const cards = topBrands
    .slice(3, 9)
    .map((record, index) => `
          <article class="brand-card">
            <span class="eyebrow">Also compare #${index + 4}</span>
            <h3>${htmlEscape(record.brand)}</h3>
            <p>${htmlEscape(record.market_role || "Included as another option for this country and meal type.")}</p>
            <div class="hero-actions compact-actions">
              <a class="button primary" href="${goUrl(record.brand)}">Check route</a>
              <a class="button ghost" href="${brandUrl(record.brand)}">Review</a>
            </div>
          </article>`)
    .join("");
  const moreOptionsSection = cards
    ? `<section class="content-section" id="more-options">
        <div class="section-heading">
          <span class="eyebrow">More options</span>
          <h2>Still worth comparing</h2>
          <p>These extra brands keep choice available without forcing every visitor through a giant directory. The full option list remains below for deeper research.</p>
        </div>
        <div class="brand-grid">${cards}</div>
      </section>`
    : "";
  const rows = sorted
    .map((record) => `
              <tr>
                <td><a href="${brandUrl(record.brand)}">${htmlEscape(record.brand)}</a></td>
                <td>${htmlEscape(record.category)}</td>
                <td>${htmlEscape(availabilityNote(record))}</td>
                <td>${htmlEscape(offerNote(record))}</td>
                <td><a href="${goUrl(record.brand)}">/go/${slugify(record.brand)}/</a></td>
                <td>${sourceCell(record)}</td>
              </tr>`)
    .join("");
  const itemList = topBrands.slice(0, 10).map((record, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: record.brand,
    url: `https://www.everymealguide.com${brandUrl(record.brand)}`
  }));

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${htmlEscape(title)} | Every Meal Guide</title>
    <meta name="description" content="Compare ${htmlEscape(catLabel)} brands in ${htmlEscape(country.label)} including ${htmlEscape(leadNames)}. Review top picks, availability notes, and current offer checks." />
    <link rel="canonical" href="https://www.everymealguide.com${url}" />
    <link rel="stylesheet" href="/styles.css" />
    <script type="application/ld+json">${JSON.stringify({
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: title,
      itemListElement: itemList
    })}</script>
  </head>
  <body>
    <header class="site-header">
      <a class="brand-mark" href="/">Every Meal Guide</a>
      <nav>
        <a href="/#rankings">Rankings</a>
        <a href="/#deals">Deals</a>
        <a href="/#compare">Compare</a>
        <a href="/#methodology">Methodology</a>
      </nav>
    </header>
    <main class="page-shell">
      <section class="hero page-hero">
        <div>
          <span class="eyebrow">${htmlEscape(country.label)} ${htmlEscape(catLabel)}</span>
          <h1>${htmlEscape(title)}</h1>
          <p>Compare the serious ${htmlEscape(catLabel)} options in ${htmlEscape(country.label)}. This page is built from the Every Meal Guide company list, so every listed company has a review page, an offer check, and a source-aware buying note.</p>
          <div class="hero-actions">
            <a class="button primary" href="#rankings">See top brands</a>
            <a class="button ghost" href="#all-brands">View all brands</a>
          </div>
        </div>
        <aside class="deal-card">
          <span class="eyebrow">Fast shortlist</span>
          <p>${htmlEscape(leadNames || "More research required before a shortlist is promoted.")}</p>
        </aside>
      </section>
      <section class="page-proof-grid" aria-label="Every Meal Guide page proof">
        <article>
          <span>Coverage depth</span>
          <strong>${sorted.length}</strong>
          <p>Brands accounted for in this country/category cluster, including active, regional, watchlist, and alternatives-only entries where relevant.</p>
        </article>
        <article>
          <span>Active signals</span>
          <strong>${active.length}</strong>
          <p>Brands currently marked active from source checks. Delivery area and offer freshness should still be confirmed before ordering.</p>
        </article>
        <article>
          <span>Offer checks</span>
          <strong>/go/ ready</strong>
          <p>Every listed brand has an offer-check page so readers can compare fit, availability, offer notes, and alternatives before ordering.</p>
        </article>
      </section>
      <section class="content-section curation-section" id="rankings">
        <div class="section-heading">
          <span class="eyebrow">Curated shortlist</span>
          <h2>Start with these ${Math.min(topBrands.length, 3)} picks</h2>
          <p>We keep the whole market in the database, but visitors should not have to read a spreadsheet. These are the clearest first options from availability signals, priority, and consumer fit.</p>
        </div>
        <div class="curated-pick-grid">${choiceCards}</div>
        <p class="curation-note">The full brand list is still available for depth and comparison coverage. The buying journey stays simple: check the first pick, compare the next two, then expand only if needed.</p>
      </section>
      ${moreOptionsSection}
      <section class="content-section compact-ledger" id="all-brands">
        <div class="section-heading">
          <span class="eyebrow">Full option directory</span>
          <h2>Every brand is accounted for</h2>
          <p>The full list is here for shoppers who want depth, but the shortlist above stays focused so the first decision is not overwhelming.</p>
        </div>
        <details class="ledger-details">
          <summary>View all ${sorted.length} listed options</summary>
          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Brand</th>
                  <th>Type</th>
                  <th>Availability note</th>
                  <th>Before you choose</th>
                  <th>Compare link</th>
                  <th>Last check</th>
                </tr>
              </thead>
              <tbody>${rows}
              </tbody>
            </table>
          </div>
        </details>
      </section>
      <section class="content-section">
        <h2>How Every Meal Guide keeps this page useful</h2>
        <p>We keep the reader decision first: source-check the brands, separate meal formats clearly, update offer notes when terms change, and never imply a partner relationship unless it is clearly stated.</p>
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
    groups.set(key, {
      country,
      route,
      categories: new Set(),
      records: []
    });
  }
  const group = groups.get(key);
  group.categories.add(record.category);
  group.records.push(record);
}

const indexRows = [
  ["country", "country_slug", "category_cluster", "page_slug", "url", "brand_count", "active_count", "lead_brands", "status"]
];
const sitemapUrls = [];

for (const group of [...groups.values()].sort((a, b) => `${a.country.slug}/${a.route}`.localeCompare(`${b.country.slug}/${b.route}`))) {
  const category = [...group.categories][0];
  const url = `/countries/${group.country.slug}/${group.route}/`;
  const dir = path.join(root, "countries", group.country.slug, group.route);
  const activeCount = group.records.filter((record) => String(record.site_status || "").includes("active")).length;
  const leads = group.records
    .slice()
    .sort((a, b) => priorityScore(a) - priorityScore(b) || a.brand.localeCompare(b.brand))
    .slice(0, 5)
    .map((record) => record.brand)
    .join(" | ");
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pageHtml({ country: group.country, category, records: group.records, url }));
  indexRows.push([
    group.country.label,
    group.country.slug,
    [...group.categories].join(" | "),
    group.route,
    url,
    group.records.length,
    activeCount,
    leads,
    "generated"
  ]);
  sitemapUrls.push(`https://www.everymealguide.com${url}`);
}

fs.writeFileSync(indexPath, toCsv(indexRows));

if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const loc of sitemapUrls) {
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
      pagesGenerated: groups.size,
      indexPath: path.relative(root, indexPath),
      sitemapUrls: sitemapUrls.length
    },
    null,
    2
  )}\n`
);

console.log(JSON.stringify({ pagesGenerated: groups.size, indexPath, reportPath }, null, 2));
