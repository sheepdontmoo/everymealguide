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
function csvEscape(value) { const s = String(value ?? ''); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; }
function writeCsv(file, headers, rows) { fs.writeFileSync(file, [headers.join(','), ...rows.map(row => headers.map(h => csvEscape(row[h])).join(','))].join('\n') + '\n', 'utf8'); }

const universe = parseCsv(fs.readFileSync(path.join(seoDir, 'global-brand-universe.csv'), 'utf8'));
const candidates = universe.filter(row => row.evidence_status === 'candidate_needs_verification');
const countryWeight = { Ireland: 5, Canada: 4, Australia: 4, UK: 3, US: 2, Global: 0 };
const priorityWeight = { P0: 10, P1: 8, P2: 5, P3: 2, blocked: -10 };
function categoryScore(row) {
  const text = `${row.category} ${row.market_role}`.toLowerCase();
  let score = 0;
  if (/prepared|meal prep|fitness|protein|macro|ready/.test(text)) score += 4;
  if (/meal kit|recipe/.test(text)) score += 3;
  if (/diet|weight|senior|kids|baby|vegan|plant/.test(text)) score += 2;
  if (/candidate|regional|adjacent/.test(text)) score -= 1;
  return score;
}
const queue = candidates.map(row => {
  const score = (priorityWeight[row.priority] ?? 0) + (countryWeight[row.country] ?? 0) + categoryScore(row);
  let lane = 'long_tail_hold';
  if (row.priority === 'blocked') lane = 'watchlist_or_inactive_check';
  else if (score >= 13) lane = 'wave_002_priority_verify';
  else if (score >= 9) lane = 'wave_002_secondary_verify';
  else lane = 'wave_002_long_tail_hold';
  return {
    country: row.country,
    brand: row.brand,
    category: row.category,
    priority: row.priority,
    lane,
    verification_score: score,
    official_url: row.official_url,
    next_action: row.official_url ? 'Check official source and status' : 'Find official URL and active ordering path'
  };
}).sort((a, b) => b.verification_score - a.verification_score || a.country.localeCompare(b.country) || a.brand.localeCompare(b.brand));
const headers = ['country','brand','category','priority','lane','verification_score','official_url','next_action'];
writeCsv(path.join(seoDir, 'wave-002-verification-queue.csv'), headers, queue);
const byLane = queue.reduce((acc, row) => { acc[row.lane] = (acc[row.lane] || 0) + 1; return acc; }, {});
const byCountry = queue.reduce((acc, row) => { acc[row.country] = (acc[row.country] || 0) + 1; return acc; }, {});
const top25 = queue.slice(0, 25);
writeCsv(path.join(seoDir, 'wave-002-top-25-verification-batch.csv'), headers, top25);
const report = { generatedAt: new Date().toISOString(), candidateRows: candidates.length, byLane, byCountry, top25: top25.map(row => `${row.country}: ${row.brand} (${row.lane}, ${row.verification_score})`) };
fs.writeFileSync(path.join(reportsDir, 'wave-002-candidate-classification.json'), JSON.stringify(report, null, 2), 'utf8');
fs.writeFileSync(path.join(reportsDir, 'wave-002-candidate-classification.md'), `# Wave 002 Candidate Classification\n\nGenerated: ${report.generatedAt}\n\n- Candidate rows: ${report.candidateRows}\n\n## By lane\n\n${Object.entries(byLane).map(([k,v]) => `- ${k}: ${v}`).join('\n')}\n\n## By country\n\n${Object.entries(byCountry).map(([k,v]) => `- ${k}: ${v}`).join('\n')}\n\n## Top 25 verification batch\n\n${report.top25.map(x => `- ${x}`).join('\n')}\n`, 'utf8');
console.log(JSON.stringify({ candidateRows: candidates.length, byLane, top25Rows: top25.length }, null, 2));
