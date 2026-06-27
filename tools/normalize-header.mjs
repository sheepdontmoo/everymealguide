// Normalize the site header on every generated page to ONE canonical nav.
// Generators historically emitted 2+ header variants (some with broken /#rankings,
// /#compare, /#methodology anchors that don't exist on the homepage). This rewrites
// them all to a single header with valid links, matching the homepage's nav set.
// Idempotent. Runs as the last build step, so generator drift can't reintroduce the
// old headers. Skips the homepage (its bespoke header is the design reference).
import { readFile, writeFile, readdir, stat } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const root = process.cwd();

// Canonical header — same destinations as the homepage nav, all valid pages.
const CANONICAL_HEADER = `<header class="site-header">
      <a class="brand-mark" href="/">Every Meal Guide</a>
      <nav aria-label="Primary navigation">
        <a href="/best/meal-delivery-services/">Top Picks</a>
        <a href="/meal-delivery-comparisons/">Compare Brands</a>
        <a href="/best/meal-kits/">Meal Types</a>
        <a href="/reviews/factor/">Reviews</a>
        <a href="/deals/best-meal-delivery-deals/">Deals</a>
        <a href="/countries/">Countries</a>
        <a href="/brand-directory/">All Brands</a>
      </nav>
      <a class="nav-action" href="/start/">Find My Best Match</a>
    </header>`;

const HEADER_RE = /<header class="site-header">[\s\S]*?<\/header>/;

const SKIP_DIRS = new Set(["node_modules", "tools", "assets", ".git", ".claude", "seo", "api"]);

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (SKIP_DIRS.has(entry.name)) continue;
      yield* htmlFiles(join(dir, entry.name));
    } else if (entry.name.endsWith(".html")) {
      yield join(dir, entry.name);
    }
  }
}

let scanned = 0, changed = 0, skippedHome = 0, noHeader = 0;

for await (const file of htmlFiles(root)) {
  const rel = relative(root, file);
  // Leave the homepage header alone — it's the design reference.
  if (rel === "index.html") { skippedHome++; continue; }
  scanned++;
  const html = await readFile(file, "utf8");
  if (!HEADER_RE.test(html)) { noHeader++; continue; }
  const next = html.replace(HEADER_RE, CANONICAL_HEADER);
  if (next !== html) {
    await writeFile(file, next);
    changed++;
  }
}

console.log(`normalize-header: scanned ${scanned} pages, rewrote ${changed}, ` +
  `no-header ${noHeader}, skipped homepage ${skippedHome}`);
