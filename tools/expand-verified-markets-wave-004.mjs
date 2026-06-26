import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const brandUniversePath = path.join(root, "seo", "global-brand-universe.csv");
const waveCsvPath = path.join(root, "seo", "verified-expansion-wave-004.csv");
const waveReportPath = path.join(root, "reports", "verified-expansion-wave-004.json");
const sitemapPath = path.join(root, "sitemap.xml");

const additions = [
  {
    country: "spain",
    brand: "Wetaca",
    category: "prepared meals",
    priority: "1",
    site_status: "active",
    market_role: "Spain prepared-meal leader for fresh heat-and-eat weekly meals",
    official_url: "https://wetaca.com/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_url_reachable_needs_manual_content_check_2026-06-23",
    next_action: "Manual content check, then create Wetaca review and Spain comparison placement"
  },
  {
    country: "spain",
    brand: "Eatsana",
    category: "prepared meals",
    priority: "2",
    site_status: "active",
    market_role: "Healthy ready-to-eat meals delivered across Spain",
    official_url: "https://eatsana.es/en",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Build prepared-meals review angle and partnership outreach"
  },
  {
    country: "spain",
    brand: "DinDins",
    category: "prepared meals",
    priority: "2",
    site_status: "active",
    market_role: "Fresh and frozen chef-cooked prepared meals delivered in Spain",
    official_url: "https://dindins.es/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Build Spain prepared-meals comparison block"
  },
  {
    country: "spain",
    brand: "Phosh Food",
    category: "prepared meals",
    priority: "3",
    site_status: "active",
    market_role: "Chef-prepared meal prep delivery across mainland Spain and Portugal",
    official_url: "https://www.phoshfood.com/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Confirm coverage area and add to Spain/Portugal expansion backlog"
  },
  {
    country: "italy",
    brand: "Nutribees",
    category: "prepared meals",
    priority: "1",
    site_status: "active",
    market_role: "Ready healthy dishes delivered refrigerated throughout Italy",
    official_url: "https://www.nutribees.com/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Create Italy prepared-meals review and partnership target"
  },
  {
    country: "italy",
    brand: "Mi Piace Cosi",
    category: "diet prepared meals",
    priority: "2",
    site_status: "active",
    market_role: "Diet-program prepared meals delivered in Italy",
    official_url: "https://mipiacecosi.it/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Position in weight-loss and diet meal-plan comparison"
  },
  {
    country: "italy",
    brand: "Cortilia",
    category: "recipe kits and grocery",
    priority: "3",
    site_status: "active",
    market_role: "Online grocery and recipe-kit style meal planning option in Italy",
    official_url: "https://www.cortilia.it/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_needs_category_review_2026-06-23",
    next_action: "Confirm recipe-kit depth before treating as a meal-kit competitor"
  },
  {
    country: "italy",
    brand: "My Cooking Box",
    category: "meal kit",
    priority: "3",
    site_status: "active",
    market_role: "Italian meal kits with portioned ingredients and recipes",
    official_url: "https://www.mycookingbox.com/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Add to premium Italian meal-kit cluster"
  },
  {
    country: "italy",
    brand: "Fratelli Desideri",
    category: "premium meal kit",
    priority: "3",
    site_status: "active",
    market_role: "Premium restaurant-style meal kits for Italian shoppers",
    official_url: "https://fratellidesideri.com/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Add to premium and giftable meal-kit cluster"
  },
  {
    country: "sweden",
    brand: "HelloFresh",
    category: "meal kit",
    priority: "1",
    site_status: "active",
    market_role: "Large Swedish meal-kit subscription with weekly recipes",
    official_url: "https://www.hellofresh.se/",
    affiliate_program_target: "affiliate network or direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Create Sweden comparison and affiliate application target"
  },
  {
    country: "sweden",
    brand: "Linas Matkasse",
    category: "meal kit",
    priority: "1",
    site_status: "active",
    market_role: "Major Swedish meal-kit provider with broad dinner choice",
    official_url: "https://www.linasmatkasse.se/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Position as Sweden incumbent against HelloFresh and Factor"
  },
  {
    country: "sweden",
    brand: "Factor",
    category: "prepared meals",
    priority: "2",
    site_status: "active",
    market_role: "Ready-made meal delivery brand active in Sweden",
    official_url: "https://www.factormeals.se/fardigratter?locale=en-SE",
    affiliate_program_target: "affiliate network or direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Create Sweden prepared-meals comparison placement"
  },
  {
    country: "sweden",
    brand: "Matkomfort",
    category: "meal kit",
    priority: "3",
    site_status: "active",
    market_role: "Premium prepared meal-kit option around Stockholm",
    official_url: "https://www.matkomfort.se/",
    affiliate_program_target: "direct partnership",
    evidence_status: "third_party_source_checked_needs_official_content_check_2026-06-23",
    next_action: "Manual official-page check before top placement"
  },
  {
    country: "denmark",
    brand: "HelloFresh",
    category: "meal kit",
    priority: "1",
    site_status: "active",
    market_role: "Large Danish meal-kit subscription with weekly recipes",
    official_url: "https://www.hellofresh.dk/",
    affiliate_program_target: "affiliate network or direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Create Denmark comparison and affiliate application target"
  },
  {
    country: "denmark",
    brand: "Aarstiderne",
    category: "organic meal kit",
    priority: "1",
    site_status: "active",
    market_role: "Organic Danish meal boxes, produce boxes, and groceries",
    official_url: "https://www.aarstiderne.com/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Position as organic/local alternative in Denmark"
  },
  {
    country: "denmark",
    brand: "RetNemt",
    category: "meal kit",
    priority: "2",
    site_status: "active",
    market_role: "Danish meal-kit provider with recipe boxes delivered to the door",
    official_url: "https://www.retnemt.dk/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Build Denmark meal-kit comparison block"
  },
  {
    country: "denmark",
    brand: "Skagenfood",
    category: "seafood meal kit",
    priority: "2",
    site_status: "active",
    market_role: "Fish and dinner boxes delivered directly in Denmark",
    official_url: "https://skagenfood.dk/da-dk",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Build seafood and pescatarian comparison angle"
  },
  {
    country: "norway",
    brand: "HelloFresh",
    category: "meal kit",
    priority: "1",
    site_status: "active",
    market_role: "Large Norwegian meal-kit subscription with weekly recipes",
    official_url: "https://www.hellofresh.no/",
    affiliate_program_target: "affiliate network or direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Create Norway comparison and affiliate application target"
  },
  {
    country: "norway",
    brand: "Godtlevert",
    category: "meal kit",
    priority: "1",
    site_status: "active",
    market_role: "Major Norwegian meal-kit and grocery add-on provider",
    official_url: "https://www.godtlevert.no/",
    affiliate_program_target: "direct partnership",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Position as Norway incumbent and partnership target"
  },
  {
    country: "norway",
    brand: "Adams Matkasse",
    category: "meal kit",
    priority: "4",
    site_status: "rebranded_to_godtlevert",
    market_role: "Former Norwegian meal-kit brand now accounted for under Godtlevert",
    official_url: "https://www.adamsmatkasse.no/",
    affiliate_program_target: "not active; route to Godtlevert",
    evidence_status: "official_source_checked_2026-06-23",
    next_action: "Keep accounted for and route users to Godtlevert rather than treating as active"
  }
];

const countryMeta = {
  spain: {
    label: "Spain",
    url: "/countries/spain/best-meal-delivery/",
    title: "Best Meal Delivery Services in Spain",
    h1: "Best meal delivery services in Spain",
    intro:
      "Spain is a prepared-meals-first market for this build. HelloFresh has pulled out of Spain, so the useful comparison starts with heat-and-eat brands like Wetaca, Eatsana, DinDins, and Phosh Food rather than pretending the category looks like the UK or US.",
    verdict:
      "Start with Wetaca for mainstream prepared meals, Eatsana for healthier ready-to-eat meals, DinDins for frozen and fresh convenience, and Phosh Food if you want meal-prep style delivery across mainland Spain."
  },
  italy: {
    label: "Italy",
    url: "/countries/italy/best-meal-delivery/",
    title: "Best Meal Delivery Services in Italy",
    h1: "Best meal delivery services in Italy",
    intro:
      "Italy is less about one dominant mainstream meal-kit player and more about specialist prepared meals, diet programmes, grocery-led meal planning, and premium Italian meal kits.",
    verdict:
      "Nutribees is the first prepared-meals target, Mi Piace Cosi covers diet meal programmes, and My Cooking Box or Fratelli Desideri fit shoppers who want a more premium cook-at-home experience."
  },
  sweden: {
    label: "Sweden",
    url: "/countries/sweden/best-meal-delivery/",
    title: "Best Meal Delivery Services in Sweden",
    h1: "Best meal delivery services in Sweden",
    intro:
      "Sweden has a mature meal-kit market with strong cook-at-home options plus a prepared-meals lane. The first comparison should make the HelloFresh vs Linas Matkasse vs Factor choice obvious.",
    verdict:
      "Use HelloFresh for flexible recipe choice, Linas Matkasse for an established Swedish meal-box provider, and Factor if you want ready-made meals instead of cooking."
  },
  denmark: {
    label: "Denmark",
    url: "/countries/denmark/best-meal-delivery/",
    title: "Best Meal Delivery Services in Denmark",
    h1: "Best meal delivery services in Denmark",
    intro:
      "Denmark is a strong meal-kit market with a useful spread: mainstream recipe boxes, organic boxes, quick dinner boxes, and seafood-led options.",
    verdict:
      "HelloFresh is the mainstream comparator, Aarstiderne is the organic/local angle, RetNemt is a direct Danish meal-kit alternative, and Skagenfood gives the page a fish and seafood wedge."
  },
  norway: {
    label: "Norway",
    url: "/countries/norway/best-meal-delivery/",
    title: "Best Meal Delivery Services in Norway",
    h1: "Best meal delivery services in Norway",
    intro:
      "Norway should be built around Godtlevert and HelloFresh first. Adams Matkasse is still important for user searches, but it needs to be treated as rebranded/accounted-for rather than as a separate active top pick.",
    verdict:
      "Compare Godtlevert for the local incumbent option against HelloFresh for international recipe-box choice, and route Adams Matkasse searchers clearly to the current Godtlevert path."
  }
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

function toCsvCell(value) {
  const clean = String(value ?? "");
  if (!/[",\n\r]/.test(clean)) return clean;
  return `"${clean.replaceAll('"', '""')}"`;
}

function toCsv(rows) {
  return `${rows.map((row) => row.map(toCsvCell).join(",")).join("\n")}\n`;
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
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function readBrandUniverse() {
  const rows = parseCsv(fs.readFileSync(brandUniversePath, "utf8"));
  const header = rows[0];
  const records = rows.slice(1).map((row) =>
    Object.fromEntries(header.map((column, index) => [column, row[index] ?? ""]))
  );
  return { header, records };
}

function writeBrandUniverse(header, records) {
  fs.writeFileSync(
    brandUniversePath,
    toCsv([header, ...records.map((record) => header.map((column) => record[column] ?? ""))])
  );
}

function writeWaveCsv(header, records) {
  fs.writeFileSync(
    waveCsvPath,
    toCsv([header, ...records.map((record) => header.map((column) => record[column] ?? ""))])
  );
}

function brandUrl(brand) {
  return `/reviews/${slugify(brand)}/`;
}

function writeCountryPages(records) {
  for (const [country, meta] of Object.entries(countryMeta)) {
    const countryRecords = records
      .filter((record) => record.country === country)
      .sort((a, b) => Number(a.priority || 99) - Number(b.priority || 99));

    const activeRecords = countryRecords.filter((record) => record.site_status === "active");
    const accountedRecords = countryRecords.filter((record) => record.site_status !== "active");
    const pageDir = path.join(root, "countries", country, "best-meal-delivery");
    fs.mkdirSync(pageDir, { recursive: true });

    const rows = countryRecords
      .map(
        (record) => `
              <tr>
                <td><a href="${brandUrl(record.brand)}">${htmlEscape(record.brand)}</a></td>
                <td>${htmlEscape(record.category)}</td>
                <td>${htmlEscape(record.market_role)}</td>
                <td>${htmlEscape(record.site_status)}</td>
                <td><a href="${htmlEscape(record.official_url)}" rel="nofollow noopener">Official site</a></td>
              </tr>`
      )
      .join("");

    const cards = activeRecords
      .slice(0, 4)
      .map(
        (record, index) => `
            <article class="brand-card">
              <span class="eyebrow">#${index + 1} ${htmlEscape(record.category)}</span>
              <h3>${htmlEscape(record.brand)}</h3>
              <p>${htmlEscape(record.market_role)}</p>
              <a class="text-link" href="${brandUrl(record.brand)}">Read the ${htmlEscape(record.brand)} review</a>
            </article>`
      )
      .join("");

    const accountedBlock = accountedRecords.length
      ? `<section class="content-section">
          <h2>Accounted-for inactive or changed brands</h2>
          <p>These brands still matter for search demand, but we should not present them as normal active recommendations.</p>
          <ul>${accountedRecords
            .map((record) => `<li><strong>${htmlEscape(record.brand)}:</strong> ${htmlEscape(record.next_action)}</li>`)
            .join("")}</ul>
        </section>`
      : "";

    const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${htmlEscape(meta.title)} | Every Meal Guide</title>
    <meta name="description" content="Compare ${htmlEscape(meta.label)} meal delivery, meal kit, prepared meal, and diet meal options with evidence-backed brand coverage." />
    <link rel="canonical" href="https://www.everymealguide.com${meta.url}" />
    <link rel="stylesheet" href="/styles.css" />
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
          <span class="eyebrow">${htmlEscape(meta.label)} market guide</span>
          <h1>${htmlEscape(meta.h1)}</h1>
          <p>${htmlEscape(meta.intro)}</p>
          <div class="hero-actions">
            <a class="button primary" href="#rankings">See the shortlist</a>
            <a class="button ghost" href="#all-brands">View all accounted brands</a>
          </div>
        </div>
        <aside class="deal-card">
          <span class="eyebrow">Fast verdict</span>
          <p>${htmlEscape(meta.verdict)}</p>
        </aside>
      </section>

      <section class="content-section" id="rankings">
        <div class="section-heading">
          <span class="eyebrow">Best starting points</span>
          <h2>${htmlEscape(meta.label)} shortlist</h2>
          <p>These are the first brands to review, monetize, and update with live offers once affiliate approval is in place.</p>
        </div>
        <div class="brand-grid">
          ${cards}
        </div>
      </section>

      <section class="content-section" id="all-brands">
        <div class="section-heading">
          <span class="eyebrow">Coverage ledger</span>
          <h2>Every ${htmlEscape(meta.label)} brand currently accounted for</h2>
          <p>This table is deliberately commercial: it separates active recommendations from brands that need checking, routing, or partnership work.</p>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>Type</th>
                <th>Why it matters</th>
                <th>Status</th>
                <th>Source</th>
              </tr>
            </thead>
            <tbody>${rows}
            </tbody>
          </table>
        </div>
      </section>

      ${accountedBlock}

      <section class="content-section">
        <h2>How this page makes money</h2>
        <p>Every Meal Guide should monetize this page through affiliate links where available, direct partner deals with prepared-meal brands, sponsored placements that stay clearly labelled, and email capture for offer alerts. Until a deal is approved, links stay as official-source routes rather than fake affiliate claims.</p>
      </section>
    </main>
  </body>
</html>
`;

    fs.writeFileSync(path.join(pageDir, "index.html"), html);
  }
}

function updateSitemap() {
  if (!fs.existsSync(sitemapPath)) return;
  let sitemap = fs.readFileSync(sitemapPath, "utf8");

  for (const meta of Object.values(countryMeta)) {
    const loc = `https://www.everymealguide.com${meta.url}`;
    if (sitemap.includes(`<loc>${loc}</loc>`)) continue;
    sitemap = sitemap.replace(
      "</urlset>",
      `  <url>\n    <loc>${loc}</loc>\n  </url>\n</urlset>`
    );
  }

  fs.writeFileSync(sitemapPath, sitemap);
}

const { header, records } = readBrandUniverse();
const existingKeys = new Set(records.map((record) => `${record.country}::${record.brand}`.toLowerCase()));
const newRecords = [];

for (const addition of additions) {
  const key = `${addition.country}::${addition.brand}`.toLowerCase();
  if (existingKeys.has(key)) continue;
  records.push(addition);
  newRecords.push(addition);
  existingKeys.add(key);
}

writeBrandUniverse(header, records);
writeWaveCsv(header, additions);
writeCountryPages(records);
updateSitemap();

fs.mkdirSync(path.dirname(waveReportPath), { recursive: true });
fs.writeFileSync(
  waveReportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      wave: "004",
      countries: Object.keys(countryMeta),
      rowsAdded: newRecords.length,
      countryPagesWritten: Object.values(countryMeta).map((meta) => meta.url),
      waveRows: additions.length,
      sourceOfTruth: path.relative(root, brandUniversePath),
      waveCsv: path.relative(root, waveCsvPath)
    },
    null,
    2
  )}\n`
);

console.log(`Wave 004 complete: ${newRecords.length} brand-market rows added.`);
console.log(`Country pages: ${Object.values(countryMeta).map((meta) => meta.url).join(", ")}`);
