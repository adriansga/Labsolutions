const { test, expect } = require('@playwright/test');
const path = require('path');

const screenshotDir = '/mnt/g/Mój dysk/.AI/_SCRATCH/ELABS_LANDING_2026-08-26';

test('główny flow landing → kalkulator → kontakt działa', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/', { waitUntil: 'networkidle' });

  await expect(page).toHaveTitle(/ELABS/);
  await expect(page.locator('h1')).toContainText('Dane próbki wpisujesz raz');
  await expect(page.locator('#monthly-cost')).toHaveText('2 025 zł');
  await expect(page.locator('#annual-cost')).toHaveText('24 300 zł');
  await expect(page.locator('#monthly-hours')).toHaveText('45 godz.');

  await page.locator('#samples-number').fill('1000');
  await page.locator('#rewrites-number').fill('4');
  await page.locator('.assumptions summary').click();
  await page.locator('#minutes').fill('2');
  await page.locator('#hourly-cost').fill('60');
  await expect(page.locator('#monthly-cost')).toHaveText('8 000 zł');
  await expect(page.locator('#annual-cost')).toHaveText('96 000 zł');
  await expect(page.locator('#monthly-hours')).toHaveText('133,3 godz.');

  const mailto = await page.evaluate(() => window.ELABS.buildMailto({
    name: 'Jan Kowalski',
    company: 'Laboratorium Testowe',
    email: 'jan@example.com',
    samples: '1000'
  }));
  expect(mailto).toContain('mailto:adrian.labsolutions@gmail.com');
  expect(decodeURIComponent(mailto)).toContain('Laboratorium Testowe');
  expect(decodeURIComponent(mailto)).toContain('8 000 zł');

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
