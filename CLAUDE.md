# TMAutomations website — project constitution

- Stack: React 19 + vinext (Next App Router conventions) on Vite 8; Cloudflare Workers via wrangler; Resend for email.
- Commands: `npm run dev` · `npm test` · `npm run lint` · `npx tsc --noEmit` · `npm run build` · deploy `npm run build && npx wrangler deploy -c dist/server/wrangler.json`.
- Copy lives in `app/content.json`. Desktop design is approved (`DESKTOP-APPROVALS.md`); phone layout in `app/mobile.css`.
- Art direction: parchment, teal pencil, torn-paper tiles. New visuals must come from the same sheet/textures. No vector icons.
- Test thread animations in WebKit (scratch Playwright webkit) — Safari renders dash-drawn curves differently.
- Secrets: never in code or JSON. `.dev.vars` locally, Worker secrets in production.
- auto-commit: no (stage, then commit on approval).
