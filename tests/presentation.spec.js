const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const screenshotDir = '/mnt/g/Mój dysk/.AI/_SCRATCH/LABSOLUTIONS_ELABS_AUTOPLAY_2026-10-18';
fs.mkdirSync(screenshotDir, { recursive: true });

test('podstrona prezentacji ma pełny film i właściwe metadane', async ({ page }) => {
  const pageErrors = [];
  const failedRequests = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));
  page.on('requestfailed', (request) => {
    const failure = `${request.url()} ${request.failure()?.errorText || ''}`;
    const expectedMetadataAbort = request.url().endsWith('/media/elabs-prezentacja-v10-web.mp4')
      && request.failure()?.errorText === 'net::ERR_ABORTED';
    if (!expectedMetadataAbort) failedRequests.push(failure);
  });

  await page.goto('/prezentacjaelabs/', { waitUntil: 'domcontentloaded' });

  await expect(page).toHaveTitle('Prezentacja ELABS | Od zgłoszenia do wyniku');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex,nofollow,noarchive');
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', 'https://labsolutions.pl/prezentacjaelabs/');
  await expect(page.locator('h1')).toHaveText('Od telefonu klienta do gotowego wyniku');
  await expect(page.locator('.chapter')).toHaveCount(4);

  const video = page.locator('video');
  await expect(video).toHaveAttribute('controls', '');
  await expect(video).toHaveAttribute('autoplay', '');
  await expect(video).toHaveAttribute('muted', '');
  await expect(video).toHaveAttribute('playsinline', '');
  await expect(video).toHaveAttribute('preload', 'auto');
  await expect(video).toHaveAttribute('poster', 'poster.svg');
  await expect(video.locator('source')).toHaveAttribute('src', '../media/elabs-prezentacja-v10-web.mp4');
  await video.evaluate((element) => new Promise((resolve, reject) => {
    if (element.readyState >= 1) return resolve();
    element.addEventListener('loadedmetadata', resolve, { once: true });
    element.addEventListener('error', () => reject(new Error('Nie udało się wczytać metadanych filmu')), { once: true });
  }));
  const duration = await video.evaluate((element) => element.duration);
  expect(duration).toBeGreaterThan(1109);
  expect(duration).toBeLessThan(1111);
  await expect.poll(() => video.evaluate((element) => element.currentTime), { timeout: 10_000 }).toBeGreaterThan(0.05);
  expect(await video.evaluate((element) => ({ paused: element.paused, muted: element.muted }))).toEqual({ paused: false, muted: true });
  await expect(page.locator('.sound-cta')).toBeVisible();
  await expect(page.locator('.sound-cta')).toHaveText('Włącz dźwięk i zacznij od początku');

  const publicHtml = await page.locator('html').evaluate((element) => element.outerHTML);
  expect(publicHtml).not.toContain('—');
  expect(pageErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

test('włączenie dźwięku zaczyna film od początku', async ({ page }) => {
  await page.goto('/prezentacjaelabs/', { waitUntil: 'domcontentloaded' });
  const video = page.locator('video');
  await expect.poll(() => video.evaluate((element) => element.currentTime), { timeout: 10_000 }).toBeGreaterThan(0.05);
  await page.locator('.sound-cta').click();
  await expect(page.locator('.sound-cta')).toBeHidden();
  expect(await page.locator('.skip-link').evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(0);
  expect(await video.evaluate((element) => document.activeElement === element)).toBe(true);
  expect(await video.evaluate((element) => ({ paused: element.paused, muted: element.muted, currentTime: element.currentTime }))).toMatchObject({ paused: false, muted: false });
  expect(await video.evaluate((element) => element.currentTime)).toBeLessThan(2);
});

test('rozdział ustawia film we właściwym miejscu', async ({ page }) => {
  await page.goto('/prezentacjaelabs/', { waitUntil: 'domcontentloaded' });
  const video = page.locator('video');
  await video.evaluate((element) => new Promise((resolve, reject) => {
    if (element.readyState >= 1) return resolve();
    element.addEventListener('loadedmetadata', resolve, { once: true });
    element.addEventListener('error', () => reject(new Error('Brak metadanych filmu')), { once: true });
  }));
  await page.locator('.chapter[data-time="245"]').click();
  await expect.poll(() => video.evaluate((element) => element.currentTime)).toBeGreaterThanOrEqual(245);
  await video.evaluate((element) => element.pause());
});

test('stary adres przekierowuje na prezentacjaelabs i zachowuje parametry', async ({ page }) => {
  await page.goto('/prezentacja-elabs/?source=old#film', { waitUntil: 'domcontentloaded' });
  await page.waitForURL('/prezentacjaelabs/?source=old#film');
  await expect(page.locator('h1')).toHaveText('Od telefonu klienta do gotowego wyniku');
});

for (const viewport of [
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'desktop-1440', width: 1440, height: 1000 }
]) {
  test(`prezentacja ${viewport.name} bez overflow`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/prezentacjaelabs/', { waitUntil: 'domcontentloaded' });

    const metrics = await page.evaluate(() => {
      const player = document.querySelector('video').getBoundingClientRect();
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        playerRatio: player.width / player.height,
        playerWidth: player.width,
        chapterTargets: [...document.querySelectorAll('.chapter')].map((element) => element.getBoundingClientRect().height)
      };
    });
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    expect(metrics.playerRatio).toBeGreaterThan(1.76);
    expect(metrics.playerRatio).toBeLessThan(1.79);
    expect(metrics.playerWidth).toBeGreaterThanOrEqual(viewport.width * 0.94);
    expect(metrics.chapterTargets.every((height) => height >= 44)).toBe(true);

    await page.screenshot({
      path: path.join(screenshotDir, `${viewport.name}.png`),
      fullPage: true
    });
  });
}
