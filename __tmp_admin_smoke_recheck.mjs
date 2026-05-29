import fs from 'node:fs/promises';
import { chromium } from 'playwright-core';

async function main() {
  const baseUrl = 'http://127.0.0.1:4794';
  const envText = await fs.readFile('.env.e2e', 'utf8');
  const env = {};
  for (const rawLine of envText.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith('#')) continue;
    const eq = line.indexOf('=');
    if (eq === -1) continue;
    env[line.slice(0, eq).trim()] = line.slice(eq + 1).trim();
  }
  const email = env.E2E_ADMIN_EMAIL;
  const password = env.E2E_ADMIN_PASSWORD;
  if (!email || !password) throw new Error('Missing E2E admin credentials in .env.e2e');
  const chromePath = 'C:/Program Files/Google/Chrome/Application/chrome.exe';

  async function runScenario(viewport, screenshotPath) {
    const browser = await chromium.launch({ executablePath: chromePath, headless: true });
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const consoleErrors = [];
    const responses = [];

    page.on('console', (msg) => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
    page.on('pageerror', (error) => consoleErrors.push(error.message));
    page.on('response', (response) => {
      const url = response.url();
      if (url.includes('firestore.googleapis.com') || url.includes('firebasestorage.googleapis.com') || url.includes('cloudfunctions.net')) {
        responses.push({ url, status: response.status(), method: response.request().method() });
      }
    });

    await page.goto(`${baseUrl}/login`, { waitUntil: 'networkidle' });
    await page.locator('input[name="email"]').fill(email);
    await page.locator('input[name="password"]').fill(password);
    await page.locator('form button[type="submit"]').click();
    await page.waitForURL('**/admin', { timeout: 20000 });
    await page.waitForLoadState('networkidle');

    const afterLoginUrl = page.url();
    const adminRendered = (await page.locator('body').textContent())?.includes('Admin console') ?? false;
    const bodyTextLength = (await page.locator('body').textContent())?.trim().length ?? 0;
    const overflow = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      innerWidth: window.innerWidth,
      ok: document.documentElement.scrollWidth <= window.innerWidth,
    }));
    await page.screenshot({ path: screenshotPath, fullPage: true });

    await page.goto(`${baseUrl}/employment`, { waitUntil: 'networkidle' });
    const employmentUrl = page.url();
    await page.goto(`${baseUrl}/student`, { waitUntil: 'networkidle' });
    const studentUrl = page.url();
    await page.goto(`${baseUrl}/teacher`, { waitUntil: 'networkidle' });
    const teacherUrl = page.url();

    const firestoreReads = responses.filter((x) => x.url.includes('firestore.googleapis.com'));
    const userReads = firestoreReads.filter((x) => x.url.includes('documents:batchGet'));
    const firestoreWrites = firestoreReads.filter((x) => /commit|documents:write/.test(x.url));
    const storageRequests = responses.filter((x) => x.url.includes('firebasestorage.googleapis.com'));
    const functionsRequests = responses.filter((x) => x.url.includes('cloudfunctions.net'));

    await browser.close();
    return {
      afterLoginUrl,
      adminRendered,
      bodyTextLength,
      employmentUrl,
      studentUrl,
      teacherUrl,
      overflow,
      consoleErrors,
      userReads,
      firestoreWrites,
      storageRequests,
      functionsRequests,
    };
  }

  const desktop = await runScenario({ width: 1440, height: 900 }, '__captures/admin-smoke-desktop-1440x900.png');
  const mobile = await runScenario({ width: 390, height: 844 }, '__captures/admin-smoke-mobile-390x844.png');
  const report = { desktop, mobile };
  await fs.writeFile('__captures/admin-route-smoke-check.json', JSON.stringify(report, null, 2));
  console.log(JSON.stringify(report, null, 2));
}

main().catch(async (error) => {
  const text = `${error?.stack || error}`;
  try { await fs.writeFile('__captures/admin-route-smoke-error.txt', text); } catch {}
  console.error(text);
  process.exit(1);
});
