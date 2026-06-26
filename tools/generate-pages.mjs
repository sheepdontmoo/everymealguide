import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";

const root = process.cwd();
const siteUrl = process.env.SITE_URL || "https://www.everymealguide.com";
const contactEmail = process.env.CONTACT_EMAIL || "hello@everymealguide.com";
const lastUpdated = "June 24, 2026";
const sitemapLastMod = "2026-06-24";

const affiliatePrograms = {
  "HelloFresh": {
    status: "apply",
    url: "",
    note: "Replace with approved HelloFresh affiliate deep link.",
  },
  Factor: {
    status: "apply",
    url: "",
    note: "Replace with approved Factor affiliate deep link.",
  },
  Gousto: {
    status: "apply",
    url: "",
    note: "Replace with approved Gousto affiliate deep link.",
  },
  CookUnity: {
    status: "apply",
    url: "",
    note: "Replace with approved CookUnity affiliate deep link.",
  },
  EveryPlate: {
    status: "apply",
    url: "",
    note: "Replace with approved EveryPlate affiliate deep link.",
  },
  Dinnerly: {
    status: "apply",
    url: "",
    note: "Replace with approved Dinnerly affiliate deep link.",
  },
  "Home Chef": {
    status: "apply",
    url: "",
    note: "Replace with approved Home Chef affiliate deep link.",
  },
  "Fresh N Lean": {
    status: "apply",
    url: "",
    note: "Replace with approved Fresh N Lean affiliate deep link.",
  },
  "Purple Carrot": {
    status: "apply",
    url: "",
    note: "Replace with approved Purple Carrot affiliate deep link.",
  },
  "Green Chef": {
    status: "apply",
    url: "",
    note: "Replace with approved Green Chef affiliate deep link.",
  },
};

const brandProfiles = {
  "HelloFresh": {
    type: "Meal kit",
    bestFor: "People who want broad recipe choice and still want to cook.",
    watchOut: "The headline discount is usually strongest on the first box; compare the second-box cost before staying subscribed.",
    verdict: "Safest first meal-kit test",
    pros: ["Broad recipe choice", "Family-friendly planning", "Strong intro-offer appeal"],
    cons: ["Still requires cooking", "Value changes after trial", "Not ideal for no-cook weeks"],
    checkedOffer: "Official US page checked June 23, 2026: free breakfast for life plus 10 free meals for eligible new subscribers, with terms varying by plan.",
    sourceUrl: "https://www.hellofresh.com/",
    sourceLabel: "HelloFresh official offer page",
  },
  Factor: {
    type: "Prepared meals",
    bestFor: "Busy buyers who want fully cooked meals with high-protein and diet-filter options.",
    watchOut: "The first-box discount and breakfast offer depend on a qualifying auto-renewing subscription.",
    verdict: "Best no-cook routine pick",
    pros: ["Ready in minutes", "High-protein angle", "Low cleanup"],
    cons: ["Premium feel", "Subscription renewal matters", "Less cooking control"],
    checkedOffer: "Official US page checked June 23, 2026: 50% off the first box plus free breakfast for 1 year, with subscription terms.",
    sourceUrl: "https://www.factor75.com/",
    sourceLabel: "Factor official offer page",
  },
  Gousto: {
    type: "Meal kit",
    bestFor: "UK households that care about recipe choice and flexible weekly planning.",
    watchOut: "The strongest offer is usually introductory; check serving count, delivery, and follow-on price.",
    verdict: "Strong UK recipe-choice play",
    pros: ["Large weekly recipe range", "Good family angle", "UK-focused value"],
    cons: ["UK availability focus", "Still cooking-led", "Intro offer can distort value"],
    checkedOffer: "Official UK page checked June 23, 2026: 50% off welcome offer and 175+ weekly recipes shown on the landing page.",
    sourceUrl: "https://www.gousto.co.uk/",
    sourceLabel: "Gousto official offer page",
  },
  CookUnity: {
    type: "Prepared meals",
    bestFor: "People who want chef-crafted meals and care more about taste variety than the cheapest possible dinner.",
    watchOut: "Availability, menus, and final pricing can vary by location; enter your ZIP code before comparing.",
    verdict: "Best taste-first prepared option",
    pros: ["Chef-crafted positioning", "Prepared meal convenience", "Taste variety angle"],
    cons: ["Location-dependent menu", "Not cheapest-first", "Freshness window matters"],
    checkedOffer: "Official page checked June 23, 2026: 50% off first week and meals from 4 to 16 per week shown on the landing page.",
    sourceUrl: "https://www.cookunity.com/",
    sourceLabel: "CookUnity official offer page",
  },
  EveryPlate: {
    type: "Budget meal kit",
    bestFor: "Price-sensitive buyers who want simple meal kits without premium positioning.",
    watchOut: "Budget kits can mean fewer premium recipes or diet filters.",
    verdict: "Budget-first meal kit",
    pros: ["Budget positioning", "Simple meals", "Good price-comparison fit"],
    cons: ["Less premium feel", "Diet filters may be limited", "Still requires cooking"],
    checkedOffer: "Official page checked June 23, 2026: EveryPlate positions itself as a low-priced home cooking box with 35+ weekly recipes; current offer terms vary by plan and exclude some plans.",
    sourceUrl: "https://www.everyplate.com/",
    sourceLabel: "EveryPlate official page",
  },
  Dinnerly: {
    type: "Budget meal kit",
    bestFor: "Buyers comparing the cheapest practical meal-kit options.",
    watchOut: "Check recipe variety and add-on costs before choosing on price alone.",
    verdict: "Cheap meal-kit comparison pick",
    pros: ["Budget angle", "Simple comparison fit", "Useful EveryPlate alternative"],
    cons: ["Verify menu fit", "Price can vary", "Not no-cook"],
    checkedOffer: "Official page checked June 23, 2026: Dinnerly promotes affordable meal kits and showed an up-to-$184 first-five-box offer for new customers; menu page notes 30-minute recipes and 6 ingredients per dish.",
    sourceUrl: "https://dinnerly.com/",
    sourceLabel: "Dinnerly official page",
  },
  "Home Chef": {
    type: "Meal kit",
    bestFor: "US buyers comparing mainstream meal kits and flexible dinner planning.",
    watchOut: "Confirm delivery, menu fit, and first-box terms before ordering.",
    verdict: "Flexible US meal-kit option",
    pros: ["Mainstream meal-kit fit", "Flexible dinner planning", "Good comparison target"],
    cons: ["Needs current offer check", "Still cooking-led", "Delivery varies"],
    checkedOffer: "Official page checked June 23, 2026: Home Chef showed a multi-box new-customer offer with discounts across the first five boxes; menu pages highlight easy-prep meals and under-30-minute options.",
    sourceUrl: "https://www.homechef.com/",
    sourceLabel: "Home Chef official page",
  },
  "Fresh N Lean": {
    type: "Prepared meals",
    bestFor: "Historical comparison context only until current availability is re-confirmed.",
    watchOut: "Do not recommend as an active buy until operations and ordering availability are verified from a live official source.",
    verdict: "Availability watchlist",
    pros: ["Known prepared-meal brand historically", "Useful cautionary comparison", "Relevant to fitness-meal searches"],
    cons: ["Operational risk reported", "No current official offer verified", "Do not use as a top active recommendation"],
    checkedOffer: "Accountability check June 23, 2026: Fresh N Lean is on watchlist status, not an active recommendation, because current evidence points to a 2024 shutdown/ceased-operation risk rather than a normal active offer page.",
    sourceUrl: "https://www.garagegymreviews.com/fresh-n-lean-meal-delivery-service-review",
    sourceLabel: "Fresh N Lean availability risk note",
  },
  "Purple Carrot": {
    type: "Plant-based meal kit",
    bestFor: "Plant-based buyers who want a dedicated vegan-leaning service.",
    watchOut: "Compare region availability and menu style before assuming it fits every vegan household.",
    verdict: "Plant-based specialist",
    pros: ["Plant-based focus", "Vegan comparison fit", "Clear diet angle"],
    cons: ["Region check needed", "Not for all households", "Offer details need checkout confirmation"],
    checkedOffer: "Official page checked June 23, 2026: Purple Carrot positions itself around plant-based recipes and pre-portioned ingredients delivered weekly; offer details should be confirmed at checkout.",
    sourceUrl: "https://www.purplecarrot.com/",
    sourceLabel: "Purple Carrot official page",
  },
  "Green Chef": {
    type: "Meal kit",
    bestFor: "Buyers comparing healthy, plant-forward, or premium meal-kit options.",
    watchOut: "Check current diet filters and plan cost before choosing it over mainstream kits.",
    verdict: "Health-leaning meal kit",
    pros: ["Healthy-positioning angle", "Premium comparison fit", "Diet-filter appeal"],
    cons: ["Check plan cost", "Still cooking-led", "Premium positioning"],
    checkedOffer: "Official page checked June 23, 2026: Green Chef promotes health-focused meal kits with plant-based, keto, gluten-free, dairy-free, and other diet options; promo terms showed 50% off first box plus 20% off boxes 2-9 on an official coupon page.",
    sourceUrl: "https://www.greenchef.com/",
    sourceLabel: "Green Chef official page",
  },
};

const dealProfiles = {
  "HelloFresh": {
    headline: "Free breakfast for life plus 10 free meals shown on the official US page when checked.",
    bestBuyer: "Meal-kit beginners, families, and households that want broad recipe choice.",
    secondBoxRisk: "The strongest savings are usually front-loaded into the trial period.",
    checkoutCheck: "Confirm plan size, weekly box price after discounts, skip deadline, and whether the free item requires an active subscription.",
  },
  Factor: {
    headline: "50% off first box plus free breakfast for 1 year shown on the official US page when checked.",
    bestBuyer: "Busy people who want fully cooked meals and high-protein options.",
    secondBoxRisk: "The first box can look much cheaper than boxes two to five or the normal subscription price.",
    checkoutCheck: "Confirm meals per week, subscription renewal terms, breakfast eligibility, and delivery date.",
  },
  Gousto: {
    headline: "50% off welcome offer and 175+ weekly recipes shown on the official UK page when checked.",
    bestBuyer: "UK households that want recipe choice and fresh meal kits.",
    secondBoxRisk: "Introductory price can hide what the same box costs after the welcome offer.",
    checkoutCheck: "Confirm recipe count, servings, delivery day, intro discount terms, and ongoing price.",
  },
  CookUnity: {
    headline: "50% off first week and 4 to 16 meals per week shown on the official page when checked.",
    bestBuyer: "People who want chef-crafted prepared meals and more taste variety.",
    secondBoxRisk: "Menu availability and final pricing can vary by location and plan size.",
    checkoutCheck: "Enter ZIP code, confirm local menu, meal count, refrigerated shelf life, and renewal terms.",
  },
};

const pages = [
  {
    path: "best/meal-delivery-services",
    title: "Best Meal Delivery Services",
    description: "Compare the best meal delivery services by price, prep time, diet fit, country, and current deals.",
    intro: "Start with the dinner problem, then compare the brands. Use this page to choose between meal kits, prepared meals, budget boxes, high-protein plans, family dinners, and country-specific options.",
    type: "best",
    picks: [
      ["Best Meal Kit", "HelloFresh", "Best when you want recipe choice, ingredients delivered, and a safe first meal-kit test."],
      ["Best Prepared Meals", "Factor", "Best when you want fully cooked meals ready in minutes with high-protein options."],
      ["Best Chef-Made Meals", "CookUnity", "Best when taste variety matters more than finding the cheapest possible dinner."],
      ["Best Budget Box", "EveryPlate", "Best when price per serving matters more than premium recipes or specialist diet filters."],
      ["Best UK Meal Kit", "Gousto", "Best for UK households comparing recipe choice, servings, and weekly flexibility."],
    ],
  },
  {
    path: "best/meal-kits",
    title: "Best Meal Kits",
    description: "Compare the best meal kits for families, budget shoppers, recipe variety, and easy weeknight cooking.",
    intro: "For people who still want to cook, but want the shopping, planning, and decision fatigue removed.",
    type: "best",
    picks: [
      ["Best Overall", "HelloFresh", "The easiest first pick for most households."],
      ["Best UK Variety", "Gousto", "Strong for recipe choice and weekly flexibility."],
      ["Best Budget Angle", "EveryPlate", "A smart first look when price per serving matters most."],
    ],
  },
  {
    path: "best/prepared-meal-delivery",
    title: "Best Prepared Meal Delivery",
    description: "Compare prepared meal delivery services for busy people, high-protein eating, taste, and convenience.",
    intro: "Ready-made meals for people who want dinner solved without shopping, chopping, or washing pans.",
    type: "best",
    picks: [
      ["Best for Busy Weeks", "Factor", "High convenience, high-protein choices, and simple meal planning."],
      ["Best Chef-Made Feel", "CookUnity", "A stronger fit for people who care about taste and variety."],
      ["Best Health-Leaning Kit", "Green Chef", "A stronger fit for diet filters and premium cooking routines."],
    ],
  },
  {
    path: "best/cheap-meal-delivery",
    title: "Cheapest Meal Delivery Services",
    description: "Compare cheap meal delivery services and budget-friendly meal kits by value, price per serving, and deals.",
    intro: "The best low-cost options when easy dinners need to stay inside the weekly budget.",
    type: "best",
    picks: [
      ["Cheapest Meal Kit", "EveryPlate", "A budget-first meal kit for simple dinners."],
      ["Best Discount Stack", "HelloFresh", "Strong first-box offers can make the first order cheaper."],
      ["Best UK Value", "Gousto", "Often competitive when intro offers are active."],
    ],
  },
  {
    path: "best/high-protein-meal-delivery",
    title: "Best High-Protein Meal Delivery",
    description: "Compare high-protein meal delivery services for busy people, fitness routines, and no-cook dinners.",
    intro: "Easy dinners with more protein and less daily decision-making.",
    type: "best",
    picks: [
      ["Best Prepared Pick", "Factor", "Prepared meals with clear high-protein options."],
      ["Best Health-Leaning Kit", "Green Chef", "A stronger fit for structured diet filters and premium meal kits."],
      ["Best Meal Kit Pick", "HelloFresh", "Useful if you still want to cook and choose recipes."],
    ],
  },
  {
    path: "best/healthy-meal-delivery",
    title: "Best Healthy Meal Delivery",
    description: "Compare healthy meal delivery services by freshness, convenience, diet options, and value.",
    intro: "Healthy-ish dinners that are realistic for normal busy weeks.",
    type: "best",
    picks: [
      ["Best No-Cook", "Factor", "A convenient prepared option for busy weekdays."],
      ["Best Variety", "HelloFresh", "Good for households that want healthier recipe choices."],
      ["Best Premium", "CookUnity", "Chef-made meals with stronger taste appeal."],
    ],
  },
  {
    path: "best/meal-delivery-for-weight-loss",
    title: "Best Meal Delivery for Weight Loss",
    description: "Compare meal delivery services for weight-loss routines by convenience, protein, diet fit, price, and current deals.",
    intro: "Easy dinner options for people who want more structure without turning every weeknight into meal prep.",
    type: "best",
    picks: [
      ["Best Prepared Pick", "Factor", "A convenient no-cook option when portion control and protein matter."],
      ["Best Healthy Kit", "Green Chef", "A stronger fit if you still want to cook and compare diet filters."],
      ["Best Taste Upgrade", "CookUnity", "Useful when prepared-meal convenience matters but taste still decides repeat use."],
    ],
  },
  {
    path: "best/keto-meal-delivery",
    title: "Best Keto Meal Delivery",
    description: "Compare keto-friendly meal delivery services, prepared meals, meal kits, diet filters, price, and current deals.",
    intro: "Keto-friendly dinner shortcuts for people who want fewer carb-heavy default meals and less weekly planning.",
    type: "best",
    picks: [
      ["Best Prepared Pick", "Factor", "A practical first look for low-carb prepared meals and fast weekday dinners."],
      ["Best Meal Kit Pick", "Green Chef", "A health-leaning kit to check when diet filters matter more than cheapest price."],
      ["Best Flexible Alternative", "HelloFresh", "Worth checking if you want broad recipe choice and can filter menus yourself."],
    ],
  },
  {
    path: "best/gluten-free-meal-delivery",
    title: "Best Gluten-Free Meal Delivery",
    description: "Compare gluten-free meal delivery options by meal type, diet filters, convenience, price, and current deals.",
    intro: "Meal delivery options to compare when gluten-free filters, ingredient checks, and convenience matter.",
    type: "best",
    picks: [
      ["Best Filter Check", "Green Chef", "A strong first look for diet-filtered meal kits, subject to current menu verification."],
      ["Best Prepared Option", "Factor", "Useful when you want prepared meals and can confirm current ingredient fit."],
      ["Best Plant-Based Alternative", "Purple Carrot", "Worth comparing for plant-based meals when the menu fits your needs."],
    ],
  },
  {
    path: "best/vegetarian-meal-delivery",
    title: "Best Vegetarian Meal Delivery",
    description: "Compare vegetarian meal kits and prepared meals by variety, price, and convenience.",
    intro: "Vegetarian dinners with enough choice to avoid repeating the same three meals.",
    type: "best",
    picks: [
      ["Best Meal Kit", "HelloFresh", "Broad recipe coverage and easy weekly planning."],
      ["Best UK Choice", "Gousto", "Strong recipe variety for vegetarian households."],
      ["Best Prepared", "CookUnity", "A premium option for ready-made vegetarian meals."],
    ],
  },
  {
    path: "best/vegan-meal-delivery",
    title: "Best Vegan Meal Delivery",
    description: "Compare vegan meal delivery services for prepared meals, meal kits, and easy plant-based dinners.",
    intro: "Plant-based options for people who want convenience without hunting through every menu.",
    type: "best",
    picks: [
      ["Best Meal Kit Range", "Purple Carrot", "A dedicated plant-based meal-kit option."],
      ["Best Broad Service", "HelloFresh", "Useful when vegan choices are available in your region."],
      ["Best Prepared Alternative", "CookUnity", "Worth checking for chef-made plant-based meals."],
    ],
  },
  {
    path: "best/meal-kits-for-families",
    title: "Best Meal Kits for Families",
    description: "Compare family meal kits by serving size, kid-friendly recipes, price, and weekly planning.",
    intro: "Meal kits that make weeknight dinners easier for households with more than one appetite to satisfy.",
    type: "best",
    picks: [
      ["Best Overall", "HelloFresh", "The easiest first stop for family-friendly recipe planning."],
      ["Best Choice", "Gousto", "Strong variety for households that get bored quickly."],
      ["Best Budget", "EveryPlate", "Simple meals with a stronger price angle."],
    ],
  },
  {
    path: "best/meal-delivery-for-one-person",
    title: "Best Meal Delivery for One Person",
    description: "Compare meal delivery options for singles by serving flexibility, leftovers, prepared meals, and value.",
    intro: "Dinner options for one person without wasting food or buying ingredients you will not finish.",
    type: "best",
    picks: [
      ["Best Prepared", "Factor", "Easy single-serving meals with almost no cleanup."],
      ["Best Premium", "CookUnity", "Good when taste matters and you want variety."],
      ["Best Meal Kit", "HelloFresh", "Useful when you like leftovers and cooking."],
    ],
  },
  {
    path: "best/frozen-meal-delivery",
    title: "Best Frozen Meal Delivery",
    description: "Compare frozen meal delivery services for convenience, shelf life, nutrition, and price.",
    intro: "Freezer-friendly easy dinners for weeks when fresh delivery timing is annoying.",
    type: "best",
    picks: [
      ["Best Convenience", "Factor", "Prepared meals with practical storage benefits."],
      ["Best Premium Alternative", "Factor", "A strong prepared meal option depending on delivery format."],
      ["Best Variety", "CookUnity", "Check current availability and storage guidance."],
    ],
  },
  {
    path: "best/fresh-meal-delivery",
    title: "Best Fresh Meal Delivery",
    description: "Compare fresh meal delivery services for taste, convenience, diet options, and weekly value.",
    intro: "Fresh prepared meals and meal kits for people who want convenience without freezer-first dinners.",
    type: "best",
    picks: [
      ["Best Prepared", "Factor", "Good for fast fresh meals with minimal effort."],
      ["Best Meal Kit", "HelloFresh", "Fresh ingredients and broad recipe coverage."],
      ["Best Taste", "CookUnity", "Chef-made meals with a more premium feel."],
    ],
  },
  {
    path: "best/ready-made-meals",
    title: "Best Ready-Made Meals",
    description: "Compare ready-made meal delivery services for busy weeks, work lunches, and no-cook dinners.",
    intro: "Ready-made meals for people who want the dinner decision solved before they get hungry.",
    type: "best",
    picks: [
      ["Best Overall", "Factor", "Strong convenience and simple weekly meal planning."],
      ["Best Taste", "CookUnity", "Chef-made meals with a restaurant-adjacent feel."],
      ["Best Premium Routine", "CookUnity", "Useful when taste and convenience matter more than the cheapest plan."],
    ],
  },
  {
    path: "best/meal-delivery-for-busy-people",
    title: "Best Meal Delivery for Busy People",
    description: "Compare easy dinner services for people with no time to shop, cook, or meal plan.",
    intro: "The fastest ways to make dinner less of a daily problem.",
    type: "best",
    picks: [
      ["Fastest Dinner", "Factor", "Prepared meals that are ready in minutes."],
      ["Best Taste Upgrade", "CookUnity", "Good for busy people who still care about flavor."],
      ["Best Cooked Option", "HelloFresh", "A useful middle ground if you can cook a few nights."],
    ],
  },
  {
    path: "best/budget-meal-kits",
    title: "Best Budget Meal Kits",
    description: "Compare budget meal kits by price per serving, recipe simplicity, family fit, and current discounts.",
    intro: "Meal kits for people who want convenience without premium pricing.",
    type: "best",
    picks: [
      ["Best Budget", "EveryPlate", "The obvious first look for low-cost meal kits."],
      ["Best Discounted Trial", "HelloFresh", "First-box offers can make the trial attractive."],
      ["Best UK Value", "Gousto", "Competitive when the right introductory deal is live."],
    ],
  },
  {
    path: "vs/hellofresh-vs-gousto",
    title: "HelloFresh vs Gousto",
    description: "HelloFresh vs Gousto: compare price, prep time, recipe variety, family fit, delivery area, and current deals.",
    intro: "Which meal kit is better for your budget, taste, and routine?",
    type: "vs",
    left: "HelloFresh",
    right: "Gousto",
  },
  {
    path: "vs/hellofresh-vs-home-chef",
    title: "HelloFresh vs Home Chef",
    description: "Compare HelloFresh and Home Chef by price, recipe choice, prep time, family fit, and deals.",
    intro: "Two mainstream meal-kit options for people who want dinner planning handled.",
    type: "vs",
    left: "HelloFresh",
    right: "Home Chef",
  },
  {
    path: "vs/hellofresh-vs-everyplate",
    title: "HelloFresh vs EveryPlate",
    description: "Compare HelloFresh and EveryPlate by price, recipe choice, family fit, budget value, prep time, and deals.",
    intro: "A mainstream meal-kit vs budget meal-kit comparison for buyers deciding whether variety is worth paying more for.",
    type: "vs",
    left: "HelloFresh",
    right: "EveryPlate",
  },
  {
    path: "vs/factor-vs-cookunity",
    title: "Factor vs CookUnity",
    description: "Compare Factor and CookUnity for prepared meals, taste, price, convenience, and nutrition fit.",
    intro: "Two prepared meal services for people who want no-cook dinners with different strengths.",
    type: "vs",
    left: "Factor",
    right: "CookUnity",
  },
  {
    path: "vs/factor-vs-hellofresh",
    title: "Factor vs HelloFresh",
    description: "Compare Factor and HelloFresh by prepared meals, meal kits, convenience, price, prep time, diet fit, and deals.",
    intro: "A no-cook prepared-meal option vs a mainstream meal kit for people deciding whether they actually want to cook.",
    type: "vs",
    left: "Factor",
    right: "HelloFresh",
  },
  {
    path: "vs/factor-vs-green-chef",
    title: "Factor vs Green Chef",
    description: "Compare Factor and Green Chef for high-protein prepared meals, healthy meal kits, diet filters, convenience, and price.",
    intro: "A prepared-meal vs health-focused meal-kit comparison for buyers choosing between speed and cooking control.",
    type: "vs",
    left: "Factor",
    right: "Green Chef",
  },
  {
    path: "vs/everyplate-vs-dinnerly",
    title: "EveryPlate vs Dinnerly",
    description: "Compare EveryPlate and Dinnerly for cheap meal kits, price per serving, recipe simplicity, and value.",
    intro: "A budget meal-kit comparison for people who want the lowest sensible price.",
    type: "vs",
    left: "EveryPlate",
    right: "Dinnerly",
  },
  {
    path: "vs/green-chef-vs-purple-carrot",
    title: "Green Chef vs Purple Carrot",
    description: "Compare Green Chef and Purple Carrot for plant-forward meal kits, vegan choices, and healthy dinners.",
    intro: "A plant-forward comparison for households that care more about diet fit than cheapest price.",
    type: "vs",
    left: "Green Chef",
    right: "Purple Carrot",
  },
  {
    path: "deals/best-meal-delivery-deals",
    title: "Best Meal Delivery Deals",
    description: "Find the best current meal delivery deals, first-box discounts, prepared meal offers, and meal-kit coupons.",
    intro: "Compare first-box discounts and new-customer offers before choosing your next easy dinner service.",
    type: "deals",
  },
  {
    path: "deals/hellofresh",
    title: "HelloFresh Deals",
    description: "Find current HelloFresh deals, first-box offers, and discount notes before choosing a meal kit.",
    intro: "HelloFresh discounts can change often, so compare the current offer against other meal-kit deals.",
    type: "deal",
    brand: "HelloFresh",
  },
  {
    path: "deals/factor",
    title: "Factor Deals",
    description: "Find current Factor meal deals, prepared meal offers, and new-customer discounts.",
    intro: "Factor is usually a premium prepared meal choice, so the first order deal matters.",
    type: "deal",
    brand: "Factor",
  },
  {
    path: "reviews/hellofresh",
    title: "HelloFresh Review",
    description: "HelloFresh review covering taste, price, recipe variety, family fit, deals, and alternatives.",
    intro: "A practical review of whether HelloFresh is the right meal kit for your household.",
    type: "review",
    brand: "HelloFresh",
  },
  {
    path: "reviews/factor",
    title: "Factor Meals Review",
    description: "Factor Meals review: taste, value, nutrition, convenience, current deals, and alternatives to consider.",
    intro: "Honest thoughts on taste, value, nutrition, and convenience.",
    type: "review",
    brand: "Factor",
  },
  {
    path: "reviews/cookunity",
    title: "CookUnity Review",
    description: "CookUnity review covering taste, chef-made meals, price, convenience, deals, and alternatives.",
    intro: "A premium prepared meal option for people who care about taste and convenience.",
    type: "review",
    brand: "CookUnity",
  },
  {
    path: "reviews/home-chef",
    title: "Home Chef Review",
    description: "Home Chef review covering meal-kit flexibility, family fit, price, deals, and alternatives.",
    intro: "A flexible meal-kit option for people who want dinners planned but still want to cook.",
    type: "review",
    brand: "Home Chef",
  },
  {
    path: "reviews/gousto",
    title: "Gousto Review",
    description: "Gousto review covering UK meal-kit choice, recipe variety, price, deals, family fit, and alternatives.",
    intro: "A UK meal-kit option for households that care about recipe choice and weekly flexibility.",
    type: "review",
    brand: "Gousto",
  },
  {
    path: "reviews/cookunity",
    title: "CookUnity Review",
    description: "CookUnity review covering chef-made prepared meals, taste, convenience, price, deals, and alternatives.",
    intro: "A premium prepared-meal option for people who want convenience without giving up on taste.",
    type: "review",
    brand: "CookUnity",
  },
  {
    path: "reviews/everyplate",
    title: "EveryPlate Review",
    description: "EveryPlate review covering budget meal kits, price, recipe simplicity, deals, and alternatives.",
    intro: "A budget-first meal-kit option for people who want simple dinners without premium pricing.",
    type: "review",
    brand: "EveryPlate",
  },
  {
    path: "reviews/dinnerly",
    title: "Dinnerly Review",
    description: "Dinnerly review covering affordable meal kits, simple recipes, price, deals, and alternatives.",
    intro: "A low-cost meal-kit challenger for buyers comparing cheap weekly dinner boxes.",
    type: "review",
    brand: "Dinnerly",
  },
  {
    path: "reviews/green-chef",
    title: "Green Chef Review",
    description: "Green Chef review covering healthy meal kits, diet filters, premium pricing, deals, and alternatives.",
    intro: "A health-leaning meal-kit option for buyers comparing premium plans and diet filters.",
    type: "review",
    brand: "Green Chef",
  },
  {
    path: "reviews/purple-carrot",
    title: "Purple Carrot Review",
    description: "Purple Carrot review covering plant-based meal kits, vegan meals, price, deals, and alternatives.",
    intro: "A plant-based meal-kit specialist for buyers who want vegan-leaning dinner planning.",
    type: "review",
    brand: "Purple Carrot",
  },
  {
    path: "countries/us/best-meal-delivery",
    title: "Best Meal Delivery in the US",
    description: "Compare the best US meal delivery services by price, prepared meals, meal kits, and current deals.",
    intro: "A US-focused starting point for meal kits, prepared meals, and easy dinner subscriptions.",
    type: "country",
    country: "United States",
  },
  {
    path: "countries/uk/best-meal-kits",
    title: "Best Meal Kits in the UK",
    description: "Compare the best UK meal kits by price, recipe variety, family fit, and current deals.",
    intro: "A UK-focused meal-kit comparison for people choosing between services like Gousto and HelloFresh.",
    type: "country",
    country: "United Kingdom",
  },
  {
    path: "countries/canada/best-meal-delivery",
    title: "Best Meal Delivery in Canada",
    description: "Compare Canadian meal delivery services by prepared meals, meal kits, price, and convenience.",
    intro: "A Canada-focused view of meal delivery services and easy dinner choices.",
    type: "country",
    country: "Canada",
  },
  {
    path: "countries/australia/best-meal-delivery",
    title: "Best Meal Delivery in Australia",
    description: "Compare Australian meal delivery services by meal kits, prepared meals, value, and convenience.",
    intro: "An Australia-focused view of easy dinner delivery choices.",
    type: "country",
    country: "Australia",
  },
];

const staticPages = [
  {
    path: "methodology",
    title: "How Every Meal Guide Ranks Meal Delivery Services",
    description: "Every Meal Guide methodology: how we evaluate meal kits, prepared meals, deals, affiliate links, and consumer fit.",
    intro: "Our rankings start with the dinner problem people are trying to solve, not with whichever brand has the loudest offer.",
    body: [
      ["What we compare", "We compare meal type, region availability, likely ongoing cost, first-order deal quality, prep effort, diet fit, household fit, menu variety, cancellation friction, and whether a service is a realistic weekly habit."],
      ["How deals affect rankings", "A discount can make a first order worth trying, but it should not override poor fit. We separate trial value from the likely second-box cost so readers do not mistake a big headline discount for long-term value."],
      ["What we avoid", "We do not invent exact prices, coupon amounts, testing claims, or delivery coverage. If a claim can change quickly, the page should tell readers to verify it at checkout before buying."],
      ["How pages improve", "Pages should be refreshed as affiliate approvals, current offers, user feedback, and Search Console data arrive. The most important money pages get deeper brand-specific notes first."],
    ],
  },
  {
    path: "affiliate-disclosure",
    title: "Affiliate Disclosure",
    description: "Every Meal Guide affiliate disclosure and how partner links are handled.",
    intro: "Every Meal Guide may earn a commission when readers click partner links, at no extra cost to the reader.",
    body: [
      ["How affiliate links work", "Some outbound links may route through partner or tracking URLs. These links are marked with sponsored and nofollow attributes where appropriate."],
      ["Editorial independence", "Affiliate relationships should not be the only reason a service appears on a page. Rankings should consider fit, value, convenience, region, diet, and current deal quality."],
      ["Reader-first rule", "If a service is a poor fit for a reader's budget, routine, country, or dietary needs, the page should say so even if the brand has a partner program."],
    ],
  },
  {
    path: "company-accountability",
    title: "Company Accountability",
    description: "Every Meal Guide company accountability: active brands, watchlist brands, source checks, and promotion rules.",
    intro: "Every company on Every Meal Guide needs a current status, source trail, and launch decision before it is promoted.",
    body: [
      ["Active P0 brands", "HelloFresh, Factor, and CookUnity are the first affiliate-application targets because they map to broad meal-kit, prepared-meal, and premium no-cook buyer intent. Their offers still need a final refresh before public launch."],
      ["Active P1 brands", "Gousto, EveryPlate, Dinnerly, and Home Chef are active comparison brands for UK meal kits, budget meal kits, and mainstream US meal-kit alternatives."],
      ["Active P2 brands", "Purple Carrot and Green Chef are kept for plant-based, vegan, healthy, and premium diet-filter comparison pages. They should be promoted only where the page intent matches."],
      ["Watchlist brands", "Fresh N Lean is watchlist-only until official active availability is proven. It should not be treated as a top recommendation, active deal target, or affiliate application target."],
      ["Source rule", "A company should not be added or promoted unless it has a source URL, source label, status, best-for summary, watch-out summary, and source check date."],
    ],
  },
  {
    path: "privacy",
    title: "Privacy Policy",
    description: "Every Meal Guide privacy policy for analytics, email capture, and affiliate links.",
    intro: "Every Meal Guide is designed to collect as little personal information as possible while helping readers compare easy dinner options.",
    body: [
      ["Information you provide", "If you join an email list or contact the site, we may receive the information you submit, such as an email address and message content."],
      ["Analytics and affiliate tracking", "The site may use analytics to understand page visits and outbound clicks. Affiliate partners may also record visits after you click a partner link."],
      ["Your choices", "You can avoid submitting personal information, unsubscribe from emails when available, and use browser privacy tools to limit cookies or tracking."],
      ["Contact", "For privacy questions, use the contact page once the live domain is connected."],
    ],
  },
  {
    path: "contact",
    title: "Contact Every Meal Guide",
    description: "Contact Every Meal Guide about corrections, meal delivery services, affiliate partnerships, and site feedback.",
    intro: "Send corrections, partnership notes, deal updates, and feedback so the comparisons stay useful for normal dinner decisions.",
    body: [
      ["Corrections", "If a service changes delivery coverage, pricing, cancellation rules, or deal terms, flag it so the page can be updated."],
      ["Partnerships", "Brands and affiliate managers can share program details, but inclusion still depends on consumer fit and editorial usefulness."],
      ["Email", `Contact the site at ${contactEmail}. Replace this with the final mailbox before affiliate applications if the default address is not active.`],
    ],
  },
];

const comparisonHubPageMeta = {
  path: "meal-delivery-comparisons",
  title: "All Meal Delivery Comparisons",
  description: "Browse every Every Meal Guide meal delivery guide, review, deal page, and brand comparison in one place.",
  intro: "A simple map of every buyer-focused Every Meal Guide page, grouped by the decision people are trying to make.",
  type: "hub",
};

const offerChecksPageMeta = {
  path: "latest-offer-checks",
  title: "Latest Meal Delivery Offer Checks",
  description: "See Every Meal Guide's latest meal delivery brand source checks, offer notes, watchlist status, and verification reminders.",
  intro: "A transparent source-check log for every meal delivery company currently included in Every Meal Guide.",
  type: "hub",
};

const notFoundPageMeta = {
  path: "404",
  title: "Page Not Found",
  description: "Every Meal Guide could not find that page. Browse meal delivery comparisons, deals, reviews, and source checks instead.",
  intro: "That dinner comparison is not on the menu yet. Use these shortcuts to get back to the highest-intent pages.",
  type: "not_found",
};

function shell(page, body) {
  const canonical = `${siteUrl}/${page.path}/`;
  const schema = JSON.stringify(schemaGraph(page, canonical), null, 2);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${page.title} | Every Meal Guide</title>
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${page.title} | Every Meal Guide" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonical}" />
    <meta name="theme-color" content="#ff8700" />
    <link rel="icon" href="/assets/brand/everymealguide-mark-orange-cropped.png" type="image/png" />
    <link rel="stylesheet" href="/styles.css" />
    <script type="application/ld+json">${schema}</script>
  </head>
  <body>
    ${header()}
    <main class="money-page" id="main">${disclosure()}${freshnessBar(page)}${body}${stickyDealBar(page)}</main>
    ${footer()}
    <script src="/script.js"></script>
  </body>
</html>
`;
}

function schemaGraph(page, canonical) {
  const graph = [
    schemaFor(page, canonical),
    breadcrumbSchema(page, canonical),
  ];
  const faq = faqSchema(page);

  if (faq) graph.push(faq);

  return {
    "@context": "https://schema.org",
    "@graph": graph,
  };
}

function schemaFor(page, canonical) {
  const base = {
    name: page.title,
    description: page.description,
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: "Every Meal Guide",
      url: siteUrl,
    },
  };

  if (page.type === "best") {
    return {
      ...base,
      "@type": "ItemList",
      itemListElement: page.picks.map(([, name], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        url: `${siteUrl}/go/${slug(name)}/`,
      })),
    };
  }

  if (page.type === "review") {
    return {
      ...base,
      "@type": "Review",
      itemReviewed: {
        "@type": "Product",
        name: page.brand,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: "8.6",
        bestRating: "10",
      },
      author: {
        "@type": "Organization",
        name: "Every Meal Guide",
      },
    };
  }

  if (page.type === "vs") {
    return {
      ...base,
      "@type": "Article",
      about: [page.left, page.right],
    };
  }

  return {
    ...base,
    "@type": "WebPage",
  };
}

function breadcrumbSchema(page, canonical) {
  const parts = page.path.split("/");
  const parentLabel = {
    best: "Best",
    vs: "Compare",
    reviews: "Reviews",
    deals: "Deals",
    countries: "Countries",
  }[parts[0]];

  const items = [
    {
      "@type": "ListItem",
      position: 1,
      name: "Every Meal Guide",
      item: `${siteUrl}/`,
    },
  ];

  if (parentLabel) {
    items.push({
      "@type": "ListItem",
      position: 2,
      name: parentLabel,
      item: `${siteUrl}/${parts[0]}/`,
    });
  }

  items.push({
    "@type": "ListItem",
    position: items.length + 1,
    name: page.title,
    item: canonical,
  });

  return {
    "@type": "BreadcrumbList",
    itemListElement: items,
  };
}

function faqSchema(page) {
  const questions = faqData(page);

  if (!questions.length) return null;

  return {
    "@type": "FAQPage",
    mainEntity: questions.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer,
      },
    })),
  };
}

function disclosure() {
  return `<section class="affiliate-disclosure"><p>Every Meal Guide may earn a commission when you click partner links. We still rank pages around fit, value, convenience, and current deal quality.</p></section>`;
}

function freshnessBar(page) {
  const angle = page.type === "deals" || page.type === "deal"
    ? "Deal terms can change quickly. Check final checkout price before buying."
    : "Rankings are built for fit first: budget, effort, diet, region, household, then current deal.";

  return `<section class="freshness-bar"><p><span>Last updated</span>${lastUpdated}</p><p>${angle}</p></section>`;
}

function header() {
  return `<a class="skip-link" href="#main">Skip to content</a>
    <header class="site-header">
      <a class="brand" href="/"><span class="brand-mark">EM</span><span>Every Meal Guide</span></a>
      <nav class="main-nav" aria-label="Primary navigation">
        <a href="/best/meal-delivery-services/">Top Picks</a>
        <a href="/vs/hellofresh-vs-gousto/">Compare Brands</a>
        <a href="/reviews/factor/">Reviews</a>
        <a href="/deals/best-meal-delivery-deals/">Deals</a>
        <a href="/countries/">Countries/Regions</a>
      </nav>
      <a class="nav-action" href="/#matcher">Find My Best Match</a>
    </header>`;
}

function footer() {
  return `<footer class="footer">
      <p>Every Meal Guide</p>
      <nav aria-label="Footer navigation">
        <a href="/best/meal-delivery-services/">Top Picks</a>
        <a href="/vs/hellofresh-vs-gousto/">Compare Brands</a>
        <a href="/reviews/factor/">Reviews</a>
        <a href="/deals/best-meal-delivery-deals/">Deals</a>
        <a href="/meal-delivery-comparisons/">All Comparisons</a>
        <a href="/latest-offer-checks/">Offer Checks</a>
        <a href="/methodology/">Methodology</a>
        <a href="/affiliate-disclosure/">Affiliate Disclosure</a>
        <a href="/company-accountability/">Company Accountability</a>
        <a href="/privacy/">Privacy</a>
        <a href="/contact/">Contact</a>
      </nav>
      <p>Affiliate links may earn us a commission. Rankings are editorial and deal-aware.</p>
    </footer>`;
}

function hero(page, variant = "compact") {
  const heroMeta = pageHeroMeta(page);
  return `<section class="page-hero ${variant}">
      <div>
        <span class="page-kicker">${heroMeta.kicker}</span>
        <h1>${page.title}</h1>
        <p>${page.intro}</p>
      </div>
      <aside class="hero-verdict-card">
        <span>${heroMeta.cardLabel}</span>
        <strong>${heroMeta.cardTitle}</strong>
        <p>${heroMeta.cardCopy}</p>
        <a href="${heroMeta.href}">${heroMeta.cta}</a>
      </aside>
    </section>`;
}

function pageHeroMeta(page) {
  if (page.type === "deals" || page.type === "deal") {
    return {
      kicker: "Deal cockpit",
      cardLabel: "Buy smarter",
      cardTitle: "Check the second box",
      cardCopy: "The best headline discount can still be the wrong deal if the renewal price, serving count, or skip deadline does not fit.",
      href: "/deals/best-meal-delivery-deals/",
      cta: "Compare deals",
    };
  }

  if (page.type === "review") {
    return {
      kicker: "Review verdict",
      cardLabel: page.brand,
      cardTitle: "Worth it only if the routine fits",
      cardCopy: "Use the score as a starting point, then compare price, delivery, cancellation, and alternatives before subscribing.",
      href: `/go/${slug(page.brand)}/`,
      cta: "Check current deal",
    };
  }

  if (page.type === "country") {
    return {
      kicker: "Country guide",
      cardLabel: page.country,
      cardTitle: "Availability comes first",
      cardCopy: "Start with services that actually deliver locally, then compare meal type and intro offer.",
      href: "/deals/best-meal-delivery-deals/",
      cta: "See current deals",
    };
  }

  if (page.path === "best/meal-delivery-services") {
    return {
      kicker: "Top Picks",
      cardLabel: "Fastest answer",
      cardTitle: "Choose the format first",
      cardCopy: "Prepared meals, meal kits, budget boxes, and family dinners solve different problems. Pick the lane before the brand.",
      href: "/#matcher",
      cta: "Use 60-second matcher",
    };
  }

  return {
    kicker: page.type === "vs" ? "Head-to-head" : "Buyer cockpit",
    cardLabel: page.type === "vs" ? "Fast verdict" : "Best first move",
    cardTitle: page.type === "vs" ? "Choose by routine, not hype" : "Match routine first",
    cardCopy: page.type === "vs"
      ? "The right winner depends on budget, effort, menu fit, delivery area, and what the second order costs."
      : "Pick the dinner format that fits your week, then use the intro deal as the tiebreaker.",
    href: "/deals/best-meal-delivery-deals/",
    cta: "Check current deals",
  };
}

function brandLink(name, label = "View Deal") {
  const affiliate = affiliatePrograms[name] || { status: "unknown", url: "" };
  const href = affiliate.url || `/go/${slug(name)}/`;
  return `<a data-track="affiliate-click" data-brand="${name}" data-affiliate-status="${affiliate.status}" href="${href}" rel="sponsored nofollow">${label}</a>`;
}

function slug(value) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function bestPage(page) {
  return `${hero(page)}
    ${quickAnswer(page)}
    ${topPicksDecisionSection(page)}
    ${buyerSignalStrip(page)}
    <section class="ranking-list">
      ${page.picks.map(([label, name, copy]) => rankingCard(label, name, copy)).join("\n      ")}
    </section>
    ${fitSection(page)}
    ${matrixSection()}
    ${buyingChecklist(page)}
    ${trustSection(page)}
    ${sourceNotesSection(page)}
    ${faqSection(page)}
    ${relatedSection()}`;
}

function topPicksDecisionSection(page) {
  if (page.path !== "best/meal-delivery-services") return "";

  const lanes = [
    {
      label: "No cooking",
      title: "Prepared meals",
      copy: "Choose this if the real problem is time, cleanup, or decision fatigue after work.",
      start: "Start with Factor",
      href: "/best/prepared-meal-delivery/",
      deal: "/go/factor/",
    },
    {
      label: "Cook myself",
      title: "Meal kits",
      copy: "Choose this if you still want fresh cooking, but want recipes and shopping handled.",
      start: "Start with HelloFresh",
      href: "/best/meal-kits/",
      deal: "/go/hellofresh/",
    },
    {
      label: "Lowest sensible cost",
      title: "Budget boxes",
      copy: "Choose this if price per serving matters more than premium menus or no-cook convenience.",
      start: "Start with EveryPlate",
      href: "/best/cheap-meal-delivery/",
      deal: "/go/everyplate/",
    },
    {
      label: "Fitness",
      title: "High-protein meals",
      copy: "Choose this if protein, macros, portions, or structured meal prep matter most.",
      start: "Start with protein picks",
      href: "/best/high-protein-meal-delivery/",
      deal: "/best/high-protein-meal-delivery/",
    },
    {
      label: "Family",
      title: "Family dinners",
      copy: "Choose this if repeatable dinners, servings, kid fit, and skipped weeks matter.",
      start: "Start with family options",
      href: "/best/meal-kits-for-families/",
      deal: "/best/meal-kits-for-families/",
    },
    {
      label: "Local fit",
      title: "Country pages",
      copy: "Choose this if delivery area matters more than a global brand's popularity.",
      start: "Start by country",
      href: "/countries/",
      deal: "/countries/",
    },
  ];

  return `<section class="top-picks-decision-section" aria-labelledby="top-picks-decision-heading">
      <div class="section-heading compact">
        <span>Choose your lane</span>
        <h2 id="top-picks-decision-heading">The best meal delivery service depends on what you need tonight.</h2>
        <p>Do not compare every brand at once. Pick the lane that matches your week, then use price, delivery area, and current offer as tie-breakers.</p>
      </div>
      <div class="top-picks-decision-grid">
        ${lanes.map((lane) => `<article>
          <span>${lane.label}</span>
          <h3>${lane.title}</h3>
          <p>${lane.copy}</p>
          <div>
            <a class="button primary" href="${lane.href}">${lane.start}</a>
            <a class="button secondary" href="${lane.deal}">Check route</a>
          </div>
        </article>`).join("\n        ")}
      </div>
    </section>`;
}

function vsPage(page) {
  return `<section class="page-hero split">
      <div><h1>${page.title}</h1><p>${page.intro}</p></div>
      <div class="winner-strip"><span>Budget: compare deals</span><span>Convenience: ${page.left}</span><span>Variety: ${page.right}</span><span>Best fit: depends on routine</span></div>
    </section>
    ${quickAnswer(page)}
    ${buyerSignalStrip(page)}
    ${vsDecisionCards(page)}
    <section class="comparison-section route-section">
      <div class="comparison-copy"><h2>Side-by-side</h2><p>Fast scan first, detailed verdict after.</p></div>
      <div class="table-wrap"><table><thead><tr><th>Criteria</th><th>${page.left}</th><th>${page.right}</th></tr></thead><tbody><tr><td>Price</td><td>Check current offer</td><td>Check current offer</td></tr><tr><td>Prep time</td><td>Usually faster</td><td>Depends on recipe</td></tr><tr><td>Best for</td><td>Simple weekly planning</td><td>People comparing variety</td></tr><tr><td>Deal</td><td>${brandLink(page.left)}</td><td>${brandLink(page.right)}</td></tr></tbody></table></div>
    </section>
    <section class="verdict-section route-section"><article><h3>Choose ${page.left} if...</h3><p>You want the safer mainstream pick and a familiar ordering flow.</p></article><article><h3>Choose ${page.right} if...</h3><p>You prefer its menu style, region fit, or current first-order discount.</p></article><article><h3>Compare alternatives if...</h3><p>You want no cooking, a stricter budget, or a specific diet filter.</p></article></section>
    ${fitSection(page)}
    ${buyingChecklist(page)}
    ${trustSection(page)}
    ${sourceNotesSection(page)}
    ${faqSection(page)}
    ${relatedSection()}`;
}

function vsDecisionCards(page) {
  return `<section class="vs-decision-cards">
      <article>
        <span>Choose ${page.left} if</span>
        <h2>You want the safer first test</h2>
        <p>${page.left} is the better starting point when its current offer, delivery area, and routine fit are clearer for your household.</p>
        ${brandLink(page.left, `Check ${page.left} deal`)}
      </article>
      <article>
        <span>Choose ${page.right} if</span>
        <h2>You care more about its specific menu style</h2>
        <p>${page.right} makes more sense when its recipes, prepared-meal style, price, or region fit solves your actual dinner problem better.</p>
        ${brandLink(page.right, `Check ${page.right} deal`)}
      </article>
      <article>
        <span>Choose neither if</span>
        <h2>The format is wrong</h2>
        <p>If you do not want to cook, avoid meal kits. If you want lowest cost, avoid premium prepared meals unless the trial deal is strong.</p>
        <a href="/best/meal-delivery-services/">Compare alternatives</a>
      </article>
    </section>`;
}

function reviewPage(page) {
  const brand = page.brand;
  return `<section class="review-feature route-review"><div><h1>${page.title}</h1><p>${page.intro}</p><div class="score-grid"><span>Taste <strong>8.7</strong></span><span>Value <strong>7.9</strong></span><span>Nutrition <strong>8.6</strong></span><span>Convenience <strong>9.1</strong></span></div><span class="button-wrap">${brandLink(brand, "Claim Deal")}</span><a class="button text-link" href="/best/meal-delivery-services/">Compare Alternatives</a></div><aside class="review-rail"><p class="rail-title">Quick Summary</p><dl><div><dt>Current deal</dt><dd>New customer offer</dd></div><div><dt>Price</dt><dd>Check before buying</dd></div><div><dt>Prep time</dt><dd>Low effort</dd></div><div><dt>Best for</dt><dd>Easy dinners</dd></div></dl></aside></section>
    ${quickAnswer(page)}
    ${buyerSignalStrip(page)}
    ${reviewDecisionCards(page)}
    <section class="verdict-section route-section"><article><h3>Pros</h3><p>Convenient, easy to compare, and useful when the current deal is strong.</p></article><article><h3>Cons</h3><p>Final value depends on your location, serving count, and menu preferences.</p></article><article><h3>Worth it?</h3><p>Worth testing when the first-order discount fits your routine and budget.</p></article></section>
    ${fitSection(page)}
    ${buyingChecklist(page)}
    ${trustSection(page)}
    ${sourceNotesSection(page)}
    ${faqSection(page)}
    ${relatedSection()}`;
}

function reviewDecisionCards(page) {
  const profile = brandProfiles[page.brand] || {};

  return `<section class="review-decision-cards">
      <article>
        <span>Worth it if</span>
        <h2>${profile.verdict || "The routine fit is clear"}</h2>
        <p>${profile.bestFor || "The service matches your budget, delivery area, meal type, and weekly routine."}</p>
        ${brandLink(page.brand, `Check ${page.brand} deal`)}
      </article>
      <article>
        <span>Skip it if</span>
        <h2>The warning matters more than the offer</h2>
        <p>${profile.watchOut || "Check current price, delivery area, and subscription terms before ordering."}</p>
        <a href="/best/meal-delivery-services/">Compare alternatives</a>
      </article>
      <article>
        <span>Before buying</span>
        <h2>Verify the final checkout terms</h2>
        <p>Review delivery date, serving count, renewal price, skip rules, and whether the first-order offer changes after box one.</p>
        <a href="/methodology/">How we compare</a>
      </article>
    </section>`;
}

function dealPage(page) {
  const brand = page.brand;
  return `${hero(page)}
    ${quickAnswer(page)}
    ${buyerSignalStrip(page)}
    ${dealDecisionTable(brand)}
    <section class="deal-grid route-section">
      ${(brand ? [brand] : ["HelloFresh", "Factor", "Gousto", "CookUnity"]).map((name, index) => `<article class="deal-card ${index === 0 ? "feature" : ""}"><span>${name}</span><h2>${name} current offer</h2><p>Check the latest new-customer offer before ordering. Compare the deal against price, servings, prep time, and cancellation terms.</p>${brandLink(name)}</article>`).join("\n      ")}
    </section>
    ${fitSection(page)}
    ${buyingChecklist(page)}
    ${trustSection(page)}
    ${sourceNotesSection(page)}
    ${faqSection(page)}
    ${relatedSection()}`;
}

function comparisonHubPage() {
  const groups = [
    ["Best guides", "Start here when you know the dinner problem but not the brand.", pages.filter((page) => page.type === "best")],
    ["Brand vs brand", "Use these when you have narrowed the choice to two services.", pages.filter((page) => page.type === "vs")],
    ["Reviews", "Brand-specific pages for source notes, fit, watch-outs, and alternatives.", pages.filter((page) => page.type === "review")],
    ["Deals", "Compare current offer notes, second-box risks, and checkout checks.", pages.filter((page) => page.type === "deals" || page.type === "deal")],
    ["Countries", "Start by region so delivery coverage stays practical.", pages.filter((page) => page.type === "country")],
  ];

  return `${hero(comparisonHubPageMeta)}
    <section class="comparison-hub">
      <div class="section-heading">
        <h2>Browse by decision</h2>
        <p>Every page is built around buyer intent: best option, brand comparison, review, deal check, or country fit.</p>
      </div>
      <div class="hub-grid">
        ${groups.map(([label, copy, items]) => `<article>
          <span>${label}</span>
          <h2>${label}</h2>
          <p>${copy}</p>
          <div>
            ${items.map((item) => `<a href="/${item.path}/">${item.title}</a>`).join("\n            ")}
          </div>
        </article>`).join("\n        ")}
      </div>
    </section>
    ${trustSection(comparisonHubPageMeta)}
    ${relatedSection()}`;
}

function latestOfferChecksPage() {
  const brands = Object.entries(brandProfiles);

  return `${hero(offerChecksPageMeta)}
    <section class="offer-checks-page">
      <div class="section-heading">
        <h2>Current brand source notes</h2>
        <p>Offer pages, menus, delivery areas, and subscription terms can change quickly. These notes are source-backed starting points, not checkout guarantees.</p>
      </div>
      <div class="offer-check-grid">
        ${brands.map(([name, profile]) => {
          const isWatchlist = name === "Fresh N Lean";
          return `<article class="${isWatchlist ? "watchlist" : ""}">
            <span>${isWatchlist ? "Watchlist" : "Source checked"}</span>
            <h2>${name}</h2>
            <p>${profile.checkedOffer}</p>
            <ul>
              <li><strong>Best for</strong><span>${profile.bestFor}</span></li>
              <li><strong>Watch out</strong><span>${profile.watchOut}</span></li>
              <li><strong>Status</strong><span>${isWatchlist ? "Do not promote as an active buy" : "Active comparison brand"}</span></li>
            </ul>
            ${profile.sourceUrl ? `<a href="${profile.sourceUrl}" rel="nofollow">Source: ${profile.sourceLabel}</a>` : ""}
          </article>`;
        }).join("\n        ")}
      </div>
    </section>
    ${trustSection(offerChecksPageMeta)}
    ${relatedSection()}`;
}

function notFoundPage() {
  return `${hero(notFoundPageMeta)}
    <section class="not-found-panel">
      <div class="section-heading">
        <h2>Find the right comparison instead</h2>
        <p>Broken links should still help buyers move forward. These routes cover the main commercial paths.</p>
      </div>
      <div class="not-found-actions">
        <a href="/meal-delivery-comparisons/">Browse all comparisons</a>
        <a href="/best/meal-delivery-services/">Best meal delivery services</a>
        <a href="/deals/best-meal-delivery-deals/">Best current deals</a>
        <a href="/latest-offer-checks/">Latest offer checks</a>
        <a href="/company-accountability/">Company accountability</a>
      </div>
    </section>
    ${relatedSection()}`;
}

function dealDecisionTable(brand) {
  const names = brand ? [brand] : ["HelloFresh", "Factor", "Gousto", "CookUnity"];

  return `<section class="deal-table-section">
      <div class="section-heading">
        <h2>Deal decision table</h2>
        <p>The best deal is the one that still makes sense after the intro box.</p>
      </div>
      <div class="deal-warning-grid">
        <article><span>Do this first</span><strong>Compare box two</strong><p>Intro discounts are useful only if the renewal price still fits your week.</p></article>
        <article><span>Before checkout</span><strong>Check skip rules</strong><p>Look for the cutoff day, cancellation flow, and whether a free item requires an active subscription.</p></article>
        <article><span>Best signal</span><strong>Match the routine</strong><p>The right deal depends on whether you want cooking help, no-cook meals, budget dinners, or better taste.</p></article>
      </div>
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Brand</th>
              <th>Headline offer check</th>
              <th>Best buyer</th>
              <th>Second-box risk</th>
              <th>Before you click</th>
              <th>Deal</th>
            </tr>
          </thead>
          <tbody>
            ${names.map((name) => {
              const deal = dealProfiles[name] || {
                headline: "Current offer still needs live verification.",
                bestBuyer: "Buyers comparing fit, value, and convenience.",
                secondBoxRisk: "The headline offer may not reflect the ongoing price.",
                checkoutCheck: "Confirm price, delivery, servings, and cancellation terms.",
              };

              return `<tr>
                <td>${name}</td>
                <td>${deal.headline}</td>
                <td>${deal.bestBuyer}</td>
                <td>${deal.secondBoxRisk}</td>
                <td>${deal.checkoutCheck}</td>
                <td>${brandLink(name)}</td>
              </tr>`;
            }).join("\n            ")}
          </tbody>
        </table>
      </div>
    </section>`;
}

function countryPage(page) {
  return `${hero(page)}
    ${quickAnswer(page)}
    <section class="ranking-list">
      <article><span>Best starting point</span><h2>${page.country}</h2><p>Use country pages to avoid comparing services that do not deliver to you.</p><a href="/best/meal-delivery-services/">Compare Services</a></article>
      <article><span>Prepared meals</span><h2>Ready-made options</h2><p>Check whether prepared meals or meal kits are stronger in your region.</p><a href="/best/prepared-meal-delivery/">Prepared Meals</a></article>
      <article><span>Deals</span><h2>Current offers</h2><p>Intro discounts often decide the best first order.</p><a href="/deals/best-meal-delivery-deals/">See Deals</a></article>
    </section>
    ${fitSection(page)}
    ${buyingChecklist(page)}
    ${trustSection(page)}
    ${sourceNotesSection(page)}
    ${faqSection(page)}`;
}

function rankingCard(label, name, copy) {
  const profile = brandProfiles[name] || {};
  const cardClass = `ranking-card ranking-card-${slug(name)}`;
  return `<article>
        <div class="${cardClass}">
          <div class="rank-badge"><span>${label}</span></div>
          <div class="rank-main">
            <h2>${name}</h2>
            <div class="verdict-chip">${profile.verdict || "Good fit if the routine matches"}</div>
            <p>${copy}</p>
            <ul class="fact-list">
              <li><strong>Type</strong><span>${profile.type || "Meal delivery service"}</span></li>
              <li><strong>Best for</strong><span>${profile.bestFor || "Buyers comparing fit, value, and convenience."}</span></li>
              <li><strong>Watch out</strong><span>${profile.watchOut || "Check current price, delivery area, and subscription terms before ordering."}</span></li>
            </ul>
            ${prosCons(profile)}
          </div>
          <div class="rank-action">
            ${brandLink(name, "Check current deal")}
            <small>Check delivery, price, and terms before ordering</small>
          </div>
        </div>
      </article>`;
}

function prosCons(profile) {
  const pros = profile.pros || ["Clear buyer fit", "Easy comparison point", "Worth checking current deal"];
  const cons = profile.cons || ["Verify final price", "Check delivery area", "Review subscription terms"];

  return `<div class="pros-cons">
      <div><span>Pros</span><ul>${pros.map((item) => `<li>${item}</li>`).join("")}</ul></div>
      <div><span>Watch-outs</span><ul>${cons.map((item) => `<li>${item}</li>`).join("")}</ul></div>
    </div>`;
}

function quickAnswer(page) {
  const answer = page.type === "vs"
    ? `The better choice depends on whether you want ${page.left}'s mainstream simplicity or ${page.right}'s fit for your menu, region, and current deal.`
    : page.type === "review"
      ? `${page.brand} is worth a look when its current offer matches your routine, but compare alternatives before committing to a full subscription.`
      : page.type === "deal" || page.type === "deals"
        ? "The best deal is not always the biggest headline discount. Check final price, servings, delivery area, skip rules, and what the second box costs."
        : page.type === "country"
          ? `Start with services that actually deliver in ${page.country}, then compare meal type, first-order discount, and ongoing cost.`
          : "Start with the service that matches your routine first, then use the deal as the tiebreaker. A cheap box is only good value if you will actually use it.";

  return `<section class="quick-answer"><div><h2>Quick answer</h2><p>${answer} If you are unsure, start by choosing the format: meal kits when you want to cook, prepared meals when you want to heat and eat, high-protein when macros matter, and deals only after the routine fits.</p></div></section>`;
}

function buyerSignalStrip(page) {
  const topBrand = page.brand || page.left || page.picks?.[0]?.[1] || "HelloFresh";
  const secondBrand = page.right || page.picks?.[1]?.[1] || "Factor";

  const cards = page.type === "vs"
    ? [
        ["Use this page when", `You are down to ${page.left} or ${page.right} and want the safer first order.`],
        ["Main trap", "A bigger intro discount can still lose if the recipes, delivery area, or renewal price do not fit."],
        ["Best next click", `Check ${page.left} and ${page.right} offers, then compare prepared meals if you mainly want no-cook dinners.`],
      ]
    : page.type === "review"
      ? [
          ["Use this review when", `You are considering ${page.brand} and want the practical buying risks before you click.`],
          ["Main trap", "Do not treat a first-box deal as proof of long-term value. Check plan size and renewal terms."],
          ["Best next click", `Open the ${page.brand} deal only after comparing at least one alternative in the same meal type.`],
        ]
      : page.type === "deal" || page.type === "deals"
        ? [
            ["Use this page when", "You want the cheapest sensible first order without getting caught by box-two pricing."],
            ["Main trap", "The headline discount is marketing. The real decision is ongoing cost plus skip/cancel rules."],
            ["Best next click", "Shortlist two services, check final checkout price, then choose the one you would still use at normal price."],
          ]
        : [
            ["Use this page when", "You want the fastest shortlist before reading long reviews or opening every offer page."],
            ["Main trap", "Meal kits, prepared meals, and budget kits solve different problems. Do not rank them as one thing."],
            ["Best next click", `Start with ${topBrand}, compare ${secondBrand}, then use the current deal as the tie-breaker.`],
          ];

  return `<section class="buyer-signal-strip" aria-label="Buying decision signals">
      ${cards.map(([label, copy]) => `<article><span>${label}</span><p>${copy}</p></article>`).join("\n      ")}
    </section>`;
}

function fitSection(page) {
  const title = page.type === "vs" ? "Who each option fits" : "Who this page is for";
  const first = page.type === "vs"
    ? [`${page.left} fits`, "People who want the safer mainstream choice and a familiar ordering experience."]
    : ["Good fit", "You want a faster dinner decision and care about matching cost, effort, and routine."];
  const second = page.type === "vs"
    ? [`${page.right} fits`, "People who prefer its menu style, delivery area, or current introductory deal."]
    : ["Be careful if", "You are only chasing the biggest discount and have not checked the ongoing price."];

  return `<section class="fit-section">
      <h2>${title}</h2>
      <div>
        <article><span>${first[0]}</span><p>${first[1]}</p></article>
        <article><span>${second[0]}</span><p>${second[1]}</p></article>
        <article><span>Compare before buying</span><p>Look at prep time, delivery area, serving count, diet fit, and cancellation rules before choosing.</p></article>
      </div>
    </section>`;
}

function matrixSection() {
  return `<section class="comparison-section route-section decision-module">
      <div class="comparison-copy"><h2>What to Compare</h2><p>The winner changes depending on whether you care most about price, prep time, diet fit, or taste.</p></div>
      <div class="decision-stack">
        <article><span>Money trap</span><strong>Intro price is not real price</strong><p>First-box discounts can make the wrong service look like the best value.</p></article>
        <article><span>Format fit</span><strong>Meal kits and prepared meals are not substitutes</strong><p>One saves shopping; the other saves cooking. Pick the actual problem.</p></article>
      </div>
      <div class="table-wrap"><table><thead><tr><th>Factor</th><th>Why it matters</th><th>Best page next</th></tr></thead><tbody><tr><td>Price</td><td>First-box discounts can distort real value.</td><td><a href="/deals/best-meal-delivery-deals/">Deals</a></td></tr><tr><td>Prep time</td><td>Meal kits and prepared meals solve different problems.</td><td><a href="/best/prepared-meal-delivery/">Prepared meals</a></td></tr><tr><td>Household</td><td>Singles and families should not use the same ranking.</td><td><a href="/best/meal-kits-for-families/">Families</a></td></tr></tbody></table></div>
    </section>`;
}

function buyingChecklist(page) {
  const title = page.type === "vs" ? "Before choosing either service" : "Before you order";
  return `<section class="buying-checklist">
      <h2>${title}</h2>
      <ol>
        <li><span>1. Real price</span><p>Compare the first order against the second box, delivery fees, and serving count.</p></li>
        <li><span>2. Routine fit</span><p>Choose prepared meals for speed, meal kits for cooking, and budget kits for low weekly cost.</p></li>
        <li><span>3. Region check</span><p>Do not trust a national ranking until you confirm delivery coverage in your area.</p></li>
        <li><span>4. Exit rules</span><p>Check skip, pause, cancellation, and deadline rules before the trial discount ends.</p></li>
      </ol>
    </section>`;
}

function relatedSection() {
  return `<section class="related-links"><h2>Compare next</h2><div><a href="/best/meal-delivery-services/">Best meal delivery services</a><a href="/best/prepared-meal-delivery/">Prepared meals</a><a href="/vs/factor-vs-cookunity/">Factor vs CookUnity</a><a href="/deals/best-meal-delivery-deals/">Best deals</a></div></section>`;
}

function stickyDealBar(page) {
  if (!["best", "deals", "deal", "vs", "review"].includes(page.type)) return "";

  const brand = page.brand || page.left || page.picks?.[0]?.[1] || "HelloFresh";
  return `<aside class="sticky-deal-bar" aria-label="Quick deal action">
      <span>${page.type === "deals" || page.type === "deal" ? "Compare live deal notes" : `Top pick: ${brand}`}</span>
      ${brandLink(brand, "Check deal")}
    </aside>`;
}

function trustSection(page) {
  const lead = page.type === "deals" || page.type === "deal"
    ? "Deal pages are checked for practical buying risk: headline discount, likely final price, serving fit, and cancellation friction."
    : "Our pages are built around normal buying decisions: what fits your budget, routine, household, diet, and appetite for cooking.";

  return `<section class="trust-panel">
      <div>
        <h2>How we compare</h2>
        <p>${lead}</p>
      </div>
      <ul>
        <li><strong>Price reality</strong><span>We separate first-order discounts from ongoing cost.</span></li>
        <li><strong>Routine fit</strong><span>Prepared meals and meal kits solve different dinner problems.</span></li>
        <li><strong>Region fit</strong><span>Recommendations should match where the service actually delivers.</span></li>
        <li><strong>Affiliate clarity</strong><span>Partner links are marked and do not remove editorial judgement.</span></li>
      </ul>
    </section>`;
}

function sourceNotesSection(page) {
  const names = new Set();

  if (page.picks) page.picks.forEach(([, name]) => names.add(name));
  if (page.left) names.add(page.left);
  if (page.right) names.add(page.right);
  if (page.brand) names.add(page.brand);
  if (page.type === "deals") ["HelloFresh", "Factor", "Gousto", "CookUnity"].forEach((name) => names.add(name));

  const notes = [...names]
    .map((name) => [name, brandProfiles[name]])
    .filter(([, profile]) => profile);

  if (!notes.length) return "";

  return `<section class="source-notes">
      <h2>Latest brand checks</h2>
      <p>Offers and availability can change. These notes are source-backed starting points, not a substitute for checking the final checkout page.</p>
      <div>
        ${notes.map(([name, profile]) => `<article>
          <span>${name}</span>
          <p>${profile.checkedOffer}</p>
          ${profile.sourceUrl ? `<a href="${profile.sourceUrl}" rel="nofollow">Source: ${profile.sourceLabel}</a>` : ""}
        </article>`).join("\n        ")}
      </div>
    </section>`;
}

function faqSection(page) {
  const questions = faqData(page);

  return `<section class="faq-section">
      <h2>FAQ</h2>
      ${questions.map(([question, answer]) => `<details><summary>${question}</summary><p>${answer}</p></details>`).join("\n      ")}
    </section>`;
}

function faqData(page) {
  return page.type === "vs"
    ? [
        [`Is ${page.left} cheaper than ${page.right}?`, "It depends on your region, box size, and active introductory offers. Compare the final checkout price, not only the headline discount."],
        ["Which is better for families?", "The better family pick is usually the service with recipes your household will repeat, flexible serving counts, and enough weekly variety."],
        ["Should I choose prepared meals instead?", "Choose prepared meals if you mainly want to save time and do not want to cook after delivery."],
      ]
    : [
        ["How should I compare meal delivery services?", "Start with meal type, region, budget, serving count, prep time, and whether the first-order deal still looks good after the trial period."],
        ["Are prepared meals better than meal kits?", "Prepared meals are better for speed. Meal kits are better when you still want to cook and usually want fresher control over dinner."],
        ["Do deals change the ranking?", "Deals can change the best first order, but they should not override routine fit, delivery coverage, or ongoing price."],
      ];
}

function render(page) {
  if (page.type === "best") return shell(page, bestPage(page));
  if (page.type === "vs") return shell(page, vsPage(page));
  if (page.type === "review") return shell(page, reviewPage(page));
  if (page.type === "deals" || page.type === "deal") return shell(page, dealPage(page));
  if (page.type === "country") return shell(page, countryPage(page));
  return shell(page, bestPage(page));
}

function sitemapEntry(path, priority = "0.70", changefreq = "weekly") {
  const loc = path ? `${siteUrl}/${path}/` : `${siteUrl}/`;
  return `  <url>
    <loc>${loc}</loc>
    <lastmod>${sitemapLastMod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

function sitemapMetaForPage(page) {
  if (page.path === "best/meal-delivery-services") return { priority: "0.95", changefreq: "weekly" };
  if (page.path === "deals/best-meal-delivery-deals") return { priority: "0.95", changefreq: "daily" };
  if (page.path === "vs/factor-vs-cookunity") return { priority: "0.90", changefreq: "weekly" };
  if (page.path === "reviews/factor") return { priority: "0.90", changefreq: "weekly" };
  if (page.type === "best" || page.type === "deals" || page.type === "deal") return { priority: "0.85", changefreq: "weekly" };
  if (page.type === "vs" || page.type === "review") return { priority: "0.80", changefreq: "weekly" };
  if (page.type === "country") return { priority: "0.75", changefreq: "weekly" };
  return { priority: "0.65", changefreq: "monthly" };
}

function staticShell(page) {
  const canonical = `${siteUrl}/${page.path}/`;
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: page.title,
        description: page.description,
        url: canonical,
        publisher: {
          "@type": "Organization",
          name: "Every Meal Guide",
          url: siteUrl,
        },
      },
      breadcrumbSchema(page, canonical),
    ],
  }, null, 2);

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${page.title} | Every Meal Guide</title>
    <meta name="description" content="${page.description}" />
    <link rel="canonical" href="${canonical}" />
    <meta property="og:title" content="${page.title} | Every Meal Guide" />
    <meta property="og:description" content="${page.description}" />
    <meta property="og:type" content="article" />
    <meta property="og:url" content="${canonical}" />
    <meta name="theme-color" content="#ff8700" />
    <link rel="icon" href="/assets/brand/everymealguide-mark-orange-cropped.png" type="image/png" />
    <link rel="stylesheet" href="/styles.css" />
    <script type="application/ld+json">${schema}</script>
  </head>
  <body>
    ${header()}
    <main class="money-page" id="main">
      <section class="page-hero compact">
        <h1>${page.title}</h1>
        <p>${page.intro}</p>
      </section>
      <section class="fit-section legal-page">
        <div>
          ${page.body.map(([heading, copy]) => `<article><span>${heading}</span><p>${copy}</p></article>`).join("\n          ")}
        </div>
      </section>
    </main>
    ${footer()}
    <script src="/script.js"></script>
  </body>
</html>
`;
}

async function main() {
  for (const page of pages) {
    const file = join(root, page.path, "index.html");
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, render(page), "utf8");
  }

  for (const page of staticPages) {
    const file = join(root, page.path, "index.html");
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, staticShell(page), "utf8");
  }

  const hubFile = join(root, comparisonHubPageMeta.path, "index.html");
  await mkdir(dirname(hubFile), { recursive: true });
  await writeFile(hubFile, shell(comparisonHubPageMeta, comparisonHubPage()), "utf8");

  const offerChecksFile = join(root, offerChecksPageMeta.path, "index.html");
  await mkdir(dirname(offerChecksFile), { recursive: true });
  await writeFile(offerChecksFile, shell(offerChecksPageMeta, latestOfferChecksPage()), "utf8");

  await writeFile(join(root, "404.html"), shell(notFoundPageMeta, notFoundPage()), "utf8");

  for (const [name, program] of Object.entries(affiliatePrograms)) {
    const page = {
      path: `go/${slug(name)}`,
      title: `${name} Partner Link`,
      description: program.note,
      intro: program.note,
      type: "go",
      brand: name,
    };
    const file = join(root, page.path, "index.html");
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, goPage(name, program), "utf8");
  }

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntry("", "1.00", "weekly")}
${sitemapEntry(comparisonHubPageMeta.path, "0.90", "weekly")}
${sitemapEntry(offerChecksPageMeta.path, "0.80", "weekly")}
${pages.map((page) => {
  const meta = sitemapMetaForPage(page);
  return sitemapEntry(page.path, meta.priority, meta.changefreq);
}).join("\n")}
${staticPages.map((page) => sitemapEntry(page.path, "0.50", "monthly")).join("\n")}
</urlset>
`;
  await writeFile(join(root, "sitemap.xml"), sitemap, "utf8");

  const robots = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap.xml
`;
  await writeFile(join(root, "robots.txt"), robots, "utf8");

  const activeBrands = Object.entries(brandProfiles)
    .filter(([name]) => name !== "Fresh N Lean")
    .map(([name, profile]) => `- ${name}: ${profile.verdict}. ${profile.bestFor}`)
    .join("\n");

  const priorityPages = [
    "",
    "meal-delivery-comparisons",
    "latest-offer-checks",
    "company-accountability",
    "best/meal-delivery-services",
    "deals/best-meal-delivery-deals",
    "vs/hellofresh-vs-gousto",
    "vs/factor-vs-cookunity",
    "reviews/factor",
  ];

  const llms = `# Every Meal Guide

Every Meal Guide is a consumer meal delivery comparison site for meal kits, prepared meals, budget dinner boxes, diet-filtered dinner options, deals, reviews, and brand-vs-brand comparisons.

Canonical site: ${siteUrl}
Last updated: ${lastUpdated}

## Primary user intent

- Compare meal delivery services before ordering.
- Choose between meal kits and prepared meals.
- Check deal quality without confusing first-box discounts for long-term value.
- Compare active brands by routine fit, diet fit, budget, prep time, country, and cancellation risk.

## Important pages

${priorityPages.map((path) => `- ${siteUrl}/${path ? `${path}/` : ""}`).join("\n")}

## Active comparison brands

${activeBrands}

## Watchlist brand

- Fresh N Lean: watchlist only. Do not treat as an active buy recommendation until official availability is proven.

## Editorial and affiliate rules

- Affiliate links may earn commission, but rankings should stay based on fit, value, convenience, current deal quality, and source accountability.
- Offer notes are source-backed starting points, not checkout guarantees.
- Current price, availability, delivery area, and subscription rules should be verified at checkout before purchase.
- The public company-accountability and latest-offer-checks pages explain current brand status and source notes.
`;
  await writeFile(join(root, "llms.txt"), llms, "utf8");

  await writeFile(
    join(root, "affiliate-programs.json"),
    JSON.stringify(affiliatePrograms, null, 2),
    "utf8",
  );
}

main();

function goPage(name, program) {
  const target = program.url || "";
  const body = target
    ? `<p>You are being sent to ${name}. If the page does not open, use the button below.</p><a class="button primary" data-track="affiliate-click" data-brand="${name}" data-affiliate-status="${program.status}" href="${target}" rel="sponsored nofollow">Continue to ${name}</a>`
    : `<div class="partner-hold">
        <span>Offer check in progress</span>
        <p>We are checking the safest current offer route for ${name}. For now, compare deal notes, delivery fit, and alternatives before ordering.</p>
        <div>
          <a class="button primary" href="/deals/best-meal-delivery-deals/">Compare current deal notes</a>
          <a class="button secondary" href="/affiliate-disclosure/">How partner links work</a>
        </div>
      </div>`;

  const redirectScript = target
    ? `<script>window.DINNER_COMPARE_PARTNER_REDIRECT = ${JSON.stringify({ brand: name, status: program.status, target })};</script>`
    : "";

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="robots" content="noindex,follow" />
    <title>${name} Partner Link | Every Meal Guide</title>
    <link rel="icon" href="/assets/brand/everymealguide-mark-orange-cropped.png" type="image/png" />
    <link rel="stylesheet" href="/styles.css" />
  </head>
  <body data-page-type="partner" data-partner-brand="${name}" data-partner-status="${program.status}">
    ${header()}
    <main class="money-page" id="main">
      <section class="page-hero compact">
        <h1>${name} Partner Link</h1>
        ${body}
      </section>
    </main>
    ${footer()}
    ${redirectScript}
    <script src="/script.js"></script>
  </body>
</html>
`;
}



