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
  await expect(page.locator('.brand-logo')).toHaveAttribute('src', '../favicon.svg');
  await expect(page.locator('.back-link')).toHaveCount(0);

  const video = page.locator('video');
  await expect(video).not.toHaveAttribute('controls', '');
  await expect(video).not.toHaveAttribute('autoplay', '');
  await expect(video).not.toHaveAttribute('muted', '');
  await expect(video).toHaveAttribute('playsinline', '');
  await expect(video).toHaveAttribute('preload', 'metadata');
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
  expect(await video.evaluate((element) => element.controls)).toBe(false);
  expect(await video.evaluate((element) => ({ paused: element.paused, muted: element.muted, currentTime: element.currentTime }))).toEqual({ paused: true, muted: false, currentTime: 0 });
  await expect(page.locator('.sound-cta')).toBeVisible();
  await expect(page.locator('.sound-cta')).toHaveAttribute('aria-label', 'Odtwórz film z dźwiękiem');
  await expect(page.locator('.player-controls')).toBeVisible();
  await expect(page.locator('.progress')).toBeVisible();
  await expect(page.locator('.fullscreen-toggle')).toBeVisible();
  await expect(page.getByText('Film ma 18 minut i 30 sekund.')).toHaveCount(0);
  await expect(page.getByText('Ten indywidualny link zapisuje')).toHaveCount(0);
  await expect(page.getByText('Materiał demonstracyjny.')).toHaveCount(0);

  const publicHtml = await page.locator('html').evaluate((element) => element.outerHTML);
  expect(publicHtml).not.toContain('—');
  expect(pageErrors).toEqual([]);
  expect(failedRequests).toEqual([]);
});

test('duży przycisk play zaczyna film od początku z dźwiękiem', async ({ page }) => {
  await page.goto('/prezentacjaelabs/', { waitUntil: 'domcontentloaded' });
  const video = page.locator('video');
  expect(await video.evaluate((element) => element.paused)).toBe(true);
  await page.locator('.sound-cta').click();
  await expect(page.locator('.sound-cta')).toBeHidden();
  expect(await page.locator('.skip-link').evaluate((element) => element.getBoundingClientRect().bottom)).toBeLessThanOrEqual(0);
  await expect.poll(() => video.evaluate((element) => document.activeElement === element)).toBe(true);
  expect(await video.evaluate((element) => ({ paused: element.paused, muted: element.muted, currentTime: element.currentTime }))).toMatchObject({ paused: false, muted: false });
  expect(await video.evaluate((element) => element.currentTime)).toBeLessThan(2);
  await expect(page.locator('.play-toggle')).toHaveAttribute('aria-label', 'Wstrzymaj film');
  await expect.poll(async () => Number(await page.locator('.progress').inputValue())).toBeGreaterThan(0);
});

test('w pełnym ekranie pasek postępu i sterowanie pozostają stale widoczne', async ({ page }) => {
  await page.setViewportSize({ width: 1366, height: 768 });
  await page.goto('/prezentacjaelabs/', { waitUntil: 'domcontentloaded' });
  await page.locator('.sound-cta').click();
  await expect.poll(() => page.locator('video').evaluate((element) => element.paused)).toBe(false);
  await page.locator('.fullscreen-toggle').click();
  await expect.poll(() => page.evaluate(() => Boolean(document.fullscreenElement || document.querySelector('.video-shell').classList.contains('is-fallback-fullscreen')))).toBe(true);
  await page.waitForTimeout(2500);
  await expect(page.locator('.player-controls')).toBeVisible();
  await expect(page.locator('.progress')).toBeVisible();
  await expect(page.locator('.fullscreen-toggle')).toBeVisible();
  const fullscreenMetrics = await page.evaluate(() => {
    const player = document.querySelector('.video-shell').getBoundingClientRect();
    const controls = document.querySelector('.player-controls').getBoundingClientRect();
    return { playerTop: player.top, playerBottom: player.bottom, controlsBottom: controls.bottom, viewportHeight: innerHeight };
  });
  expect(fullscreenMetrics.playerTop).toBe(0);
  expect(fullscreenMetrics.playerBottom).toBeLessThanOrEqual(fullscreenMetrics.viewportHeight);
  expect(fullscreenMetrics.controlsBottom).toBeLessThanOrEqual(fullscreenMetrics.viewportHeight);
});

test('zwykły link nie uruchamia śledzenia oglądania', async ({ page }) => {
  let trackingCalls = 0;
  await page.route('**/rest/v1/rpc/elabs_presentation_track', async (route) => {
    trackingCalls += 1;
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto('/prezentacjaelabs/', { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(500);
  await expect(page.locator('#tracking-note')).toHaveCount(0);
  expect(trackingCalls).toBe(0);
});

test('indywidualny link zapisuje odbiorcę bez cookies i usuwa token z paska', async ({ page }) => {
  const calls = [];
  await page.route('**/rest/v1/rpc/elabs_presentation_track', async (route) => {
    calls.push(JSON.parse(route.request().postData() || '{}'));
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true}' });
  });
  await page.goto('/prezentacjaelabs/#v=testowy-token-o-dlugosci-co-najmniej-32-znakow', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('#tracking-note')).toHaveCount(0);
  await expect.poll(() => calls.some((call) => call.p_event === 'view')).toBe(true);
  expect(page.url()).not.toContain('testowy-token');
  await page.locator('.sound-cta').click();
  await expect.poll(() => calls.some((call) => call.p_event === 'sound_on')).toBe(true);
  const payload = JSON.stringify(calls);
  expect(payload).not.toContain('userAgent');
  expect(payload).not.toContain('kierowniczka');
  expect(await page.context().cookies()).toEqual([]);
});

test('prywatny raport pokazuje oglądalność i ukrywa token', async ({ page }) => {
  await page.route('**/rest/v1/rpc/elabs_presentation_report', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({
      generated_at: '2026-10-18T14:00:00Z',
      recipients: [{
        label: 'Kierowniczka', visits: 2, watched_seconds: 754, furthest_seconds: 780,
        duration_seconds: 1110, sound_on: true, completed: false, last_seen_at: '2026-10-18T13:59:00Z',
        sessions: [{ started_at: '2026-10-18T13:40:00Z', last_seen_at: '2026-10-18T13:59:00Z', watched_seconds: 754, last_position_seconds: 770, furthest_seconds: 780, sound_on: true, completed: false }]
      }]
    }) });
  });
  await page.goto('/prezentacjaelabs/wyniki/#admin=prywatny-token-administratora', { waitUntil: 'domcontentloaded' });
  await expect(page.locator('h2')).toHaveText('Kierowniczka');
  await expect(page.locator('.stat').nth(1)).toContainText('12:34');
  await expect(page.locator('.stat').nth(2)).toContainText('13:00 (70%)');
  expect(page.url()).not.toContain('prywatny-token');
});

test('panel tworzy osobny nazwany link bez wysyłania surowego tokenu do bazy', async ({ page }) => {
  let createPayload = null;
  await page.route('**/rest/v1/rpc/elabs_presentation_report', async (route) => {
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"generated_at":"2026-10-18T14:00:00Z","recipients":[]}' });
  });
  await page.route('**/rest/v1/rpc/elabs_presentation_create_recipient', async (route) => {
    createPayload = JSON.parse(route.request().postData() || '{}');
    await route.fulfill({ status: 200, contentType: 'application/json', body: '{"ok":true,"id":1,"label":"Dyrektor"}' });
  });
  await page.goto('/prezentacjaelabs/wyniki/#admin=prywatny-token-administratora', { waitUntil: 'domcontentloaded' });
  await page.locator('#recipient-name').fill('Dyrektor');
  await page.locator('#creator button').click();
  await expect(page.locator('#created-link')).toHaveClass(/is-visible/);
  await expect(page.locator('#created-link')).toContainText('Link dla Dyrektor');
  expect(createPayload.p_label).toBe('Dyrektor');
  expect(createPayload.p_token_hash).toMatch(/^[0-9a-f]{64}$/);
  expect(createPayload).not.toHaveProperty('p_token');
  expect(await page.locator('#created-link a').getAttribute('href')).toMatch(/\/prezentacjaelabs\/#v=[A-Za-z0-9_-]{40,}$/);
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
  { name: 'laptop-1366x768', width: 1366, height: 768 },
  { name: 'laptop-1440x900', width: 1440, height: 900 },
  { name: 'desktop-1440', width: 1440, height: 1000 }
]) {
  test(`prezentacja ${viewport.name} bez overflow`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
    await page.goto('/prezentacjaelabs/', { waitUntil: 'domcontentloaded' });

    const metrics = await page.evaluate(() => {
      const player = document.querySelector('.video-shell').getBoundingClientRect();
      const stage = document.querySelector('.video-stage').getBoundingClientRect();
      const controls = document.querySelector('.player-controls').getBoundingClientRect();
      const controlsHit = document.elementFromPoint(controls.left + 24, controls.top + (controls.height / 2));
      return {
        scrollWidth: document.documentElement.scrollWidth,
        clientWidth: document.documentElement.clientWidth,
        playerRatio: stage.width / stage.height,
        playerWidth: player.width,
        playerTop: player.top,
        playerBottom: player.bottom,
        controlsHeight: controls.height,
        controlsBottom: controls.bottom,
        controlsReallyVisible: Boolean(controlsHit && controlsHit.closest('.player-controls')),
        chapterTargets: [...document.querySelectorAll('.chapter')].map((element) => element.getBoundingClientRect().height)
      };
    });
    expect(metrics.scrollWidth).toBeLessThanOrEqual(metrics.clientWidth);
    expect(metrics.playerRatio).toBeGreaterThan(1.76);
    expect(metrics.playerRatio).toBeLessThan(1.79);
    if (viewport.width > 900) expect(metrics.playerWidth).toBeGreaterThanOrEqual(viewport.width * 0.5);
    else expect(metrics.playerWidth).toBeGreaterThanOrEqual(viewport.width * 0.94);
    expect(metrics.playerTop).toBeGreaterThanOrEqual(0);
    expect(metrics.playerBottom).toBeLessThanOrEqual(viewport.height);
    expect(metrics.controlsHeight).toBeGreaterThanOrEqual(44);
    expect(metrics.controlsBottom).toBeLessThanOrEqual(viewport.height);
    expect(metrics.controlsReallyVisible).toBe(true);
    expect(metrics.chapterTargets.every((height) => height >= 44)).toBe(true);

    await page.screenshot({
      path: path.join(screenshotDir, `${viewport.name}.png`),
      fullPage: true
    });
  });
}
