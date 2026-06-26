import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const samples = [
  {
    type: "homepage",
    file: "index.html",
    checks: [
      /60 seconds/i,
      /id="matcher"/i,
      /instant-answer-section/i,
      /recommendation-trust-section/i,
      /decision-checklist-section/i,
    ],
  },
  {
    type: "best page",
    file: "best/meal-delivery-services/index.html",
    checks: [/Quick answer/i, /Who should/i, /Check current deal|View Deal|offer/i, /affiliate|commission/i],
  },
  {
    type: "review page",
    file: "reviews/factor/index.html",
    checks: [/Review|Alternatives/i, /Quick|Summary|answer/i, /Compare alternatives/i, /Check current deal|offer/i],
  },
  {
    type: "comparison page",
    file: "vs/hellofresh-vs-gousto/index.html",
    checks: [/Compare|Head-to-head/i, /Choose|better|which/i, /alternatives/i, /Check current deal|offer/i],
  },
  {
    type: "country page",
    file: "countries/us/best-meal-delivery/index.html",
    checks: [/United States|US/i, /Compare|Best/i, /delivery|country|market/i, /offer|deal|review/i],
  },
  {
    type: "offer-check page",
    file: "go/factor/index.html",
    checks: [/Offer Check/i, /delivery|menu|price|terms/i, /Official site|Compare current deal notes/i],
  },
];

const forbidden = [
  /cash route ready/i,
  /trackable internal route/i,
  /automatic partner redirect/i,
  /owner-approved tracking url/i,
  /affiliate program approves/i,
  /partner redirect/i,
  /data-partner-status/i,
  /money route/i,
  /cash route/i,
  /partner readiness/i,
  /buyer route/i,
  /coverage cockpit/i,
  /accountability table/i,
  /evidence and next action/i,
  /affiliate action/i,
  /source tracked/i,
  /brand universe/i,
  /source queue/i,
  /affiliate-readiness/i,
  /brand-market rows tracked/i,
  /tracked company rows/i,
  /open tracked route/i,
  /track partner route/i,
  /affiliate approval pending/i,
  /ledger_verified/i,
  /official_source_checked/i,
  /evidence_status/i,
  /next_action/i,
];

const failures = [];

for (const sample of samples) {
  const filePath = path.join(root, sample.file);

  if (!fs.existsSync(filePath)) {
    failures.push(`${sample.type}: missing ${sample.file}`);
    continue;
  }

  const html = fs.readFileSync(filePath, "utf8");

  for (const check of sample.checks) {
    if (!check.test(html)) failures.push(`${sample.type}: ${sample.file} missing ${check}`);
  }

  for (const check of forbidden) {
    if (check.test(html)) failures.push(`${sample.type}: ${sample.file} contains forbidden ${check}`);
  }
}

if (failures.length) {
  console.error("Page quality guard failed:");
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log("Page quality guard passed.");
