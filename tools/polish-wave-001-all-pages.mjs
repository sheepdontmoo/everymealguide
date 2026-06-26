import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/codex/dinner-compare';
const seoDir = path.join(root, 'seo');
const reportsDir = path.join(root, 'reports');
fs.mkdirSync(reportsDir, { recursive: true });

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

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function titleCase(input) {
  return String(input || '')
    .replace(/-/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function pageFile(targetPath) {
  const clean = targetPath.replace(/^\//, '').replace(/\/$/, '');
  return path.join(root, clean, 'index.html');
}

function countryName(country) {
  return { US: 'United States', UK: 'United Kingdom' }[country] || country;
}

function splitBrands(value) {
  return String(value || '').split(';').map(x => x.trim()).filter(Boolean);
}

function brandEvidence(brand, verificationByBrand) {
  const v = verificationByBrand.get(brand);
  if (!v) return {
    status: 'pending',
    sourceLine: 'Source status is pending in the local coverage queue.',
    fitLine: 'Use this entry as coverage context until the official source is checked.',
    riskLine: 'Do not promote this brand as a top recommendation yet.'
  };
  const status = v.check_status;
  const reachable = status === 'reachable' || /source_found|rebranded/.test(status);
  return {
    status,
    sourceLine: reachable
      ? `Source evidence exists for ${brand}: ${v.page_title || v.final_url || v.official_url}.`
      : `${brand} still needs manual source follow-up: ${v.error || status}.`,
    fitLine: reachable
      ? `${brand} can be discussed as a tracked option, but price, offer terms, and delivery area still need final checkout confirmation.`
      : `${brand} should stay comparison-only or watchlist until the official ordering path is confirmed.`,
    riskLine: reachable
      ? 'The main risk is over-weighting intro discounts without checking recurring cost and cancellation terms.'
      : 'The main risk is publishing a recommendation before the source and ordering path are clean.'
  };
}

function intentFor(row) {
  const text = `${row.page_title || ''} ${row.page_type || ''} ${row.brands || ''}`.toLowerCase();
  if (text.includes('vs')) return 'comparison';
  if (text.includes('prepared') || text.includes('meal prep') || text.includes('ready')) return 'prepared';
  if (text.includes('kit')) return 'meal_kit';
  if (text.includes('vegan') || text.includes('plant')) return 'plant_based';
  if (text.includes('weight') || text.includes('diet')) return 'diet';
  return 'coverage';
}

function polishSection(row, verificationByBrand) {
  const brands = splitBrands(row.brands);
  const evidence = brands.map(brand => ({ brand, ...brandEvidence(brand, verificationByBrand) }));
  const intent = intentFor(row);
  const title = row.page_title || titleCase(row.target_path.split('/').filter(Boolean).at(-1));
  const country = countryName(row.country || '');
  const sourceReady = evidence.filter(e => e.status === 'reachable' || /source_found|rebranded/.test(e.status)).length;
  const manual = evidence.length - sourceReady;

  const intentCopy = {
    comparison: {
      use: 'Use this page when the reader is already choosing between two named services and needs a practical tie-breaker.',
      avoid: 'Do not turn the page into a generic brand advert. The winning recommendation must depend on country, meal type, prep effort, and recurring cost.',
      angle: 'Comparison pages should answer one buying question fast: which service fits this household better this week?'
    },
    prepared: {
      use: 'Use this page for buyers who want dinner solved without cooking: prepared meals, meal prep, fitness meals, and ready meals.',
      avoid: 'Do not rank by headline discount alone. Prepared-meal buyers care about freshness, portion size, delivery days, nutrition transparency, and repeat price.',
      angle: 'Prepared-meal pages should separate no-cook convenience from true long-term value.'
    },
    meal_kit: {
      use: 'Use this page for buyers who still want to cook but want less planning, less shopping, and cleaner recipe choice.',
      avoid: 'Do not recommend a meal kit to someone who wants zero cooking or does not have delivery coverage in their country.',
      angle: 'Meal-kit pages should make prep time, recipe variety, serving count, and follow-on price obvious.'
    },
    plant_based: {
      use: 'Use this page for vegan, vegetarian, and plant-forward buyers who need a specialist option rather than a token menu filter.',
      avoid: 'Do not assume every plant-based brand fits every diet or country. Check availability and ingredient transparency.',
      angle: 'Plant-based pages should distinguish dedicated vegan services from mainstream brands with plant-based options.'
    },
    diet: {
      use: 'Use this page for buyers comparing structured meal plans, weight-loss services, or diet-specific prepared meals.',
      avoid: 'Do not make medical claims. Keep the language practical: calories, convenience, routine, and source transparency.',
      angle: 'Diet pages need extra caution: buyer fit and evidence come before claims.'
    },
    coverage: {
      use: 'Use this page as a coverage and discovery surface before final ranking copy is written.',
      avoid: 'Do not promote unverified companies as top picks.',
      angle: 'Coverage pages build trust by showing what is known, what is pending, and what needs checking.'
    }
  }[intent];

  return `
    <section class="route-section editorial-polish">
      <div class="section-heading">
        <span>Buyer decision layer</span>
        <h2>How to use ${escapeHtml(title)}</h2>
        <p>${escapeHtml(intentCopy.angle)}</p>
      </div>
      <div class="vs-decision-cards">
        <article>
          <span>Use this page when</span>
          <h3>The buyer intent is clear</h3>
          <p>${escapeHtml(intentCopy.use)}</p>
        </article>
        <article>
          <span>Do not overclaim</span>
          <h3>Keep the recommendation conditional</h3>
          <p>${escapeHtml(intentCopy.avoid)}</p>
        </article>
        <article>
          <span>Evidence status</span>
          <h3>${sourceReady} source-ready · ${manual} manual follow-up</h3>
          <p>Source-ready means the brand can be discussed as tracked. It does not mean final offer terms or affiliate approval are complete.</p>
        </article>
      </div>
    </section>
    <section class="route-section editorial-polish brand-fit-notes">
      <div class="section-heading">
        <span>${escapeHtml(country)}</span>
        <h2>Brand fit notes before promotion</h2>
        <p>These notes are written for affiliate review quality: clear fit, clear limits, and no fake certainty.</p>
      </div>
      <div class="deal-grid">
        ${evidence.map(item => `<article class="deal-card"><span>${escapeHtml(item.status)}</span><h2>${escapeHtml(item.brand)}</h2><p>${escapeHtml(item.sourceLine)}</p><p>${escapeHtml(item.fitLine)}</p><p><strong>Risk to check:</strong> ${escapeHtml(item.riskLine)}</p></article>`).join('\n        ')}
      </div>
    </section>
    <section class="quick-answer route-section editorial-polish">
      <h2>Editorial rule for this page</h2>
      <p>Rank services by country availability, buyer routine, meal type, recurring cost, prep effort, diet fit, and current source confidence. Commission potential comes after those checks.</p>
    </section>`;
}

const manifest = parseCsv(fs.readFileSync(path.join(seoDir, 'page-build-manifest-wave-001.csv'), 'utf8'));
const verificationRows = parseCsv(fs.readFileSync(path.join(seoDir, 'wave-001-source-verification.csv'), 'utf8'));
const verificationByBrand = new Map(verificationRows.map(row => [row.brand, row]));
const targets = manifest;
const updated = [];
const skipped = [];

for (const row of targets) {
  const file = pageFile(row.target_path);
  if (!fs.existsSync(file)) {
    skipped.push({ target_path: row.target_path, reason: 'missing_file' });
    continue;
  }
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/\n\s*<section class="route-section editorial-polish"[\s\S]*?(?=\n\s*<section class="route-section source-verification"|\n\s*<\/main>)/g, '');
  const section = polishSection(row, verificationByBrand);
  if (html.includes('<section class="route-section source-verification"')) {
    html = html.replace(/\n\s*<section class="route-section source-verification"/, `${section}\n    <section class="route-section source-verification"`);
  } else {
    html = html.replace('\n    </main>', `${section}\n    </main>`);
  }
  fs.writeFileSync(file, html, 'utf8');
  updated.push({ target_path: row.target_path, title: row.page_title, brands: row.brands });
}

const report = {
  generatedAt: new Date().toISOString(),
  targetCount: targets.length,
  pagesUpdated: updated.length,
  skipped,
  updated
};
fs.writeFileSync(path.join(reportsDir, 'wave-001-all-pages-polish.json'), JSON.stringify(report, null, 2), 'utf8');
fs.writeFileSync(path.join(reportsDir, 'wave-001-all-pages-polish.md'), `# Wave 001 All Pages Polish\n\nGenerated: ${report.generatedAt}\n\n- Target pages: ${report.targetCount}\n- Pages updated: ${report.pagesUpdated}\n- Skipped: ${report.skipped.length}\n\n## Updated pages\n\n${updated.map(row => `- ${row.target_path} — ${row.title}`).join('\n')}\n`, 'utf8');
console.log(JSON.stringify({ pagesUpdated: updated.length, skipped: skipped.length }, null, 2));

