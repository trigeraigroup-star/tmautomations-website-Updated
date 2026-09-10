# memory.md — TMAutomations website

## Status (2026-09-09)
- Live at https://www.tmautomations.io (Cloudflare Workers, DNS on Cloudflare, domain at GoDaddy). Bare domain → www, HTTPS forced.
- Desktop reviewed and approved scene by scene; phone layout built and reviewed on iPhone (Safari).
- Contact form delivers via Resend to both of Michal's inboxes; success card shown only after Resend confirms.

## What worked
- Extracting paper/drawing layers from the approved tile sheet in the browser (canvas + flood fill) — organic animations without new art.
- Measuring geometry at runtime (seal positions, tile rows) instead of hard-coding path coordinates.
- Verifying in a real WebKit engine before shipping.

## What broke + the fix
- Safari painted dash-offset drawing of stretched curved paths ~70% → replaced with clip-path wipes (on the SVG element, not the path).
- Mobile animations started before the viewer arrived → trigger on the artwork reaching the middle band of the screen.
- michal@tmautomations.io had no MX → Google Workspace MX added; Resend domain verified.

## Open decisions
- Client stories / testimonials: placeholders until real material exists.
- Ongoing-support pricing: shown as "additional fee" only.
