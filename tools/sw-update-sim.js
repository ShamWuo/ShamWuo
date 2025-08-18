const { chromium } = require('playwright');

(async () => {
  const base = 'http://127.0.0.1:5500';
  console.log('Starting SW update simulation against', base);
  const browser = await chromium.launch();
  const context1 = await browser.newContext();
  const context2 = await browser.newContext();
  const page1 = await context1.newPage();
  const page2 = await context2.newPage();

  // listen for messages on page1
  page1.on('console', m => console.log('[P1 PAGE]', m.text()));
  page1.on('pageerror', e => console.log('[P1 ERROR]', e));

  // open first page and keep it open (controlled by old SW)
  await page1.goto(base + '/', { waitUntil: 'networkidle' });
  await page1.waitForTimeout(500);

  // open second page which will register the new SW
  await page2.goto(base + '/products.html', { waitUntil: 'networkidle' });
  await page2.waitForTimeout(500);

  // attempt explicit register from page2
  const res = await page2.evaluate(async () => {
    if (!navigator.serviceWorker) return { supported: false };
    try {
      const reg = await navigator.serviceWorker.register('/sw.js');
      return { registered: true, scope: reg.scope };
    } catch (e) {
      return { registered: false, error: e.message };
    }
  });
  console.log('Register result (page2):', res);

  // wait for a waiting worker
  const waitRes = await page2.evaluate(async () => {
    const start = Date.now();
    while (Date.now() - start < 5000) {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg && reg.waiting) return { waiting: true };
      await new Promise(r => setTimeout(r, 300));
    }
    return { waiting: false };
  });
  console.log('Waiting worker present?', waitRes);

  if (waitRes.waiting) {
    // post SKIP_WAITING
    const skip = await page2.evaluate(async () => {
      const reg = await navigator.serviceWorker.getRegistration();
      if (reg && reg.waiting) { reg.waiting.postMessage({ type: 'SKIP_WAITING' }); return { posted: true }; }
      return { posted: false };
    });
    console.log('Posted skip waiting:', skip);

    // wait to observe page1 receiving activation message
    let activated = false;
    page1.on('console', msg => { if (msg.text().includes('sw-activated')) activated = true; });

    await page1.waitForTimeout(2000);
    console.log('Page1 saw activation message?', activated);
  }

  await browser.close();
})();
