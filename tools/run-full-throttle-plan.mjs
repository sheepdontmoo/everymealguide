#!/usr/bin/env node
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

function readCsv(file) {
  return parseCsv(fs.readFileSync(file, 'utf8'));
}

const brandUniverse = readCsv(path.join(seoDir, 'global-brand-universe.csv'));
const affiliateQueue = readCsv(path.join(seoDir, 'affiliate-application-master-queue.csv'));
const next50 = readCsv(path.join(seoDir, 'next-50-brand-research-batch.csv'));
const tasks = readCsv(path.join(root, 'FULL_THROTTLE_TASK_BOARD.csv'));
const manifestPath = path.join(seoDir, 'page-build-manifest-wave-001.csv');
const pageManifest = fs.existsSync(manifestPath) ? readCsv(manifestPath) : [];

const countries = [...new Set(brandUniverse.map(r => r.country))].sort();
const byPriority = brandUniverse.reduce((acc, r) => { acc[r.priority] = (acc[r.priority] || 0) + 1; return acc; }, {});
const byCountry = brandUniverse.reduce((acc, r) => { acc[r.country] = (acc[r.country] || 0) + 1; return acc; }, {});
const blockedTasks = tasks.filter(t => t.status === 'blocked');
const pendingP0 = tasks.filter(t => t.status === 'pending' && t.priority === 'P0');
const generatedPages = pageManifest.filter(r => r.status === 'generated_local').length;

const generatedCountryPages = ['us','uk','ireland','australia','canada'].filter(slug => fs.existsSync(path.join(root, 'countries', slug, 'index.html'))).length;
const directoryReady = fs.existsSync(path.join(root, 'brand-directory', 'index.html'));

const report = {
  generatedAt: new Date().toISOString(),
  brandRows: brandUniverse.length,
  countries,
  byCountry,
  byPriority,
  affiliateQueueRows: affiliateQueue.length,
  next50Rows: next50.length,
  pageManifestRows: pageManifest.length,
  generatedWavePages: generatedPages,
  generatedCountryPages,
  brandDirectoryReady: directoryReady,
  pendingP0Tasks: pendingP0.map(t => t.id + ': ' + t.task),
  blockedExternalTasks: blockedTasks.map(t => t.id + ': ' + t.task),
  nextImmediateLocalActions: [
    'Resolve remaining Wave 001 manual source follow-ups',
    brandUniverse.length >= 300 ? 'Verify official URLs for Wave 002 top-25 batch' : 'Expand brand universe to 300+ rows',
    'Wait for live deploy approval or continue Wave 002 verification locally',
    'Find affiliate program/network for Wave 001 without submitting applications',
    'Prepare first affiliate application batch after live domain exists'
  ]
};
fs.writeFileSync(path.join(reportsDir, 'full-throttle-status.json'), JSON.stringify(report, null, 2), 'utf8');

const countryLines = Object.entries(byCountry).map(([k,v]) => '- ' + k + ': ' + v).join('\n');
const p0Lines = report.pendingP0Tasks.map(t => '- ' + t).join('\n');
const blockedLines = report.blockedExternalTasks.map(t => '- ' + t).join('\n');
const nextLines = report.nextImmediateLocalActions.map(t => '- ' + t).join('\n');
const md = '# Full-Throttle Status\n\n' +
  'Generated: ' + report.generatedAt + '\n\n' +
  '## Counts\n\n' +
  '- Brand-market rows: ' + report.brandRows + '\n' +
  '- Countries/segments tracked: ' + countries.join(', ') + '\n' +
  '- Affiliate queue rows: ' + report.affiliateQueueRows + '\n' +
  '- Wave 001 research rows: ' + report.next50Rows + '\n' +
  '- Wave 001 manifest rows: ' + report.pageManifestRows + '\n' +
  '- Generated Wave 001 pages: ' + report.generatedWavePages + '\n' +
  '- Generated country home pages: ' + report.generatedCountryPages + '\n' +
  '- Brand directory ready: ' + report.brandDirectoryReady + '\n\n' +
  '## By country\n\n' + countryLines + '\n\n' +
  '## P0 local tasks\n\n' + p0Lines + '\n\n' +
  '## External approval-gated blockers\n\n' + blockedLines + '\n\n' +
  '## Next immediate local actions\n\n' + nextLines + '\n';
fs.writeFileSync(path.join(reportsDir, 'full-throttle-status.md'), md, 'utf8');

console.log(JSON.stringify(report, null, 2));
