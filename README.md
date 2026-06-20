# Shahi Chai Cart

Single static page, no backend, no routing, no forms.

Stack: React + Tailwind CSS v4 + Framer Motion, bundled with Vite.

## Develop

```sh
npm install
npm run dev
```

Note: `src/main.jsx` intentionally does not use `React.StrictMode`. Its dev-only double-invoke of effects fought with Framer Motion's animation-completion tracking on the loading sequence, making the pour/fill misfire only under `npm run dev` (the production build was never affected).

## Build

```sh
npm run build
```

## Sequence

`src/App.jsx` swaps between two screens via `AnimatePresence`:

- **Loading** (`src/components/LoadingScreen.jsx`) — a thick, textured ribbon of chai (`PourStream.jsx`: highlight streaks, a darker core, ripple accents, an overshoot past the rim) pours down from the very top of the screen into a small, dainty white porcelain teacup — a wide shallow bowl tapering to a small foot, with a single thick burgundy rim, a gold handle, and a soft warm glow behind it. The body and foot have no hard outline (they rely on gradient, shading and the cast shadow beneath to read as 3D); the burgundy ring is scoped to just the rim. The cup is split into `ChaiCupBack.jsx` (glow, saucer, walls, empty interior, and the *far* half of the rim — all painted behind the stream, so the pour visibly covers the back rim and falls into the empty cup) and `ChaiCupFront.jsx` (the liquid fill and the *near* half of the rim — painted in front of the stream, so the cup still reads as containing it). The rim itself is split into matching back/front arcs (`cupGeometry.js`) so the two halves line up into one seamless ring once the pour settles. The liquid fill is gated on the stream's pour actually completing, then fills quickly (`FILL_DURATION` in `ChaiCupFront.jsx`) so the chai lands at the rim right after — not noticeably later than — the stream finishes. Its reveal uses a CSS `clip-path` on a wrapper sized to exactly the liquid ellipse's own bounding box (not the whole cup), so the rise is smooth with no "dead time" before anything's visible. Once full, the stream cuts off at the source and drains down into the cup (not sucked back up). Steam (`Steam.jsx`) then starts rising from the rim — three short streaks, each translating (not rotating in place) along its own gentle wave keyframed across 9 steps, phase-offset by a third of a cycle so they weave past each other once on the way up instead of spiraling in tight loops or just wobbling. Each streak is a flat near-white fill (no fade-along-its-length gradient — that was compounding with the opacity animation and making them nearly invisible) plus a brighter, faster-pulsing "shimmer" twin on the same path; the mismatch between the two timings is what reads as shimmer rather than a flat fade. The position is animated via Framer Motion's `attrX`/`attrY`, not the `x`/`y` shorthand — the shorthand drives a CSS `transform: translate()` in raw pixels, which doesn't match the SVG `x`/`y` attributes' viewBox-unit coordinate space and was dragging the whole effect ~65px off toward the handle. It gets a couple of seconds on screen before the crossfade to the main page.
- **Main** (`src/components/MainContent.jsx`) — "Shahi Chai Cart" fades in, followed by a "Contact" link set in a soft upright serif, normal case, with no letter-spacing — a quieter caption rather than a second display element. The headline carries a `.sheen-text` class (`index.css`) — a `background-clip: text` gradient (burgundy → gold → burgundy) animated across the text, paused at each end so it reads as an occasional glint rather than a constant shimmer.

A fixed, full-viewport `feTurbulence` grain overlay (`src/components/GrainOverlay.jsx`) sits above both screens (rendered once in `App.jsx`, outside the `AnimatePresence` swap) so the cream background never reads as a flat fill. It's `pointer-events-none` so it never blocks clicks on the Contact link.

`src/components/BackgroundGlow.jsx` adds four warm, heavily-blurred color blobs (orange, rose, red — deliberately no amber/yellow, to keep the warmth leaning red/orange rather than yellow) for atmospheric depth, sized and saturated enough to read as a deliberate warm wash across the page rather than a faint vignette. Unlike the grain, it's rendered as the *first* child inside each screen (`LoadingScreen.jsx`, `MainContent.jsx`) rather than globally on top, so it sits behind the cup/text instead of washing over them.

Palette: warm cream background, white porcelain cup with burgundy and gold accents; the chai itself stays terracotta/maroon (its natural color). Headline font: Berkshire Swash (royal script).

The cup body (`ChaiCupBack.jsx`) isn't a flat fill — it pushes value range and texture without ever going to black (which read as grime rather than shading): a near-white radial highlight blended with `mix-blend-mode: overlay` near the upper-left, a horizontal glossy highlight streak toward the top right (a slightly rotated rect filled with a gradient that fades in and out along its own length, like a specular shine) crossing into the gradient's darker mid-tone for actual contrast, a couple of soft blurred color blobs for brushstroke-style mottling, and a `feTurbulence` grain filter tinted warm parchment (not black) over the whole body. Gray shading is deliberately concentrated *inside* the bowl (a `multiply`-blended radial gradient on the empty interior ellipse, darker toward the rim/back) rather than on the lit exterior walls, which only get a faint grounding shadow near the base — all clipped to the cup's own silhouette. The rim and handle also each get a short bright highlight segment from the same top-right light direction — both had to be brightened past their first pass once measured, since a highlight color too close to the base gradient's own value at that point is invisible regardless of how it looks in isolation.
