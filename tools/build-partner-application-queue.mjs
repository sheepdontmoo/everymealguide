import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const affiliateTargetsPath = path.join(root, "outreach", "affiliate-application-targets-2026-06-24.csv");
const directTargetsPath = path.join(root, "outreach", "direct-partnership-priority-batch-2026-06-24.csv");
const masterQueuePath = path.join(root, "seo", "affiliate-application-master-queue.csv");
const outputPath = path.join(root, "outreach", "partner-application-operating-queue.csv");
const reportPath = path.join(root, "reports", "partner-application-operating-queue.json");

function parseCsv(text) {
  const rows = [];
  let row = [];
  let value = "";
  let quoted = false;

  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];

    if (char === '"' && quoted && next === '"') {
      value += '"';
      index += 1;
      continue;
    }

    if (char === '"') {
      quoted = !quoted;
      continue;
    }

    if (char === "," && !quoted) {
      row.push(value);
      value = "";
      continue;
    }

    if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(value);
      value = "";
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      continue;
    }

    value += char;
  }

  row.push(value);
  if (row.some((cell) => cell.trim())) rows.push(row);

  const headers = rows.shift()?.map((header) => header.trim()) || [];
  return rows.map((cells) =>
    headers.reduce((entry, header, index) => {
      entry[header] = (cells[index] || "").trim();
      return entry;
    }, {})
  );
}

function readCsv(file) {
  return fs.existsSync(file) ? parseCsv(fs.readFileSync(file, "utf8")) : [];
}

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function toCsv(rows) {
  return `${rows.map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

function slugify(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const rows = [];
const seen = new Set();

function pushRow(row) {
  const key = slugify(row.brand);
  if (!key || seen.has(key)) return;
  seen.add(key);
  rows.push(row);
}

readCsv(affiliateTargetsPath).forEach((row) => {
  pushRow({
    source: "affiliate_target_batch",
    brand: row.brand,
    submission_type: "affiliate_application",
    priority: row.rank || "P0",
    country_focus: row.country_focus,
    category: row.category,
    review_url: row.page_url,
    offer_check_url: `/go/${slugify(row.brand)}/`,
    official_url: "",
    application_url: row.source_url,
    network_or_owner: row.network_or_owner,
    current_status: "needs_human_submit",
    next_action: row.next_step || "Apply after account login and approval.",
    human_gate: row.human_gate || "Account login and explicit submit approval",
  });
});

readCsv(directTargetsPath).forEach((row) => {
  pushRow({
    source: "direct_priority_batch",
    brand: row.brand,
    submission_type: "direct_partnership_outreach",
    priority: row.rank || "P0",
    country_focus: row.country,
    category: row.category,
    review_url: row.review_url,
    offer_check_url: row.offer_check_url,
    official_url: row.official_url,
    application_url: "",
    network_or_owner: "direct",
    current_status: "needs_human_submit",
    next_action: `Send approved outreach: ${row.angle || "partnership fit"}`,
    human_gate: row.human_gate || "Approve/send outreach",
  });
});

readCsv(masterQueuePath).forEach((row) => {
  if (rows.length >= 120) return;
  pushRow({
    source: "master_queue",
    brand: row.brand,
    submission_type: /affiliate|yes|network/i.test(row.affiliate_target || "")
      ? "affiliate_application"
      : "direct_partnership_outreach",
    priority: row.priority_rank,
    country_focus: row.countries,
    category: row.categories,
    review_url: `/reviews/${slugify(row.brand)}/`,
    offer_check_url: row.route || `/go/${slugify(row.brand)}/`,
    official_url: row.official_url,
    application_url: "",
    network_or_owner: row.affiliate_target || "needs_research",
    current_status: "needs_human_submit",
    next_action: row.next_action || "Research application/contact route, then submit after approval.",
    human_gate: "Confirm application/contact route and approve submission",
  });
});

const outputRows = [
  [
    "rank",
    "source",
    "brand",
    "submission_type",
    "priority",
    "country_focus",
    "category",
    "review_url",
    "offer_check_url",
    "official_url",
    "application_url",
    "network_or_owner",
    "current_status",
    "next_action",
    "human_gate",
  ],
  ...rows.slice(0, 120).map((row, index) => [
    index + 1,
    row.source,
    row.brand,
    row.submission_type,
    row.priority,
    row.country_focus,
    row.category,
    row.review_url,
    row.offer_check_url,
    row.official_url,
    row.application_url,
    row.network_or_owner,
    row.current_status,
    row.next_action,
    row.human_gate,
  ]),
];

fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(outputPath, toCsv(outputRows));
fs.writeFileSync(
  reportPath,
  `${JSON.stringify(
    {
      generatedAt: new Date().toISOString(),
      queuedRows: outputRows.length - 1,
      affiliateApplications: rows.filter((row) => row.submission_type === "affiliate_application").length,
      directPartnerships: rows.filter((row) => row.submission_type === "direct_partnership_outreach").length,
      outputPath: path.relative(root, outputPath),
    },
    null,
    2
  )}\n`
);

console.log(JSON.stringify({ queuedRows: outputRows.length - 1, outputPath, reportPath }, null, 2));
