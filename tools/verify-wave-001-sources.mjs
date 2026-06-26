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

function readCsv(file) { return parseCsv(fs.readFileSync(file, 'utf8')); }
function csvEscape(value) {
  const s = String(value ?? '');
  return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}
function slug(input) {
  return String(input || '').toLowerCase().replace(/&/g, 'and').replace(/'/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const universe = readCsv(path.join(seoDir, 'global-brand-universe.csv'));
const next50 = readCsv(path.join(seoDir, 'next-50-brand-research-batch.csv'));
const universeByKey = new Map(universe.map(row => [`${row.country}::${row.brand}`, row]));
const universeByBrand = new Map(universe.map(row => [row.brand, row]));

function findUniverseRow(row) {
  return universeByKey.get(`${row.country}::${row.brand}`) || universeByBrand.get(row.brand) || null;
}

async function fetchWithTimeout(url, timeoutMs = 9000) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      method: 'GET',
      signal: controller.signal,
      headers: {
        'user-agent': 'EveryMealGuideBot/0.1 source-check; local prelaunch audit',
        'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      redirect: 'follow'
    });
    const text = await res.text().catch(() => '');
    const title = (text.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').replace(/\s+/g, ' ').trim().slice(0, 140);
    return { ok: res.ok, status: res.status, finalUrl: res.url, title, error: '' };
  } catch (error) {
    return { ok: false, status: 0, finalUrl: url, title: '', error: error.name === 'AbortError' ? 'timeout' : String(error.message || error).slice(0, 160) };
  } finally {
    clearTimeout(timer);
  }
}

const checks = [];
for (const row of next50) {
  const source = findUniverseRow(row);
  const officialUrl = source?.official_url || '';
  checks.push({
    rank: row.rank,
    country: row.country,
    brand: row.brand,
    category: row.category,
    priority: source?.priority || '',
    official_url: officialUrl,
    current_evidence_status: source?.evidence_status || '',
    target_slug: slug(row.brand),
  });
}

const results = [];
const concurrency = 8;
let index = 0;
async function worker() {
  while (index < checks.length) {
    const item = checks[index++];
    if (!item.official_url) {
      results.push({ ...item, check_status: 'missing_url', http_status: '', final_url: '', page_title: '', error: 'No official URL in brand universe' });
      continue;
    }
    const result = await fetchWithTimeout(item.official_url);
    results.push({
      ...item,
      check_status: result.ok ? 'reachable' : result.status ? 'http_problem' : 'fetch_problem',
      http_status: result.status,
      final_url: result.finalUrl,
      page_title: result.title,
      error: result.error,
    });
  }
}
await Promise.all(Array.from({ length: concurrency }, worker));
results.sort((a, b) => Number(a.rank) - Number(b.rank));

const headers = ['rank','country','brand','category','priority','official_url','check_status','http_status','final_url','page_title','current_evidence_status','error'];
fs.writeFileSync(path.join(seoDir, 'wave-001-source-verification.csv'), [headers.join(','), ...results.map(row => headers.map(h => csvEscape(row[h])).join(','))].join('\n') + '\n', 'utf8');

const summary = {
  generatedAt: new Date().toISOString(),
  total: results.length,
  reachable: results.filter(r => r.check_status === 'reachable').length,
  missingUrl: results.filter(r => r.check_status === 'missing_url').length,
  httpProblem: results.filter(r => r.check_status === 'http_problem').length,
  fetchProblem: results.filter(r => r.check_status === 'fetch_problem').length,
  topReachable: results.filter(r => r.check_status === 'reachable').slice(0, 15).map(r => `${r.country}: ${r.brand} (${r.http_status})`),
  needsHumanOrManualBrowser: results.filter(r => r.check_status !== 'reachable').map(r => `${r.country}: ${r.brand} - ${r.check_status}${r.http_status ? ' ' + r.http_status : ''}${r.error ? ' - ' + r.error : ''}`),
};
fs.writeFileSync(path.join(reportsDir, 'wave-001-source-verification.json'), JSON.stringify(summary, null, 2), 'utf8');
const md = `# Wave 001 Source Verification\n\nGenerated: ${summary.generatedAt}\n\n- Total checked: ${summary.total}\n- Reachable: ${summary.reachable}\n- Missing official URL: ${summary.missingUrl}\n- HTTP problem: ${summary.httpProblem}\n- Fetch problem: ${summary.fetchProblem}\n\n## Reachable examples\n\n${summary.topReachable.map(x => `- ${x}`).join('\n')}\n\n## Needs manual follow-up\n\n${summary.needsHumanOrManualBrowser.map(x => `- ${x}`).join('\n')}\n`;
fs.writeFileSync(path.join(reportsDir, 'wave-001-source-verification.md'), md, 'utf8');
console.log(JSON.stringify(summary, null, 2));
