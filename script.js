// Scroll-reveal: progressive enhancement for any page. Elements marked [data-reveal]
// fade/rise in as they enter the viewport. Adds html.js so CSS only hides them when JS
// is present — bots and no-JS browsers always see full content (SEO-safe).
(function scrollReveal() {
  var root = document.documentElement;
  root.classList.add("js");

  function start() {
    var targets = document.querySelectorAll("[data-reveal]");
    if (!targets.length) return;

    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || !("IntersectionObserver" in window)) {
      targets.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        io.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });

    targets.forEach(function (el) { io.observe(el); });

    // Safety net: if the observer never fires (odd viewport, webview quirks),
    // never leave content stuck invisible — force-reveal everything after 2s.
    window.setTimeout(function () {
      targets.forEach(function (el) { el.classList.add("is-revealed"); });
    }, 2000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();

function eventDisplayName(name) {
  return name
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function pageTypeFromPath(path) {
  if (path === "/") return "home";
  return path.split("/").filter(Boolean)[0] || "unknown";
}

function emitDinnerCompareEvent(name, props = {}) {
  const event = {
    event: name,
    path: window.location.pathname,
    pageTitle: document.title,
    timestamp: new Date().toISOString(),
    ...props,
  };

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);

  if (typeof window.plausible === "function") {
    const { event: _eventName, timestamp: _timestamp, ...plausibleProps } = event;
    window.plausible(eventDisplayName(name), {
      props: plausibleProps,
    });
  }

  try {
    const history = JSON.parse(localStorage.getItem("dc_events") || "[]");
    history.push(event);
    localStorage.setItem("dc_events", JSON.stringify(history.slice(-50)));
  } catch {
    // Ignore private browsing or storage failures.
  }

  console.info("Every Meal Guide event", event);
  sendDinnerCompareServerEvent(event);
  return event;
}

function publicEventPayload(event) {
  const allowed = {};
  const keys = [
    "event",
    "path",
    "page_type",
    "pageType",
    "pageTitle",
    "title",
    "brand",
    "label",
    "href",
    "affiliateStatus",
    "pathChoice",
    "recommendation",
    "timestamp",
  ];

  keys.forEach((key) => {
    if (event[key] === undefined || event[key] === null) return;
    allowed[key] = String(event[key]).slice(0, 240);
  });

  return allowed;
}

function sendDinnerCompareServerEvent(event) {
  const payload = JSON.stringify(publicEventPayload(event));

  try {
    if (navigator.sendBeacon) {
      const blob = new Blob([payload], { type: "application/json" });
      navigator.sendBeacon("/api/track", blob);
      return;
    }
  } catch {
    // Fall back to fetch below.
  }

  try {
    fetch("/api/track", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: payload,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // Ignore network and privacy-mode failures.
  }
}

emitDinnerCompareEvent("page_view", {
  title: document.title,
  page_type: document.body.getAttribute("data-page-type") || pageTypeFromPath(window.location.pathname),
});

const matcher = document.querySelector("#matcher");

function countrySlug(country) {
  const value = String(country || "").toLowerCase();
  if (value.includes("united states")) return "us";
  if (value.includes("united kingdom")) return "uk";
  if (value.includes("ireland")) return "ireland";
  if (value.includes("canada")) return "canada";
  if (value.includes("australia")) return "australia";
  return "";
}

function matcherTargetPath({ type, budget, diet, country }) {
  const mealType = String(type || "").toLowerCase();
  const budgetNeed = String(budget || "").toLowerCase();
  const dietNeed = String(diet || "").toLowerCase();
  const market = countrySlug(country);
  const countryPrefix = market ? `/countries/${market}` : "";

  if (budgetNeed.includes("lowest") || mealType.includes("budget")) return `${countryPrefix || ""}/cheap-meal-delivery/`;
  if (dietNeed.includes("protein") || mealType.includes("protein")) return `${countryPrefix || ""}/best-high-protein-meal-prep/`;
  if (dietNeed.includes("vegan") || mealType.includes("vegan")) return `${countryPrefix || ""}/best-vegan-meal-delivery/`;
  if (dietNeed.includes("vegetarian") || mealType.includes("vegetarian")) return `${countryPrefix || ""}/best-vegetarian-meal-delivery/`;
  if (mealType.includes("kit")) return `${countryPrefix || ""}/best-meal-kits/`;
  if (mealType.includes("family")) return `${countryPrefix || ""}/best-family-meal-delivery/`;
  if (mealType.includes("prepared")) return `${countryPrefix || ""}/best-prepared-meal-delivery/`;

  return market ? `${countryPrefix}/best-meal-delivery/` : "/best/meal-delivery-services/";
}

function matcherRecommendation({ type, budget, diet, country }) {
  const targetPath = matcherTargetPath({ type, budget, diet, country });
  const mealType = String(type || "").toLowerCase();
  const budgetNeed = String(budget || "").toLowerCase();
  const dietNeed = String(diet || "").toLowerCase();
  const market = countrySlug(country);
  const marketLabel = market ? ` in ${country}` : "";

  if (budgetNeed.includes("lowest") || mealType.includes("budget")) {
    return {
      title: `Start with budget meal delivery${marketLabel}`,
      copy: "Best when the weekly price matters more than premium recipes, chef-made meals, or specialist diet filters.",
      next: "Next: compare the normal week-two price, delivery fee, minimum order, and how easy it is to pause.",
      targetPath,
    };
  }

  if (dietNeed.includes("protein") || mealType.includes("protein")) {
    return {
      title: `Start with high-protein meal prep${marketLabel}`,
      copy: "Best when protein, portions, calories, or meal-prep consistency matter more than recipe variety.",
      next: "Next: check protein per meal, calorie range, delivery area, and whether the menu changes enough for repeat orders.",
      targetPath,
    };
  }

  if (dietNeed.includes("vegan") || mealType.includes("vegan")) {
    return {
      title: `Start with vegan meal delivery${marketLabel}`,
      copy: "Best when plant-based fit matters first, then price, delivery area, and menu variety.",
      next: "Next: confirm the menu is fully vegan, not just vegetarian-friendly, then check weekly price after discounts.",
      targetPath,
    };
  }

  if (dietNeed.includes("vegetarian") || mealType.includes("vegetarian")) {
    return {
      title: `Start with vegetarian meal delivery${marketLabel}`,
      copy: "Best when you want meat-free options without sorting through every general meal-delivery brand.",
      next: "Next: check how many vegetarian meals are available each week and whether the service fits your country.",
      targetPath,
    };
  }

  if (mealType.includes("kit")) {
    return {
      title: `Start with meal kits${marketLabel}`,
      copy: "Best when you still want to cook, but want recipes, ingredients, and planning handled for you.",
      next: "Next: compare recipe choice, serving sizes, prep time, delivery day, and the normal weekly price.",
      targetPath,
    };
  }

  if (mealType.includes("family")) {
    return {
      title: `Start with family meal delivery${marketLabel}`,
      copy: "Best when the real problem is feeding more than one person without repeating the same dinner every night.",
      next: "Next: check servings, kid-friendly recipes, flexible skipping, and whether leftovers are realistic.",
      targetPath,
    };
  }

  return {
    title: `Start with prepared meals${marketLabel}`,
    copy: "Best when you want dinner ready in minutes with little or no shopping, chopping, cooking, or cleanup.",
    next: "Next: check delivery to your address, fridge or freezer format, calorie range, and week-two price.",
    targetPath,
  };
}

if (matcher) {
  matcher.querySelector("button")?.addEventListener("click", () => {
    const formData = new FormData(matcher);
    const type = formData.get("type") || "Prepared meals";
    const budget = formData.get("budget") || "Best value";
    const country = formData.get("country") || "United States";
    const diet = formData.get("diet") || "No preference";

    emitDinnerCompareEvent("matcher_submit", {
      country,
      budget,
      diet,
      mealType: type,
    });

    const recommendation = matcherRecommendation({ type, budget, diet, country });
    const result = matcher.querySelector("[data-match-result]");
    const resultTitle = matcher.querySelector("[data-match-result-title]");
    const resultCopy = matcher.querySelector("[data-match-result-copy]");
    const resultNext = matcher.querySelector("[data-match-result-next]");
    const resultLink = matcher.querySelector("[data-match-result-link]");

    if (result && resultTitle && resultCopy && resultNext && resultLink) {
      result.hidden = false;
      resultTitle.textContent = recommendation.title;
      resultCopy.textContent = recommendation.copy;
      resultNext.textContent = recommendation.next;
      resultLink.setAttribute("href", recommendation.targetPath);
      resultLink.setAttribute("data-decision-path", `matcher-${slugify(recommendation.title)}`);
    }

    emitDinnerCompareEvent("matcher_result_shown", {
      country,
      budget,
      diet,
      mealType: type,
      recommendation: recommendation.title,
      href: recommendation.targetPath,
    });

    matcher.querySelector("button").textContent = "Update My Shortlist";
  });
}

document.querySelectorAll(".newsletter button").forEach((button) => {
  button.addEventListener("click", () => {
    emitDinnerCompareEvent("newsletter_interest", {
      sourceSection: "newsletter",
    });

    button.textContent = "Interest noted";
  });
});

function recordAffiliateClick(link) {
  const brand = link.getAttribute("data-brand") || "unknown";
  const event = emitDinnerCompareEvent("affiliate_click", {
    brand,
    label: link.textContent?.trim(),
    href: link.getAttribute("href"),
    affiliateStatus: link.getAttribute("data-affiliate-status") || "unknown",
  });

  try {
    const history = JSON.parse(localStorage.getItem("dc_affiliate_clicks") || "[]");
    history.push(event);
    localStorage.setItem("dc_affiliate_clicks", JSON.stringify(history.slice(-25)));
  } catch {
    // Ignore private browsing or storage failures.
  }
}

document.querySelectorAll("[data-track='affiliate-click']").forEach((link) => {
  link.setAttribute("data-affiliate-bound", "true");
  link.addEventListener("click", () => recordAffiliateClick(link));
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-track='affiliate-click']");

  if (!link || link.getAttribute("data-affiliate-bound") === "true") return;

  recordAffiliateClick(link);
});

document.addEventListener("click", (event) => {
  const link = event.target.closest("[data-decision-path]");

  if (!link) return;

  emitDinnerCompareEvent("decision_path_click", {
    pathChoice: link.getAttribute("data-decision-path"),
    label: link.textContent?.trim(),
    href: link.getAttribute("href"),
  });
});

mountNearbyAffiliateDisclosures();
mountBrandLogoLayer();

const partnerRedirect = window.DINNER_COMPARE_PARTNER_REDIRECT;

if (partnerRedirect?.target) {
  emitDinnerCompareEvent("partner_redirect_ready", {
    brand: partnerRedirect.brand || document.body.getAttribute("data-partner-brand") || "unknown",
    status: partnerRedirect.status || "offer_check",
  });

  window.setTimeout(() => {
    window.location.replace(partnerRedirect.target);
  }, 120);
}

const COMPANY_TABLE_MAX_ROWS = 80;

const COUNTRY_LABELS = {
  us: "US",
  uk: "UK",
  ireland: "Ireland",
  australia: "Australia",
  canada: "Canada",
  "new-zealand": "New Zealand",
  germany: "Germany",
  france: "France",
  netherlands: "Netherlands",
  spain: "Spain",
  italy: "Italy",
  sweden: "Sweden",
  denmark: "Denmark",
  norway: "Norway",
  belgium: "Belgium",
  switzerland: "Switzerland",
  austria: "Austria",
  poland: "Poland",
  finland: "Finland",
  uae: "UAE",
  singapore: "Singapore",
  "south-africa": "South Africa",
  "hong-kong": "Hong Kong",
  india: "India",
  global: "Global",
};

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseDinnerCompareCsv(csvText) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let index = 0; index < csvText.length; index += 1) {
    const char = csvText[index];
    const next = csvText[index + 1];

    if (char === '"' && inQuotes && next === '"') {
      field += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(field);
      field = "";
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      continue;
    }

    field += char;
  }

  row.push(field);
  if (row.some((cell) => cell.trim())) rows.push(row);

  const headers = rows.shift()?.map((header) => header.trim()) || [];

  return rows.map((cells) =>
    headers.reduce((entry, header, index) => {
      entry[header] = (cells[index] || "").trim();
      return entry;
    }, {})
  );
}

function companyFormat(row) {
  const category = (row.category || "").toLowerCase();

  if (category.includes("meal kit") || category.includes("recipe kit") || category.includes("starter kit")) {
    return "Meal kit - cook yourself";
  }

  if (category.includes("protein") || category.includes("fitness")) {
    return "High-protein meals";
  }

  if (category.includes("plant") || category.includes("vegan") || category.includes("vegetarian")) {
    return "Plant-based meals";
  }

  if (category.includes("diet") || category.includes("medical")) {
    return "Diet or specialist meals";
  }

  if (category.includes("kid") || category.includes("baby")) {
    return "Kids or baby meals";
  }

  if (category.includes("frozen")) {
    return "Frozen ready meals";
  }

  if (category.includes("prepared") || category.includes("ready") || category.includes("smoothie")) {
    return "Prepared meals - heat and eat";
  }

  if (category.includes("produce") || category.includes("grocery")) {
    return "Grocery or produce box";
  }

  return row.category || "Meal company";
}

function companyTableContext() {
  const path = window.location.pathname.toLowerCase();
  const countrySlug = Object.keys(COUNTRY_LABELS).find((slug) => path.includes(`/countries/${slug}/`));
  const titleCountry = countrySlug ? COUNTRY_LABELS[countrySlug] : "";
  let type = "";

  if (path.includes("prepared")) type = "prepared";
  if (path.includes("meal-kit") || path.includes("meal-kits")) type = "meal-kit";
  if (path.includes("high-protein") || path.includes("fitness")) type = "high-protein";
  if (path.includes("cheap") || path.includes("budget")) type = "budget";
  if (path.includes("vegetarian") || path.includes("vegan") || path.includes("plant")) type = "plant-based";
  if (path.includes("family") || path.includes("families") || path.includes("kids")) type = "kids";

  if (path === "/" || path === "/index.html") {
    return {
      title: "All meal delivery brands",
      intro: "Browse meal delivery brands by country and meal type, then open the brand page to compare fit, availability, offers, and alternatives.",
      country: "",
      type: "",
    };
  }

  if (path.includes("/brand-directory") || path.includes("/all-brands")) {
    return {
      title: "Search every tracked meal delivery brand",
      intro: "Use this directory for broad discovery. Filter by country and meal type, then open a review or offer check before treating any brand as a fit.",
      country: "",
      type: "",
    };
  }

  return {
    title: titleCountry ? `${titleCountry} meal delivery brands` : "Meal delivery brands on this page",
    intro: "Filter by country and meal type to find brands that match how you want to eat: cook-yourself kits, prepared meals, high-protein plans, family options, frozen meals, and specialist diets.",
    country: titleCountry,
    type,
  };
}

function matchesCompanyType(row, type) {
  if (!type) return true;
  const category = (row.category || "").toLowerCase();
  const format = companyFormat(row).toLowerCase();

  if (type === "prepared") {
    return (
      format.includes("prepared") ||
      category.includes("prepared") ||
      category.includes("ready") ||
      category.includes("frozen") ||
      category.includes("smoothie")
    );
  }

  if (type === "meal-kit") {
    return format.includes("meal kit") || category.includes("meal kit") || category.includes("recipe kit");
  }

  if (type === "high-protein") {
    return category.includes("protein") || category.includes("fitness") || format.includes("protein");
  }

  if (type === "plant-based") {
    return category.includes("plant") || category.includes("vegan") || category.includes("vegetarian");
  }

  if (type === "diet") {
    return category.includes("diet") || category.includes("medical");
  }

  if (type === "kids") {
    return category.includes("kid") || category.includes("baby") || category.includes("family");
  }

  if (type === "frozen") {
    return category.includes("frozen");
  }

  if (type === "budget") {
    return category.includes("budget") || (row.market_role || "").toLowerCase().includes("budget");
  }

  return true;
}

function sortCompanies(a, b) {
  const priorityA = Number.parseInt(a.priority || "999", 10);
  const priorityB = Number.parseInt(b.priority || "999", 10);

  if (priorityA !== priorityB) return priorityA - priorityB;
  if ((a.country || "") !== (b.country || "")) return (a.country || "").localeCompare(b.country || "");
  return (a.brand || "").localeCompare(b.brand || "");
}

function partnerRouteLink(row) {
  const brand = row.brand || "unknown";
  const route = `/go/${slugify(brand)}/`;
  const status = row.affiliate_program_target || row.site_status || "apply";

  return `<a class="company-table-money-link" data-track="affiliate-click" data-brand="${escapeHtml(brand)}" data-affiliate-status="${escapeHtml(status)}" href="${escapeHtml(route)}" rel="sponsored nofollow">Check current offer</a>`;
}

function consumerFit(row) {
  const format = companyFormat(row).toLowerCase();
  const role = (row.market_role || row.category || "").toLowerCase();

  if (format.includes("meal kit")) return "Best when you want recipes and ingredients delivered, but still want to cook.";
  if (format.includes("prepared")) return "Best when you want ready-made meals with little or no cooking.";
  if (format.includes("high-protein") || role.includes("fitness") || role.includes("protein")) return "Best for fitness routines, higher-protein eating, or structured meal prep.";
  if (format.includes("plant")) return "Best for vegan, vegetarian, or plant-forward meal planning.";
  if (format.includes("diet") || role.includes("diet")) return "Best when you need a specific diet style or specialist plan.";
  if (format.includes("kids") || role.includes("family")) return "Best for family, kids, or parent-friendly meal planning.";
  if (format.includes("frozen")) return "Best when you want freezer-friendly meals ready for busy days.";
  if (format.includes("grocery")) return "Best when you want dinner shortcuts, produce, or grocery-style meal planning.";

  return "Compare fit, price, delivery area, and menu style before ordering.";
}

function consumerNote(row) {
  const role = (row.market_role || "").toLowerCase();
  const status = (row.site_status || "").toLowerCase();

  if (role.includes("legacy") || status.includes("inactive")) {
    return "Availability may be limited or historical, so check current ordering status first.";
  }

  return "Check delivery area, current menu, first-order offer, renewal price, and cancellation rules before buying.";
}

function companySummaryCounts(rows) {
  return {
    total: rows.length,
    prepared: rows.filter((row) => matchesCompanyType(row, "prepared")).length,
    mealKits: rows.filter((row) => matchesCompanyType(row, "meal-kit")).length,
    protein: rows.filter((row) => matchesCompanyType(row, "high-protein")).length,
    plant: rows.filter((row) => matchesCompanyType(row, "plant-based")).length,
  };
}

function companyTableShouldRender() {
  const path = window.location.pathname.toLowerCase();
  const bodyType = document.body.getAttribute("data-page-type") || "";

  if (document.querySelector("[data-company-table-mounted]")) return false;
  if (path.includes("/go/")) return false;
  if (path.includes("/privacy") || path.includes("/contact") || path.includes("/affiliate-disclosure")) return false;

  return (
    path.includes("/brand-directory") ||
    path.includes("/all-brands") ||
    bodyType.includes("directory")
  );
}

const BRAND_LOGO_DOMAINS = {
  "Blue Apron": "blueapron.com",
  "Chefs Plate": "chefsplate.com",
  CookUnity: "cookunity.com",
  Dinnerly: "dinnerly.com",
  EveryPlate: "everyplate.com",
  Factor: "factor75.com",
  Gousto: "gousto.co.uk",
  "Green Chef": "greenchef.com",
  HelloFresh: "hellofresh.com",
  "Home Chef": "homechef.com",
  Hungryroot: "hungryroot.com",
  "Little Spoon": "littlespoon.com",
  "Marley Spoon": "marleyspoon.com",
  "Mindful Chef": "mindfulchef.com",
  "My Muscle Chef": "mymusclechef.com",
  "Purple Carrot": "purplecarrot.com",
  Sprinly: "sprinly.com",
  Thistle: "thistle.co",
  Trifecta: "trifectanutrition.com",
  Youfoodz: "youfoodz.com",
};

function brandLogoUrl(brand) {
  const domain = BRAND_LOGO_DOMAINS[brand];

  if (!domain) return "";

  return `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
}

function brandInitials(brand) {
  return String(brand || "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function createBrandLogoChip(brand) {
  const chip = document.createElement("span");
  chip.className = "brand-logo-chip";
  chip.setAttribute("aria-label", `${brand} brand identifier`);

  const logoUrl = brandLogoUrl(brand);

  if (logoUrl) {
    const image = document.createElement("img");
    image.src = logoUrl;
    image.alt = "";
    image.loading = "lazy";
    image.decoding = "async";
    image.addEventListener("error", () => {
      image.remove();
      chip.textContent = brandInitials(brand);
      chip.classList.add("brand-logo-chip--fallback");
    });
    chip.append(image);
  } else {
    chip.textContent = brandInitials(brand);
    chip.classList.add("brand-logo-chip--fallback");
  }

  return chip;
}

function mountBrandLogoLayer() {
  const seenSections = new Set();

  document.querySelectorAll("[data-brand]").forEach((element) => {
    const brand = element.getAttribute("data-brand");
    if (!brand) return;

    const container = element.closest("article, td, .hero-verdict-card, .review-rail");
    if (!container || container.querySelector(".brand-logo-chip")) return;

    container.insertAdjacentElement("afterbegin", createBrandLogoChip(brand));
    seenSections.add(container.closest("main > section"));
  });

  document.querySelectorAll(".winner-grid article h3").forEach((heading) => {
    const brand = heading.textContent?.trim();
    if (!brand || !BRAND_LOGO_DOMAINS[brand]) return;

    const article = heading.closest("article");
    if (!article || article.querySelector(".brand-logo-chip")) return;

    heading.insertAdjacentElement("beforebegin", createBrandLogoChip(brand));
    seenSections.add(article.closest("main > section"));
  });

  const main = document.querySelector("main");
  if (!main || !seenSections.size || document.querySelector(".brand-affiliation-note")) return;

  const note = document.createElement("p");
  note.className = "brand-affiliation-note";
  note.textContent = "Brand names and logos are used for identification only. Every Meal Guide is not affiliated with listed brands unless a page clearly states otherwise.";
  main.insertAdjacentElement("afterbegin", note);
}

function mountNearbyAffiliateDisclosures() {
  const sections = [...document.querySelectorAll("main > section")];

  sections.forEach((section) => {
    if (!section.querySelector("[data-track='affiliate-click']")) return;
    if (section.querySelector(".nearby-affiliate-disclosure")) return;

    const disclosure = document.createElement("p");
    disclosure.className = "nearby-affiliate-disclosure";
    disclosure.textContent = "Disclosure: when you buy through our links, we may earn a commission at no extra cost to you.";

    const heading = section.querySelector(".section-heading, .comparison-copy, h1, h2");

    if (heading?.parentElement === section) {
      heading.insertAdjacentElement("afterend", disclosure);
      return;
    }

    section.insertAdjacentElement("afterbegin", disclosure);
  });
}

function mountCompanyCoverageTable(rows) {
  if (!companyTableShouldRender() || !rows.length) return;

  const context = companyTableContext();
  const main = document.querySelector("main");
  const anchor =
    document.querySelector(".quick-answer") ||
    document.querySelector(".category-rail") ||
    document.querySelector(".page-hero") ||
    document.querySelector(".hero");

  if (!main || !anchor) return;

  const section = document.createElement("section");
  section.className = "company-table-section";
  section.setAttribute("data-company-table-mounted", "true");

  const initialRows = rows
    .filter((row) => !context.country || row.country === context.country || row.country === "Global")
    .filter((row) => matchesCompanyType(row, context.type))
    .sort(sortCompanies);

  const summary = companySummaryCounts(initialRows.length ? initialRows : rows);

  section.innerHTML = `
    <div class="company-table-heading">
      <div>
        <span>Brand finder</span>
        <h2>${escapeHtml(context.title)}</h2>
        <p>${escapeHtml(context.intro)}</p>
      </div>
      <div class="company-table-stats" aria-label="Company coverage summary">
        <strong>${summary.total}</strong><span>matching listings</span>
        <strong>${summary.prepared}</strong><span>prepared</span>
        <strong>${summary.mealKits}</strong><span>meal kits</span>
        <strong>${summary.protein}</strong><span>protein/fitness</span>
      </div>
    </div>
    <div class="company-table-controls" aria-label="Filter meal companies">
      <label>
        Country
        <select data-company-filter="country">
          <option value="">All countries</option>
          <option value="US">US</option>
          <option value="UK">UK</option>
          <option value="Ireland">Ireland</option>
          <option value="Australia">Australia</option>
          <option value="Canada">Canada</option>
          <option value="Global">Global</option>
        </select>
      </label>
      <label>
        Meal type
        <select data-company-filter="type">
          <option value="">All meal types</option>
          <option value="prepared">Prepared meals / heat and eat</option>
          <option value="meal-kit">Meal kits / cook yourself</option>
          <option value="high-protein">High protein / fitness</option>
          <option value="plant-based">Plant-based / vegan</option>
          <option value="diet">Diet / specialist plans</option>
          <option value="kids">Kids / baby meals</option>
          <option value="frozen">Frozen meals</option>
          <option value="budget">Budget options</option>
        </select>
      </label>
      <label>
        Search brand
        <input type="search" data-company-filter="search" placeholder="HelloFresh, Factor, Gousto..." />
      </label>
    </div>
    <p class="company-table-count" data-company-count></p>
    <div class="company-table-wrap" role="region" aria-label="Meal company coverage table" tabindex="0">
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Market</th>
            <th>What it is</th>
            <th>Best for</th>
            <th>Before you choose</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody data-company-table-body></tbody>
      </table>
    </div>
  `;

  anchor.insertAdjacentElement("afterend", section);

  const countrySelect = section.querySelector("[data-company-filter='country']");
  const typeSelect = section.querySelector("[data-company-filter='type']");
  const searchInput = section.querySelector("[data-company-filter='search']");
  const count = section.querySelector("[data-company-count]");
  const tbody = section.querySelector("[data-company-table-body]");

  countrySelect.value = context.country || "";
  typeSelect.value = context.type || "";

  const renderRows = () => {
    const country = countrySelect.value;
    const type = typeSelect.value;
    const search = searchInput.value.trim().toLowerCase();
    const filtered = rows
      .filter((row) => !country || row.country === country || row.country === "Global")
      .filter((row) => matchesCompanyType(row, type))
      .filter((row) => {
        if (!search) return true;
        return `${row.brand} ${row.category} ${row.market_role} ${row.country}`.toLowerCase().includes(search);
      })
      .sort(sortCompanies);
    const visibleRows = filtered.slice(0, COMPANY_TABLE_MAX_ROWS);

    count.textContent = `Showing ${visibleRows.length} of ${filtered.length} matching meal-company listings.`;
    tbody.innerHTML = visibleRows
      .map((row) => {
        const reviewSlug = slugify(row.brand);

        return `
          <tr>
            <td><strong>${escapeHtml(row.brand)}</strong><a class="company-table-review-link" href="/reviews/${escapeHtml(reviewSlug)}/">Review page</a></td>
            <td>${escapeHtml(row.country || "Global")}</td>
            <td><span class="company-type-pill">${escapeHtml(companyFormat(row))}</span><small>${escapeHtml(row.category)}</small></td>
            <td>${escapeHtml(consumerFit(row))}</td>
            <td>${escapeHtml(consumerNote(row))}</td>
            <td>${partnerRouteLink(row)}<small>Compare availability, price, and terms before ordering.</small></td>
          </tr>
        `;
      })
      .join("");
  };

  [countrySelect, typeSelect].forEach((control) => control.addEventListener("change", renderRows));
  searchInput.addEventListener("input", renderRows);

  renderRows();
}

if (companyTableShouldRender()) {
  fetch("/seo/global-brand-universe.csv")
    .then((response) => {
      if (!response.ok) throw new Error(`Company data failed: ${response.status}`);
      return response.text();
    })
    .then((csvText) => {
      const rows = parseDinnerCompareCsv(csvText).filter((row) => row.brand && row.country);
      mountCompanyCoverageTable(rows);
    })
    .catch((error) => {
      console.warn("Every Meal Guide company table unavailable", error);
    });
}

// Mobile hamburger nav — injects toggle button, avoids editing every HTML page
(function mobileNav() {
  var header = document.querySelector('.site-header');
  if (!header) return;
  var nav = header.querySelector('nav');
  if (!nav) return;

  var btn = document.createElement('button');
  btn.className = 'nav-toggle';
  btn.setAttribute('aria-label', 'Open navigation menu');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-controls', 'site-nav');
  btn.innerHTML = '<span></span><span></span><span></span>';
  if (!nav.id) nav.id = 'site-nav';
  nav.classList.add('main-nav');

  // Insert before the nav CTA button
  var cta = header.querySelector('.nav-action');
  header.insertBefore(btn, cta || null);

  function open() {
    document.body.classList.add('nav-open');
    btn.setAttribute('aria-expanded', 'true');
    btn.setAttribute('aria-label', 'Close navigation menu');
  }
  function close() {
    document.body.classList.remove('nav-open');
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Open navigation menu');
  }

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    document.body.classList.contains('nav-open') ? close() : open();
  });

  // Close when a nav link is clicked
  nav.addEventListener('click', function(e) {
    if (e.target.tagName === 'A') close();
  });

  // Close on outside click
  document.addEventListener('click', function(e) {
    if (document.body.classList.contains('nav-open') && !header.contains(e.target)) close();
  });

  // Close on Escape
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') close();
  });
})();

// vs page priority filter — builds pill bar from winner-strip data, highlights decision cards
(function vsFilter() {
  if (!document.body.matches('[data-page-type="comparison"]')) return;

  var strip = document.querySelector('.winner-strip');
  var cards = document.querySelector('.vs-decision-cards');
  if (!strip || !cards) return;

  // Parse "Label: Brand" pairs from winner strip spans
  var priorities = Array.from(strip.querySelectorAll('span')).map(function(s) {
    var parts = s.textContent.split(':');
    if (parts.length < 2) return null;
    var label = parts[0].trim();
    var winner = parts[1].trim().toLowerCase();
    // Skip ambiguous entries
    if (winner === 'depends on routine' || winner === 'compare deals' || winner === 'either') return null;
    return { label: label, winner: winner };
  }).filter(Boolean);

  if (!priorities.length) return;

  // Build pill bar
  var bar = document.createElement('div');
  bar.className = 'vs-filter-bar';
  bar.setAttribute('aria-label', 'Filter by priority');
  var lbl = document.createElement('span');
  lbl.className = 'vs-filter-label';
  lbl.textContent = 'What matters most?';
  bar.appendChild(lbl);

  priorities.forEach(function(p) {
    var btn = document.createElement('button');
    btn.className = 'vs-filter-btn';
    btn.textContent = p.label;
    btn.dataset.winner = p.winner;
    bar.appendChild(btn);
  });

  cards.before(bar);

  // Highlight matching decision card on click
  bar.addEventListener('click', function(e) {
    var btn = e.target.closest('.vs-filter-btn');
    if (!btn) return;
    var winner = btn.dataset.winner;
    var isToggle = btn.classList.contains('active');

    document.querySelectorAll('.vs-filter-btn').forEach(function(b) { b.classList.remove('active'); });
    document.querySelectorAll('.vs-decision-cards article').forEach(function(a) {
      a.classList.remove('is-winner', 'is-runner');
    });

    if (isToggle) return; // second click = clear

    btn.classList.add('active');
    document.querySelectorAll('.vs-decision-cards article').forEach(function(a) {
      var label = (a.querySelector('span') || {}).textContent || '';
      var matches = label.toLowerCase().includes(winner);
      if (matches) a.classList.add('is-winner');
      else if (!label.toLowerCase().includes('neither')) a.classList.add('is-runner');
    });
  });
})();

// ponytail: inject verified date labels on /best/ pages
(function () {
  function run() {
    if (!document.querySelector('.ranking-list')) return;
    document.querySelectorAll('.rank-main h2').forEach(function (h2) {
      var span = document.createElement('span');
      span.className = 'rank-verified';
      span.textContent = 'Verified June 2026';
      h2.insertAdjacentElement('afterend', span);
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();

