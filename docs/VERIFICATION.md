# Verification — 2026-09-09

- `npm test`: 8/8 pass (content contract, contact validation + server delivery with a fake Resend, process copy/structure).
- `npm run lint`: clean. `npx tsc --noEmit`: clean. `npm run build`: vinext production build OK; `wrangler deploy` uploads ~700 KB.
- Desktop: every scene captured at 1440×900 in Chromium at its finished state; Opportunity fork also verified in WebKit at 1728×1000.
- Mobile: every scene captured in Playwright WebKit (iPhone 13) at its finished state; triggers verified (artwork must reach the middle band); contact popup open/close/focus verified; no horizontal overflow.
- Delivery: live form on www.tmautomations.io delivered to both inboxes (Resend 200). Invalid input → 400, bot honeypot → 200 with no send, missing key → 503 "not connected".
- Domain: http/https, apex/www all resolve to https://www.tmautomations.io (301s), HTTPS forced.
- Reduced motion: static complete states by CSS (source verified).

# Verification — 2026-09-22 (Services pages + Health Check)

- `npm test`: 8/8 pass. `npm run lint`: 0 errors (1 unused eslint-disable warning). `npx tsc --noEmit`: clean.
- Deployed version 02aa109f; `/`, `/services` and all five `/services/<slug>` pages return 200 with the approved copy.
- Mobile (Playwright WebKit, iPhone 13, live site): no horizontal overflow on any page (scrollWidth = 390); "Free Health Check" pill sits top-right beside the brand; nav row below it; FAQ `<details>` open on tap on every service page (5 or 6 per page); sticky header verified at mid-scroll; skip link hidden until keyboard focus; no console or page errors.
- Home page still passes the same checks after the header/Health Check changes.
