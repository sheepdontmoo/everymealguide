import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/codex/dinner-compare';
const reportsDir = path.join(root, 'reports');
fs.mkdirSync(reportsDir, { recursive: true });

function readJson(relativePath) {
  return JSON.parse(fs.readFileSync(path.join(root, relativePath), 'utf8'));
}

const status = readJson('reports/full-throttle-status.json');
const source = readJson('reports/wave-001-source-verification.json');
const enrichment = readJson('reports/wave-001-page-enrichment.json');
const priorityPath = path.join(root, 'reports/priority-hubs-comparisons.json');
const priority = fs.existsSync(priorityPath) ? JSON.parse(fs.readFileSync(priorityPath, 'utf8')) : { generated: [] };
const fullPolishPath = path.join(root, 'reports/wave-001-all-pages-polish.json');
const firstPolishPath = path.join(root, 'reports/wave-001-first-20-polish.json');
const polishPath = fs.existsSync(fullPolishPath) ? fullPolishPath : firstPolishPath;
const polish = fs.existsSync(polishPath) ? JSON.parse(fs.readFileSync(polishPath, 'utf8')) : { pagesUpdated: 0 };
const topMoneyPath = path.join(root, 'reports/top-10-money-page-upgrade.json');
const topMoney = fs.existsSync(topMoneyPath) ? JSON.parse(fs.readFileSync(topMoneyPath, 'utf8')) : { pagesUpdated: 0 };
const launchPacketPath = path.join(root, 'reports/go-live-approval-packet.json');
const launchPacket = fs.existsSync(launchPacketPath) ? JSON.parse(fs.readFileSync(launchPacketPath, 'utf8')) : null;
const globalSplitPath = path.join(root, 'reports/global-brand-family-split.json');
const globalSplit = fs.existsSync(globalSplitPath) ? JSON.parse(fs.readFileSync(globalSplitPath, 'utf8')) : null;
const wave2Path = path.join(root, 'reports/wave-002-candidate-classification.json');
const wave2 = fs.existsSync(wave2Path) ? JSON.parse(fs.readFileSync(wave2Path, 'utf8')) : null;
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
const sitemapUrlCount = [...sitemap.matchAll(/<loc>/g)].length;
const polishBonus = Math.min(14, Math.round(((polish.pagesUpdated || 0) / 48) * 14));
const moneyBonus = topMoney.pagesUpdated >= 10 ? 5 : Math.round(((topMoney.pagesUpdated || 0) / 10) * 5);

const scores = {
  localSiteDesign: 84,
  brandCoverageSystem: Math.min(100, Math.round((status.brandRows / 300) * 100)),
  seoPageStructure: Math.min(100, Math.round((sitemapUrlCount / 160) * 100) + polishBonus + moneyBonus),
  affiliateReadiness: (fs.existsSync(path.join(root, 'APPROVED_AFFILIATE_LINKS.json')) ? 52 : 45) + (polish.pagesUpdated >= 48 ? 7 : polish.pagesUpdated >= 20 ? 4 : 0) + (topMoney.pagesUpdated >= 10 ? 4 : 0),
  sourceVerification: Math.min(100, Math.round(((source.reachable + (source.sourceFound || 0)) / source.total) * 70 + (enrichment.pagesUpdated > 0 ? 15 : 0))),
  liveLaunchReadiness: launchPacket ? 66 : 55,
  revenueReadiness: 32 + (polish.pagesUpdated >= 48 ? 5 : polish.pagesUpdated >= 20 ? 3 : 0) + (topMoney.pagesUpdated >= 10 ? 5 : 0)
};
const weights = {
  localSiteDesign: 0.12,
  brandCoverageSystem: 0.18,
  seoPageStructure: 0.16,
  affiliateReadiness: 0.16,
  sourceVerification: 0.14,
  liveLaunchReadiness: 0.14,
  revenueReadiness: 0.10
};
const overall = Math.round(Object.entries(scores).reduce((sum, [key, score]) => sum + score * weights[key], 0));
const report = {
  generatedAt: new Date().toISOString(),
  overall,
  scores,
  evidence: {
    brandRows: status.brandRows,
    sitemapUrlCount,
    generatedWavePages: status.generatedWavePages,
    priorityPagesGenerated: priority.generated?.length || 0,
    polishedWavePages: polish.pagesUpdated || 0,
    upgradedMoneyPages: topMoney.pagesUpdated || 0,
    goLivePacketReady: Boolean(launchPacket),
    globalBrandFamiliesSplit: Boolean(globalSplit),
    wave2CandidatesClassified: wave2?.candidateRows || 0,
    reachableSourceChecks: source.reachable,
    sourceChecksTotal: source.total,
    brandDirectoryReady: status.brandDirectoryReady,
    generatedCountryPages: status.generatedCountryPages
  },
  remainingLocalBlockers: [
    wave2 ? 'Verify official URLs for Wave 002 top-25 batch' : 'Verify and classify Wave 002 candidate brands',
    `Resolve ${source.stillNeedsManual?.length || 0} Wave 001 manual source follow-ups`,
    topMoney.pagesUpdated >= 10 && launchPacket ? 'Run live deployment only after approval' : topMoney.pagesUpdated >= 10 ? 'Prepare live launch approval packet and deployment checklist' : polish.pagesUpdated >= 48 ? 'Upgrade top 10 pages from polished coverage to full source-backed money pages' : polish.pagesUpdated >= 20 ? 'Polish next 30 generated pages beyond template copy' : 'Polish first 20 generated pages beyond template copy',
    ...(globalSplit ? [] : ['Split global brand-family rows into clean country variants'])
  ],
  humanGates: [
    'Domain decision',
    'Deploy approval',
    'Analytics/Search Console approval',
    'Affiliate application batch approval',
    'Affiliate URL swap approval'
  ]
};
fs.writeFileSync(path.join(reportsDir, 'full-throttle-scorecard.json'), JSON.stringify(report, null, 2), 'utf8');
fs.writeFileSync(path.join(reportsDir, 'full-throttle-scorecard.md'), `# Full-Throttle Scorecard\n\nGenerated: ${report.generatedAt}\n\nOverall: ${overall}/100\n\n| Area | Score |\n|---|---:|\n${Object.entries(scores).map(([key, score]) => `| ${key} | ${score}% |`).join('\n')}\n\n## Evidence\n\n${Object.entries(report.evidence).map(([key, value]) => `- ${key}: ${value}`).join('\n')}\n\n## Remaining local blockers\n\n${report.remainingLocalBlockers.map(item => `- ${item}`).join('\n')}\n\n## Human gates\n\n${report.humanGates.map(item => `- ${item}`).join('\n')}\n`, 'utf8');
console.log(JSON.stringify(report, null, 2));
