import fs from "node:fs";
import path from "node:path";

const root = path.resolve(process.cwd());
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const wavePath = path.join(root, "seo", "verified-expansion-wave-002.csv");
const reportPath = path.join(root, "reports", "verified-expansion-wave-002.json");
const sitemapPath = path.join(root, "sitemap.xml");

const now = "2026-06-23";

const additions = [
  {
    country: "New Zealand",
    brand: "My Food Bag",
    category: "meal kit and prepared meals",
    priority: "1",
    site_status: "active",
    market_role: "major national meal kit and ready-made option",
    official_url: "https://www.myfoodbag.co.nz/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research affiliate or direct partner path after domain is live.",
    source_note: "Official site describes weekly meal kits, recipe choice, and ready-made option.",
  },
  {
    country: "New Zealand",
    brand: "HelloFresh",
    category: "meal kit",
    priority: "1",
    site_status: "active",
    market_role: "major national meal kit",
    official_url: "https://www.hellofresh.co.nz/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Map New Zealand affiliate path separately from US/UK program.",
    source_note: "Official NZ site promotes fresh ingredients and meal kits delivered weekly.",
  },
  {
    country: "New Zealand",
    brand: "Bargain Box",
    category: "budget meal kit",
    priority: "2",
    site_status: "active",
    market_role: "budget national meal kit",
    official_url: "https://www.bargainbox.co.nz/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research affiliate or direct partner contact.",
    source_note: "Official site positions Bargain Box as an affordable New Zealand meal kit.",
  },
  {
    country: "New Zealand",
    brand: "WOOP",
    category: "premium meal kit",
    priority: "2",
    site_status: "active",
    market_role: "premium pre-prepped meal kit",
    official_url: "https://woop.co.nz/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research direct partnership and affiliate options.",
    source_note: "Official site describes local NZ meal kits with pre-prepared ingredients and sauces.",
  },
  {
    country: "New Zealand",
    brand: "Fitfood",
    category: "prepared meals",
    priority: "2",
    site_status: "active",
    market_role: "healthy ready-made meals",
    official_url: "https://www.fitfood.co.nz/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research affiliate or direct partner contact.",
    source_note: "Official site describes ready-made and cook-at-home healthy meals delivered in New Zealand.",
  },
  {
    country: "New Zealand",
    brand: "FED.",
    category: "frozen prepared meals",
    priority: "2",
    site_status: "active",
    market_role: "chef-prepared heat-and-eat meals",
    official_url: "https://www.getfed.co.nz/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research subscription and direct partner path.",
    source_note: "Official site describes chef-prepared nutritious heat-and-eat meals delivered from $16.99 per meal.",
  },
  {
    country: "New Zealand",
    brand: "Angel Delivery",
    category: "ready meals and care packages",
    priority: "3",
    site_status: "active",
    market_role: "care packages and ready-to-eat meal gifts",
    official_url: "https://www.angeldelivery.co.nz/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Classify as gift/care-package adjacent and research partner path.",
    source_note: "Official site describes ready-to-eat handmade meals and gourmet care packages across New Zealand.",
  },
  {
    country: "New Zealand",
    brand: "Jess's Underground Kitchen",
    category: "frozen ready meals",
    priority: "3",
    site_status: "active",
    market_role: "premium ready-made meals",
    official_url: "https://www.juk.co.nz/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research direct partner and retail/direct delivery coverage.",
    source_note: "Official site describes premium ready-made meals delivered to the door.",
  },
  {
    country: "New Zealand",
    brand: "SwoleFoods",
    category: "fitness prepared meals",
    priority: "3",
    site_status: "active",
    market_role: "high-protein meal prep",
    official_url: "https://swolefoods.co.nz/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research affiliate or direct gym/fitness partnership path.",
    source_note: "Official site describes ready-made high-protein meal prep delivered in New Zealand.",
  },
  {
    country: "New Zealand",
    brand: "Jamie's Angels",
    category: "prepared meals",
    priority: "4",
    site_status: "active",
    market_role: "local senior-focused prepared meals",
    official_url: "https://www.jamiesangels.co.nz/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Treat as local/specialist listing; verify region coverage before broad rankings.",
    source_note: "Official site describes balanced heat-and-eat meals for older customers in Whanganui.",
  },
  {
    country: "Germany",
    brand: "HelloFresh",
    category: "meal kit",
    priority: "1",
    site_status: "active",
    market_role: "major national meal kit",
    official_url: "https://www.hellofresh.de/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Map DACH affiliate path separately from English-market programs.",
    source_note: "Official German site describes HelloFresh as a meal-kit/Kochbox service with menu choice and flexible subscription.",
  },
  {
    country: "Germany",
    brand: "Marley Spoon",
    category: "meal kit and prepared meals",
    priority: "1",
    site_status: "active",
    market_role: "major meal kit and prepared-meal option",
    official_url: "https://marleyspoon.de/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research German partner program and compare against HelloFresh.",
    source_note: "Official German site describes recipes, ready meals, extras, and partner-program footer link.",
  },
  {
    country: "Germany",
    brand: "Factor",
    category: "prepared meals",
    priority: "2",
    site_status: "active",
    market_role: "ready-to-heat high-protein meals",
    official_url: "https://www.factormeals.de/?locale=en-DE",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research whether Factor Germany uses a separate affiliate program.",
    source_note: "Official Germany page describes fresh ready-to-heat meals, including high-protein options.",
  },
  {
    country: "Germany",
    brand: "Loewenanteil",
    category: "fitness prepared meals",
    priority: "2",
    site_status: "active",
    market_role: "organic high-protein ready meals",
    official_url: "https://www.loewenanteil.com/en-eu",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research DTC partner path and local German wording before page polishing.",
    source_note: "Official site describes protein-rich organic ready meals delivered direct to consumer.",
  },
  {
    country: "Germany",
    brand: "Every Foods",
    category: "plant-based frozen meals",
    priority: "2",
    site_status: "active",
    market_role: "plant-based frozen prepared meals",
    official_url: "https://every-foods.com/en",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research country coverage and affiliate/direct partner path.",
    source_note: "Official site describes frozen plant-based meals delivered to the door.",
  },
  {
    country: "Germany",
    brand: "prepmymeal",
    category: "fitness prepared meals",
    priority: "2",
    site_status: "active",
    market_role: "high-protein ready meals",
    official_url: "https://prepmymeal.com/?lang=en",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research affiliate or direct partnership contact.",
    source_note: "Official site describes ready-made high-protein meals heated in about 7-8 minutes.",
  },
  {
    country: "Germany",
    brand: "wyldr",
    category: "organic meal kit",
    priority: "3",
    site_status: "active",
    market_role: "organic personalised meal kit",
    official_url: "https://www.wyldr-bio.de/",
    affiliate_program_target: "needs_research",
    evidence_status: `official_source_checked_${now}`,
    next_action: "Research partner path and localise German category pages.",
    source_note: "Official site describes a personalized organic Kochbox available across Germany.",
  },
];

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

  return {
    headers,
    rows: rows.map((cells) =>
      headers.reduce((entry, header, index) => {
        entry[header] = (cells[index] || "").trim();
        return entry;
      }, {})
    ),
  };
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function writeCsv(filePath, headers, rows) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(
    filePath,
    [headers, ...rows].map((row) => row.map(csvEscape).join(",")).join("\n") + "\n"
  );
}

function countryCopy(country) {
  if (country === "New Zealand") {
    return {
      slug: "new-zealand",
      title: "Best Meal Delivery in New Zealand",
      description: "Compare New Zealand meal kits, prepared meals, high-protein meal prep, care packages, and ready-made dinner options.",
      h1: "Best Meal Delivery in New Zealand",
      quick: "New Zealand has a useful mix of national meal kits, budget boxes, chef-prepared heat-and-eat meals, and high-protein meal prep brands. Start with format first, then compare delivery coverage and ongoing price.",
      verdict: "Best first move: compare My Food Bag, HelloFresh, Bargain Box, WOOP, Fitfood, FED., JUK, and SwoleFoods by meal format before chasing intro offers.",
    };
  }

  return {
    slug: "germany",
    title: "Best Meal Delivery in Germany",
    description: "Compare German Kochbox services, prepared meals, plant-based frozen meals, high-protein meal prep, and organic dinner boxes.",
    h1: "Best Meal Delivery in Germany",
    quick: "Germany has a strong mix of Kochbox services, ready-to-heat prepared meals, organic boxes, plant-based frozen meals, and high-protein meal prep. Compare format and language/local terms before choosing.",
    verdict: "Best first move: compare HelloFresh, Marley Spoon, Factor, Loewenanteil, Every Foods, prepmymeal, and wyldr by format and delivery coverage.",
  };
}

function formatLabel(category) {
  const value = String(category || "").toLowerCase();
  if (value.includes("meal kit")) return "Meal kit / cook yourself";
  if (value.includes("protein") || value.includes("fitness")) return "High-protein prepared meals";
  if (value.includes("plant")) return "Plant-based meals";
  if (value.includes("frozen")) return "Frozen prepared meals";
  if (value.includes("prepared") || value.includes("ready")) return "Prepared meals";
  return category || "Meal delivery";
}

function countryPageTemplate(country, rows) {
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
      <section class="freshness-bar"><p><span>Last updated</span>${now}</p><p>New country coverage is built from official source checks and marked for affiliate research.</p></section>
      <section class="page-hero compact">
        <div>
          <span class="page-kicker">New market coverage</span>
          <h1>${escapeHtml(copy.h1)}</h1>
          <p>${escapeHtml(copy.description)}</p>
        </div>
        <aside class="hero-verdict-card">
          <span>${escapeHtml(country)}</span>
          <strong>Format first, deal second</strong>
          <p>${escapeHtml(copy.verdict)}</p>
          <a href="/deals/best-meal-delivery-deals/">See global deals</a>
        </aside>
      </section>
      <section class="quick-answer"><div><h2>Quick answer</h2><p>${escapeHtml(copy.quick)}</p></div></section>
      <section class="deal-table-section">
        <div class="section-heading"><h2>${escapeHtml(country)} brands checked</h2><p>These rows are the first source-backed coverage set for this market.</p></div>
        <div class="table-wrap"><table><thead><tr><th>Company</th><th>Meal type</th><th>Role</th><th>Route</th></tr></thead><tbody>${tableRows}</tbody></table></div>
      </section>
      <section class="buying-checklist">
        <h2>Before you order in ${escapeHtml(country)}</h2>
        <ol>
          <li><span>1. Local delivery</span><p>Check postcode or delivery region before trusting any national ranking.</p></li>
          <li><span>2. Format fit</span><p>Meal kits, ready meals, frozen meals, and high-protein prep solve different problems.</p></li>
          <li><span>3. True price</span><p>Compare intro offer, second order, delivery fees, serving count, and subscription terms.</p></li>
          <li><span>4. Alternatives</span><p>Use the table before committing to the first discount you see.</p></li>
        </ol>
      </section>
      <section class="related-links"><h2>Compare next</h2><div><a href="/best/meal-delivery-services/">Global best services</a><a href="/best/prepared-meal-delivery/">Prepared meals</a><a href="/best/meal-kits/">Meal kits</a><a href="/deals/best-meal-delivery-deals/">Deals</a></div></section>
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

const parsed = parseCsv(fs.readFileSync(brandUniversePath, "utf8"));
const existingRows = parsed.rows.filter((row) => row.brand);
const keySet = new Set(existingRows.map((row) => `${row.country.toLowerCase()}::${row.brand.toLowerCase()}`));
const appended = [];

for (const addition of additions) {
  const key = `${addition.country.toLowerCase()}::${addition.brand.toLowerCase()}`;
  if (keySet.has(key)) continue;
  existingRows.push(addition);
  appended.push(addition);
  keySet.add(key);
}

const universeHeaders = [
  "country",
  "brand",
  "category",
  "priority",
  "site_status",
  "market_role",
  "official_url",
  "affiliate_program_target",
  "evidence_status",
  "next_action",
];

writeCsv(
  brandUniversePath,
  universeHeaders,
  existingRows.map((row) => universeHeaders.map((header) => row[header] || ""))
);

writeCsv(
  wavePath,
  [...universeHeaders, "source_note"],
  appended.map((row) => [...universeHeaders.map((header) => row[header] || ""), row.source_note || ""])
);

const pageUrls = [];
for (const country of ["New Zealand", "Germany"]) {
  const rows = existingRows.filter((row) => row.country === country);
  const copy = countryCopy(country);
  const pageDir = path.join(root, "countries", copy.slug, "best-meal-delivery");
  fs.mkdirSync(pageDir, { recursive: true });
  fs.writeFileSync(path.join(pageDir, "index.html"), countryPageTemplate(country, rows));
  pageUrls.push(`https://www.everymealguide.com/countries/${copy.slug}/best-meal-delivery/`);
}

ensureSitemapUrls(pageUrls);

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(
  reportPath,
  JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      attemptedRows: additions.length,
      appendedRows: appended.length,
      countryPages: pageUrls,
      wavePath,
    },
    null,
    2
  ) + "\n"
);

console.log(
  JSON.stringify(
    {
      attemptedRows: additions.length,
      appendedRows: appended.length,
      countryPages: pageUrls.length,
      wavePath,
      reportPath,
    },
    null,
    2
  )
);
