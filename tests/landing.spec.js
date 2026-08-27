const { test, expect } = require('@playwright/test');
const path = require('path');

const screenshotDir = '/mnt/g/Mój dysk/.AI/_SCRATCH/LABSOLUTIONS_URL_LOGO_2026-08-27';

test('główny flow landing → kalkulator → kontakt działa', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/', { waitUntil: 'networkidle' });

  await expect(page).toHaveTitle(/ELABS/);
  await expect(page.locator('h1')).toContainText('bez przepisywania');
  await expect(page.locator('.brand-name')).toHaveText('ELABS');
  await expect(page.locator('.brand-domain')).toHaveText('labsolutions.pl');
  await expect(page.locator('#main > .hero + #kalkulator')).toHaveCount(1);
  await expect(page.locator('.product-visual')).toHaveCount(0);
  const calculatorGap = await page.evaluate(() => {
    const actions = document.querySelector('.hero-actions').getBoundingClientRect();
    const heading = document.querySelector('#kalkulator .section-heading').getBoundingClientRect();
    return heading.top - actions.bottom;
  });
  expect(calculatorGap).toBeLessThan(120);
  await expect(page.locator('#before-cost')).toHaveText('26 500 zł');
  await expect(page.locator('#before-annual')).toHaveText('318 000 zł');
  await expect(page.locator('#before-hours')).toHaveText('530 godz.');
  await expect(page.locator('#before-minutes')).toHaveText('30 min/wynik');
  await expect(page.locator('#after-cost')).toHaveText('4 167 zł');
  await expect(page.locator('#after-annual')).toHaveText('50 000 zł');
  await expect(page.locator('#after-hours')).toHaveText('83,3 godz.');
  await expect(page.locator('#after-minutes')).toHaveText('5 min/wynik');
  await expect(page.locator('#monthly-savings')).toHaveText('22 333 zł');
  await expect(page.locator('#annual-savings')).toHaveText('268 000 zł');
  await expect(page.locator('#released-hours')).toHaveText('446,7 godz.');
  await expect(page.locator('#reduction-percent')).toHaveText('84,3%');

  await page.locator('#employees-number').fill('4');
  await page.locator('#results-number').fill('800');
  await expect(page.locator('#before-cost')).toHaveText('21 200 zł');
  await expect(page.locator('#before-annual')).toHaveText('254 400 zł');
  await expect(page.locator('#before-hours')).toHaveText('424 godz.');
  await expect(page.locator('#after-cost')).toHaveText('3 333 zł');
  await expect(page.locator('#after-annual')).toHaveText('40 000 zł');
  await expect(page.locator('#after-hours')).toHaveText('66,7 godz.');
  await expect(page.locator('#monthly-savings')).toHaveText('17 867 zł');
  await expect(page.locator('#annual-savings')).toHaveText('214 400 zł');
  await expect(page.locator('#released-hours')).toHaveText('357,3 godz.');
  await expect(page.locator('#reduction-percent')).toHaveText('84,3%');

  const mailto = await page.evaluate(() => window.ELABS.buildMailto({
    name: 'Jan Kowalski',
    company: 'Laboratorium Testowe',
    email: 'jan@example.com',
    results: '800'
  }));
  expect(mailto).toContain('mailto:kontakt@labsolutions.pl');
  expect(decodeURIComponent(mailto)).toContain('Laboratorium Testowe');
  expect(decodeURIComponent(mailto)).toContain('21 200 zł/mies.');
  expect(decodeURIComponent(mailto)).toContain('Pracownicy zaangażowani w wyniki: 4');

  await expect(page.locator('.product-shot')).toHaveCount(5);
  await expect(page.locator('.founder-card')).toHaveCount(1);

  const brokenImages = await page.locator('img').evaluateAll((images) => images
    .filter((image) => !image.complete || image.naturalWidth === 0)
    .map((image) => image.getAttribute('src')));
  expect(brokenImages).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test('bezpośrednie wejście przez index.html zachowuje czysty adres i parametry', async ({ page }) => {
  await page.goto('/index.html?source=test#kalkulator', { waitUntil: 'networkidle' });
  const location = await page.evaluate(() => ({
    pathname: window.location.pathname,
    search: window.location.search,
    hash: window.location.hash
  }));
  expect(location).toEqual({ pathname: '/', search: '?source=test', hash: '#kalkulator' });
  await expect(page.locator('.brand-domain')).toHaveText('labsolutions.pl');
});

test('publiczne podstrony nie zawierają półpauz ani starej oferty', async ({ page }) => {
  const pages = ['/', '/404.html', '/polityka-prywatnosci.html', '/regulamin.html', '/og-image.html'];
  for (const url of pages) {
    await page.goto(url, { waitUntil: 'networkidle' });
    const html = await page.locator('html').evaluate((element) => element.outerHTML);
    expect(html).not.toContain('—');
  }

  await page.goto('/polityka-prywatnosci.html', { waitUntil: 'networkidle' });
  await expect(page.locator('body')).toContainText('kontakt@labsolutions.pl');
  await expect(page.locator('body')).not.toContainText('Formspree');
  await expect(page.locator('body')).not.toContainText('Microsoft Clarity');
  await expect(page.locator('body')).not.toContainText('[NIP]');

  await page.goto('/regulamin.html', { waitUntil: 'networkidle' });
  await expect(page.locator('h1')).toHaveText('Informacje prawne');
  await expect(page.locator('body')).not.toContainText('Pakiet Start');
  await expect(page.locator('body')).not.toContainText('gwarancję satysfakcji');
  await expect(page.locator('body')).not.toContainText('Kurier');
});

test('menu mobile, FAQ i formularz mają poprawne stany', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/', { waitUntil: 'networkidle' });

  const calculatorGap = await page.evaluate(() => {
    const actions = document.querySelector('.hero-actions').getBoundingClientRect();
    const heading = document.querySelector('#kalkulator .section-heading').getBoundingClientRect();
    return heading.top - actions.bottom;
  });
  expect(calculatorGap).toBeLessThan(100);

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
