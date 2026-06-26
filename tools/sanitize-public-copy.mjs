import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const excludedDirectories = new Set([
  ".git",
  ".vercel",
  "node_modules",
  "content",
  "daily",
  "reports",
  "seo",
  "tools",
]);

const replacements = [
  [/data-page-type="partner"/g, 'data-page-type="offer-check"'],
  [/ data-partner-status="[^"]*"/g, ""],
  [/<div><dt>Status<\/dt><dd>[^<]*<\/dd><\/div>/g, ""],
  [/<div><dt>Role<\/dt><dd>[^<]*<\/dd><\/div>/g, ""],
  [/CASH ROUTE READY - AFFILIATE APPROVAL PENDING/g, "CHECK CURRENT OFFER TERMS"],
  [/Cash route ready - affiliate approval pending/g, "Check current offer terms"],
  [/cash route ready - affiliate approval pending/g, "check current offer terms"],
  [/Cash route ready/g, "Check current offer"],
  [/cash route ready/g, "check current offer"],
  [/trackable internal route/g, "offer check"],
  [/automatic partner redirect/g, "current offer link"],
  [/automatic offer check/g, "current offer check"],
  [/owner-approved tracking URL/g, "approved offer link"],
  [/affiliate program approves/g, "offer details are confirmed"],
  [/partner redirect/g, "current offer link"],
  [/Opens partner or holding page/g, "Check delivery, price, and terms before ordering"],
  [/opens partner or holding page/g, "check delivery, price, and terms before ordering"],
  [/partner\/holding page/g, "offer page"],
  [/partner or holding page/g, "offer page"],
  [/official holding routes/g, "offer checks"],
  [/official holding route/g, "offer check"],
  [/official holding URLs/g, "offer links"],
  [/holding pages/g, "offer pages"],
  [/holding page/g, "offer page"],
  [/holding routes/g, "offer checks"],
  [/holding route/g, "offer check"],
  [/approved clearly disclosed tracking/g, "clearly disclosed partner links"],
  [/approved partner routes after acceptance/g, "clearly disclosed partner links when available"],
  [/legacy prepared meals/g, "prepared meals"],
  [/legacy meal kit/g, "meal kit"],
  [/Buyer Route/g, "Decision Guide"],
  [/buyer route/g, "decision guide"],
  [/Coverage cockpit/g, "Company guide"],
  [/coverage cockpit/g, "company guide"],
  [/Accountability table/g, "Comparison table"],
  [/accountability table/g, "comparison table"],
  [/Evidence and next action/g, "What to compare next"],
  [/evidence and next action/g, "what to compare next"],
  [/Evidence boundary/g, "Reality check"],
  [/evidence boundary/g, "reality check"],
  [/Evidence rule/g, "Reality check"],
  [/evidence rule/g, "reality check"],
  [/Evidence table/g, "Source notes"],
  [/evidence table/g, "source notes"],
  [/Affiliate action/g, "Before you choose"],
  [/affiliate action/g, "before you choose"],
  [/brand-market rows tracked/g, "brand-market listings"],
  [/tracked company rows/g, "companies listed"],
  [/tracked rows/g, "listed companies"],
  [/source tracked/g, "source checked"],
  [/tracked by Every Meal Guide/g, "listed by Every Meal Guide"],
  [/Partner Route/g, "Offer Check"],
  [/partner route/g, "offer check"],
  [/Money route/g, "Offer"],
  [/money route/g, "offer"],
  [/Cash route table/g, "All options table"],
  [/cash route table/g, "all options table"],
  [/Cash routing table/g, "Offer check table"],
  [/cash routing table/g, "offer check table"],
  [/Cash routing/g, "Offer checks"],
  [/cash routing/g, "offer checks"],
  [/Cash route/g, "Offer check"],
  [/cash route/g, "offer check"],
  [/Money path/g, "What to check"],
  [/money path/g, "what to check"],
  [/monetization path/g, "what to check"],
  [/commercially ready/g, "ready to compare"],
  [/partner readiness/g, "availability notes"],
  [/partner-readiness/g, "availability-notes"],
  [/partnership readiness/g, "availability notes"],
  [/partner tracking/g, "clearly disclosed tracking"],
  [/affiliate approval pending/g, "offer check in progress"],
  [/approved affiliate URLs/g, "current offer links"],
  [/affiliate URLs/g, "partner offer links"],
  [/Affiliate URLs/g, "Partner offer links"],
  [/source ledger/g, "local provider list"],
  [/Source ledger/g, "Local provider list"],
  [/source-led brand review/g, "brand review"],
  [/Source-led brand review/g, "Brand review"],
  [/source-led brand route/g, "brand option"],
  [/Source-led brand route/g, "Brand option"],
  [/route status/g, "availability notes"],
  [/Route status/g, "Availability notes"],
  [/offer route/g, "offer page"],
  [/Offer route/g, "Offer page"],
  [/Coverage status/g, "Current options"],
  [/coverage status/g, "current options"],
  [/source-checked brands/g, "listed brands"],
  [/Source-checked brands/g, "Listed brands"],
  [/source-checked brand/g, "listed brand"],
  [/Source-checked brand/g, "Listed brand"],
  [/Tracked URL/g, "Compare link"],
  [/tracked URL/g, "compare link"],
  [/monetization operations/g, "reader research"],
  [/Monetization operations/g, "Reader research"],
  [
    /Do not treat first-box offers, generated copy, or placeholder routes as proof of price, testing, approval, or revenue\./g,
    "Offers and prices can change. Confirm the latest total, delivery area, and subscription terms before ordering.",
  ],
  [
    /no fake prices, ratings, hands-on testing, or affiliate claims before approval/g,
    "no fake prices, no fake hands-on testing, and no undisclosed partner claims",
  ],
  [
    /clearly disclosed partner links only after approval/g,
    "clearly disclosed partner links when available",
  ],
  [/tracked outbound routes/g, "current offer checks"],
  [/tracked routes/g, "offer checks"],
  [/Tracked routes/g, "Offer checks"],
  [/tracked route/g, "offer check"],
  [/Tracked route/g, "Offer check"],
  [/ledger_verified/g, "source checked"],
  [/official_source_checked/g, "source checked"],
  [/evidence_status/g, "source note"],
  [/next_action/g, "next check"],
  [/local brand universe/g, "company list"],
  [/source queue/g, "source checks"],
  [/affiliate-readiness/g, "reader-fit checks"],
  [/monetized/g, "recommended"],
  [/Commission potential comes after buyer fit/g, "Deals come after fit"],
  [
    /Every Meal Guide has a trackable internal route for ([^.]+)\. We only activate an automatic partner redirect after the affiliate program approves the site and an owner-approved tracking URL is added\./g,
    "Use this page to compare current offer notes, delivery fit, menu type, and alternatives before ordering.",
  ],
  [
    /Every Meal Guide has a trackable internal route for ([^.]+)\. We only activate an automatic offer check after the affiliate program approves the site and an owner-approved tracking URL is added\./g,
    "Use this page to compare current offer notes, delivery fit, menu type, and alternatives before ordering.",
  ],
  [
    /Every listed brand is connected to an offer check so current offer links can be swapped later\./g,
    "Every listed brand has an offer check so readers can compare fit, availability, and current terms before ordering.",
  ],
  [
    /Some routes are official holding routes until Every Meal Guide has approved clearly disclosed tracking\. The page should not claim an affiliate relationship until that approval exists\./g,
    "Some links may earn us a commission. We do not claim a partner relationship unless it is clearly stated.",
  ],
  [
    /Review offer checks, status, and availability notes\./g,
    "Compare availability, source notes, and current offer checks.",
  ],
  [/View offer checks/g, "View all brands"],
];

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (excludedDirectories.has(entry.name)) continue;
      walk(path.join(directory, entry.name), files);
      continue;
    }

    if (/\.html$/i.test(entry.name)) files.push(path.join(directory, entry.name));
  }

  return files;
}

let changed = 0;

for (const file of walk(root)) {
  const original = fs.readFileSync(file, "utf8");
  let sanitized = original;

  for (const [pattern, replacement] of replacements) {
    sanitized = sanitized.replace(pattern, replacement);
  }

  if (sanitized !== original) {
    fs.writeFileSync(file, sanitized);
    changed += 1;
  }
}

console.log(JSON.stringify({ sanitizedPublicFiles: changed }, null, 2));
