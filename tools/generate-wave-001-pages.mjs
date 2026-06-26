import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/codex/dinner-compare';
const seoDir = path.join(root, 'seo');
const today = 'June 23, 2026';
const siteBase = 'https://www.everymealguide.com';

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (quoted) {
      if (ch === '"' && next === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else {
      if (ch === '"') quoted = true;
      else if (ch === ',') { row.push(cell); cell = ''; }
      else if (ch === '\n') { row.push(cell); if (row.some(Boolean)) rows.push(row); row = []; cell = ''; }
      else if (ch !== '\r') cell += ch;
    }
  }
  if (cell || row.length) { row.push(cell); if (row.some(Boolean)) rows.push(row); }
  const [headers, ...body] = rows;
  return body.map(values => Object.fromEntries(headers.map((h, i) => [h, values[i] ?? ''])));
}

function csvEscape(value) {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function readCsv(file) {
  return parseCsv(fs.readFileSync(file, 'utf8'));
}

function slug(input) {
  return String(input || '')
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/'/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function titleCase(input) {
  return String(input || '')
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function countrySlug(country) {
  return {
    US: 'us',
    UK: 'uk',
    Ireland: 'ireland',
    Australia: 'australia',
    Canada: 'canada',
    Global: 'global',
  }[country] || slug(country);
}

function countryName(country) {
  return {
    US: 'United States',
    UK: 'United Kingdom',
  }[country] || country;
}

function pagePathFor(row) {
  const brand = row.brand;
  const country = row.country;
  const output = row.first_output || '';
  const lower = output.toLowerCase();
  const cslug = countrySlug(country);

  if (/\bvs\b/i.test(output)) {
    return `/vs/${slug(output.split('+')[0].trim())}/`;
  }

  if (/review/i.test(output)) {
    return `/reviews/${slug(brand)}/`;
  }

  if (country !== 'US' && country !== 'Global') {
    if (/meal-prep|high-protein|macro|fitness/i.test(output)) return `/countries/${cslug}/best-meal-prep/`;
    if (/prepared|ready|ready-meals|frozen/i.test(output)) return `/countries/${cslug}/best-prepared-meals/`;
    if (/vegan|plant/i.test(output)) return `/countries/${cslug}/best-vegan-meal-delivery/`;
    if (/weight-loss|diet/i.test(output)) return `/countries/${cslug}/best-weight-loss-meal-delivery/`;
    if (/cheap|budget/i.test(output)) return `/countries/${cslug}/best-cheap-meal-kits/`;
    if (/meal-kit|meal-kits|recipe/i.test(output)) return `/countries/${cslug}/best-meal-kits/`;
    return `/countries/${cslug}/best-meal-delivery/`;
  }

  if (/prepared|no-cook|ready/i.test(output)) return '/best/prepared-meal-delivery/';
  if (/meal-prep|high-protein|macro|fitness/i.test(output)) return '/best/high-protein-meal-delivery/';
  if (/vegan|plant/i.test(output)) return '/best/vegan-meal-delivery/';
  if (/weight-loss|diet/i.test(output)) return '/best/meal-delivery-for-weight-loss/';
  if (/frozen/i.test(output)) return '/best/frozen-meal-delivery/';
  if (/kids|family/i.test(output)) return '/best/family-meal-delivery/';
  if (/15-minute|fast/i.test(output)) return '/best/quick-meal-kits/';
  return `/reviews/${slug(brand)}/`;
}

function statusLabel(row) {
  if (/official|ledger/.test(row.evidence_status || '')) return 'source checked';
  if (/source_list_seen|news_seen/.test(row.evidence_status || '')) return 'refresh before buying';
  if (/needs/.test(row.evidence_status || '')) return 'check before ordering';
  if (/active/i.test(row.status || '')) return 'listed option';
  return 'compare with care';
}

function consumerBeforeBuying(row) {
  const status = `${row.status || ''} ${row.evidence_status || ''}`.toLowerCase();
  const category = (row.category || '').toLowerCase();

  if (/inactive|legacy/.test(status)) return 'Check whether this company still accepts orders before relying on it.';
  if (/pending|needs|source_list_seen|news_seen/.test(status)) return 'Confirm the official site, delivery area, current menu, and offer terms before ordering.';
  if (/medical|diet/.test(category)) return 'Check suitability, ingredients, and professional guidance where needed before choosing.';
  if (/regional|local/.test(row.market_role || '')) return 'Check postcode or delivery-zone coverage before comparing price.';
  return 'Compare delivery area, normal price after any intro offer, menu fit, and cancellation rules before ordering.';
}

function shell({ title, description, body, canonical, bodyAttributes = '', mainClass = 'money-page' }) {
  const safeTitle = escapeHtml(title);
  const safeDescription = escapeHtml(description);
  const canonicalUrl = canonical || `${siteBase}/`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${safeTitle} | Every Meal Guide</title>
    <meta name="description" content="${safeDescription}" />
    <link rel="canonical" href="${canonicalUrl}" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body${bodyAttributes ? ` ${bodyAttributes}` : ''}>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="/" aria-label="Every Meal Guide home"><span class="brand-mark">EM</span><span>Every Meal Guide</span></a>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="/best/meal-delivery-services/">Best</a>
        <a href="/meal-delivery-comparisons/">Compare</a>
        <a href="/reviews/factor/">Reviews</a>
        <a href="/deals/best-meal-delivery-deals/">Deals</a>
        <a href="/countries/">Countries</a>
        <a href="/brand-directory/">All Brands</a>
      </nav>
      <a class="nav-action" href="/#matcher">Find My Best Match</a>
    </header>
    <main class="${escapeHtml(mainClass)}" id="main">
      ${body}
    </main>
    <footer class="footer"><p>Every Meal Guide compares meal delivery companies by fit, region, source checks, and current deal quality.</p><p><a href="/methodology/">Methodology</a> · <a href="/affiliate-disclosure/">Affiliate disclosure</a> · <a href="/company-accountability/">Company accountability</a></p></footer>
    <script src="/script.js"></script>
  </body>
</html>
`;
}

function affiliateDisclosure() {
  return `<section class="affiliate-disclosure"><p>Every Meal Guide may earn a commission when you click partner links. Company pages are built from source checks; brands with incomplete details should not be treated as final recommendations until availability is confirmed.</p></section>`;
}

function freshnessBar(copy = 'Coverage is updated from the company list and public source checks.') {
  return `<section class="freshness-bar"><p><span>Last updated</span>${today}</p><p>${escapeHtml(copy)}</p></section>`;
}

function hero(title, intro, cardTitle, cardCopy, ctaHref = '/brand-directory/', cta = 'See company coverage') {
  return `<section class="page-hero compact">
      <div>
        <span class="page-kicker">Company guide</span>
        <h1>${escapeHtml(title)}</h1>
        <p>${escapeHtml(intro)}</p>
      </div>
      <aside class="hero-verdict-card">
        <span>Best first move</span>
        <strong>${escapeHtml(cardTitle)}</strong>
        <p>${escapeHtml(cardCopy)}</p>
        <a href="${ctaHref}">${escapeHtml(cta)}</a>
      </aside>
    </section>`;
}

function rowCard(row) {
  const official = row.official_url ? `<a href="${escapeHtml(row.official_url)}" rel="nofollow noopener">Official site</a>` : '<span>Official URL pending</span>';
  return `<article class="deal-card">
      <span>${escapeHtml(statusLabel(row))}</span>
      <h2>${escapeHtml(row.brand)}</h2>
      <p>${escapeHtml(row.why_it_matters || row.market_role || row.category || 'Listed for meal delivery comparison.')}</p>
      <p><strong>Category:</strong> ${escapeHtml(row.category)}</p>
      <p><strong>Before you choose:</strong> ${escapeHtml(consumerBeforeBuying(row))}</p>
      ${official}
    </article>`;
}

function table(rows) {
  return `<div class="table-wrap"><table><thead><tr><th>Company</th><th>Country</th><th>Meal type</th><th>Availability note</th><th>Before you choose</th></tr></thead><tbody>${rows.map((row) => `<tr><td>${escapeHtml(row.brand)}</td><td>${escapeHtml(countryName(row.country))}</td><td>${escapeHtml(row.category)}</td><td>${escapeHtml(statusLabel(row))}</td><td>${escapeHtml(consumerBeforeBuying(row))}</td></tr>`).join('')}</tbody></table></div>`;
}

function writePage(urlPath, html) {
  const clean = urlPath.replace(/^\//, '').replace(/\/$/, '');
  const outDir = path.join(root, clean || '.');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
}

const universe = readCsv(path.join(seoDir, 'global-brand-universe.csv'));
const next50 = readCsv(path.join(seoDir, 'next-50-brand-research-batch.csv'));

const pageMap = new Map();
for (const row of next50) {
  const targetPath = pagePathFor(row);
  if (!pageMap.has(targetPath)) pageMap.set(targetPath, []);
  pageMap.get(targetPath).push(row);
}

const manifestRows = [];
for (const [targetPath, rows] of pageMap.entries()) {
  const first = rows[0];
  const isReview = targetPath.startsWith('/reviews/');
  const isVs = targetPath.startsWith('/vs/');
  const isCountry = targetPath.startsWith('/countries/');
  const countryLabel = countryName(first.country);
  const pageTitle = isReview
    ? `${first.brand} Review`
    : isVs
      ? titleCase(targetPath.split('/').filter(Boolean).at(-1).replace(/-vs-/g, ' vs '))
      : `${titleCase(targetPath.split('/').filter(Boolean).at(-1))} in ${countryLabel}`;
  const intro = isReview
    ? `${first.brand} is listed in Every Meal Guide for ${countryLabel}. Use this page to compare format, availability, source notes, and similar options.`
    : isVs
      ? `A side-by-side guide for ${pageTitle}, built to help readers compare fit, availability, meal type, and current offer notes.`
      : `A ${countryLabel} coverage page for meal delivery companies in this category. Start with availability, meal type, and fit before comparing offers.`;
  const cardTitle = isReview ? 'Check fit first' : isVs ? 'Compare fit first' : 'Start with availability';
  const cardCopy = isReview
    ? 'Confirm the brand still serves your area, matches your meal type, and has terms that fit your routine.'
    : 'Use this page to compare whether each provider is a good fit, regional option, specialist option, or one to avoid for now.';
  const body = `${affiliateDisclosure()}${freshnessBar('Pages are updated from source checks and should be refreshed before final buying decisions.')}${hero(pageTitle, intro, cardTitle, cardCopy)}
    <section class="route-section">
      <div class="section-heading"><span>Companies to compare</span><h2>${escapeHtml(isReview ? first.brand : 'Brands in this page')}</h2><p>Use these entries as starting points. Final choices should be based on current delivery, menu, price, and cancellation terms.</p></div>
      <div class="deal-grid">${rows.map(rowCard).join('')}</div>
    </section>
    <section class="route-section">
      <div class="section-heading"><span>Comparison table</span><h2>What to compare next</h2><p>No company should be treated as the right choice until delivery coverage, current menu, normal price, and subscription terms are checked.</p></div>
      ${table(rows)}
    </section>
    <section class="quick-answer route-section"><h2>How to use this page</h2><p>Start with country availability, meal type, ongoing price, dietary fit, delivery area, cancellation terms, and whether the current offer is actually live. Deals come after fit.</p></section>`;
  const html = shell({
    title: pageTitle,
    description: intro.slice(0, 155),
    canonical: `${siteBase}${targetPath}`,
    body,
  });
  writePage(targetPath, html);
  manifestRows.push({
    target_path: targetPath,
    page_title: pageTitle,
    country: first.country,
    brands: rows.map(r => r.brand).join('; '),
    page_type: isReview ? 'brand_review' : isVs ? 'comparison' : isCountry ? 'country_category' : 'category',
    status: 'generated_local',
  });
}

const countries = ['US', 'UK', 'Ireland', 'Australia', 'Canada'];
for (const country of countries) {
  const cslug = countrySlug(country);
  const countryRows = universe.filter(r => r.country === country);
  const title = `Best Meal Delivery Companies in ${countryName(country)}`;
  const body = `${affiliateDisclosure()}${freshnessBar('Country pages combine national, regional, specialist, and still-to-check providers.')}${hero(title, `A country-level guide for meal kits, prepared meals, meal prep, frozen meals, and diet meal delivery in ${countryName(country)}.`, 'Start with availability', 'A company is only useful if it actually delivers to the reader and has a current ordering path.')}
    <section class="route-section">
      <div class="section-heading"><span>${escapeHtml(countryName(country))}</span><h2>${countryRows.length} companies listed</h2><p>Use this as a starting point, then compare availability, meal type, price, and subscription terms.</p></div>
      <div class="deal-grid">${countryRows.slice(0, 24).map(rowCard).join('')}</div>
    </section>
    <section class="route-section">${table(countryRows)}</section>`;
  writePage(`/countries/${cslug}/`, shell({ title, description: `Meal delivery company coverage for ${countryName(country)}.`, canonical: `${siteBase}/countries/${cslug}/`, body }));
}

const directoryBody = `${affiliateDisclosure()}
      <section class="page-hero compact directory-hero">
        <div>
          <h1>All meal delivery brands</h1>
          <p>Use this directory when you already have a brand, country, or meal type in mind. If you want the fastest answer, start with the matcher or Top Picks instead.</p>
          <div class="hero-actions">
            <a class="button primary" href="/#matcher">Find my best match</a>
            <a class="button secondary" href="/best/meal-delivery-services/">See top picks</a>
          </div>
        </div>
        <aside class="hero-verdict-card directory-verdict-card">
          <span>How to use this page</span>
          <strong>Browse, then verify fit</strong>
          <p>Filter by country and meal type, open the review or offer check, then confirm delivery area, menu, normal price, and cancellation rules before buying.</p>
        </aside>
      </section>

      <section class="directory-paths" aria-label="Fast ways to choose">
        <article>
          <span>Fastest route</span>
          <strong>I do not know what to choose</strong>
          <p>Use the matcher. It narrows your choice by country, meal type, budget, and diet needs before you hit the full directory.</p>
          <a href="/#matcher">Start matcher</a>
        </article>
        <article>
          <span>Comparison route</span>
          <strong>I am choosing between brands</strong>
          <p>Use head-to-head pages when you already know two services and need a quick difference in fit, value, and format.</p>
          <a href="/meal-delivery-comparisons/">Compare brands</a>
        </article>
        <article>
          <span>Research route</span>
          <strong>I want every option</strong>
          <p>Use the searchable directory below for broad discovery across meal kits, prepared meals, frozen meals, diet plans, and local meal-prep companies.</p>
          <a href="#brand-finder">Browse directory</a>
        </article>
      </section>

      <section class="quick-answer directory-note" id="brand-finder">
        <div>
          <h2>Directory note</h2>
          <p>This page is intentionally broad. A listing means the brand is tracked for comparison, not that it is automatically recommended. Check each brand's review, offer page, delivery coverage, and current ordering status before choosing.</p>
        </div>
      </section>`;
writePage('/brand-directory/', shell({ title: 'All Meal Delivery Brands', description: 'Browse meal delivery brands by country and meal type, then compare reviews, alternatives, and current offer checks before ordering.', canonical: `${siteBase}/brand-directory/`, body: directoryBody, bodyAttributes: 'data-page-type="directory"', mainClass: 'directory-page' }));

const countriesBody = `${affiliateDisclosure()}${freshnessBar('Start with local delivery coverage before comparing price, menu fit, and discounts.')}${hero('Meal Delivery by Country', 'Choose your country first, then compare meal kits, prepared meals, high-protein plans, family meals, frozen meals, and deals that can actually deliver to you.', 'Country-first guide', 'Delivery area, menus, pricing, discounts, and cancellation terms change by market. Start local, then narrow by meal type and budget.')}
  <section class="section-block">
    <div class="section-heading"><span>Primary markets</span><h2>Start with one of our strongest country hubs</h2><p>These pages focus on buyer fit first: what delivers locally, what type of food it offers, and what to check before ordering.</p></div>
    <div class="country-grid">
      ${countries.map((country) => `<a class="country-card" href="/countries/${countrySlug(country)}/best-meal-delivery/"><span>${escapeHtml(countryName(country))}</span><strong>Meal delivery guide</strong><small>Compare local meal kits, prepared meals, diet plans, high-protein options, family meals, and grocery shortcuts.</small></a>`).join('')}
    </div>
  </section>
  <section class="review-verdict-strip" aria-label="What to compare locally">
    <article><span>First check</span><strong>Delivery coverage</strong><p>Postcode, province, county, state, and island coverage can decide the winner before price does.</p></article>
    <article><span>Then compare</span><strong>Meal format</strong><p>Meal kits, prepared meals, frozen meals, diet plans, kids meals, and grocery shortcuts solve different jobs.</p></article>
    <article><span>Before buying</span><strong>Real price</strong><p>Look beyond intro discounts and compare normal weekly cost, delivery fees, portions, and cancellation rules.</p></article>
  </section>`;
writePage('/countries/', shell({ title: 'Meal Delivery by Country', description: 'Start with your country before comparing meal kits, prepared meals, high-protein plans, family dinners, frozen meals, and deals.', canonical: `${siteBase}/countries/`, body: countriesBody }));

const manifestHeaders = ['target_path','page_title','country','brands','page_type','status'];
fs.writeFileSync(path.join(seoDir, 'page-build-manifest-wave-001.csv'), [manifestHeaders.join(','), ...manifestRows.map(row => manifestHeaders.map(h => csvEscape(row[h])).join(','))].join('\n') + '\n', 'utf8');

const generatedPaths = ['/brand-directory/', '/countries/', ...countries.map(c => `/countries/${countrySlug(c)}/`), ...manifestRows.map(r => r.target_path)];

const sitemapPath = path.join(root, 'sitemap.xml');
let sitemapUrls = [];
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  sitemapUrls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
}
for (const p of generatedPaths) sitemapUrls.push(`${siteBase}${p}`);
sitemapUrls = [...new Set(sitemapUrls)].sort();
const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(url => `  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>${url.includes('/brand-directory/') || url.endsWith('/countries/') ? '0.85' : '0.7'}</priority></url>`).join('\n')}\n</urlset>\n`;
fs.writeFileSync(sitemapPath, sitemapXml, 'utf8');

const llmsPath = path.join(root, 'llms.txt');
let llms = fs.existsSync(llmsPath) ? fs.readFileSync(llmsPath, 'utf8') : '# Every Meal Guide\n';
const block = `\n## Wave 001 expansion surfaces\n\n- /brand-directory/: company accountability directory for tracked meal delivery brands.\n- /countries/: country-first meal delivery hubs.\n- Wave 001 generated ${manifestRows.length} local pages from the next-50 brand research batch.\n- Expansion pages are source-gated and should not be interpreted as final affiliate recommendations until verified.\n`;
if (!llms.includes('## Wave 001 expansion surfaces')) llms += block;
fs.writeFileSync(llmsPath, llms, 'utf8');

console.log(JSON.stringify({
  uniqueWavePages: manifestRows.length,
  countryIndexes: countries.length + 1,
  directoryPages: 1,
  totalGeneratedOrUpdatedPages: manifestRows.length + countries.length + 2,
  sitemapUrlCount: sitemapUrls.length,
  filesUpdated: ['seo/page-build-manifest-wave-001.csv', 'sitemap.xml', 'llms.txt'],
}, null, 2));
