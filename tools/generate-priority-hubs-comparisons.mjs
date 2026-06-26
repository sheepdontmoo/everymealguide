import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/codex/dinner-compare';
const seoDir = path.join(root, 'seo');
const siteBase = 'https://www.everymealguide.com';
const today = 'June 23, 2026';

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
function readCsv(file) { return parseCsv(fs.readFileSync(file, 'utf8')); }
function esc(value) { return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function slug(input) { return String(input || '').toLowerCase().replace(/&/g, 'and').replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''); }
function countryName(country) { return { US: 'United States', UK: 'United Kingdom' }[country] || country; }
function writePage(urlPath, html) {
  const clean = urlPath.replace(/^\//, '').replace(/\/$/, '');
  const outDir = path.join(root, clean || '.');
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html, 'utf8');
}
function shell(title, description, canonicalPath, body) {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>${esc(title)} | Every Meal Guide</title>
    <meta name="description" content="${esc(description)}" />
    <link rel="canonical" href="${siteBase}${canonicalPath}" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body>
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="/" aria-label="Every Meal Guide home"><span class="brand-mark">EM</span><span>Every Meal Guide</span></a>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="/best/meal-delivery-services/">Best</a>
        <a href="/meal-delivery-comparisons/">Compare</a>
        <a href="/reviews/factor/">Reviews</a>
        <a href="/deals/best-meal-delivery-deals/">Deals</a>
        <a href="/countries/">Countries</a>
        <a href="/brand-directory/">Companies</a>
      </nav>
      <a class="nav-action" href="/#matcher">Find My Best Match</a>
    </header>
    <main class="money-page" id="main">${body}</main>
    <footer class="footer"><p>Every Meal Guide tracks meal delivery companies by fit, region, evidence status, and current deal quality.</p><p><a href="/methodology/">Methodology</a> · <a href="/affiliate-disclosure/">Affiliate disclosure</a> · <a href="/company-accountability/">Company accountability</a></p></footer>
  </body>
</html>
`;
}
function disclosure() { return `<section class="affiliate-disclosure"><p>Every Meal Guide may earn a commission when you click partner links. These pages use source checks and brand-status gates before making recommendations.</p></section>`; }
function fresh(copy) { return `<section class="freshness-bar"><p><span>Last updated</span>${today}</p><p>${esc(copy)}</p></section>`; }
function hero(title, intro, cardTitle, cardCopy) {
  return `<section class="page-hero compact"><div><span class="page-kicker">Buyer cockpit</span><h1>${esc(title)}</h1><p>${esc(intro)}</p></div><aside class="hero-verdict-card"><span>Best first move</span><strong>${esc(cardTitle)}</strong><p>${esc(cardCopy)}</p><a href="/brand-directory/">Check company status</a></aside></section>`;
}
function card(row, angle = '') {
  const verified = row.check_status === 'reachable';
  return `<article class="ranking-card"><div class="rank-badge"><strong>${esc(row.brand)}</strong><span>${esc(row.country)}</span></div><h2>${esc(angle || row.category)}</h2><p>${verified ? `Official source reachable (${esc(row.http_status)}). ${esc(row.page_title || 'Title not captured')}` : `Needs manual follow-up before promotion: ${esc(row.error || row.check_status || 'unverified')}`}</p><div class="pros-cons"><div><h3>Use when</h3><p>${esc(row.category)} matches the buyer's routine and country.</p></div><div><h3>Check first</h3><p>Ongoing price, delivery area, cancellation deadline, and whether the offer still applies.</p></div></div>${row.official_url ? `<div class="rank-action"><a href="${esc(row.official_url)}" rel="nofollow noopener">Official site</a></div>` : ''}</article>`;
}
function table(rows) {
  return `<div class="table-wrap"><table><thead><tr><th>Brand</th><th>Country</th><th>Source check</th><th>Official title/error</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r.brand)}</td><td>${esc(countryName(r.country))}</td><td>${esc(r.check_status)} ${esc(r.http_status)}</td><td>${esc(r.page_title || r.error || 'pending')}</td></tr>`).join('')}</tbody></table></div>`;
}

const verification = readCsv(path.join(seoDir, 'wave-001-source-verification.csv'));
const byBrand = new Map(verification.map(row => [row.brand, row]));
const allReachable = verification.filter(row => row.check_status === 'reachable');

const categoryPages = [
  {
    path: '/best/prepared-meal-delivery/',
    title: 'Best Prepared Meal Delivery Services',
    description: 'Compare prepared meal delivery services by country, convenience, evidence status, and source checks.',
    intro: 'Prepared meal delivery is the no-cook lane: ready meals, chef-prepared meals, high-protein plans, and healthy frozen options.',
    match: row => /prepared|ready|meal prep|frozen|protein|diet/i.test(row.category + ' ' + row.brand),
    cardTitle: 'No-cook fit first',
    cardCopy: 'Pick by country availability and ongoing meal cost before chasing intro discounts.'
  },
  {
    path: '/best/meal-kits/',
    title: 'Best Meal Kit Delivery Services',
    description: 'Compare meal kit services by country, recipe style, prep effort, evidence status, and source checks.',
    intro: 'Meal kits work when you still want to cook but want less planning, less shopping, and clearer weekly recipes.',
    match: row => /meal kit|recipe|pasta/i.test(row.category + ' ' + row.brand),
    cardTitle: 'Recipe routine first',
    cardCopy: 'A meal kit only works if the recipe range, prep time, and serving count fit the household.'
  },
  {
    path: '/best/meal-prep-delivery/',
    title: 'Best Meal Prep Delivery Services',
    description: 'Compare meal prep delivery services for fitness, high-protein, macro, and prepared meal buyers.',
    intro: 'Meal prep delivery is the fitness and routine lane: macro meals, high-protein plans, and prepared meals for busy weeks.',
    match: row => /prep|protein|macro|fitness|muscle/i.test(row.category + ' ' + row.brand),
    cardTitle: 'Macro claims need proof',
    cardCopy: 'Compare nutrition transparency, delivery area, freshness, and weekly price before using a fitness meal brand.'
  }
];

for (const page of categoryPages) {
  const rows = allReachable.filter(page.match).slice(0, 14);
  const body = `${disclosure()}${fresh('Category hubs use Wave 001 source checks and still require final offer verification before launch promotion.')}${hero(page.title, page.intro, page.cardTitle, page.cardCopy)}<section class="route-section"><div class="section-heading"><span>Source-backed shortlist</span><h2>${rows.length} reachable companies</h2><p>These are not final rankings. They are the first source-backed shortlist for this category.</p></div><div class="ranking-list">${rows.map(r => card(r)).join('')}</div></section><section class="route-section"><div class="section-heading"><span>Evidence table</span><h2>Source status</h2><p>Any company with blocked or missing evidence stays out of top-pick copy.</p></div>${table(rows)}</section>`;
  writePage(page.path, shell(page.title, page.description, page.path, body));
}

const comparisons = [
  ['HelloFresh vs Blue Apron', 'HelloFresh', 'Blue Apron', '/vs/hellofresh-vs-blue-apron/', 'US meal-kit comparison for mainstream recipe-box buyers.'],
  ['HelloFresh vs Chefs Plate', 'HelloFresh Canada', 'Chefs Plate', '/vs/hellofresh-vs-chefs-plate/', 'Canada meal-kit comparison for mainstream and budget buyers.'],
  ['Youfoodz vs My Muscle Chef', 'Youfoodz', 'My Muscle Chef', '/vs/youfoodz-vs-my-muscle-chef/', 'Australia prepared-meal comparison for convenience versus high-protein routine buyers.'],
  ['Gousto vs Mindful Chef', 'Gousto', 'Mindful Chef', '/vs/gousto-vs-mindful-chef/', 'UK recipe-box comparison for variety versus healthy-positioned meal kits.'],
  ['DropChef vs Clean Cut Meals', 'DropChef', 'Clean Cut Meals', '/vs/dropchef-vs-clean-cut-meals/', 'Ireland meal delivery comparison for recipe kits versus prepared meals.']
];

for (const [title, leftName, rightName, urlPath, intro] of comparisons) {
  const left = byBrand.get(leftName) || byBrand.get(leftName.replace(' Canada', ''));
  const right = byBrand.get(rightName);
  const rows = [left, right].filter(Boolean);
  const body = `${disclosure()}${fresh('Comparison pages are source-backed locally; final pricing and offer terms still need checkout confirmation before public promotion.')}${hero(title, intro, 'Compare use case, not hype', 'The better choice depends on country availability, meal type, prep effort, ongoing price, and cancellation terms.')}<section class="quick-answer route-section"><h2>Quick answer</h2><p>Use ${esc(leftName)} if it better matches the reader's country and meal type. Use ${esc(rightName)} if its source status, category, and routine fit are stronger. Do not choose either solely because of the headline discount.</p></section><section class="route-section"><div class="section-heading"><span>Source checks</span><h2>${esc(leftName)} vs ${esc(rightName)}</h2><p>Both sides need official source status before affiliate copy goes live.</p></div><div class="vs-decision-cards">${rows.map(r => card(r, r.brand === leftName ? 'Left-side fit' : 'Right-side fit')).join('')}</div></section><section class="route-section"><div class="section-heading"><span>Decision table</span><h2>Evidence before recommendation</h2><p>The page is ready for source-backed expansion, not final affiliate promotion.</p></div>${table(rows)}</section>`;
  writePage(urlPath, shell(title, intro, urlPath, body));
}

const generated = [...categoryPages.map(p => p.path), ...comparisons.map(c => c[3])];
const sitemapPath = path.join(root, 'sitemap.xml');
let sitemapUrls = [];
if (fs.existsSync(sitemapPath)) sitemapUrls = [...fs.readFileSync(sitemapPath, 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
for (const p of generated) sitemapUrls.push(siteBase + p);
sitemapUrls = [...new Set(sitemapUrls)].sort();
fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapUrls.map(url => `  <url><loc>${url}</loc><changefreq>weekly</changefreq><priority>0.8</priority></url>`).join('\n')}\n</urlset>\n`, 'utf8');

const report = { generatedAt: new Date().toISOString(), categoryPages: categoryPages.length, comparisonPages: comparisons.length, generated, sitemapUrlCount: sitemapUrls.length };
fs.writeFileSync(path.join(root, 'reports', 'priority-hubs-comparisons.json'), JSON.stringify(report, null, 2), 'utf8');
fs.writeFileSync(path.join(root, 'reports', 'priority-hubs-comparisons.md'), `# Priority Hubs and Comparisons\n\nGenerated: ${report.generatedAt}\n\n- Category hubs: ${report.categoryPages}\n- Comparison pages: ${report.comparisonPages}\n- Sitemap URL count: ${report.sitemapUrlCount}\n\n${generated.map(p => `- ${p}`).join('\n')}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
