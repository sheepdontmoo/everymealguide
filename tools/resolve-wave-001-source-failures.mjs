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
  return { headers, rows: body.map(values => Object.fromEntries(headers.map((h, i) => [h, values[i] ?? '']))) };
}
function csvEscape(value) { const s = String(value ?? ''); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }
function writeCsv(file, headers, rows) { fs.writeFileSync(file, [headers.join(','), ...rows.map(row => headers.map(h => csvEscape(row[h])).join(','))].join('\n') + '\n', 'utf8'); }

const verificationPath = path.join(seoDir, 'wave-001-source-verification.csv');
const verification = parseCsv(fs.readFileSync(verificationPath, 'utf8'));
const updates = {
  'Lions Prep': {
    official_url: 'https://www.frive.co.uk/lions-prep',
    check_status: 'rebranded_source_found',
    http_status: '200',
    final_url: 'https://www.frive.co.uk/lions-prep',
    page_title: 'Welcome to Frive: The Evolution of Lions Prep',
    current_evidence_status: 'source_found_rebranded',
    error: 'Lions Prep is now Frive; keep Lions Prep as rebrand/context, not separate active recommendation.'
  },
  'Prep Kitchen': {
    check_status: 'official_source_blocked',
    http_status: '429',
    final_url: 'https://prepkitchen.co.uk/',
    page_title: 'Prep Kitchen official site blocks automated source check',
    current_evidence_status: 'manual_browser_followup_needed',
    error: 'Automated check hit 429/Vercel security; external source snippets confirm active UK meal prep positioning.'
  },
  'Tastily': {
    official_url: 'https://www.tastily.co.uk/',
    check_status: 'watchlist_social_source_found',
    http_status: '404',
    final_url: 'https://www.tastily.co.uk/',
    page_title: 'Tastily official domain returned 404; social/LinkedIn sources remain active-looking',
    current_evidence_status: 'watchlist_manual_followup_needed',
    error: 'Keep watchlist/comparison-only until official ordering path is confirmed.'
  },
  'Fit Foods Ireland': {
    official_url: 'https://fitfoodsforlife.com/',
    check_status: 'source_found',
    http_status: '200',
    final_url: 'https://fitfoodsforlife.com/',
    page_title: 'Fit Foods - Fit For Life',
    current_evidence_status: 'official_source_found',
    error: ''
  },
  'Blue Apron': {
    check_status: 'official_source_blocked',
    http_status: '403',
    final_url: 'https://www.blueapron.com/',
    page_title: 'Blue Apron official site blocks automated source check',
    current_evidence_status: 'manual_browser_followup_needed',
    error: 'Official app store listing confirms current Blue Apron meal kit/prepared-meal positioning; browser/manual follow-up needed for site.'
  },
  'Territory Foods': {
    check_status: 'official_source_found_via_search',
    http_status: '200',
    final_url: 'https://www.territoryfoods.com/',
    page_title: 'Territory Foods | Healthy Meal Delivery',
    current_evidence_status: 'official_source_found',
    error: ''
  },
  'Nutrisystem': {
    check_status: 'official_source_blocked',
    http_status: '403',
    final_url: 'https://www.nutrisystem.com/',
    page_title: 'Nutrisystem official site blocks automated source check',
    current_evidence_status: 'manual_browser_followup_needed',
    error: 'Official domain exists but automated source check receives access denied; manual browser follow-up needed.'
  }
};
for (const row of verification.rows) {
  if (updates[row.brand]) Object.assign(row, updates[row.brand]);
}
writeCsv(verificationPath, verification.headers, verification.rows);

const universePath = path.join(seoDir, 'global-brand-universe.csv');
const universe = parseCsv(fs.readFileSync(universePath, 'utf8'));
for (const row of universe.rows) {
  if (row.brand === 'Fit Foods Ireland') {
    row.official_url = 'https://fitfoodsforlife.com/';
    row.evidence_status = 'official_source_found';
    row.site_status = 'tracked_source_found';
    row.next_action = 'Confirm delivery/order path and affiliate program before recommendation.';
  }
  if (row.brand === 'Lions Prep') {
    row.official_url = 'https://www.frive.co.uk/lions-prep';
    row.evidence_status = 'source_found_rebranded';
    row.site_status = 'watchlist_rebranded';
    row.next_action = 'Treat as Frive rebrand context rather than separate active recommendation.';
  }
  if (row.brand === 'Tastily') {
    row.site_status = 'watchlist_manual_followup';
    row.evidence_status = 'watchlist_manual_followup_needed';
    row.next_action = 'Confirm official ordering path before promotion.';
  }
}
writeCsv(universePath, universe.headers, universe.rows);

const summary = {
  generatedAt: new Date().toISOString(),
  total: verification.rows.length,
  reachable: verification.rows.filter(r => r.check_status === 'reachable').length,
  sourceFound: verification.rows.filter(r => /source_found|rebranded/.test(r.check_status)).length,
  automationBlocked: verification.rows.filter(r => r.check_status === 'official_source_blocked').length,
  watchlist: verification.rows.filter(r => /watchlist/.test(r.check_status)).length,
  stillNeedsManual: verification.rows.filter(r => ['official_source_blocked', 'watchlist_social_source_found'].includes(r.check_status)).map(r => `${r.country}: ${r.brand} - ${r.check_status}`)
};
fs.writeFileSync(path.join(reportsDir, 'wave-001-source-verification.json'), JSON.stringify(summary, null, 2), 'utf8');
fs.writeFileSync(path.join(reportsDir, 'wave-001-source-verification.md'), `# Wave 001 Source Verification\n\nGenerated: ${summary.generatedAt}\n\n- Total checked: ${summary.total}\n- Directly reachable by local fetch: ${summary.reachable}\n- Additional source/rebrand evidence found: ${summary.sourceFound}\n- Official source blocks automation: ${summary.automationBlocked}\n- Watchlist/manual follow-up: ${summary.watchlist}\n\n## Still needs manual browser follow-up\n\n${summary.stillNeedsManual.map(x => `- ${x}`).join('\n')}\n`, 'utf8');
console.log(JSON.stringify(summary, null, 2));
