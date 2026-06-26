import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const wavePath = path.join(root, "seo", "verified-expansion-wave-003.csv");
const reportPath = path.join(root, "reports", "verified-expansion-wave-003.json");
const sitemapPath = path.join(root, "sitemap.xml");
const now = "2026-06-23";

const additions = [
  ["France", "HelloFresh", "meal kit", "1", "major national meal kit", "https://www.hellofresh.fr/", "Official French site describes a box to cook, weekly recipes, pre-portioned ingredients, and flexible subscription."],
  ["France", "Quitoque", "meal kit", "1", "French meal kit leader", "https://www.quitoque.fr/", "Official site positions Quitoque as a French meal box with weekly recipes and delivery across France."],
  ["France", "Seazon", "prepared meals", "1", "fresh chef-prepared ready meals", "https://seazon.fr/", "Official site describes freshly cooked meals ready in 2 minutes."],
  ["France", "Cheef", "diet prepared meals", "2", "diet and balanced prepared meals", "https://www.cheef.fr/", "Official site describes home-delivered healthy, diet, balance, and health meals."],
  ["France", "Dietbon", "diet prepared meals", "2", "weight-loss meal programme", "https://www.dietbon.fr/", "Official site describes a complete weight-loss meal programme with prepared meals ready in 2 minutes."],
  ["France", "Les Commis", "meal kit", "2", "French recipe basket", "https://lescommis.com/", "Official site describes recipe baskets with pre-portioned ingredients and recipe cards."],
  ["Netherlands", "HelloFresh", "meal kit", "1", "major national meal kit", "https://www.hellofresh.nl/", "Official Dutch site describes the number one meal box in the Netherlands with fresh ingredients and recipes."],
  ["Netherlands", "Marley Spoon", "meal kit and prepared meals", "1", "meal kit with ready-meal extras", "https://marleyspoon.nl/", "Official Dutch site describes recipe meals, ready prepared meals, extras, and affiliate programme footer link."],
  ["Netherlands", "Factor", "prepared meals", "1", "fresh ready-to-eat prepared meals", "https://www.factormeals.nl/kant-en-klare-maaltijden?locale=en-NL", "Official Dutch page describes prepared meals delivered by Factor from €5.99 per meal."],
  ["Netherlands", "Ekomenu", "organic meal kit", "2", "organic lifestyle meal kit", "https://www.ekomenu.nl/hoewerkthet", "Official page says Ekomenu delivers a meal box with fresh organic ingredients and recipes to the home."],
  ["Netherlands", "Crisp Weekbox", "meal kit", "2", "seasonal local weekbox", "https://crisp.nl/weekbox", "Official page describes a Weekbox built around Dutch vegetables and seasonal recipes."],
  ["Netherlands", "Uitgekookt", "prepared meals", "2", "fresh ready meals delivered at home", "https://uitgekookt.nl/", "Official site describes healthy fresh ready meals delivered at home."],
  ["Netherlands", "Smart Meals", "fitness prepared meals", "3", "high-protein sports meals", "https://www.smart-meals.nl/en/", "Official site describes sports meals packed with proteins, vitamins, and minerals."],
  ["Netherlands", "Freasy", "frozen prepared meals", "3", "healthy frozen prepared meals", "https://freasy.nl/", "Official site describes tasteful healthy eating without cooking with meals and subscriptions."],
  ["Netherlands", "Vood", "plant-based frozen meals", "3", "vegan prepared meals", "https://voodmeals.com/en/maaltijden-aan-huis", "Official page describes healthy vegan meals delivered weekly to the home."],
  ["Netherlands", "Every Foods", "plant-based frozen meals", "3", "plant-based frozen prepared meals", "https://every-foods.nl/en", "Official Netherlands page describes frozen plant-based meals delivered every 2 weeks or monthly."],
];

const headers = ["country", "brand", "category", "priority", "site_status", "market_role", "official_url", "affiliate_program_target", "evidence_status", "next_action"];

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
  const parsedHeaders = rows.shift()?.map((header) => header.trim()) || [];
  return rows.map((cells) => parsedHeaders.reduce((entry, header, index) => {
    entry[header] = (cells[index] || "").trim();
    return entry;
  }, {}));
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filePath, fileHeaders, rows) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, [fileHeaders, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n") + "\n");
}

function slugify(value) {
  return String(value || "").toLowerCase().replace(/&/g, " and ").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value ?? "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

function countryCopy(country) {
  if (country === "France") {
    return {
      slug: "france",
      title: "Best Meal Delivery in France",
      description: "Compare French meal kits, prepared meals, diet meal programmes, recipe baskets, and ready-to-heat dinner services.",
      quick: "France has both cook-yourself recipe boxes and strong prepared-meal/diet-programme options. Start with whether you want to cook, reheat, lose weight, or just stop grocery planning.",
      verdict: "Best first move: compare HelloFresh, Quitoque, Seazon, Cheef, Dietbon, and Les Commis by format before using any offer.",
    };
  }
  return {
    slug: "netherlands",
    title: "Best Meal Delivery in the Netherlands",
    description: "Compare Dutch meal boxes, organic meal kits, prepared meals, plant-based frozen meals, and high-protein meal prep.",
    quick: "The Netherlands has a deep mix of meal boxes, prepared meals, organic boxes, vegan frozen meals, and high-protein fitness meals. Format matters more than the first discount.",
    verdict: "Best first move: compare HelloFresh, Marley Spoon, Factor, Ekomenu, Crisp Weekbox, Uitgekookt, Smart Meals, Freasy, Vood, and Every Foods.",
  };
}

function formatLabel(category) {
  const value = String(category || "").toLowerCase();
  if (value.includes("meal kit")) return "Meal kit / cook yourself";
  if (value.includes("protein") || value.includes("fitness")) return "High-protein prepared meals";
  if (value.includes("plant")) return "Plant-based meals";
  if (value.includes("frozen")) return "Frozen prepared meals";
  if (value.includes("diet")) return "Diet prepared meals";
  if (value.includes("prepared") || value.includes("ready")) return "Prepared meals";
  return category || "Meal delivery";
}

function pageTemplate(country, rows) {
  const copy = countryCopy(country);
  const tableRows = rows
    .sort((a, b) => Number(a.priority) - Number(b.priority) || a.brand.localeCompare(b.brand))
    .map((row) => {
      const slug = slugify(row.brand);
      return `<tr><td><strong>${escapeHtml(row.brand)}</strong><a class="company-table-review-link" href="/reviews/${escapeHtml(slug)}/">Review</a></td><td><span class="company-type-pill">${escapeHtml(formatLabel(row.category))}</span><small>${escapeHtml(row.category)}</small></td><td>${escapeHtml(row.market_role)}</td><td><a data-track="affiliate-click" data-brand="${escapeHtml(row.brand)}" data-affiliate-status="needs_research" href="/go/${escapeHtml(slug)}/" rel="sponsored nofollow">Track route</a></td></tr>`;
    })
    .join("");
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escapeHtml(copy.title)} | Every Meal Guide</title>
    <meta name="description" content="${escapeHtml(copy.description)}" />
    <link rel="canonical" href="https://www.everymealguide.com/countries/${escapeHtml(copy.slug)}/best-meal-delivery/" />
    <meta property="og:title" content="${escapeHtml(copy.title)} | Every Meal Guide" />
    <meta property="og:description" content="${escapeHtml(copy.description)}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="https://www.everymealguide.com/countries/${escapeHtml(copy.slug)}/best-meal-delivery/" />
    <meta name="theme-color" content="#d8412f" />
    <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body data-page-type="country">
    <a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="/"><span class="brand-mark">EM</span><span>Every Meal Guide</span></a>
      <nav class="main-nav" aria-label="Primary navigation">
        <a href="/best/meal-delivery-services/">Best</a>
        <a href="/vs/hellofresh-vs-gousto/">Compare</a>
        <a href="/reviews/factor/">Reviews</a>
        <a href="/deals/best-meal-delivery-deals/">Deals</a>
        <a href="/countries/${escapeHtml(copy.slug)}/best-meal-delivery/">Countries</a>
      </nav>
      <a class="nav-action" href="/#matcher">Find My Best Match</a>
    </header>
    <main class="money-page" id="main">
      <section class="affiliate-disclosure"><p>Every Meal Guide may earn a commission when you click partner links. New-market pages are source-led and partner routes stay pending until approval.</p></section>
      <section class="freshness-bar"><p><span>Last updated</span>${now}</p><p>Country coverage is built from official source checks and marked for affiliate research.</p></section>
      <section class="page-hero compact">
        <div><span class="page-kicker">New market coverage</span><h1>${escapeHtml(copy.title)}</h1><p>${escapeHtml(copy.description)}</p></div>
        <aside class="hero-verdict-card"><span>${escapeHtml(country)}</span><strong>Format first, deal second</strong><p>${escapeHtml(copy.verdict)}</p><a href="/deals/best-meal-delivery-deals/">See global deals</a></aside>
      </section>
      <section class="quick-answer"><div><h2>Quick answer</h2><p>${escapeHtml(copy.quick)}</p></div></section>
      <section class="deal-table-section"><div class="section-heading"><h2>${escapeHtml(country)} brands checked</h2><p>These rows are the first source-backed coverage set for this market.</p></div><div class="table-wrap"><table><thead><tr><th>Company</th><th>Meal type</th><th>Role</th><th>Route</th></tr></thead><tbody>${tableRows}</tbody></table></div></section>
      <section class="buying-checklist"><h2>Before you order in ${escapeHtml(country)}</h2><ol><li><span>1. Local delivery</span><p>Check postcode or delivery area before trusting any national ranking.</p></li><li><span>2. Format fit</span><p>Meal kits, prepared meals, frozen meals, diet plans, and high-protein prep solve different problems.</p></li><li><span>3. True price</span><p>Compare intro offer, second order, delivery fees, serving count, and subscription terms.</p></li><li><span>4. Alternatives</span><p>Use the table before committing to the first discount you see.</p></li></ol></section>
      <section class="related-links"><h2>Compare next</h2><div><a href="/best/meal-delivery-services/">Global best services</a><a href="/best/prepared-meal-delivery/">Prepared meals</a><a href="/best/meal-kits/">Meal kits</a><a href="/deals/best-meal-delivery-deals/">Deals</a></div></section>
    </main>
    <footer class="footer"><p>Every Meal Guide</p><nav aria-label="Footer navigation"><a href="/best/meal-delivery-services/">Best</a><a href="/vs/hellofresh-vs-gousto/">Compare</a><a href="/reviews/factor/">Reviews</a><a href="/deals/best-meal-delivery-deals/">Deals</a><a href="/meal-delivery-comparisons/">All Comparisons</a><a href="/latest-offer-checks/">Offer Checks</a><a href="/methodology/">Methodology</a><a href="/affiliate-disclosure/">Affiliate Disclosure</a><a href="/company-accountability/">Company Accountability</a><a href="/privacy/">Privacy</a><a href="/contact/">Contact</a></nav><p>Affiliate links may earn us a commission. Rankings are editorial and deal-aware.</p></footer>
    <script src="/script.js"></script>
  </body>
</html>
`;
}

function ensureSitemapUrls(urls) {
  const existing = fs.existsSync(sitemapPath) ? fs.readFileSync(sitemapPath, "utf8") : "";
  const existingUrls = new Set([...existing.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]));
  const nextUrls = [...existingUrls, ...urls].sort();
  fs.writeFileSync(sitemapPath, `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${nextUrls.map((url) => `  <url><loc>${url}</loc></url>`).join("\n")}\n</urlset>\n`);
}

const existingRows = fs.existsSync(brandUniversePath) ? parseCsv(fs.readFileSync(brandUniversePath, "utf8")).filter((row) => row.brand) : [];
const keys = new Set(existingRows.map((row) => `${row.country.toLowerCase()}::${row.brand.toLowerCase()}`));
const appended = [];

for (const [country, brand, category, priority, marketRole, officialUrl, sourceNote] of additions) {
  const key = `${country.toLowerCase()}::${brand.toLowerCase()}`;
  if (keys.has(key)) continue;
  const row = {
    country,
    brand,
    category,
    priority,
    site_status: "active",
    market_role: marketRole,
    official_url: officialUrl,
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research affiliate or direct partner path after domain is live.",
    source_note: sourceNote,
  };
  existingRows.push(row);
  appended.push(row);
  keys.add(key);
}

writeCsv(brandUniversePath, headers, existingRows.map((row) => headers.map((header) => row[header] || "")));
writeCsv(wavePath, [...headers, "source_note"], appended.map((row) => [...headers.map((header) => row[header] || ""), row.source_note]));

const pageUrls = [];
for (const country of ["France", "Netherlands"]) {
  const rows = existingRows.filter((row) => row.country === country);
  const copy = countryCopy(country);
  const pageDir = path.join(root, "countries", copy.slug, "best-meal-delivery");
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, "index.html"), pageTemplate(country, rows));
  pageUrls.push(`https://www.everymealguide.com/countries/${copy.slug}/best-meal-delivery/`);
}

ensureSitemapUrls(pageUrls);
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, JSON.stringify({ generatedAt: new Date().toISOString(), attemptedRows: additions.length, appendedRows: appended.length, countryPages: pageUrls, wavePath }, null, 2) + "\n");

console.log(JSON.stringify({ attemptedRows: additions.length, appendedRows: appended.length, countryPages: pageUrls.length, wavePath, reportPath }, null, 2));
