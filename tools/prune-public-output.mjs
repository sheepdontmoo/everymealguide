import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const shouldPrune = process.env.VERCEL === "1" || process.env.FORCE_PUBLIC_PRUNE === "1";

if (!shouldPrune) {
  console.log(JSON.stringify({ prunePublicOutput: "skipped", reason: "not running on Vercel" }));
  process.exit(0);
}

const directoriesToRemove = [
  "content",
  "daily",
  "node_modules",
  "outreach",
  "qa",
  "reports",
  "research",
  "seo",
  "tools",
];

const rootFilesToRemove = new Set([
  "affiliate-application-tracker.csv",
  "affiliate-programs.json",
  "ANALYTICS_EVENT_CONTRACT.json",
  "APPROVED_AFFILIATE_LINKS.json",
  "BRAND_SOURCE_LEDGER.json",
  "package-lock.json",
  "package.json",
  "preview-server.mjs",
]);

const rootExtensionsToRemove = new Set([
  ".csv",
  ".log",
  ".md",
]);

let removedDirectories = 0;
let removedFiles = 0;

function removePath(target) {
  if (!fs.existsSync(target)) return;
  fs.rmSync(target, { recursive: true, force: true });
}

for (const directory of directoriesToRemove) {
  const target = path.join(root, directory);
  if (!fs.existsSync(target)) continue;
  removePath(target);
  removedDirectories += 1;
}

for (const entry of fs.readdirSync(root, { withFileTypes: true })) {
  if (!entry.isFile()) continue;
  const extension = path.extname(entry.name);
  if (!rootFilesToRemove.has(entry.name) && !rootExtensionsToRemove.has(extension)) continue;
  removePath(path.join(root, entry.name));
  removedFiles += 1;
}

console.log(JSON.stringify({ prunePublicOutput: "complete", removedDirectories, removedFiles }));
