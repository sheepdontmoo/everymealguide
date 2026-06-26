import fs from "node:fs";
import path from "node:path";

const root = process.cwd();

const budgets = {
  cssBytes: 180_000,
  jsBytes: 180_000,
  homepageHtmlBytes: 140_000,
  localImageBytes: 600_000,
  externalHomepageImages: 3,
  externalHomepageFonts: 2,
};

const files = {
  css: path.join(root, "styles.css"),
  js: path.join(root, "script.js"),
  homepage: path.join(root, "index.html"),
};

function size(file) {
  return fs.existsSync(file) ? fs.statSync(file).size : 0;
}

function walk(directory, predicate, results = []) {
  if (!fs.existsSync(directory)) return results;

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const next = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(next, predicate, results);
      continue;
    }

    if (predicate(next)) results.push(next);
  }

  return results;
}

const homepage = fs.existsSync(files.homepage) ? fs.readFileSync(files.homepage, "utf8") : "";
const externalImages = (homepage.match(/https:\/\/images\.(unsplash|pexels)\.com/g) || []).length;
const externalFonts = (homepage.match(/fonts\.googleapis\.com/g) || []).length;
const oversizedImages = walk(path.join(root, "assets"), (file) => /\.(png|jpe?g|webp|gif)$/i.test(file)).filter(
  (file) => size(file) > budgets.localImageBytes
);

const checks = [
  {
    name: "CSS budget",
    pass: size(files.css) <= budgets.cssBytes,
    detail: `${size(files.css)} / ${budgets.cssBytes} bytes`,
  },
  {
    name: "JS budget",
    pass: size(files.js) <= budgets.jsBytes,
    detail: `${size(files.js)} / ${budgets.jsBytes} bytes`,
  },
  {
    name: "Homepage HTML budget",
    pass: size(files.homepage) <= budgets.homepageHtmlBytes,
    detail: `${size(files.homepage)} / ${budgets.homepageHtmlBytes} bytes`,
  },
  {
    name: "Homepage external image count",
    pass: externalImages <= budgets.externalHomepageImages,
    detail: `${externalImages} / ${budgets.externalHomepageImages}`,
  },
  {
    name: "Homepage external font count",
    pass: externalFonts <= budgets.externalHomepageFonts,
    detail: `${externalFonts} / ${budgets.externalHomepageFonts}`,
  },
  {
    name: "Local image size budget",
    pass: oversizedImages.length === 0,
    detail: oversizedImages.map((file) => `${path.relative(root, file)} (${size(file)} bytes)`).join("; ") || "ok",
  },
];

const failed = checks.filter((check) => !check.pass);

if (failed.length) {
  console.error("Performance budget guard failed:");
  for (const check of failed) console.error(`- ${check.name}: ${check.detail}`);
  process.exit(1);
}

console.log("Performance budget guard passed.");
for (const check of checks) console.log(`- ${check.name}: ${check.detail}`);
