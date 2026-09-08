# Draft verification — 2026-09-04

- `npm test`: 5/5 pass. Tests first failed for missing content/adapter/process mapping and later for the no-JS submission guard.
- `npm run lint`: clean.
- `npx tsc --noEmit`: clean.
- `npm run build`: successful vinext production build. Existing vinext static route classifier prints its informational unknown-route note.
- Local preview: http://localhost:3000, retained development server.
- Browser: 1440×1000 desktop and 390×844 mobile inspected in bounded passes. No horizontal document overflow at either size. Mobile renders all three process panels. Desktop click selection and ArrowRight keyboard selection reveal the intended process panel. Invalid form focuses name and exposes four errors. Valid test data returns explicit unconfigured/not-sent status; no external requests in adapter. Browser error log empty.
- No-JS: server response includes all three process articles, disabled form fieldset and phone link. Verified response markup; not a separate JS-disabled browser session.
- Reduced motion: source inspection confirms static complete SVG strokes, no transforms/transitions, unpinned signature, and the process media query showing all panels. OS/browser reduced-motion emulation was not available in the used browser surface, so this is source verification, not an observed OS-toggle test.
- Assets: 419 KB collaboration JPEG, 336 KB payoff JPEG, both 1672×941. Four Latin-only self-hosted font weights. No video, frame sequence, canvas animation or animation dependency. Scroll work uses passive listeners, requestAnimationFrame, visible-scene intersection filtering and scoped path/transform changes. No measured frame-rate claim; real-device profiling remains a prelaunch task.
- Impeccable detector: no findings. Bounded review identified hero text opacity and Unicode icons; corrected with readable hero labels and consistent SVG icons. Screenshot evidence in `.impeccable/review` covers selected desktop and mobile regions, not every scroll frame.

## Intentional draft limits
Form provider is not connected. Address and real client proof await supplied information. Empty proof arrays are stored for future content; adding populated proof also needs the rendering described in EDITING.md. Motion is a lightweight first pass, not a frame-by-frame cinematic production. No deployment or external form/chatbot connection occurred.
