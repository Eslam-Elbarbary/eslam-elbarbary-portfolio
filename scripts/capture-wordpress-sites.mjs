import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "playwright";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");

const SITES = [
  { id: "anesthesia-viva", title: "Anesthesia Viva Hub", url: "https://anesthesiavivahub.com/" },
  { id: "jismifit", title: "JismiFit", url: "https://jismifit.me/" },
  { id: "hydro-egypt", title: "Hydro Egypt", url: "https://hydro-eg.com/" },
  { id: "delta-steel", title: "Delta Steel Mill", url: "https://deltasteelmill.com/" },
  { id: "huaye-egypt", title: "Huaye Egypt", url: "https://huaye-egy.com/" },
  { id: "approachx", title: "ApproachX", url: "https://approachx.net/" },
  { id: "bokrah", title: "Bokrah", url: "https://www.bokrah-eg.com/" },
  { id: "archhub", title: "ARCHUB", url: "https://archhub-sa.com/" },
  { id: "rayes-gold", title: "Rayes Gold", url: "https://rayesgold.com/" },
  { id: "telehorizon", title: "TeleHorizon", url: "https://telehorizon.net/" },
  { id: "2bs-cargo", title: "2BS Cargo Egypt", url: "https://2bscargoegypt.com/" },
  { id: "al-yamama-jobs", title: "Al Yamama Jobs", url: "https://alyamamajobs.com/" },
  { id: "japan-food-solutions", title: "Japan Food Solutions", url: "https://japan-food-solutios.com/" },
  { id: "al-sharaawy", title: "Al Sharaawy Company", url: "https://alsharaawycompany.com/" },
  { id: "aylty", title: "Aylty", url: "https://aylty.net/?v=2a6a84e9e444" },
  { id: "el-sondos", title: "El Sondos", url: "https://elsondos.shop/" },
  { id: "ideal-durrat-alarous", title: "Ideal Durrat Al Arous", url: "https://ideal-durrat-alarous.com/" },
];

const BOT_PATTERNS = [
  /just a moment/i,
  /one moment please/i,
  /verify you are human/i,
  /checking your browser before accessing/i,
  /checking if the site connection is secure/i,
  /attention required/i,
  /access denied/i,
  /sorry, you have been blocked/i,
  /needs to review the security of your connection/i,
  /please wait while we (verify|check)/i,
  /ray id/i,
];

const CHALLENGE_SELECTORS = [
  "#challenge-running",
  "#challenge-stage",
  ".cf-browser-verification",
  ".cf-turnstile",
  'iframe[src*="challenges.cloudflare.com"]',
  'iframe[src*="challenges.cloudflare"]',
  "#cf-spinner",
  ".cf-challenge",
];

async function dismissOverlays(page) {
  const candidates = [
    'button:has-text("Accept")',
    'button:has-text("Accept all")',
    'button:has-text("Accept All")',
    'button:has-text("I agree")',
    'button:has-text("Agree")',
    'button:has-text("Got it")',
    'button:has-text("Allow")',
    'button:has-text("Allow all")',
    'button:has-text("موافق")',
    'button:has-text("قبول")',
    'button:has-text("حسنا")',
    'button:has-text("حسناً")',
    '[id*="cookie"] button',
    '[class*="cookie"] button',
    '[class*="consent"] button',
    ".cc-accept",
    "#onetrust-accept-btn-handler",
  ];

  for (const selector of candidates) {
    const button = page.locator(selector).first();
    if (await button.isVisible({ timeout: 600 }).catch(() => false)) {
      await button.click({ timeout: 1500 }).catch(() => {});
      await page.waitForTimeout(400);
    }
  }
}

function looksLikeBotWall(title, body) {
  const haystack = `${title}\n${body}`.slice(0, 4000);
  return BOT_PATTERNS.some((pattern) => pattern.test(haystack));
}

async function hasChallengeDom(page) {
  for (const selector of CHALLENGE_SELECTORS) {
    const count = await page.locator(selector).count().catch(() => 0);
    if (count > 0) return true;
  }
  return false;
}

async function captureSite(page, site) {
  const output = join(root, "public", "images", "wordpress", site.id, "cover.jpg");
  await mkdir(dirname(output), { recursive: true });

  try {
    await page.goto(site.url, {
      waitUntil: "commit",
      timeout: 60000,
    });
    await page.waitForLoadState("domcontentloaded", { timeout: 20000 }).catch(() => {});

    await page.waitForFunction(() => document.fonts?.ready ?? true, null, {
      timeout: 8000,
    }).catch(() => {});

    await page.waitForLoadState("networkidle", { timeout: 8000 }).catch(() => {});
    await page.waitForTimeout(4000);

    await dismissOverlays(page);

    await page.evaluate(async () => {
      window.scrollTo(0, 420);
    });
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(600);

    const title = await page.title();
    const body = await page.locator("body").innerText().catch(() => "");
    const challenged = await hasChallengeDom(page);

    if (challenged || looksLikeBotWall(title, body)) {
      return { ...site, status: "manual-required", reason: "bot-protection" };
    }

    await page.screenshot({
      path: output,
      type: "jpeg",
      quality: 90,
      fullPage: false,
    });

    return { ...site, status: "ready", file: output };
  } catch (error) {
    return {
      ...site,
      status: "manual-required",
      reason: error instanceof Error ? error.message : "capture-failed",
    };
  }
}

async function main() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1600, height: 900 },
    deviceScaleFactor: 1,
    locale: "en-US",
    colorScheme: "light",
    ignoreHTTPSErrors: true,
    userAgent:
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
  });
  const page = await context.newPage();
  const filter = new Set(process.argv.slice(2));
  const queue = filter.size ? SITES.filter((site) => filter.has(site.id)) : SITES;
  const results = [];

  for (const site of queue) {
    process.stdout.write(`Capturing ${site.title} ... `);
    const result = await captureSite(page, site);
    results.push(result);
    console.log(result.status === "ready" ? "ok" : `manual (${result.reason ?? "blocked"})`);
  }

  await browser.close();

  const successful = results.filter((item) => item.status === "ready");
  const manual = results.filter((item) => item.status === "manual-required");

  console.log("\n--- Capture report ---");
  for (const item of results) {
    console.log(
      item.status === "ready"
        ? `✓ ${item.title}`
        : `! ${item.title} — manual screenshot required (${item.url})`,
    );
  }
  console.log(`\nSuccessful: ${successful.length}`);
  console.log(`Manual required: ${manual.length}`);
  if (manual.length) {
    console.log("\nManual screenshot URLs:");
    for (const item of manual) {
      console.log(`- ${item.title}: ${item.url}`);
    }
  }

  await writeFile(
    join(__dirname, "wordpress-capture-report.json"),
    JSON.stringify(results, null, 2),
  );
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
