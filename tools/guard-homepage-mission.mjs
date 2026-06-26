import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const homepagePath = path.join(root, "index.html");
const scriptPath = path.join(root, "script.js");

const homepage = fs.readFileSync(homepagePath, "utf8");
const script = fs.readFileSync(scriptPath, "utf8");

const checks = [
  {
    name: "60-second promise appears above the fold",
    pass: /Find the right meal delivery service in 60 seconds/i.test(homepage),
  },
  {
    name: "homepage has a matcher form",
    pass: /id="matcher"/i.test(homepage),
  },
  {
    name: "matcher shows an inline result before navigation",
    pass: /data-match-result/i.test(homepage) && /matcher_result_shown/i.test(script),
  },
  {
    name: "homepage includes instant-answer cards",
    pass: /instant-answer-section/i.test(homepage),
  },
  {
    name: "homepage includes trust rationale",
    pass: /recommendation-trust-section/i.test(homepage),
  },
  {
    name: "homepage includes decision checklist",
    pass: /decision-checklist-section/i.test(homepage),
  },
  {
    name: "decision-path clicks are tracked",
    pass: /data-decision-path/i.test(homepage) && /decision_path_click/i.test(script),
  },
  {
    name: "at least 10 decision paths are available",
    pass: (homepage.match(/data-decision-path=/g) || []).length >= 10,
  },
];

const failed = checks.filter((check) => !check.pass);

if (failed.length) {
  console.error("Homepage mission guard failed:");
  for (const check of failed) console.error(`- ${check.name}`);
  process.exit(1);
}

console.log("Homepage mission guard passed.");
