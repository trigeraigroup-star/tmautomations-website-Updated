# memory.md — TMAutomations website

## Status (2026-09-22, 18:45)
- Live at https://www.tmautomations.io (Cloudflare Workers). Deployed 2026-09-17 19:27 (commit 5db4fad, version a1f86303): Health Check pill + section,
  five Services pages, copy edits up to Custom AI Agents FAQ 4. All routes verified 200 with new copy.
- 2026-09-22: AI Marketing + SEO/AEO/Lead Gen reviewed; Michal said "services content approved". Committed, pushed and deployed the same day.
- 2026-09-22 evening, all deployed (last commit be9db44, CF version 81b7f33d): contact-scene teal "TM"; logo wordmark outline 3.5px (was faded, then too bold);
  favicon set (svg/ico/png/apple) = full mark on parchment tile with TM letters enlarged 1.2x + shifted right ("variant D", favicon only); Workflow FAQ 1 save-money answer.
- Decision: site logo stays as is (option-D letters in the lockup flatten the foot; Michal said "leave as is").
- Copy review ran through the annotation artifact
  https://claude.ai/artifact/GExxLQU4HPc62L3xCDbWcf (comments URL .../code/artifact/7b6c3b58-3641-4898-966b-be220eb96ed8).
  Michal comments line by line; each comment is applied to `app/content.json` / `app/services/data.ts`, the review page is rebuilt
  with `node <scratchpad>/build-copy-review.mjs <repo> <scratchpad>` and republished, reply + resolve in the thread.
- Copy review COMPLETE (all five Services pages + Health Check approved 2026-09-22). No open threads. Artifact kept for future rounds.
- On resume: `ArtifactComments watch` on the artifact URL so new comments wake the session; rebuild script lives in the session scratchpad
  (`build-copy-review.mjs`) — if the scratchpad is gone after restart, recreate it from app/content.json + app/services/data.ts (one <section> per page, one .line per copy key).

## Shipped 2026-09-17 (commit 5db4fad)
- Header: Services (hover menu) first, then Approach/Process/Work/Contact, then "Free Health Check" teal pill (top-right; mobile: pill beside brand, nav below).
- Health Check note between Approach and Process (`healthCheck` in content.json).
- Services: `app/services/{page,layout,data}.tsx|ts`, 5 pages (workflow-automation, ai-assistants, custom-ai-agents, ai-marketing, seo-aeo-lead-generation), `app/services.css`, shared `SiteHeader`/`SiteFooter`, FAQ JSON-LD, FAQ answers keep line breaks.
- Testimonial stripe component `app/components/Testimonials.tsx` (renders only when `testimonials` in content.json is non-empty; Michal has 4 quotes coming).

## Copy rules learned this session (Michal's voice)
- Plain, calm, positive. No "paying for", "ready", "depend". Owner angle: save time & money, consistency, accuracy, growth. Diversify "who it's for" (owners / teams / businesses).
- Use "connect the dots / connecting the pieces" concept. Human in the loop = client's choice, not a fixed list. Don't over-list examples.
- Shared last FAQ on every service page: "What happens after the build?" (training, guides, 60 days support, positive close).

## What worked / broke
- Annotation artifact per line with orange keys works well for copy review.
- Favicon lesson: thin teal strokes on parchment vanish at 16px; the tab icon needs ~2x stroke weight and the letters filling the ring. Icons rendered from `public/favicon.svg` with Playwright WebKit (scratch `wk/icons.mjs`); favicon.ico is a PNG-in-ICO wrapper.
- Scratchpad is wiped on Mac restart: rebuild scripts (`build-copy-review.mjs`, `wk/`) from the notes here when needed.
- Next.js `<Link>` lint rule: use plain `<a>` with an eslint-disable comment (static pages).
- Dev server: `npm run dev` via preview_start "tmautomations-dev"; if port 3000 is dead, restart it.

## Open decisions
- Testimonials: waiting on 4 real quotes + permission.
