import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/codex/dinner-compare';
const seoDir = path.join(root, 'seo');
const reportsDir = path.join(root, 'reports');

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
function escapeHtml(value) {
  return String(value ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

const verification = readCsv(path.join(seoDir, 'wave-001-source-verification.csv'));
const manifest = readCsv(path.join(seoDir, 'page-build-manifest-wave-001.csv'));
const byBrand = new Map(verification.map(row => [row.brand, row]));

function pageFile(targetPath) {
  const clean = targetPath.replace(/^\//, '').replace(/\/$/, '');
  return path.join(root, clean, 'index.html');
}

function brandsForManifestRow(row) {
  return String(row.brands || '').split(';').map(s => s.trim()).filter(Boolean);
}

let updated = 0;
let reachablePanels = 0;
let manualPanels = 0;
for (const row of manifest) {
  const file = pageFile(row.target_path);
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/\n\s*<section class="route-section source-verification"[\s\S]*?<\/section>\s*(?=<\/main>)/, '');
  const brands = brandsForManifestRow(row);
  const entries = brands.map(brand => byBrand.get(brand)).filter(Boolean);
  if (!entries.length) continue;
  const reachable = entries.filter(entry => entry.check_status === 'reachable');
  const needsFollow = entries.filter(entry => entry.check_status !== 'reachable');
  reachablePanels += reachable.length;
  manualPanels += needsFollow.length;
  const panel = `
    <section class="route-section source-verification">
      <div class="section-heading"><span>Source verification</span><h2>Current source status</h2><p>These checks are local prelaunch source checks. A reachable official page improves confidence, but offer terms still need final checkout-level confirmation before promotion.</p></div>
      <div class="deal-grid">
        ${entries.map(entry => `<article class="deal-card"><span>${escapeHtml(entry.country)} · ${escapeHtml(entry.check_status)}</span><h2>${escapeHtml(entry.brand)}</h2><p>${entry.check_status === 'reachable' ? `Official site responded with HTTP ${escapeHtml(entry.http_status)}. Page title captured: ${escapeHtml(entry.page_title || 'No title captured')}.` : `Manual follow-up required: ${escapeHtml(entry.error || entry.http_status || 'unconfirmed source')}.`}</p><p><strong>Official URL:</strong> ${entry.official_url ? `<a href="${escapeHtml(entry.official_url)}" rel="nofollow noopener">${escapeHtml(entry.official_url)}</a>` : 'missing'}</p></article>`).join('\n        ')}
      </div>
    </section>`;
  html = html.replace('\n    </main>', `${panel}\n    </main>`);
  fs.writeFileSync(file, html, 'utf8');
  updated++;
}

const report = {
  generatedAt: new Date().toISOString(),
  pagesUpdated: updated,
  reachableBrandPanels: reachablePanels,
  manualFollowupPanels: manualPanels,
  sourceVerificationCsv: 'seo/wave-001-source-verification.csv'
};
fs.writeFileSync(path.join(reportsDir, 'wave-001-page-enrichment.json'), JSON.stringify(report, null, 2), 'utf8');
fs.writeFileSync(path.join(reportsDir, 'wave-001-page-enrichment.md'), `# Wave 001 Page Enrichment\n\nGenerated: ${report.generatedAt}\n\n- Pages updated: ${report.pagesUpdated}\n- Reachable brand panels added: ${report.reachableBrandPanels}\n- Manual follow-up panels added: ${report.manualFollowupPanels}\n- Source file: ${report.sourceVerificationCsv}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
