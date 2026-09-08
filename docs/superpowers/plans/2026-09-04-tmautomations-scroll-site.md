# TMAutomations Scroll Site Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement this approved plan task-by-task. Steps use checkbox syntax for tracking.

**Goal:** Build an editable, accessible local marketing draft with ten narrative scenes and honest contact intake.

**Architecture:** Preserve the existing vinext/Sites React stack. Server-render content and visual diagrams; isolate scroll enhancement, process tabs and form in client components. Store business copy in JSON and submission behavior in a small module.

**Tech Stack:** React 19, TypeScript, CSS, SVG, Node test runner, existing Vite/Sites build.

---

### Task 1: Protect behavior with tests
Files: tests/homepage-contract.test.mjs, tests/contact.test.mjs.
- [x] Replace superseded August copy assertions with September navigation/content contracts.
- [x] Test required fields, email format, optional phone, payload trimming, and unconfigured submission rejection. Run `npm test`; confirm missing implementation fails.
- [x] Core contract: `assert.deepEqual(content.nav.map(n => n.id), ['approach','process','work','contact'])`.
- [x] Form contract: `assert.equal(validateContact({name:' ',email:'bad',company:'',message:''}).email, 'Enter a valid email address.')`.

### Task 2: Content and intake
Files: app/content.json, app/lib/contact.mjs, app/components/Contact.tsx.
- [x] Populate approved scene copy, process stages, contact details, form labels and empty `caseStudies` / `testimonials` arrays.
- [x] Export `validateContact(values)` with required trimmed name/email/company/message, valid email, optional phone, length bounds. Export `submitContact(values)` that rejects with an honest unconfigured message, never sends personal information.
- [x] Form uses labeled inputs, autocomplete, field errors linked through aria-describedby, focus on first invalid field, pending/status state, and preserves values after failure. Phone remains usable without JS.
- [x] Run `npm test`; validation/content tests pass.

### Task 3: Scene composition
Files: app/page.tsx, app/components/Artwork.tsx, app/globals.css, app/layout.tsx, public/images/.
- [x] Compose all ten sections in approved order with one h1 and anchored h2 sections. Every conversation link is `href="#contact"`.
- [x] Build reusable SVG Thread and consistent paper nodes, then pressure/order/opportunity/visibility variants. Incorporate supplied collaboration art and a purpose-created payoff asset with descriptive alt text.
- [x] Use self-hosted Manrope, cream/charcoal/teal tokens, bounded editorial headings, warm image blending, consistent spacing and mobile single-column layouts. Keep old docs and tooling untouched.
- [x] Update metadata and remove stale hidden direction contract.

### Task 4: Progressive scroll and process
Files: app/components/Motion.tsx, app/components/Process.tsx, app/lib/process.mjs.
- [x] Add tested `stageAtProgress(p)` thresholds 0.25 and 0.75, giving Build & Test twice the duration.
- [x] Use passive scroll + requestAnimationFrame only while observed sections are onscreen. Set scoped CSS progress, never intercept native scrolling.
- [x] Render all process articles initially. Enable desktop tabpanel visibility only after hydration; mobile/reduced motion shows complete static content. Tabs support arrows, Home, End and click without scroll.
- [x] Pin process and signature transformation on desktop only; set readable final states under reduced motion.

### Task 5: Verify and hand off
Files: docs/EDITING.md, docs/VERIFICATION.md, DESIGN.md.
- [x] Run `npm test`, `npm run lint`, `npx tsc --noEmit`, `npm run build` and address actual failures.
- [x] Start local preview using existing script. Check desktop/mobile once in a bounded batch; check tab keyboard, form validation, anchor targets, reduced motion and no-JS. Fix discovered issues together and confirm once.
- [x] Inspect assets and scroll listeners for obvious performance risks; report measured sizes without claiming measured frame rate.
- [x] Write editing and launch instructions: content JSON, address, proof schemas, adapter integration and server-side validation/spam/privacy requirements before enabling delivery. Record verification evidence and any limits.
- [x] Send concise completion report to originating task. No Git commits (not a repository), deployment, external delivery, or purchases.

## Plan self-review
All ten scenes, four anchors, two pinned sections, human control, editable proof, contact honesty, no-JS/reduced motion and local-only verification are covered. Existing stack is retained. No implementation decision depends on unavailable business details. Execute inline under existing authorization.

## Execution notes
Implemented and verified locally. Browser reduced-motion and no-JS checks used source/server markup evidence where the browser harness lacked emulation; see docs/VERIFICATION.md for exact limits. Proof arrays are ready for supplied data, with a rendering handoff documented.
