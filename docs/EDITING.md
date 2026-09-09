# Editing this draft

Start the preview with `npm run dev`, then open the Local URL it prints (normally http://localhost:3000). Edits refresh automatically. This project remains local and has not been deployed.

## Copy and contact
`app/content.json` holds scene headings, paragraphs, navigation, process steps, contact details, form labels and empty proof collections. Keep JSON valid: double quotes, commas between entries, no trailing commas. The hero is intentionally provisional. Update `contact.address` when the correct address is supplied. The phone display and `phoneHref` are separate; retain `tel:+18507756906` unless the number changes. Every conversation CTA targets `#contact`.

## Structure and styling
- `app/page.tsx`: scene order and semantic page composition.
- `app/components/Artwork.tsx`: reusable thread, paper objects and workflow diagrams.
- `app/components/Process.tsx`: scroll/click/keyboard stages; all content renders before JavaScript enhancement.
- `app/components/Motion.tsx`: visible-scene scroll progress and active navigation.
- `app/globals.css`: color tokens, typography, layout, responsive and reduced-motion rules.
- `app/layout.tsx`: search title and description.
- `public/images`: compressed human illustrations, parchment texture, paper-object atlas, build board, and transformation artwork. Keep alt descriptions aligned with replacement artwork.

`docs/DESIGN-SPEC.md` is the visual authority. `Scene.tsx` supplies the common scene frame; its `length` prop controls desktop scroll distance in viewport heights. `Motion.tsx` reserves the beginning for arrival and the end for a completed-state hold. Process timing is separate in `Process.tsx`.

Small illustration labels live in `Artwork.tsx`; process illustration introductions and substep captions live in `Process.tsx`; the owner benefit lines live in `page.tsx`. These are editable text, not baked into images. Main business content remains in `content.json`. With JavaScript, process tabs work on mobile and desktop; without JavaScript all process panels render.

## Real proof
`caseStudies` and `testimonials` are intentionally empty. The Work section displays an honest availability note. When approved material exists, add real entries and a corresponding rendering component in the Work section. Suggested case-study fields: `title`, `challenge`, `solution`, `outcome`, `url`. Suggested testimonial fields: `quote`, `name`, `role`, `company`. Never publish illustrative metrics or identities as real proof.

## Form delivery (Resend)
`app/api/contact/route.ts` receives the form (POST JSON), rate-limits by IP (5 per 10 minutes, in-memory), drops honeypot submissions, and calls `deliverContact` in `app/lib/contact-server.mjs`, which validates again and posts to Resend. The browser adapter `app/lib/contact.mjs` shows success only after the server returns ok. Without `RESEND_API_KEY` the route answers 503 “not connected” and sends nothing.

Environment (server-side only, never in code or JSON):
- `RESEND_API_KEY` — Resend API key.
- `CONTACT_TO` — recipient(s), comma-separated, default michal@tmautomations.io.
- `CONTACT_FROM` — sender on a verified domain, default `TMAutomations <hello@tmautomations.io>`.

Local: copy `.dev.vars.example` to `.dev.vars` (gitignored) and restart `npm run dev`. Production (Cloudflare Workers): `npx wrangler secret put RESEND_API_KEY` and set the two vars in the Worker settings. Verify tmautomations.io in Resend (DNS records) before using the hello@ sender; until then Resend only delivers from `onboarding@resend.dev` to the account owner.

## Checks
Run `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`. Confirm desktop/mobile layout and reduced motion after structural changes.
