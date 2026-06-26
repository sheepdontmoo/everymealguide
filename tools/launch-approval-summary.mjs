import { readFile } from "node:fs/promises";
import { join } from "node:path";

const root = process.cwd();
const state = JSON.parse(await readFile(join(root, "LAUNCH_STATE.json"), "utf8"));

const approvals = [
  "Final domain",
  "Hosting provider",
  "Public deploy",
  "DNS changes",
  "Contact email/mailbox",
  "Analytics provider and script",
  "Search Console verification",
  "Affiliate applications",
  "Real approved affiliate URL insertion",
];

console.log("Every Meal Guide public launch approval summary");
console.log(`Local completion: ${state.overallLocalCompletion}%`);
console.log(`Actually live: ${state.actuallyLive ? "yes" : "no"}`);
console.log(`Monetized: ${state.monetized ? "yes" : "no"}`);
console.log("");
console.log("Approvals required before public launch:");
approvals.forEach((item, index) => console.log(`${index + 1}. ${item}`));
console.log("");
console.log("Exact approval phrase:");
console.log("Approve public launch prep for Every Meal Guide on [domain] using [provider].");
console.log("");
console.log("Reference: PUBLIC_LAUNCH_APPROVAL_PACKET.md");
