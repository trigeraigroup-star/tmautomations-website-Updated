# Verification — 2026-09-09

- `npm test`: 8/8 pass (content contract, contact validation + server delivery with a fake Resend, process copy/structure).
- `npm run lint`: clean. `npx tsc --noEmit`: clean. `npm run build`: vinext production build OK; `wrangler deploy` uploads ~700 KB.
- Desktop: every scene captured at 1440×900 in Chromium at its finished state; Opportunity fork also verified in WebKit at 1728×1000.
- Mobile: every scene captured in Playwright WebKit (iPhone 13) at its finished state; triggers verified (artwork must reach the middle band); contact popup open/close/focus verified; no horizontal overflow.
- Delivery: live form on www.tmautomations.io delivered to both inboxes (Resend 200). Invalid input → 400, bot honeypot → 200 with no send, missing key → 503 "not connected".
- Domain: http/https, apex/www all resolve to https://www.tmautomations.io (301s), HTTPS forced.
- Reduced motion: static complete states by CSS (source verified).
