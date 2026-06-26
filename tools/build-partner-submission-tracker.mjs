import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const draftIndexPath = path.join(root, "outreach", "partner-application-drafts-2026-06-24", "index.csv");
const trackerPath = path.join(root, "outreach", "partner-submission-tracker-2026-06-24.csv");
const runbookPath = path.join(root, "outreach", "PARTNER_SUBMISSION_RUNBOOK_2026-06-24.md");

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
      if (row.some((cell) => cell.trim())) rows.push(row);
      row = [];
      value = "";
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

function csvCell(value) {
  const text = String(value ?? "");
  return /[",\n\r]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

if (!fs.existsSync(draftIndexPath)) {
  throw new Error(`Missing draft index: ${draftIndexPath}`);
}

const drafts = parseCsv(fs.readFileSync(draftIndexPath, "utf8")).filter((row) => row.brand);

const headers = [
  "rank",
  "brand",
  "target_route",
  "countries",
  "categories",
  "draft_file",
  "program_url",
  "network_or_contact",
  "submission_status",
  "submitted_at",
  "submitted_by",
  "submission_evidence",
  "approval_status",
  "approved_at",
  "approved_tracking_url_added",
  "approved_link_recorded_in_json",
  "click_qa_status",
  "notes",
];

const rows = drafts.map((draft) => [
  draft.rank,
  draft.brand,
  draft.target_route,
  draft.countries,
  draft.categories,
  draft.draft_file,
  "",
  "",
  "draft_only_not_submitted",
  "",
  "",
  "",
  "not_approved",
  "",
  "no",
  "no",
  "not_started",
  "Find official program URL, review draft, submit manually or approve sending workflow.",
]);

fs.writeFileSync(trackerPath, [headers, ...rows].map((row) => row.map(csvCell).join(",")).join("\n") + "\n", "utf8");

fs.writeFileSync(
  runbookPath,
  `# Partner Submission Runbook - 2026-06-24

## Purpose

Turn the top-100 partner drafts into real affiliate/direct applications without losing evidence quality.

## Hard boundary

The tracker starts at \`draft_only_not_submitted\`.

Do not change a row to \`submitted\` unless there is proof:

- confirmation email
- affiliate-network application record
- submitted form screenshot
- sent email record
- CRM/network status page

Do not change a row to \`approved\` unless the brand, network, or direct partner explicitly approves Every Meal Guide.

Do not add an affiliate URL to \`APPROVED_AFFILIATE_LINKS.json\` unless approval is confirmed and the URL is approved for use.

## Daily submission workflow

1. Open \`outreach/partner-submission-tracker-2026-06-24.csv\`.
2. Start at the lowest rank with \`draft_only_not_submitted\`.
3. Find the official affiliate program, partner page, network listing, or brand contact.
4. Fill \`program_url\` and \`network_or_contact\`.
5. Open the matching draft file from \`outreach/partner-application-drafts-2026-06-24/\`.
6. Review the copy before submitting.
7. Submit manually or approve a sending workflow.
8. Record \`submitted_at\`, \`submitted_by\`, and \`submission_evidence\`.
9. When approved, record the tracking URL in \`APPROVED_AFFILIATE_LINKS.json\` with \`ownerConfirmation: true\`.
10. Regenerate \`/go/\` pages and run click QA before calling the route live-monetized.

## Status values

- \`draft_only_not_submitted\`
- \`submitted_pending_review\`
- \`approved_tracking_pending\`
- \`approved_tracking_added\`
- \`rejected\`
- \`needs_more_info\`
- \`not_a_fit\`

## Cash-readiness rule

A brand is not cash-ready until all are true:

- application approved
- approved tracking URL stored
- \`/go/\` route regenerated
- click QA passed
- disclosure remains visible
`,
  "utf8"
);

console.log(
  JSON.stringify(
    {
      trackerRows: rows.length,
      trackerPath,
      runbookPath,
    },
    null,
    2
  )
);

