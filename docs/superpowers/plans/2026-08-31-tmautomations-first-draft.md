# TMAutomations First Draft Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and locally preview the approved light hero, compressed pain-story bridge, and dark four-phase How We Work chapter without publishing.

**Architecture:** Use the Sites-generated single-route React application. Keep content data and rendering in the homepage component, use a small client-side observer for progress state, and put the complete visual system and responsive behavior in the global stylesheet. Validate critical copy and structure with Node's built-in test runner before the first implementation patch.

**Tech Stack:** Sites scaffold, React, TypeScript, CSS, Node test runner

---

### Task 1: Initialize the local Sites project

**Files:**
- Create: Sites scaffold in the project root
- Inspect: `package.json`
- Inspect: `app/page.tsx`
- Inspect: `app/layout.tsx`
- Inspect: `app/globals.css`
- Inspect: `.openai/hosting.json`

- [ ] Run the pinned Sites initializer in the empty workspace with no add-ons.
- [ ] Install the generated dependencies using the scaffold-selected package manager.
- [ ] Confirm the scaffold provides a local development and production build command.
- [ ] Do not call any Sites publishing, versioning, or deployment tool.

### Task 2: Establish the content contract with failing tests

**Files:**
- Create: `tests/homepage-contract.test.mjs`
- Modify: `package.json`

- [ ] Add Node tests that read the homepage source and require the exact approved H1, one primary “Book a Call” CTA, the four process phase names, five scene placeholders, a reduced-motion stylesheet rule, and the absence of prohibited terms and fabricated numeric claims.
- [ ] Run the test command and confirm it fails because the generated starter does not contain the TMAutomations content.

### Task 3: Build the first meaningful hero

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

- [ ] Replace starter metadata with a truthful TMAutomations title and description.
- [ ] Add the approved hero, supporting sentence, Book a Call CTA, semantic navigation, and physical work-card composition.
- [ ] Establish warm cream, ink, sage, olive, blue, midnight, amber, and linen tokens.
- [ ] Add the durable visual-direction contract as the first rendered body comment.
- [ ] Run tests and confirm the hero-related assertions pass while process assertions still fail.
- [ ] Start the local server only after the hero compiles and responds without a runtime error.

### Task 4: Add the story bridge and dark process chapter

**Files:**
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

- [ ] Add the compressed pain story as short, semantic scroll beats.
- [ ] Add a four-segment progress rail with readable phase labels.
- [ ] Add four process articles, five future-video placeholders, and HTML-only overlays.
- [ ] Use a sticky visual stage on desktop and stacked poster cards on mobile.
- [ ] Add a small IntersectionObserver that updates active phase without hiding content.
- [ ] Add reduced-motion behavior that removes transforms and scroll-linked transitions.
- [ ] Run all homepage contract tests and confirm they pass.

### Task 5: Validate and hand off the local draft

**Files:**
- Validate: `app/page.tsx`
- Validate: `app/layout.tsx`
- Validate: `app/globals.css`

- [ ] Run the production build and resolve any actual compilation failures.
- [ ] Run the Impeccable mechanical detector once on the changed UI targets.
- [ ] Open the exact local URL in Codex for the user.
- [ ] Report what is included, explicitly state that nothing was published, and ask for one consolidated round of visual feedback.
