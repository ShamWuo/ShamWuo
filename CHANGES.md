Changelog — edits made by assistant

Summary
- Made the service worker precache more resilient by fetching and caching per-URL instead of using cache.addAll(), so one missing asset won't break install.
- Replaced deprecated reload call in `assets/main.js` with `location.reload()`.
- Removed placeholder `https://example.com` from the product JSON-LD in `products.html`.
- Added `site.config.json` to centralize contact/social placeholders and `assets/config.js` to populate anchors at runtime.
- Updated `index.html` and `contact.html` to include `assets/config.js` and added element IDs used by the loader.
- Created `tools/headless-check.js` to run headless Playwright checks verifying anchors, SW registration, and modal behavior.
- Created `tools/sw-update-sim.js` to simulate a two-page SW update flow (test harness).
- Temporarily modified `sw.js` during testing to change cache name and to post activation messages; restored normal clients.claim() behavior at the end of testing.

How to test locally
1. Start the local server (the workspace already has a task configured):

```powershell
npx live-server --port=5500 --open=index.html
```

2. Open the site in a desktop browser and verify the contact links are populated (client-side script `assets/config.js` fetches `site.config.json`).

3. Run the headless checks (requires Node.js and Playwright installed):

```powershell
npm i -D playwright
npx playwright install
node tools/headless-check.js
```

4. To experiment with SW update flow manually, open DevTools > Application > Service Workers, then edit `sw.js` (bump `CACHE_NAME`), reload, observe a `waiting` worker, and call `skipWaiting()` from DevTools or the page.

Files changed/added (purpose)
- `sw.js` — made precache resilient; temporary cache-name bumps used for testing; posts `sw-activated` message on activate.
- `assets/main.js` — replaced deprecated reload call.
- `products.html` — removed example.com placeholder in JSON-LD.
- `site.config.json` — new site-level config (placeholders: replace-me@example.com etc.).
- `assets/config.js` — loader that fetches `site.config.json` and populates anchor IDs.
- `index.html`, `contact.html` — wired to `assets/config.js` and added element IDs.
- `tools/headless-check.js` — headless test runner (Playwright).
- `tools/sw-update-sim.js` — SW update simulation harness (Playwright).

Notes
- `site.config.json` currently contains placeholder values. Provide real contact values and run the headless check to verify.
- The SW update flow is timing-sensitive; for reliable results use DevTools or the provided `sw-update-sim.js` with careful timings.

Next steps (pick one)
- Provide contact values and I'll patch `site.config.json`.
- I can create a commit and PR with these edits if you'd like.
- I can remove the `tools/` harnesses if you prefer not to keep them in the repo.

