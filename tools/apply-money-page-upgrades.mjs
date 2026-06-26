import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const queuePath = path.join(root, "seo", "money-page-upgrade-queue.csv");
const cashPath = path.join(root, "seo", "cash-route-readiness-by-brand.csv");
const appliedPath = path.join(root, "seo", "money-page-upgrades-applied.csv");
const reportPath = path.join(root, "reports", "money-page-upgrades-applied.json");
const limit = Number(process.argv[2] || 25);

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

function filePathFromUrl(url) {
  const clean = String(url || "").replace(/^\/+/, "").replace(/\/?$/, "/index.html");
  return path.join(root, clean);
}

function brandList(value) {
  return String(value || "")
    .split("|")
    .map((brand) => brand.trim())
    .filter(Boolean);
}

function cashMap(rows) {
  const map = new Map();
  for (const row of rows) map.set(slugify(row.brand), row);
  return map;
}

function sourcesFor(rows) {
  return [...new Set(rows.flatMap((row) => String(row.official_urls || "").split("|").map((url) => url.trim()).filter(Boolean)))].slice(0, 10);
}

function readableTopic(row) {
  const topic = row.topic || "meal delivery";
  return topic.replace(/\s+/g, " ").trim();
}

function hostLabel(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return String(url || "").replace(/^https?:\/\//, "").replace(/^www\./, "").split("/")[0] || "source";
  }
}

function upgradeBlock(row, cashRows) {
  const brands = brandList(row.lead_brands).slice(0, 6);
  const routeRows = brands.map((brand) => cashRows.get(slugify(brand))).filter(Boolean);
  const sources = sourcesFor(routeRows);
  const topThree = brands.slice(0, 3);
  const topic = readableTopic(row);
  const sourceLinks = sources.length
    ? sources.map((url) => `<a href="${htmlEscape(url)}" rel="nofollow noopener">${htmlEscape(hostLabel(url))}</a>`).join("")
    : `<span>Official source checks required before stronger claims are published.</span>`;
  const cards = topThree
    .map((brand, index) => {
      const cash = cashRows.get(slugify(brand));
      const route = cash?.tracked_go_url || `/go/${slugify(brand)}/`;
      const review = cash?.review_url || `/reviews/${slugify(brand)}/`;
      const pathText = "Check delivery fit, menu format, current offer, and subscription terms";
      return `
          <article class="money-route-card">
            <span>#${index + 1} option</span>
            <h3>${htmlEscape(brand)}</h3>
            <p>${htmlEscape(pathText)} before ordering.</p>
            <div>
              <a class="button primary" href="${htmlEscape(route)}">Check current offer</a>
              <a class="button ghost" href="${htmlEscape(review)}">Read review</a>
            </div>
          </article>`;
    })
    .join("");
  const rows = brands
    .map((brand) => {
      const cash = cashRows.get(slugify(brand));
      return `
              <tr>
                <td>${htmlEscape(brand)}</td>
                <td>Delivery area, menu fit, current offer, and subscription terms</td>
                <td><a href="${htmlEscape(cash?.tracked_go_url || `/go/${slugify(brand)}/`)}">Check offer</a></td>
                <td><a href="${htmlEscape(cash?.review_url || `/reviews/${slugify(brand)}/`)}">Review</a></td>
              </tr>`;
    })
    .join("");

  return `
      <!-- money-upgrade:start -->
      <section class="content-section money-upgrade-panel">
        <div class="section-heading">
          <span class="eyebrow">Upgrade applied</span>
          <h2>Fast answer for ${htmlEscape(topic)} shoppers</h2>
          <p>Start with ${htmlEscape(topThree.join(", "))}. Compare the meal format first, then weekly cost after introductory offers, delivery coverage, nutrition fit, and whether the current terms still make sense after the introductory offer.</p>
        </div>
        <div class="money-route-grid">${cards}
        </div>
      </section>

      <section class="content-section money-upgrade-panel">
        <div class="section-heading">
          <span class="eyebrow">Buying checklist</span>
          <h2>What to compare before buying</h2>
          <p>This checklist is designed to stop weak clicks and improve buyer trust before outbound routing.</p>
        </div>
        <ol class="money-checklist">
          <li><strong>Meal format</strong><span>Meal kit, prepared meal, diet plan, frozen meal, or grocery dinner box.</span></li>
          <li><strong>True weekly cost</strong><span>Look past the first-box discount and compare the normal weekly price.</span></li>
          <li><strong>Nutrition fit</strong><span>Check protein, calories, allergens, diet filters, and portion size.</span></li>
          <li><strong>Flexibility</strong><span>Confirm pause, skip, cancel, delivery area, and minimum-order rules.</span></li>
          <li><strong>Offer terms</strong><span>Confirm the current offer, renewal price, delivery area, and cancellation rules before ordering.</span></li>
        </ol>
      </section>

      <section class="content-section money-upgrade-panel">
        <div class="section-heading">
          <span class="eyebrow">Next step</span>
          <h2>Choose faster from here</h2>
          <p>If you are not ready to click an offer yet, use these buyer paths to narrow the decision before spending money.</p>
        </div>
        <div class="choice-grid">
          <a class="choice-card featured" href="/start/">
            <span>Personal match</span>
            <strong>Answer 4 questions</strong>
            <p>Get pointed to the best meal format, local guide, and next shortlist in under 60 seconds.</p>
          </a>
          <a class="choice-card" href="/guides/how-to-choose-meal-delivery/">
            <span>Buyer guide</span>
            <strong>Know what type fits</strong>
            <p>Compare meal kits, prepared meals, protein plans, budget options, frozen meals, and family choices.</p>
          </a>
          <a class="choice-card" href="/deals/best-meal-delivery-deals/">
            <span>Deal check</span>
            <strong>Compare offers carefully</strong>
            <p>Use deals after you know the format fits; check the normal price and cancellation rules before ordering.</p>
          </a>
          <a class="choice-card" href="/meal-delivery-comparisons/">
            <span>Head to head</span>
            <strong>Compare two brands</strong>
            <p>Open brand-vs-brand guides when you already have two services in mind.</p>
          </a>
        </div>
      </section>

      <section class="content-section money-upgrade-panel">
        <div class="section-heading">
          <span class="eyebrow">Offer checks</span>
          <h2>Top offer checks on this page</h2>
          <p>These offer checks help readers compare current options without implying a partner relationship unless it is clearly stated.</p>
        </div>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Brand</th>
                <th>What to check</th>
                <th>Offer</th>
                <th>Review</th>
              </tr>
            </thead>
            <tbody>${rows}
            </tbody>
          </table>
        </div>
      </section>

      <section class="content-section money-upgrade-panel">
        <div class="section-heading">
          <span class="eyebrow">Trust and sources</span>
          <h2>How this page should stay honest</h2>
          <p>Every Meal Guide should update this page from official brand pages, visible menu/offer checks, current offer notes, and real testing notes only when we actually test a brand. No fake prices, fake ratings, or fake affiliate claims.</p>
        </div>
        <div class="source-chip-grid">${sourceLinks}</div>
        <div class="money-faq-grid">
          <article><h3>Which option is best for most people?</h3><p>Start with the highest-fit option above, then rule it out if the format, delivery area, or nutrition profile does not match your week.</p></article>
          <article><h3>Which option is cheapest?</h3><p>Compare the normal weekly cost after the intro discount. Cheap first boxes can hide expensive recurring weeks.</p></article>
          <article><h3>Which option needs the least cooking?</h3><p>Choose prepared, frozen, or diet meal delivery if you want to avoid cooking. Choose meal kits if you still want fresh cooking with less planning.</p></article>
        </div>
      </section>
      <!-- money-upgrade:end -->`;
}

function applyBlock(html, block) {
  const pattern = /<!-- money-upgrade:start -->[\s\S]*?<!-- money-upgrade:end -->/;
  if (pattern.test(html)) return html.replace(pattern, block.trim());
  return html.replace(/\n\s*<\/main>/, `${block}\n    </main>`);
}

const queueRows = readCsv(queuePath).slice(0, limit);
const cashRows = cashMap(readCsv(cashPath));
const applied = [];

for (const row of queueRows) {
  const targetPath = filePathFromUrl(row.url);
  if (!fs.existsSync(targetPath)) {
    applied.push([row.priority_rank, row.page_type, row.url, "missing_file", "", ""]);
    continue;
  }
  const html = fs.readFileSync(targetPath, "utf8");
  const block = upgradeBlock(row, cashRows);
  fs.writeFileSync(targetPath, applyBlock(html, block));
  const brands = brandList(row.lead_brands).slice(0, 6);
  const sourceCount = sourcesFor(brands.map((brand) => cashRows.get(slugify(brand))).filter(Boolean)).length;
  applied.push([row.priority_rank, row.page_type, row.url, "upgraded", brands.join(" | "), sourceCount]);
}

fs.mkdirSync(path.dirname(appliedPath), { recursive: true });
fs.writeFileSync(
  appliedPath,
  toCsv([["priority_rank", "page_type", "url", "status", "brands", "source_count"], ...applied])
);

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      requestedLimit: limit,
      upgraded: applied.filter((row) => row[3] === "upgraded").length,
      missing: applied.filter((row) => row[3] === "missing_file").length,
      appliedPath: path.relative(root, appliedPath)
    },
    null,
    2
  )}\n`
);

console.log(JSON.stringify({ upgraded: applied.filter((row) => row[3] === "upgraded").length, appliedPath, reportPath }, null, 2));
