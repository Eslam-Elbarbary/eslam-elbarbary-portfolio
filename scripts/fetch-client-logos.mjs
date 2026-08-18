import { mkdir, writeFile } from "node:fs/promises";
import { dirname, extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const SITES = [
  { id: "anesthesia-viva", url: "https://anesthesiavivahub.com/" },
  { id: "jismifit", url: "https://jismifit.me/" },
  { id: "hydro", url: "https://hydro-eg.com/" },
  { id: "delta-steel", url: "https://deltasteelmill.com/" },
  { id: "huaye", url: "https://huaye-egy.com/" },
  { id: "approachx", url: "https://approachx.net/" },
  { id: "pets-zone", url: "https://bits-zone-front.vercel.app/" },
  { id: "dh", url: "https://dh-kw.vercel.app/" },
  { id: "real-estate", url: "https://real-estate-platform-sand.vercel.app/" },
];

async function collectLogoUrls(page, pageUrl) {
  return page.evaluate((base) => {
    const abs = (value) => {
      try {
        return new URL(value, base).href;
      } catch {
        return "";
      }
    };

    const urls = [];
    const push = (value, score) => {
      if (!value) return;
      const href = abs(value);
      if (!href || href.startsWith("data:image/svg+xml")) {
        if (href.startsWith("data:image/svg+xml")) urls.push({ href, score: score + 8 });
        return;
      }
      urls.push({ href, score });
    };

    const selectors = [
      "img.custom-logo",
      "a.custom-logo-link img",
      "header img",
      ".site-header img",
      ".navbar-brand img",
      ".logo img",
      "img[class*='logo' i]",
      "img[alt*='logo' i]",
      "img[src*='logo' i]",
    ];

    for (const selector of selectors) {
      document.querySelectorAll(selector).forEach((node, index) => {
        const img = node;
        const src = img.currentSrc || img.src || img.getAttribute("src");
        const width = img.naturalWidth || img.width || 0;
        push(src, 40 - index + Math.min(width / 32, 20));
      });
    }

    document.querySelectorAll("header svg, .logo svg, a.navbar-brand svg").forEach((svg, index) => {
      const markup = svg.outerHTML;
      if (markup.length > 80 && markup.length < 20000) {
        urls.push({
          href: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(markup)}`,
          score: 28 - index,
        });
      }
    });

    document
      .querySelectorAll('link[rel="apple-touch-icon"], link[rel="icon"][type="image/png"], link[rel="icon"][type="image/svg+xml"]')
      .forEach((link, index) => {
        push(link.getAttribute("href"), 12 - index);
      });

    return urls
      .filter((item) => item.href)
      .sort((a, b) => b.score - a.score);
  }, pageUrl);
}

function extensionFor(url, contentType) {
  const clean = url.split("?")[0];
  const fromUrl = extname(clean).toLowerCase();
  if ([".svg", ".png", ".webp", ".jpg", ".jpeg"].includes(fromUrl)) return fromUrl;
  if (contentType?.includes("svg")) return ".svg";
  if (contentType?.includes("png")) return ".png";
  if (contentType?.includes("webp")) return ".webp";
  if (contentType?.includes("jpeg") || contentType?.includes("jpg")) return ".jpg";
  return ".png";
}

async function saveLogo(item, href) {
  const dir = join(root, "public", "images", "client-logos", item.id);
  await mkdir(dir, { recursive: true });

  if (href.startsWith("data:image/svg+xml")) {
    const encoded = href.split(",")[1] ?? "";
    const markup = decodeURIComponent(encoded);
    const file = join(dir, "logo.svg");
    await writeFile(file, markup);
    return file;
  }

  const response = await fetch(href, {
    headers: { "user-agent": "Mozilla/5.0" },
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const type = response.headers.get("content-type") ?? "";
  if (type.includes("text/html")) throw new Error("HTML instead of image");
  const ext = extensionFor(href, type);
  const file = join(dir, `logo${ext}`);
  const buffer = Buffer.from(await response.arrayBuffer());
  if (buffer.byteLength < 200) throw new Error("file too small");
  await writeFile(file, buffer);
  return file;
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1400, height: 900 },
    ignoreHTTPSErrors: true,
    locale: "en-US",
  });
  const page = await context.newPage();
  const report = [];

  for (const site of SITES) {
    process.stdout.write(`Logo ${site.id} ... `);
    try {
      await page.goto(site.url, { waitUntil: "commit", timeout: 60000 });
      await page.waitForLoadState("domcontentloaded", { timeout: 20000 }).catch(() => {});
      await page.waitForTimeout(1800);
      const candidates = await collectLogoUrls(page, site.url);
      let saved = null;
      let lastError = "no candidates";
      for (const candidate of candidates.slice(0, 8)) {
        try {
          saved = await saveLogo(site, candidate.href);
          lastError = "";
          break;
        } catch (error) {
          lastError = error instanceof Error ? error.message : "save failed";
        }
      }
      if (saved) {
        console.log("ok", saved.replace(root, ""));
        report.push({ ...site, status: "ready", file: saved });
      } else {
        console.log("todo", lastError);
        report.push({ ...site, status: "todo", reason: lastError });
      }
    } catch (error) {
      const reason = error instanceof Error ? error.message : "failed";
      console.log("todo", reason);
      report.push({ ...site, status: "todo", reason });
    }
  }

  await browser.close();
  await writeFile(
    join(dirname(fileURLToPath(import.meta.url)), "client-logo-report.json"),
    JSON.stringify(report, null, 2),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
