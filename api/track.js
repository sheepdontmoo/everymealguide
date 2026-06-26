const allowedEvents = new Set([
  "page_view",
  "affiliate_click",
  "matcher_submit",
  "matcher_result_shown",
  "newsletter_interest",
  "partner_redirect_ready",
  "decision_path_click",
]);

function safeString(value, maxLength = 240) {
  return String(value ?? "")
    .replace(/[\r\n\t]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
}

function safeUrl(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return "";

  try {
    const parsed = new URL(raw, "https://www.everymealguide.com");
    return `${parsed.origin}${parsed.pathname}`;
  } catch {
    return safeString(raw, 180);
  }
}

async function readBody(req) {
  if (req.body && typeof req.body === "object") return req.body;
  if (typeof req.body === "string") {
    try {
      return JSON.parse(req.body);
    } catch {
      return {};
    }
  }

  return await new Promise((resolve) => {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
      if (body.length > 4096) req.destroy();
    });

    req.on("end", () => {
      try {
        resolve(JSON.parse(body || "{}"));
      } catch {
        resolve({});
      }
    });

    req.on("error", () => resolve({}));
  });
}

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "content-type");
    res.status(204).end();
    return;
  }

  if (req.method !== "POST") {
    res.status(405).json({ ok: false });
    return;
  }

  const body = await readBody(req);
  const eventName = safeString(body.event, 80);

  if (!allowedEvents.has(eventName)) {
    res.status(202).json({ ok: false, ignored: true });
    return;
  }

  const event = {
    event: eventName,
    path: safeUrl(body.path),
    page_type: safeString(body.page_type || body.pageType || ""),
    page_title: safeString(body.pageTitle || body.title || ""),
    brand: safeString(body.brand || ""),
    label: safeString(body.label || ""),
    href: safeUrl(body.href),
    affiliate_status: safeString(body.affiliateStatus || ""),
    path_choice: safeString(body.pathChoice || ""),
    recommendation: safeString(body.recommendation || ""),
    source: "client",
    timestamp: safeString(body.timestamp || new Date().toISOString(), 40),
  };

  console.log("everymealguide_event", JSON.stringify(event));
  res.status(204).end();
}
