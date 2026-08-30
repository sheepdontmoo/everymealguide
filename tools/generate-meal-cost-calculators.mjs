import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const siteUrl = "https://www.everymealguide.com";
const updated = "August 30, 2026";

const profiles = [
  {
    slug: "meal-delivery-cost-calculator",
    name: "Meal Delivery Cost Calculator",
    eyebrow: "Any meal kit or prepared-meal service",
    description: "Calculate the real weekly, monthly and annual cost of any meal delivery service after delivery fees, household size and first-box discounts.",
    intro: "Advertised per-serving prices rarely equal the amount charged for a box. Enter the recurring price shown at checkout, your box size and every weekly fee to see the comparable cost.",
    review: "/best/meal-delivery-services/",
    reviewLabel: "Compare the best meal delivery services",
    type: "meal delivery service",
    fit: "This version works for meal kits and fully prepared services. For the fairest comparison, use the normal recurring price rather than a temporary welcome offer.",
    catch: "A low per-serving headline can become less competitive on a small box because a flat delivery fee is divided across fewer meals.",
    compare: "Run the calculator once for each service using the same household size and meals per week. Compare the true recurring cost per serving, not two differently sized boxes.",
  },
  {
    slug: "hellofresh-cost-calculator",
    name: "HelloFresh Cost Calculator",
    eyebrow: "Meal-kit box cost",
    description: "Estimate your real HelloFresh weekly, monthly and annual cost using the current checkout quote, meals per week, servings, shipping and introductory discount.",
    intro: "HelloFresh pricing changes by country, plan size and promotion. Copy the recurring per-serving amount and shipping fee from your local checkout so the result reflects the box you can actually order.",
    review: "/reviews/hellofresh/",
    reviewLabel: "Read the HelloFresh review",
    type: "HelloFresh meal kit",
    fit: "HelloFresh sends ingredients and recipes rather than cooked meals. The calculator measures the subscription charge; pantry staples, cooking energy and your preparation time are separate.",
    catch: "The first-box price is not the long-term price. Put the undiscounted per-serving quote in the main field and the welcome percentage in the separate discount field.",
    compare: "Compare the recurring result with EveryPlate or Gousto using the same number of people and recipes. That keeps a large discounted box from looking cheaper than a smaller regular box.",
  },
  {
    slug: "factor-cost-calculator",
    name: "Factor Meals Cost Calculator",
    eyebrow: "Prepared-meal subscription cost",
    description: "Calculate the real cost of Factor meals per week, per month and per serving after shipping, box size, fees and introductory discounts.",
    intro: "Factor meals arrive prepared, so each meal normally represents one serving. Enter the current recurring meal price and number of meals in the box, then add shipping and any checkout fees.",
    review: "/reviews/factor/",
    reviewLabel: "Read the Factor review",
    type: "Factor prepared meals",
    fit: "For an individual Factor plan, use 1 person and set meals per week to the number of trays in the box. For two people eating separate trays, use 2 people and the number of shared meal occasions.",
    catch: "Optional drinks, breakfasts and add-ons can materially change the order total. Put recurring extras in ‘other weekly fees’ if you want the calculator to include them.",
    compare: "When comparing Factor with a meal kit, remember that Factor includes cooking labour. Compare both cost per serving and the amount of preparation you still need to do.",
  },
  {
    slug: "everyplate-cost-calculator",
    name: "EveryPlate Cost Calculator",
    eyebrow: "Budget meal-kit box cost",
    description: "Estimate the true EveryPlate cost per serving, week, month and year after box size, shipping and the introductory offer.",
    intro: "EveryPlate is positioned as a budget meal kit, but the final value depends on how many servings share the delivery charge. Use the current checkout quote rather than an old advertised price.",
    review: "/reviews/everyplate/",
    reviewLabel: "Read the EveryPlate review",
    type: "EveryPlate meal kit",
    fit: "Use the number of people selected in the plan and the recipes delivered each week. The tool converts that box into a true cost per serving after shipping.",
    catch: "Flat shipping has the largest effect on the smallest plans. A cheap headline price can move noticeably once the delivery charge is spread across only a few servings.",
    compare: "Compare the recurring result against HelloFresh and your normal grocery week. Add the same types of fees to each option and exclude one-off gifts or optional extras.",
  },
  {
    slug: "gousto-cost-calculator",
    name: "Gousto Cost Calculator",
    eyebrow: "UK recipe-box cost",
    description: "Calculate the real weekly, monthly and per-serving cost of a Gousto box using your current UK checkout quote, box size, delivery and discount.",
    intro: "Gousto box prices depend on household size, recipes and the active promotion. Enter the normal per-serving quote in pounds, then record the first-box discount separately.",
    review: "/reviews/gousto/",
    reviewLabel: "Read the Gousto review",
    type: "Gousto recipe box",
    fit: "Gousto is a recipe box: ingredients arrive portioned, but you still cook. The result covers the checkout charge and does not assign a cash value to preparation time.",
    catch: "Premium recipes and extras may sit outside the base box price. Add any weekly upgrades to the fees field if they are part of the order you intend to repeat.",
    compare: "Use GBP for Gousto and compare it with the local recurring HelloFresh quote. Keep people and recipes identical, then judge variety and cooking time after cost.",
  },
];

const esc = (value) => String(value).replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);

function schema(profile, url) {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebApplication",
        name: profile.name,
        applicationCategory: "FinanceApplication",
        operatingSystem: "Any",
        url,
        description: profile.description,
        offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Every Meal Guide", item: `${siteUrl}/` },
          { "@type": "ListItem", position: 2, name: "Calculators", item: `${siteUrl}/calculators/` },
          { "@type": "ListItem", position: 3, name: profile.name, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        mainEntity: [
          { "@type": "Question", name: `How do I calculate the real cost of ${profile.type}?`, acceptedAnswer: { "@type": "Answer", text: "Multiply the recurring price per serving by the number of people and meals in the weekly box, then add shipping and recurring fees. Divide that total by the number of servings for the true delivered cost per serving." } },
          { "@type": "Question", name: "Should I use the introductory or recurring price?", acceptedAnswer: { "@type": "Answer", text: "Use the normal recurring per-serving price for the main comparison. Enter the introductory discount separately so you can see both the first-box and ongoing cost." } },
          { "@type": "Question", name: "How is the monthly estimate calculated?", acceptedAnswer: { "@type": "Answer", text: "The calculator multiplies the recurring weekly total by 52 weeks and divides by 12 months. This is more accurate for an average month than simply multiplying by four." } },
        ],
      },
    ],
  });
}

function page(profile) {
  const url = `${siteUrl}/calculators/${profile.slug}/`;
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${esc(profile.name)}: Weekly, Monthly & Per-Meal Cost</title>
    <meta name="description" content="${esc(profile.description)}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${esc(profile.name)}" />
    <meta property="og:description" content="${esc(profile.description)}" />
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${url}" />
    <meta name="theme-color" content="#ff8700" />
    <link rel="icon" href="/assets/brand/everymealguide-mark-orange-cropped.png" type="image/png" />
    <link rel="stylesheet" href="/styles.css" />
    <link rel="stylesheet" href="/assets/meal-cost-calculator.css" />
    <script type="application/ld+json">${schema(profile, url)}</script>
  </head>
  <body data-page-type="calculator">
    <a class="skip-link" href="#main">Skip to calculator</a>
    <header class="site-header">
      <a class="brand-mark" href="/">Every Meal Guide</a>
      <nav aria-label="Primary navigation"><a href="/best/meal-delivery-services/">Top Picks</a><a href="/meal-delivery-comparisons/">Compare Brands</a><a href="/best/meal-kits/">Meal Types</a><a href="/reviews/factor/">Reviews</a><a href="/deals/best-meal-delivery-deals/">Deals</a><a href="/countries/">Countries</a><a href="/brand-directory/">All Brands</a></nav>
      <a class="nav-action" href="/start/">Find My Best Match</a>
    </header>
    <main class="calculator-page" id="main">
      <nav class="calculator-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><a href="/calculators/">Calculators</a><span>›</span><span>${esc(profile.name)}</span></nav>
      <section class="calculator-hero">
        <div><span class="page-kicker">${esc(profile.eyebrow)}</span><h1>${esc(profile.name)}</h1><p>${esc(profile.intro)}</p></div>
        <aside><strong>No stored prices</strong><p>Prices and promotions change. This calculator uses the current quote you enter and runs entirely in your browser.</p><span>Updated ${updated}</span></aside>
      </section>
      <section class="calculator-shell" aria-label="Meal delivery cost calculator">
        <form class="calculator-form" data-meal-cost-form>
          <div class="calculator-form__heading"><span>Your current quote</span><h2>Calculate the real delivered cost</h2><p>Use the normal price after any welcome deal. Required fields are marked.</p></div>
          <div class="calculator-fields">
            <label>Currency<select name="currency"><option value="USD">USD — $</option><option value="GBP">GBP — £</option><option value="EUR">EUR — €</option><option value="CAD">CAD — CA$</option><option value="AUD">AUD — A$</option></select></label>
            <label>Recurring price per serving *<input name="price" type="number" min="0.01" step="0.01" inputmode="decimal" placeholder="e.g. 10.99" required /></label>
            <label>People / servings per meal *<input name="people" type="number" min="1" step="1" inputmode="numeric" value="2" required /></label>
            <label>Meals per week *<input name="meals" type="number" min="1" step="1" inputmode="numeric" value="3" required /></label>
            <label>Weekly shipping<input name="shipping" type="number" min="0" step="0.01" inputmode="decimal" value="0" /></label>
            <label>Other weekly fees or add-ons<input name="fees" type="number" min="0" step="0.01" inputmode="decimal" value="0" /></label>
            <label>First-box discount (%)<input name="discount" type="number" min="0" max="100" step="0.1" inputmode="decimal" value="0" /></label>
            <label>Your normal weekly grocery budget<input name="grocery" type="number" min="0" step="0.01" inputmode="decimal" value="0" /></label>
          </div>
          <p class="calculator-error" data-meal-cost-error hidden>Enter a positive price, household size and meal count. Discounts must be between 0% and 100%.</p>
          <button class="calculator-submit" type="submit">Calculate my real cost</button>
        </form>
        <div class="calculator-results" data-meal-cost-results hidden aria-live="polite">
          <div class="calculator-results__heading"><span>Recurring cost</span><h2>Your comparable total</h2><p>Based on <strong data-output="servings">0</strong> servings per week.</p></div>
          <div class="calculator-result-grid">
            <article><span>First box</span><strong data-output="first-box">—</strong><small>Discount applied to food, not fees</small></article>
            <article class="primary"><span>Normal week</span><strong data-output="weekly">—</strong><small>Food, shipping and fees</small></article>
            <article><span>True cost per serving</span><strong data-output="per-serving">—</strong><small>After delivery and fees</small></article>
            <article><span>Average month</span><strong data-output="monthly">—</strong><small>52 weeks ÷ 12 months</small></article>
            <article><span>Full year</span><strong data-output="annual">—</strong><small>Before skipped boxes</small></article>
          </div>
          <p class="calculator-comparison" data-grocery-comparison hidden></p>
          <button class="calculator-copy" type="button" data-copy-calculation>Copy a link to this calculation</button>
        </div>
      </section>
      <section class="calculator-guide">
        <div class="section-heading"><span>How to use the answer</span><h2>Judge the repeat price, not the launch offer</h2></div>
        <div class="calculator-guide__grid">
          <article><span>What this measures</span><h3>The complete checkout cost</h3><p>${esc(profile.fit)}</p></article>
          <article><span>What changes the answer</span><h3>Box size and fixed delivery fees</h3><p>${esc(profile.catch)}</p></article>
          <article><span>Make a fair comparison</span><h3>Use identical weekly needs</h3><p>${esc(profile.compare)}</p></article>
        </div>
      </section>
      <section class="calculator-method">
        <h2>The formulas behind the calculator</h2>
        <p><strong>Weekly servings</strong> = people × meals per week. <strong>Food subtotal</strong> = recurring price per serving × weekly servings. Shipping and other recurring fees are added before the true per-serving, monthly and annual figures are calculated.</p>
        <p>The average monthly estimate uses weekly total × 52 ÷ 12. First-box discounts are applied to the food subtotal only because many services exclude delivery and extras from promotions. Check the exact offer terms before ordering.</p>
      </section>
      <section class="faq-section">
        <h2>${esc(profile.name)} FAQ</h2>
        <details><summary>Which price should I enter?</summary><p>Enter the normal recurring price per serving shown for the plan you intend to order. Put the introductory percentage in the separate discount field so it does not distort the long-term total.</p></details>
        <details><summary>Does the result include shipping?</summary><p>Yes, when you enter the delivery charge. Shipping and other recurring fees are included in the weekly total and true delivered cost per serving.</p></details>
        <details><summary>Why is a month calculated as more than four weeks?</summary><p>A calendar year has 52 weeks. Dividing 52 by 12 gives about 4.33 weeks per average month, so multiplying by four understates a recurring weekly subscription.</p></details>
        <details><summary>Are the prices saved?</summary><p>No. The calculation runs in your browser. If you copy a calculation link, the values are placed in that URL so you can reopen or compare it; they are not a live price feed.</p></details>
      </section>
      <section class="calculator-next"><div><span>Before you subscribe</span><h2>Compare cost with fit and flexibility</h2><p>A cheaper box is not better if the menu, preparation or cancellation rules do not fit your week.</p></div><a href="${profile.review}">${esc(profile.reviewLabel)} →</a></section>
      <section class="related-links"><h2>More cost calculators</h2><div>${profiles.filter((item) => item.slug !== profile.slug).map((item) => `<a href="/calculators/${item.slug}/">${esc(item.name)}</a>`).join("")}</div></section>
    </main>
    <footer class="footer"><p>Every Meal Guide</p><nav aria-label="Footer navigation"><a href="/best/meal-delivery-services/">Best</a><a href="/meal-delivery-comparisons/">Compare</a><a href="/calculators/">Calculators</a><a href="/methodology/">Methodology</a><a href="/affiliate-disclosure/">Affiliate Disclosure</a><a href="/privacy/">Privacy</a></nav><p>Affiliate links may earn us a commission. Calculator results depend on the figures you enter.</p></footer>
    <script src="/assets/meal-cost-calculator.js" defer></script>
  </body>
</html>`;
}

function hub() {
  const url = `${siteUrl}/calculators/`;
  return `<!doctype html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>Meal Delivery Cost Calculators | Compare Real Box Prices</title><meta name="description" content="Free meal delivery cost calculators for comparing the real weekly, monthly and per-serving cost of meal kits and prepared-meal subscriptions."/><link rel="canonical" href="${url}"/><meta property="og:title" content="Meal Delivery Cost Calculators"/><meta property="og:description" content="Turn meal-delivery checkout quotes into comparable weekly, monthly and per-serving costs."/><meta property="og:type" content="website"/><meta property="og:url" content="${url}"/><link rel="stylesheet" href="/styles.css"/><link rel="stylesheet" href="/assets/meal-cost-calculator.css"/><script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"CollectionPage",name:"Meal Delivery Cost Calculators",url,description:"Free calculators for comparing meal delivery subscription costs."})}</script></head><body data-page-type="calculator-hub"><a class="skip-link" href="#main">Skip to calculators</a><header class="site-header"><a class="brand-mark" href="/">Every Meal Guide</a><nav aria-label="Primary navigation"><a href="/best/meal-delivery-services/">Top Picks</a><a href="/meal-delivery-comparisons/">Compare Brands</a><a href="/best/meal-kits/">Meal Types</a><a href="/reviews/factor/">Reviews</a><a href="/deals/best-meal-delivery-deals/">Deals</a><a href="/countries/">Countries</a><a href="/brand-directory/">All Brands</a></nav><a class="nav-action" href="/start/">Find My Best Match</a></header><main class="calculator-page calculator-hub" id="main"><nav class="calculator-breadcrumbs" aria-label="Breadcrumb"><a href="/">Home</a><span>›</span><span>Calculators</span></nav><section class="calculator-hero"><div><span class="page-kicker">Free decision tools</span><h1>Meal delivery cost calculators</h1><p>Convert a promotional checkout quote into the weekly, monthly, annual and true per-serving cost you will pay after delivery fees.</p></div><aside><strong>Use live quotes</strong><p>We do not freeze changeable prices into the tools. Enter what the service currently shows you.</p><span>Updated ${updated}</span></aside></section><section class="calculator-hub-grid">${profiles.map((profile) => `<a href="/calculators/${profile.slug}/"><span>${esc(profile.eyebrow)}</span><h2>${esc(profile.name)}</h2><p>${esc(profile.description)}</p><strong>Open calculator →</strong></a>`).join("")}</section><section class="calculator-method"><h2>Why compare the delivered cost?</h2><p>Meal services package prices differently. Some lead with a per-serving figure, some promote a heavily discounted first box, and some charge flat delivery. A consistent calculation exposes the recurring amount and makes differently sized boxes comparable.</p><p>These tools do not decide whether a service suits your diet or routine. Use the result alongside our <a href="/best/meal-delivery-services/">meal delivery rankings</a>, reviews and cancellation guidance.</p></section></main><footer class="footer"><p>Every Meal Guide</p><nav aria-label="Footer navigation"><a href="/best/meal-delivery-services/">Best</a><a href="/meal-delivery-comparisons/">Compare</a><a href="/methodology/">Methodology</a><a href="/privacy/">Privacy</a></nav><p>Affiliate links may earn us a commission.</p></footer></body></html>`;
}

const calculatorsDir = path.join(root, "calculators");
fs.mkdirSync(calculatorsDir, { recursive: true });
fs.writeFileSync(path.join(calculatorsDir, "index.html"), hub());
for (const profile of profiles) {
  const destination = path.join(calculatorsDir, profile.slug);
  fs.mkdirSync(destination, { recursive: true });
  fs.writeFileSync(path.join(destination, "index.html"), page(profile));
}

const urls = [`${siteUrl}/calculators/`, ...profiles.map((profile) => `${siteUrl}/calculators/${profile.slug}/`)];
const calculatorSitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((url) => `  <url><loc>${url}</loc><lastmod>2026-08-30</lastmod><changefreq>monthly</changefreq><priority>0.75</priority></url>`).join("\n")}\n</urlset>\n`;
fs.writeFileSync(path.join(root, "sitemap-calculators.xml"), calculatorSitemap);

const robotsPath = path.join(root, "robots.txt");
let robots = fs.readFileSync(robotsPath, "utf8").trimEnd();
const calculatorSitemapUrl = `${siteUrl}/sitemap-calculators.xml`;
if (!robots.includes(calculatorSitemapUrl)) robots += `\nSitemap: ${calculatorSitemapUrl}`;
fs.writeFileSync(robotsPath, `${robots}\n`);
console.log(`Generated calculator hub and ${profiles.length} cost calculators.`);
