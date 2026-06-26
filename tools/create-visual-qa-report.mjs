import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const [qaDate = new Date().toISOString().slice(0, 10)] = process.argv.slice(2);

if (!/^\d{4}-\d{2}-\d{2}$/.test(qaDate)) {
  console.error("Usage: npm.cmd run qa:visual-report -- YYYY-MM-DD");
  process.exit(1);
}

const root = process.cwd();
const templatePath = join(root, "templates", "visual-qa-report.md");
const reportDir = join(root, "reports", "visual-qa");
const reportPath = join(reportDir, `${qaDate}.md`);

const template = await readFile(templatePath, "utf8");
const report = template.replaceAll("{{qa_date}}", qaDate);

await mkdir(reportDir, { recursive: true });
await writeFile(reportPath, report, "utf8");

console.log(`Created visual QA report: ${reportPath}`);
