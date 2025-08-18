const playwright = require('playwright');
const fs = require('fs');

async function run() {
  const browser = await playwright.chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 360, height: 1024 } });
  const url = 'http://127.0.0.1:5500/';
  console.log('Opening', url);
  await page.goto(url, { waitUntil: 'networkidle' });

  // take screenshot of the right side to capture scrollbar
  const screenshotPath = 'tools/scrollables.png';
  await page.screenshot({ path: screenshotPath, fullPage: true });
  console.log('Saved screenshot to', screenshotPath);

  const results = await page.evaluate(() => {
    const scrollables = [];
    const all = Array.from(document.querySelectorAll('*'));
    for (const el of all) {
      const style = window.getComputedStyle(el);
      const overflowY = style.overflowY;
      const scrollable = (el.scrollHeight > el.clientHeight + 1) && (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay' || overflowY === 'visible');
      if (scrollable) {
        const rect = el.getBoundingClientRect();
        scrollables.push({
          tag: el.tagName.toLowerCase(),
          id: el.id || null,
          classes: el.className || null,
          overflowY,
          scrollHeight: el.scrollHeight,
          clientHeight: el.clientHeight,
          rect: { x: rect.x, y: rect.y, width: rect.width, height: rect.height }
        });
      }
    }
    // always include body if page is taller than viewport
    const body = document.body;
    if (document.documentElement.scrollHeight > document.documentElement.clientHeight) {
      scrollables.unshift({ tag: 'html/body', id: null, classes: null, overflowY: window.getComputedStyle(document.documentElement).overflowY, scrollHeight: document.documentElement.scrollHeight, clientHeight: document.documentElement.clientHeight, rect: { width: document.documentElement.clientWidth, height: document.documentElement.clientHeight } });
    }
    return scrollables.slice(0, 30);
  });

  console.log('Scrollable candidates:', JSON.stringify(results, null, 2));
  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });
