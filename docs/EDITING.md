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

## Before enabling form delivery
`app/lib/contact.mjs` is the isolated submission adapter. It currently rejects every valid request with an explicit “not connected” message and sends nothing. Visitors can call the phone link. Without JavaScript, the form is disabled and phone contact remains available.

1. Choose and authorize a real submission provider or server endpoint.
2. Implement server-side validation, length limits, spam/rate controls and provider error handling. Store credentials server-side, never in JSON or browser code.
3. Replace `submitContact` with a POST to that endpoint. Normalize/trim the payload, validate again on the server, and only return success after the provider acknowledges receipt.
4. Add a genuine success state in `Contact.tsx`, plus an integration test for success/failure. Preserve entered values on failure. Test actual delivery to the approved destination.
5. Update `contact.formNotice`, publish the appropriate privacy information, and verify the address and domain before launch.

The `contact-intake` component with `data-intake="form"` is the future chatbot intake seam. No chatbot integration is present or necessary for this draft.

## Checks
Run `npm test`, `npm run lint`, `npx tsc --noEmit`, and `npm run build`. Confirm desktop/mobile layout and reduced motion after structural changes.
