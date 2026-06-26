import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/codex/dinner-compare';
const seoDir = path.join(root, 'seo');
const reportsDir = path.join(root, 'reports');
const file = path.join(seoDir, 'global-brand-universe.csv');

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

const { headers, rows } = parseCsv(fs.readFileSync(file, 'utf8'));
const before = rows.filter(r => r.country === 'Global').map(r => ({ brand: r.brand, priority: r.priority, site_status: r.site_status }));
for (const row of rows) {
  if (row.country !== 'Global') continue;
  row.priority = 'P3';
  row.site_status = 'brand_family_reference_only';
  row.affiliate_program_target = 'no';
  row.evidence_status = 'country_variant_required';
  row.next_action = 'Use country-specific rows for recommendations, source checks, affiliate applications, and /go/ route decisions.';
}
writeCsv(file, headers, rows);

const taskPath = path.join(root, 'FULL_THROTTLE_TASK_BOARD.csv');
const taskCsv = parseCsv(fs.readFileSync(taskPath, 'utf8'));
for (const task of taskCsv.rows) {
  if (task.id === 'A004') task.status = 'completed';
}
writeCsv(taskPath, taskCsv.headers, taskCsv.rows);

const after = rows.filter(r => r.country === 'Global').map(r => ({ brand: r.brand, priority: r.priority, site_status: r.site_status }));
const countryVariantCounts = rows
  .filter(r => r.country !== 'Global' && ['HelloFresh','Factor','Green Chef','Dinnerly','EveryPlate','Marley Spoon'].some(name => r.brand.includes(name)))
  .reduce((acc, row) => { acc[row.brand] = (acc[row.brand] || 0) + 1; return acc; }, {});
const report = { generatedAt: new Date().toISOString(), globalRowsUpdated: after.length, before, after, countryVariantCounts };
fs.writeFileSync(path.join(reportsDir, 'global-brand-family-split.json'), JSON.stringify(report, null, 2), 'utf8');
fs.writeFileSync(path.join(reportsDir, 'global-brand-family-split.md'), `# Global Brand Family Split\n\nGenerated: ${report.generatedAt}\n\n- Global rows updated: ${report.globalRowsUpdated}\n- Task A004 marked completed.\n\nGlobal rows are now reference-only. Country-specific rows must be used for recommendations and affiliate applications.\n`, 'utf8');
console.log(JSON.stringify({ globalRowsUpdated: after.length, taskA004: 'completed' }, null, 2));
