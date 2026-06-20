// a fixed, full-viewport film-grain texture so the flat cream background
// doesn't read as a flat color; sits above both screens, never blocks clicks
export default function GrainOverlay() {
  return (
    <svg className="fixed inset-0 w-full h-full z-50 pointer-events-none" aria-hidden="true">
      <defs>
        <filter id="bgGrain" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
          <feColorMatrix
            in="noise"
            type="matrix"
            values="0 0 0 0 0.75  0 0 0 0 0.62  0 0 0 0 0.42  0 0 0 0.5 0"
          />
        </filter>
      </defs>
      <rect width="100%" height="100%" filter="url(#bgGrain)" opacity="0.6" />
    </svg>
  )
}
