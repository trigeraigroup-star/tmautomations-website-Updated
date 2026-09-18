# memory.md — TMAutomations website

## Status (2026-09-17)
- Live at https://www.tmautomations.io (Cloudflare Workers). Last deploy 2026-09-14 (phone number fix). Everything below is LOCAL + STAGED, not committed, not deployed.
- In progress: copy review of the Health Check offer + five Services pages via the annotation artifact
  https://claude.ai/artifact/GExxLQU4HPc62L3xCDbWcf (comments URL .../code/artifact/7b6c3b58-3641-4898-966b-be220eb96ed8).
  Michal comments line by line; each comment is applied to `app/content.json` / `app/services/data.ts`, the review page is rebuilt
  with `node <scratchpad>/build-copy-review.mjs <repo> <scratchpad>` and republished, reply + resolve in the thread.
- Reviewed so far (2026-09-17 evening): Health Check, Workflow Automation, AI Assistants (all approved), Custom AI Agents (FAQs 2-4 done;
  local/hosted merged into one question). Not yet reviewed: rest of Custom AI Agents, AI Marketing, SEO/AEO/Lead Gen. No open threads.
- Committed 2026-09-17 (checks green); NOT deployed yet, live site still shows the 09-14 build.

## Staged work (uncommitted) — commit + deploy after Michal approves the copy
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
- Next.js `<Link>` lint rule: use plain `<a>` with an eslint-disable comment (static pages).
- Dev server: `npm run dev` via preview_start "tmautomations-dev"; if port 3000 is dead, restart it.

## Open decisions
- Testimonials: waiting on 4 real quotes + permission. Growth bullet + AI Assistants card line: waiting on Michal's pick from offered alternatives.
