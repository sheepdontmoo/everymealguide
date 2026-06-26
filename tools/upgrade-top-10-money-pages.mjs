import fs from 'node:fs';
import path from 'node:path';

const root = 'C:/codex/dinner-compare';
const reportsDir = path.join(root, 'reports');
fs.mkdirSync(reportsDir, { recursive: true });

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function pageFile(targetPath) {
  const clean = targetPath.replace(/^\//, '').replace(/\/$/, '');
  return path.join(root, clean, 'index.html');
}

const pages = [
  {
    path: '/best/meal-delivery-services/',
    title: 'Best Meal Delivery Services',
    promise: 'This is the broad entry page. It should route readers by meal type first, then country, then budget.',
    topPick: 'Start with country and meal type before choosing a brand.',
    buyers: ['Busy household choosing between meal kits and prepared meals', 'Reader comparing trial discounts', 'Affiliate manager checking whether the site explains ranking logic'],
    checks: ['Does the service deliver in the reader country?', 'Is it a meal kit, prepared meal, meal prep plan, or frozen meal?', 'What is the recurring cost after the intro offer?']
  },
  {
    path: '/best/prepared-meal-delivery/',
    title: 'Best Prepared Meal Delivery Services',
    promise: 'This page should own the no-cook buyer intent: prepared meals, chef-made meals, frozen meals, and meal prep.',
    topPick: 'Prepared meals win when time saved is worth more than cooking flexibility.',
    buyers: ['No-cook weekday buyer', 'High-protein or fitness meal-prep buyer', 'Prepared meal affiliate program reviewer'],
    checks: ['Fresh or frozen?', 'How many meals per week?', 'Delivery area and freshness window?', 'Recurring price after first offer?']
  },
  {
    path: '/best/meal-kits/',
    title: 'Best Meal Kit Delivery Services',
    promise: 'This page should separate cooking-led services from no-cook prepared meals.',
    topPick: 'Meal kits win when recipe choice and cooking control matter.',
    buyers: ['Family recipe planner', 'Budget meal-kit shopper', 'Reader comparing HelloFresh-style services'],
    checks: ['Recipe range', 'Prep time', 'Serving count', 'Follow-on price', 'Skip/cancel deadline']
  },
  {
    path: '/best/meal-prep-delivery/',
    title: 'Best Meal Prep Delivery Services',
    promise: 'This page targets high-protein, macro, gym, and structured routine buyers.',
    topPick: 'Meal prep wins when consistency and macros matter more than recipe choice.',
    buyers: ['Gym/fitness buyer', 'High-protein convenience buyer', 'Busy professional repeating meals weekly'],
    checks: ['Protein/macros transparency', 'Freshness', 'Portion size', 'Subscription terms', 'Delivery area']
  },
  {
    path: '/countries/ireland/',
    title: 'Best Meal Delivery Companies in Ireland',
    promise: 'Ireland is a coverage gap competitors often handle weakly. This page should become the Irish market map.',
    topPick: 'Ireland pages must prioritize local delivery proof over global brand fame.',
    buyers: ['Irish consumer checking local availability', 'Reader comparing DropChef, Clean Cut Meals, Gourmet Fuel, Eatto, and Fit Foods', 'Affiliate reviewer looking for serious country coverage'],
    checks: ['Nationwide vs regional delivery', 'Prepared meals vs meal kits', 'Irish ordering path', 'Fresh/frozen distinction']
  },
  {
    path: '/countries/uk/',
    title: 'Best Meal Delivery Companies in the UK',
    promise: 'This page should cover recipe boxes, prepared meals, meal prep, and ready meals across the UK.',
    topPick: 'UK buyers need recipe-box and prepared-meal lanes separated clearly.',
    buyers: ['UK meal-kit shopper', 'UK no-cook/prepared-meal buyer', 'Reader comparing Gousto, Mindful Chef, Frive, and Green Chef'],
    checks: ['UK delivery area', 'Intro offer terms', 'Recipe variety', 'Prepared meal freshness', 'Cancellation terms']
  },
  {
    path: '/countries/australia/',
    title: 'Best Meal Delivery Companies in Australia',
    promise: 'Australia needs strong ready-meal and meal-kit separation: Youfoodz, My Muscle Chef, Marley Spoon, Dinnerly, EveryPlate, and more.',
    topPick: 'AU buyers often compare convenience ready meals against budget meal kits.',
    buyers: ['Australian prepared-meal buyer', 'Budget meal-kit shopper', 'High-protein meal-prep buyer'],
    checks: ['State delivery coverage', 'Fresh vs frozen', 'Recurring box price', 'Fitness nutrition transparency']
  },
  {
    path: '/countries/canada/',
    title: 'Best Meal Delivery Companies in Canada',
    promise: 'Canada needs national and regional coverage: HelloFresh, Factor, Chefs Plate, Goodfood, Fresh Prep, WeCook, CookUnity, and more.',
    topPick: 'Canada pages should make province/region limitations obvious.',
    buyers: ['Canadian meal-kit buyer', 'Prepared-meal buyer', 'Reader comparing Chefs Plate and Goodfood against HelloFresh'],
    checks: ['Province availability', 'Meal-kit vs prepared meals', 'Postal-code limitations', 'Current source and offer status']
  },
  {
    path: '/vs/gousto-vs-mindful-chef/',
    title: 'Gousto vs Mindful Chef',
    promise: 'This is a high-intent UK comparison page with strong affiliate potential once live.',
    topPick: 'Gousto usually fits variety-first buyers; Mindful Chef fits healthy-positioned recipe-box buyers.',
    buyers: ['UK recipe-box shopper', 'Healthy meal-kit buyer', 'Reader already deciding between two brands'],
    checks: ['Weekly recipes', 'Diet filters', 'Family fit', 'Intro offer terms', 'Recurring cost']
  },
  {
    path: '/vs/youfoodz-vs-my-muscle-chef/',
    title: 'Youfoodz vs My Muscle Chef',
    promise: 'This is a strong AU prepared-meal comparison: mainstream ready meals versus fitness/high-protein meals.',
    topPick: 'Youfoodz fits mainstream convenience; My Muscle Chef fits high-protein routine buyers.',
    buyers: ['Australian ready-meal buyer', 'Fitness meal-prep buyer', 'Reader comparing no-cook services'],
    checks: ['Macros/protein transparency', 'Freshness', 'Delivery area', 'Subscription terms', 'Price per meal']
  }
];

function section(page) {
  return `
    <section class="route-section money-page-upgrade">
      <div class="section-heading">
        <span>Money-page upgrade</span>
        <h2>${escapeHtml(page.title)} buying framework</h2>
        <p>${escapeHtml(page.promise)}</p>
      </div>
      <div class="decision-stack">
        <article>
          <span>Primary recommendation rule</span>
          <h3>${escapeHtml(page.topPick)}</h3>
          <p>Do not rank the brand highest unless the country, meal type, price model, and source status all support the recommendation.</p>
        </article>
        <article>
          <span>Best readers for this page</span>
          <h3>Who this page should convert</h3>
          <ul>${page.buyers.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </article>
        <article>
          <span>Before any affiliate CTA</span>
          <h3>Checks required</h3>
          <ul>${page.checks.map(item => `<li>${escapeHtml(item)}</li>`).join('')}</ul>
        </article>
      </div>
    </section>
    <section class="route-section money-page-upgrade">
      <div class="section-heading">
        <span>Affiliate-review readiness</span>
        <h2>What this page still needs before partner applications</h2>
        <p>This page is locally improved, but public affiliate applications still require a live domain, contact email, final source checks, and approved application batch.</p>
      </div>
      <div class="deal-warning-grid">
        <article><span>Ready locally</span><h3>Buyer intent and ranking logic</h3><p>The page now explains the decision framework rather than listing brands blindly.</p></article>
        <article><span>Needs live gate</span><h3>Affiliate applications</h3><p>No application should be submitted until the site is deployed and this page is publicly reviewable.</p></article>
        <article><span>Needs final check</span><h3>Offer terms</h3><p>Current discounts, cancellation terms, and recurring pricing must be refreshed before live promotion.</p></article>
      </div>
    </section>`;
}

const updated = [];
const skipped = [];
for (const page of pages) {
  const file = pageFile(page.path);
  if (!fs.existsSync(file)) {
    skipped.push({ path: page.path, reason: 'missing_file' });
    continue;
  }
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/\n\s*<section class="route-section money-page-upgrade"[\s\S]*?(?=\n\s*<section class="route-section editorial-polish"|\n\s*<section class="route-section source-verification"|\n\s*<\/main>)/g, '');
  const upgrade = section(page);
  if (html.includes('<section class="route-section editorial-polish"')) {
    html = html.replace(/\n\s*<section class="route-section editorial-polish"/, `${upgrade}\n    <section class="route-section editorial-polish"`);
  } else if (html.includes('<section class="route-section source-verification"')) {
    html = html.replace(/\n\s*<section class="route-section source-verification"/, `${upgrade}\n    <section class="route-section source-verification"`);
  } else {
    html = html.replace('\n    </main>', `${upgrade}\n    </main>`);
  }
  fs.writeFileSync(file, html, 'utf8');
  updated.push(page.path);
}

const report = { generatedAt: new Date().toISOString(), pagesTargeted: pages.length, pagesUpdated: updated.length, skipped, updated };
fs.writeFileSync(path.join(reportsDir, 'top-10-money-page-upgrade.json'), JSON.stringify(report, null, 2), 'utf8');
fs.writeFileSync(path.join(reportsDir, 'top-10-money-page-upgrade.md'), `# Top 10 Money Page Upgrade\n\nGenerated: ${report.generatedAt}\n\n- Pages targeted: ${report.pagesTargeted}\n- Pages updated: ${report.pagesUpdated}\n- Skipped: ${report.skipped.length}\n\n${updated.map(path => `- ${path}`).join('\n')}\n`, 'utf8');
console.log(JSON.stringify({ pagesUpdated: updated.length, skipped: skipped.length }, null, 2));
