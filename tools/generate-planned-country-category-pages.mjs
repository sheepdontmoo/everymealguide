import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const architecturePath = path.join(root, "seo", "global-seo-site-architecture.csv");
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const indexPath = path.join(root, "seo", "country-category-page-index.csv");
const sitemapPath = path.join(root, "sitemap.xml");
const reportPath = path.join(root, "reports", "planned-country-category-generation.json");

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
  const header = rows.shift() || [];
  return rows.map((cells) => Object.fromEntries(header.map((column, index) => [column, cells[index] || ""])));
}

function readCsv(filePath) {
  if (!fs.existsSync(filePath)) return [];
  return parseCsv(fs.readFileSync(filePath, "utf8"));
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows) {
  return `${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

function htmlEscape(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, "and")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function countrySlug(value) {
  const raw = String(value || "").trim().toLowerCase();
  if (raw === "us" || raw === "usa" || raw === "united states") return "us";
  if (raw === "uk" || raw === "united kingdom") return "uk";
  return slugify(raw);
}

function urlToFilePath(url) {
  return path.join(root, String(url || "").replace(/^\/+/, "").replace(/\/?$/, "/index.html"));
}

function brandsForPage({ country_slug, category_cluster }, brandRows) {
  const text = `${category_cluster}`.toLowerCase();
  const scored = brandRows
    .filter((row) => countrySlug(row.country) === country_slug)
    .map((row) => {
      const blob = `${row.category} ${row.market_role}`.toLowerCase();
      let score = 0;
      if (text.includes("prepared") && /(prepared|ready|meal plan|heat|fresh)/.test(blob)) score += 3;
      if (text.includes("meal kit") && /(meal kit|recipe|box|cook)/.test(blob)) score += 3;
      if (text.includes("protein") && /(protein|fitness|meal prep|macro)/.test(blob)) score += 3;
      if (text.includes("diet") || text.includes("weight")) if (/(diet|weight|calorie|keto|low carb|medical)/.test(blob)) score += 3;
      if (text.includes("vegan") && /(vegan|plant|vegetarian)/.test(blob)) score += 3;
      if (text.includes("family") && /(family|kids|baby|toddler|frozen)/.test(blob)) score += 2;
      if (text.includes("frozen") && /frozen/.test(blob)) score += 3;
      if (text.includes("grocery") && /(grocery|produce|veg|recipe)/.test(blob)) score += 3;
      if (text.includes("cheap") || text.includes("budget")) if (/(budget|cheap|value|affordable)/.test(blob)) score += 2;
      if (score === 0 && /active/.test(String(row.site_status || "").toLowerCase())) score += 1;
      return { row, score };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score || String(a.row.priority).localeCompare(String(b.row.priority)) || a.row.brand.localeCompare(b.row.brand));

  return scored.slice(0, 8).map((item) => item.row);
}

function pageHtml(row, brands) {
  const title = row.title || `${row.category_cluster} in ${row.country}`;
  const description = row.meta_description || `Compare ${row.category_cluster} in ${row.country} with brand coverage, availability notes, and offer checks.`;
  const brandCards = brands.length
    ? brands
        .slice(0, 3)
        .map(
          (brand, index) => `
          <article class="curated-pick-card${index === 0 ? " featured" : ""}">
            <span>${htmlEscape(index === 0 ? "Best first check" : index === 1 ? "Best alternative" : "Best specialist fit")}</span>
            <h3>${htmlEscape(brand.brand)}</h3>
            <p>${htmlEscape(brand.market_role || "Brand option for this market.")}</p>
            <div class="hero-actions compact-actions">
              <a class="button primary" href="/go/${slugify(brand.brand)}/">Check current offer</a>
              <a class="button ghost" href="/reviews/${slugify(brand.brand)}/">Read review</a>
            </div>
          </article>`
        )
        .join("")
    : `
          <article class="curated-pick-card featured">
            <span>Coverage building</span>
            <h3>No verified shortlist yet</h3>
            <p>This page exists so Every Meal Guide can target the buyer intent honestly while brand research is completed for this country/category.</p>
          </article>`;
  const extraCards = brands.length
    ? brands
        .slice(3, 8)
        .map(
          (brand, index) => `
          <article class="brand-card">
            <span class="eyebrow">Also compare #${index + 4}</span>
            <h3>${htmlEscape(brand.brand)}</h3>
            <p>${htmlEscape(brand.market_role || "Brand option for this market.")}</p>
            <div class="hero-actions compact-actions">
              <a class="button primary" href="/go/${slugify(brand.brand)}/">Check current offer</a>
              <a class="button ghost" href="/reviews/${slugify(brand.brand)}/">Read review</a>
            </div>
          </article>`
        )
        .join("")
    : "";
  const extraSection = extraCards
    ? `<section class="content-section">
        <div class="section-heading">
          <span class="eyebrow">More options</span>
          <h2>More options worth checking</h2>
          <p>These are kept lower on the page so the visitor gets a simple decision first, while the site still covers the wider market.</p>
        </div>
        <div class="brand-grid">${extraCards}
        </div>
      </section>`
    : "";

  const tableRows = brands.length
    ? brands
        .map(
          (brand) => `
              <tr>
                <td><a href="/reviews/${slugify(brand.brand)}/">${htmlEscape(brand.brand)}</a></td>
                <td>${htmlEscape(brand.category)}</td>
                <td>Check delivery area and current menu before ordering</td>
                <td><a href="/go/${slugify(brand.brand)}/">Check offer</a></td>
              </tr>`
        )
        .join("")
    : `
              <tr>
                <td>Research pending</td>
                <td>${htmlEscape(row.category_cluster)}</td>
                <td>needs_verified_brands</td>
                <td>Do not monetize yet</td>
              </tr>`;

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${htmlEscape(title)} | Every Meal Guide</title>
    <meta name="description" content="${htmlEscape(description)}" />
    <link rel="canonical" href="https://www.everymealguide.com${htmlEscape(row.url)}" />
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
          <span class="eyebrow">${htmlEscape(row.country)} category guide</span>
          <h1>${htmlEscape(row.h1 || title)}</h1>
          <p>${htmlEscape(description)}</p>
          <div class="hero-actions">
            <a class="button primary" href="#shortlist">See current shortlist</a>
            <a class="button ghost" href="/vs/">Compare brands</a>
          </div>
        </div>
        <aside class="deal-card">
          <span class="eyebrow">Current options</span>
          <h3>${brands.length ? `${brands.length} listed brands` : "More brands coming"}</h3>
          <p>${brands.length ? "Use the options below, then verify live delivery area and normal pricing before buying." : "We are building this country/category page and will add brands as they are checked."}</p>
        </aside>
      </section>
      <section class="content-section curation-section" id="shortlist">
        <div class="section-heading">
          <span class="eyebrow">Buyer shortlist</span>
          <h2>Start with these ${brands.length ? Math.min(brands.length, 3) : "coverage"} options</h2>
          <p>These pages stay honest: no fake prices, no fake hands-on testing, and no undisclosed partner claims. The goal is to make the first decision easy, then keep the full market available below.</p>
        </div>
        <div class="curated-pick-grid">${brandCards}
        </div>
        <p class="curation-note">The database can hold hundreds of brands, but the visitor should first see the best option, one alternative, and one specialist fit.</p>
      </section>
      ${extraSection}
      <section class="content-section compact-ledger">
        <div class="section-heading">
          <span class="eyebrow">Offer checks</span>
          <h2>Brand table</h2>
          <p>Offer checks help readers compare current options while we keep editorial recommendations separate from any partner relationship.</p>
        </div>
        <details class="ledger-details">
          <summary>View ${brands.length || "pending"} listed brands</summary>
          <div class="table-wrap">
            <table>
              <thead><tr><th>Brand</th><th>Type</th><th>Before you choose</th><th>Offer</th></tr></thead>
              <tbody>${tableRows}
              </tbody>
            </table>
          </div>
        </details>
      </section>
      <section class="content-section money-upgrade-panel">
        <div class="section-heading">
          <span class="eyebrow">Trust note</span>
          <h2>How this page should improve next</h2>
          <p>Every Meal Guide should keep improving this page with current menus, delivery area notes, price-after-discount checks, and clearly disclosed partner links when available.</p>
        </div>
      </section>
    </main>
  </body>
</html>
`;
}

const architectureRows = readCsv(architecturePath).filter((row) => row.url && row.url.includes("/countries/"));
const brandRows = readCsv(brandUniversePath);
const existingRows = readCsv(indexPath);
const byUrl = new Map(existingRows.map((row) => [row.url, row]));
let created = 0;
let preserved = 0;

for (const arch of architectureRows) {
  const url = new URL(arch.url).pathname;
  if (byUrl.has(url)) {
    preserved += 1;
    continue;
  }
  const match = url.match(/^\/countries\/([^/]+)\/([^/]+)\/$/);
  if (!match) continue;
  const [, country_slug, page_slug] = match;
  const country = arch.location || country_slug;
  const category_cluster = arch.service_or_topic || arch.primary_keyword || page_slug;
  const brands = brandsForPage({ country_slug, category_cluster }, brandRows);
  const row = {
    country,
    country_slug,
    category_cluster,
    page_slug,
    url,
    brand_count: String(brands.length),
    active_count: String(brands.filter((brand) => /active/i.test(brand.site_status || "")).length),
    lead_brands: brands.map((brand) => brand.brand).join(" | "),
    status: brands.length ? "planned_generated_from_architecture" : "planned_coverage_page",
    title: arch.title,
    h1: arch.h1,
    meta_description: arch.meta_description,
  };
  const filePath = urlToFilePath(url);
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, pageHtml(row, brands));
  byUrl.set(url, row);
  created += 1;
}

const outputRows = [...byUrl.values()].sort((a, b) => a.url.localeCompare(b.url));
fs.writeFileSync(
  indexPath,
  toCsv([
    ["country", "country_slug", "category_cluster", "page_slug", "url", "brand_count", "active_count", "lead_brands", "status"],
    ...outputRows.map((row) => [row.country, row.country_slug, row.category_cluster, row.page_slug, row.url, row.brand_count, row.active_count, row.lead_brands, row.status]),
  ])
);

if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath, "utf8");
  for (const row of outputRows) {
    const loc = `https://www.everymealguide.com${row.url}`;
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
      architectureRows: architectureRows.length,
      existingRows: existingRows.length,
      preserved,
      created,
      totalIndexRows: outputRows.length,
      indexPath: path.relative(root, indexPath),
    },
    null,
    2
  )}\n`
);

console.log(JSON.stringify({ created, preserved, totalIndexRows: outputRows.length, indexPath, reportPath }, null, 2));
