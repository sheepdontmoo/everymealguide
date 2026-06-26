const required = ["SITE_URL", "CONTACT_EMAIL"];
const missing = required.filter((name) => !process.env[name]?.trim());
const failures = [];
const warnings = [];

if (missing.length) {
  failures.push(`Missing required environment variables: ${missing.join(", ")}`);
}

const siteUrl = process.env.SITE_URL || "";
const contactEmail = process.env.CONTACT_EMAIL || "";

let host = "";

if (siteUrl) {
  try {
    const parsed = new URL(siteUrl);
    host = parsed.hostname;

    if (parsed.protocol !== "https:") {
      failures.push("SITE_URL must use https:// for public launch.");
    }

    if (["localhost", "127.0.0.1", "example.com", "yourdomain.com"].includes(host)) {
      failures.push(`SITE_URL host is not launch-ready: ${host}`);
    }
  } catch {
    failures.push("SITE_URL must be a valid absolute URL.");
  }
}

if (contactEmail) {
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(contactEmail)) {
    failures.push("CONTACT_EMAIL must be a valid email address.");
  }

  if (/example\.com|yourdomain\.com|placeholder/i.test(contactEmail)) {
    failures.push("CONTACT_EMAIL appears to be a placeholder.");
  }

  if (host && !contactEmail.endsWith(`@${host}`)) {
    warnings.push(`CONTACT_EMAIL domain does not match SITE_URL host (${host}). This may be fine, but confirm before launch.`);
  }
}

if (failures.length) {
  console.error("Production environment preflight failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  if (warnings.length) {
    console.error("");
    console.error("Warnings:");
    warnings.forEach((warning) => console.error(`- ${warning}`));
  }
  process.exit(1);
}

console.log("Production environment preflight passed.");
console.log(`SITE_URL: ${siteUrl}`);
console.log(`CONTACT_EMAIL: ${contactEmail}`);

if (warnings.length) {
  console.log("");
  console.log("Warnings:");
  warnings.forEach((warning) => console.log(`- ${warning}`));
}
