import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";

const [weekStart = new Date().toISOString().slice(0, 10)] = process.argv.slice(2);

if (!/^\d{4}-\d{2}-\d{2}$/.test(weekStart)) {
  console.error("Usage: npm.cmd run report:weekly -- YYYY-MM-DD");
  process.exit(1);
}

const root = process.cwd();
const templatePath = join(root, "templates", "weekly-growth-report.md");
const reportDir = join(root, "reports", "weekly");
const reportPath = join(reportDir, `${weekStart}.md`);

const template = await readFile(templatePath, "utf8");
const report = template.replaceAll("{{week_start}}", weekStart);

await mkdir(reportDir, { recursive: true });
await writeFile(reportPath, report, "utf8");

console.log(`Created weekly growth report: ${reportPath}`);
