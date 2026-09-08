# TMAutomations — reference-led reconstruction

## Authority and purpose

This specification supersedes the first draft's visual decisions. It implements the user's approved renders, not the delivered flat green website. Audience: small-business owners. Promise: time recovered, clearer control, fewer errors, and more opportunity through practical systems and accountable human partnership. Primary action: start a conversation.

The reference originals are the three image strips in `/Users/michal/.codex/generated_images/01a06dee-f807-7fc1-9948-0b956664c08a/`: `exec-2e07da72-91b7-4472-a2b9-bb1931f2f7b2.png` (1–3), `exec-b64be1e0-a6bd-4a9e-8d81-504fd807f3b7.png` (4–6), and `exec-27fb9581-aa23-4b4e-99d2-010701f88ef2.png` (7–9). User comparison images 1, 3, 5 are authority; 2, 4, 6 are explicitly rejected.

## Non-negotiable visual rules

- One warm parchment surface throughout, approximately #f4e6ce; visible natural paper fibers. No alternate flat sage section fills.
- Charcoal green headings #223d36; teal supporting copy and TM letters #386f65. Muted sage belongs to illustration fragments, not section backgrounds.
- Narrow, regular-weight humanist sans headings. The raster references do not encode a font identity. Self-host Barlow Semi Condensed 400 as the explicit visual match, 500 for small emphasis. Do not use the previous wide, heavy Manrope display treatment. Heading line height 1.14, tracking -0.025em, desktop 46–64px depending on available height; body 18–21px, line height 1.55. Preserve the reference's compact multiline headings instead of giant centered slogans.
- Text remains semantic, editable HTML. Never use screenshot pages as the website.
- Illustration grammar: graphite drawing, imperfect paper edges, tissue layers, muted teal ink, small physical shadows. Real human artwork where it matters. Use raster artwork for illustrated objects; SVG for paths and geometric connections only.
- Composition: left text occupies about 28–32%; artwork occupies 62–70%, overlaps the paper environment and shares its surface. No heading row above a disconnected rectangular image. Keep faces and hands unobstructed.
- Ordered states use equal node sizes, aligned centers, measured gaps, balanced branches. Disorder is only the initial state, never the whole site.
- Header is quiet: small wordmark upper left; four text anchors upper right. No brand dot, bold oversized logo, heavy rule, or opaque green bar.
- Scroll cue: short teal rule ending in a circle, centered near the bottom. Scene connections and active marker use the same ink.

## Composition and narrative by scene

| Scene | Text and job | Screen composition | Moving elements and resolved state |
|---|---|---|---|
| 1 — Curiosity | “What if the work kept moving?” / “Without you pushing every step.” | Narrow left headline; layered paper workflow across the right. Diagram fragments and human silhouettes remain secondary. | Teal lead enters, reaches the first paper tile, continues toward the unfinished next step. 220vh desktop section; hold the completed composition. |
| 2 — Pressure | “You know this day. You live it.” | Left copy; illustrated owner at desk on right with five separate paper interruptions: message, invoice, quote, team question, Zoom countdown. | Interruptions settle into a controlled orbit; one path catches their handoffs. Avoid shaking or looping urgency. 220vh. |
| 3 — Possibility | “It doesn’t have to stay this way.” | Same left measure; five aligned person/checklist/calendar/envelope/check tiles right, secondary circular connection nodes beneath. | Sequential path drawing, papers align, terminal check settles. 230vh. |
| 4 — Opportunity | “Saving time is only the beginning.” | Exact reference silhouette: copy upper left; existing workflow lower left; a central fork reaches upper-right operations and lower-right growth rows. Operations: time, coordination, accuracy. Growth: exposure, marketing, leads, follow-up. Labels directly beneath illustrated objects. | Main path reaches fork, upper branch resolves, lower branch follows, whole diagram holds. 300vh with first 12% establish, 12–72% draw, final 28% hold. No replacement lists or centered heading. |
| 5 — Approach | “The right solution begins with understanding the work.” plus approved accountability sentence | Copy and accountability together on left. Original collaboration artwork occupies right two-thirds and merges with parchment; team and tabletop are dominant. | Quiet short route across the actual paper work; restrained 10px artwork travel. 180vh. No paragraph above image or separate centered accountability block below. |
| 6 — Process | “How we work.” | Full-width outlined 3-tab strip; centered concise stage intro; main illustrated working sequence; numbered substep timeline below. All within one composed screen on desktop. | Three independently clickable/keyboard-accessible tabs. Discover: inspect/map/prioritize. Build: inputs → large hand/drafting board → test/correct → approval, with the board most prominent. Integrate: tools/team → support → improvements. Main section 520vh; Build gets half the scroll interval. Clicking selects the stage's scroll position so the next tiny scroll does not immediately undo the choice. |
| 7 — Transformation | “From manual coordination to intelligent flow.” | Left title; dense paper inputs converge through human decision point into symmetric ordered row. Reuse approved full-resolution transformation artwork. | Animated teal route follows artwork's actual handoff locations; human node is visibly retained. Focal 340vh sequence, last 25% holds resolved flow. |
| 8 — Clarity & proof | “See what moved. Know what needs attention.” / “Less chasing. Clearer decisions. Greater control.” | Left copy; fine-bordered paper ledger on right with completed, progressing, needs-attention columns. Proof area beneath stays honest until supplied. | Completed work settles; only an exception is emphasized. No imaginary performance metrics or testimonial presented as genuine. 220vh. |
| 9 — Time back | “The workday ends when it should.” | Owner finishing the day on right; left promise and three clear benefit lines. Low-pressure conversation CTA is part of same scene. | Workflow reaches a completed endpoint; owner artwork subtly eases toward doorway; text holds long enough to read. 220vh. |
| 10 — Contact | “Let’s start with your business.” | Same parchment, left company details, right tidy labeled form. Navigation Contact and all conversation CTAs target here. | Focus and form feedback only; no pinned delay. Form remains explicitly unconnected until delivery is configured. |

## Motion and connecting thread

Use native scroll and sticky scene stages, not wheel interception. Full desktop stage is viewport height minus the quiet header. Scene length is independent of artwork height. Timings above are viewport distances, not forced seconds: visitors remain in control.

Within each scene, progress begins only after the scene has reached its pinned position. Establish 0–12%, explain with motion 12–72%, hold 72–100%. The base route stays visible at 35% ink; active route is solid teal at 2.2px with a 5px lead dot. Never let only a nearly invisible 1px sliver stand for the motif. SVG points are aligned with artwork coordinates. A continuous right-edge thread and lead marker bridge scenes; a small next-scene cue repeats the same stroke/circle grammar.

Work with distinct layers: parchment; contextual drafting fragments; illustrated people/objects; SVG ink; live type/controls. Raster layers are not falsely described as individually animated people. Existing embedded illustration details remain static; separately positioned object tiles and SVG strokes animate. Avoid perpetual loops, image sequences, blur effects and broad compositing filters during scroll.

## Interactions and accessibility

- Approach → #approach, Process → #process, Work → #work, Contact → #contact. Header offsets must land at the top of readable content.
- Process: mouse, touch, arrows, Home/End; correct tab/panel associations. Each stage exposes description and substeps. Build receives its own prominence. Manual choice persists by moving the scroll position into that stage.
- Mobile ≤800px: no long pinned desktop sequences; shorter stacked copy/art compositions, process tabs remain clickable with full detail; workflow graphics preserve diagram structure and have readable text alternatives. No horizontal page overflow.
- Reduced motion: no long sticky holds, all paths completed, no moving lead marker; process remains manually selectable.
- No JavaScript: content and all process articles remain visible; contact stays disabled with phone alternative.
- Every useful field has a label. Entered details are retained on submission failure. Existing contact adapter and privacy behavior preserved.

## Assets and editing

`app/content.json` remains the business copy source. `app/components/Artwork.tsx` owns reusable paper tiles and the path geometry. `app/components/Scene.tsx` owns scene framing. `Motion.tsx` owns bounded scroll updates. `Process.tsx` owns stage selection. `app/globals.css` owns all visual tokens and responsive composition.

Reuse collaboration.jpg, payoff.jpg and the approved transformation source. New assets are limited to paper-object atlas, build board/hand, owner pressure illustration, and plain parchment. These provide actual materials instead of CSS imitations. Use CSS sprite windows for paper icons, live text for labels, preserve original generated masters outside the public bundle. Fonts are self-hosted with license.

Contact facts: TMAutomations; www.TMAutomations.io; (850) 775-6906; address placeholder. Real proof and email delivery remain launch inputs. Future chatbot intake seam remains available; no chatbot is simulated.

## Acceptance and verification

Technical checks alone do not establish completion. Compare opportunity, approach, and process against supplied references at equivalent desktop proportions; inspect all other scenes for consistent paper, typography and composition. Inspect start/mid/end scroll states to confirm routes are perceptible and resolved states hold. Check all tabs, anchors, contact validation, mobile stacking and reduced-motion behavior. Record actual results and remaining differences. Exact pixel identity is not promised because the references are raster concepts and the live page must adapt to different viewports; composition, materials, typography character and narrative hierarchy are the acceptance criteria.
