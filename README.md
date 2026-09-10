# TMAutomations website

Single-page marketing site for TMAutomations (AI workflow automation for small and mid-size businesses).
Live at https://www.tmautomations.io.

## Stack
- React 19 + Next.js App Router conventions, built and served by **vinext** on **Vite 8**.
- Deployed to **Cloudflare Workers** (`@cloudflare/vite-plugin`, `wrangler`). Static assets ship with the Worker.
- Contact form delivery through **Resend** (server route, no client secrets).
- Self-hosted Barlow Semi Condensed; parchment / pencil artwork in `public/images`.

## Run locally
```bash
npm install
npm run dev        # http://localhost:3000
```
For the contact form locally, copy `.dev.vars.example` to `.dev.vars` and add your Resend API key (the file is gitignored).

## Checks
```bash
npm test           # node --test tests/*.test.mjs
npm run lint
npx tsc --noEmit
npm run build
```

## Deploy
```bash
npx wrangler login                                   # once
npm run build && npx wrangler deploy -c dist/server/wrangler.json
```
Worker name, custom domains and the non-secret contact vars live in `vite.config.ts` (`localBindingConfig`).
The Resend key is stored as a Worker secret with `wrangler secret put` (see `docs/EDITING.md`).

## Where things live
- `app/content.json` — all business copy (headlines, cards, process stages and their detail sheets, contact form).
- `app/page.tsx` — scene order and composition. `app/components/` — artwork, threads, process, contact, motion.
- `app/globals.css` — tokens and base layout. `app/desktop-approved.css` — the approved desktop design. `app/mobile.css` — phone layout (≤800px).
- `app/api/contact/route.ts` + `app/lib/contact-server.mjs` — form delivery. `app/lib/contact.mjs` — browser adapter.
- `public/images/tiles/` — paper/drawing cutouts extracted from the approved sheet (see `public/images/PROVENANCE.md`).
- `docs/EDITING.md` — how to edit copy, artwork, motion and delivery. `DESKTOP-APPROVALS.md` — the record of approved decisions.
- `public/process-demos/` — early layout demos, not used by the site.

## Principles
No fabricated proof, metrics or testimonials. Every meaningful label is real HTML. Reduced-motion users get complete static states. Thread animations are tested in WebKit as well as Chrome (Safari paints dash-drawn curves differently).
