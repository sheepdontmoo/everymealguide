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

const publicFilePattern = /\.(html|js)$/i;

const blockedPhrases = [
  "cash route ready",
  "trackable internal route",
  "automatic partner redirect",
  "owner-approved tracking url",
  "affiliate program approves",
  "partner redirect",
  "opens partner or holding page",
  "partner/holding page",
  "partner or holding page",
  "holding page",
  "holding pages",
  "holding route",
  "holding routes",
  "official holding",
  "approved clearly disclosed tracking",
  "approved partner routes after acceptance",
  "data-partner-status",
  "money route",
  "money path",
  "cash route",
  "cash routing",
  "cash readiness",
  "monetization path",
  "commercially ready",
  "partner readiness",
  "partner-readiness",
  "partner route",
  "partner tracking",
  "buyer route",
  "coverage cockpit",
  "accountability table",
  "evidence and next action",
  "evidence boundary",
  "evidence rule",
  "affiliate action",
  "source tracked",
  "source ledger",
  "source-led brand review",
  "source-led brand route",
  "brand universe",
  "source queue",
  "affiliate-readiness",
  "affiliate urls",
  "generated copy",
  "placeholder routes",
  "tracked url",
  "monetization operations",
  "brand-market rows tracked",
  "tracked company rows",
  "affiliate approval pending",
  "approved affiliate urls",
  "tracked route",
  "tracked routes",
  "ledger_verified",
  "official_source_checked",
  "evidence_status",
  "next_action",
  "open tracked route",
  "track partner route",
];

function walk(directory, files = []) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (excludedDirectories.has(entry.name)) continue;
      walk(path.join(directory, entry.name), files);
      continue;
    }

    if (publicFilePattern.test(entry.name)) files.push(path.join(directory, entry.name));
  }

  return files;
}

function lineNumber(text, index) {
  return text.slice(0, index).split(/\r?\n/).length;
}

const findings = [];

for (const file of walk(root)) {
  const text = fs.readFileSync(file, "utf8");
  const lower = text.toLowerCase();

  for (const phrase of blockedPhrases) {
    let index = lower.indexOf(phrase.toLowerCase());

    while (index !== -1) {
      findings.push({
        file: path.relative(root, file),
        line: lineNumber(text, index),
        phrase,
      });
      index = lower.indexOf(phrase.toLowerCase(), index + phrase.length);
    }
  }
}

if (findings.length) {
  console.error("Public copy guard failed. Internal operator wording was found in public files:");
  for (const finding of findings.slice(0, 80)) {
    console.error(`- ${finding.file}:${finding.line} -> ${finding.phrase}`);
  }
  if (findings.length > 80) console.error(`...and ${findings.length - 80} more.`);
  process.exit(1);
}

console.log("Public copy guard passed.");
