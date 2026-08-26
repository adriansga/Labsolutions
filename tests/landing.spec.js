const { test, expect } = require('@playwright/test');
const path = require('path');

const screenshotDir = '/mnt/g/Mój dysk/.AI/_SCRATCH/ELABS_LANDING_V2_2026-08-26';

test('główny flow landing → kalkulator → kontakt działa', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/', { waitUntil: 'networkidle' });

  await expect(page).toHaveTitle(/ELABS/);
  await expect(page.locator('h1')).toContainText('Od próbki do gotowego wyniku');
  await expect(page.locator('#monthly-cost')).toHaveText('18 333 zł');
  await expect(page.locator('#annual-cost')).toHaveText('220 000 zł');
  await expect(page.locator('#monthly-hours')).toHaveText('333,3 godz.');
  await expect(page.locator('#hours-per-employee')).toHaveText('111,1 godz.');
  await expect(page.locator('#fte-equivalent')).toHaveText('2 etatu');
  await expect(page.locator('#team-load')).toHaveText('66,1%');

  await page.locator('#employees-number').fill('5');
  await page.locator('#results-number').fill('1000');
  await page.locator('.assumptions summary').click();
  await page.locator('#minutes').fill('12');
  await page.locator('#hourly-cost').fill('60');
  await page.locator('#monthly-capacity').fill('160');
  await expect(page.locator('#monthly-cost')).toHaveText('12 000 zł');
  await expect(page.locator('#annual-cost')).toHaveText('144 000 zł');
  await expect(page.locator('#monthly-hours')).toHaveText('200 godz.');
  await expect(page.locator('#hours-per-employee')).toHaveText('40 godz.');
  await expect(page.locator('#fte-equivalent')).toHaveText('1,3 etatu');
  await expect(page.locator('#team-load')).toHaveText('25%');

  const mailto = await page.evaluate(() => window.ELABS.buildMailto({
    name: 'Jan Kowalski',
    company: 'Laboratorium Testowe',
    email: 'jan@example.com',
    results: '1000'
  }));
  expect(mailto).toContain('mailto:adrian.labsolutions@gmail.com');
  expect(decodeURIComponent(mailto)).toContain('Laboratorium Testowe');
  expect(decodeURIComponent(mailto)).toContain('12 000 zł');
  expect(decodeURIComponent(mailto)).toContain('Pracownicy zaangażowani w wyniki: 5');

  await expect(page.locator('.product-shot')).toHaveCount(5);
  await expect(page.locator('.founder-card')).toHaveCount(0);

  const brokenImages = await page.locator('img').evaluateAll((images) => images
    .filter((image) => !image.complete || image.naturalWidth === 0)
    .map((image) => image.getAttribute('src')));
  expect(brokenImages).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test('menu mobile, FAQ i formularz mają poprawne stany', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const menuButton = page.locator('.menu-button');
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
  await menuButton.click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#main-nav')).toHaveClass(/open/);
  await page.locator('#main-nav a[href="#kalkulator"]').click();
  await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

  const firstFaq = page.locator('.faq-item').first();
  await firstFaq.locator('summary').click();
  await expect(firstFaq).toHaveAttribute('open', '');

  await page.locator('#contact-form button[type="submit"]').click();
  const invalidCount = await page.locator('#contact-form input:invalid').count();
  expect(invalidCount).toBeGreaterThan(0);

  const overflow = await page.evaluate(() => ({
    scroll: document.documentElement.scrollWidth,
    client: document.documentElement.clientWidth
  }));
  expect(overflow.scroll).toBeLessThanOrEqual(overflow.client);
});

for (const viewport of [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1000 }
]) {
  test(`render ${viewport.name} bez overflow`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/', { waitUntil: 'networkidle' });
    await page.locator('.reveal').evaluateAll((elements) => elements.forEach((element) => element.classList.add('is-visible')));

    const metrics = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
      height: document.documentElement.scrollHeight
    }));
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    expect(metrics.height).toBeGreaterThan(viewport.height);

    await page.screenshot({
      path: path.join(screenshotDir, `${viewport.name}.png`),
      fullPage: true
    });
  });
}
