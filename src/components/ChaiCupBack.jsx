import { RIM, LIQUID_RX, LIQUID_RY, CUP_BOX_CLASS, CUP_TOP_CLASS, RIM_OUTER_BACK } from './cupGeometry'

const CUP_BODY = 'M36 50 C33 76 42 92 67 94 L93 94 C118 92 127 76 124 50 Z'
const FOOT = { cx: 80, cy: 97, rx: 13, ry: 4 }
const HANDLE = 'M124 60 C155 64 153 86 111 88'

// a small ring of gold petals just outside the foot, like a flower collar
// the cup rests in. Sized deliberately bigger than the earlier floral motif
// (which got removed for reading as just a dot at this scale) and spread
// around a radius rather than overlapping at one point.
const PETAL_COUNT = 10
const PETAL_RING = { rx: 18, ry: 6 }
const PETALS = Array.from({ length: PETAL_COUNT }, (_, i) => {
  const angle = (i / PETAL_COUNT) * 360
  const rad = (angle * Math.PI) / 180
  return {
    cx: FOOT.cx + PETAL_RING.rx * Math.cos(rad),
    cy: FOOT.cy + PETAL_RING.ry * Math.sin(rad),
    angle,
  }
})
// short bright segments riding on top of the handle stroke and the rim's
// far arc, catching the light from the same top-right direction as the
// body's highlight streak
const HANDLE_HIGHLIGHT = 'M133 61 Q150 63 151 73'
const RIM_HIGHLIGHT = 'M102 40.5 A 44 11 0 0 1 118 44.5'

// everything that should sit behind the falling stream: the glow, the
// saucer, the cup's walls, and the empty interior backdrop
export default function ChaiCupBack() {
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 ${CUP_TOP_CLASS} ${CUP_BOX_CLASS}`}>
      {/* soft warm glow */}
      <div className="absolute -inset-10 sm:-inset-12 rounded-full bg-amber-200/45 blur-2xl pointer-events-none" />

      {/* saucer */}
      <svg viewBox="0 0 160 120" className="absolute inset-0 w-full h-full overflow-visible">
        <ellipse cx="80" cy="106" rx="50" ry="9" fill="#d9b388" />
        <ellipse cx="80" cy="106" rx="35" ry="5" fill="none" stroke="#caa052" strokeWidth="1.5" />
      </svg>

      {/* gold petal collar around the foot, sitting on the saucer */}
      <svg viewBox="0 0 160 120" className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id="petalGold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f1d27a" />
            <stop offset="100%" stopColor="#ad7c1f" />
          </linearGradient>
        </defs>
        {PETALS.map((p, i) => (
          <ellipse
            key={i}
            cx={p.cx}
            cy={p.cy}
            rx="4.2"
            ry="2.1"
            fill="url(#petalGold)"
            stroke="#8a6d1d"
            strokeWidth="0.4"
            transform={`rotate(${p.angle} ${p.cx} ${p.cy})`}
          />
        ))}
      </svg>

      {/* cup body, foot and handle */}
      <svg viewBox="0 0 160 120" className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <linearGradient id="cupWhite" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="55%" stopColor="#f6efe1" />
            <stop offset="100%" stopColor="#e3d3b3" />
          </linearGradient>
          <linearGradient id="handleGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#f1d27a" />
            <stop offset="100%" stopColor="#ad7c1f" />
          </linearGradient>

          {/* near-white focal highlight and a soft cool-porcelain shadow
              (no black/brown, so it reads as shading, not grime) */}
          <radialGradient id="cupHighlight" cx="38%" cy="22%" r="60%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="cupShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#a9bcd9" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#a9bcd9" stopOpacity="0" />
          </radialGradient>
          {/* fades in/out along its own length so it reads as a soft
              specular shine rather than a flat painted bar */}
          <linearGradient id="streakGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
            <stop offset="50%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </linearGradient>

          <filter id="cupBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <filter id="streakBlur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="0.6" />
          </filter>
          {/* fine grain so the porcelain doesn't read as flat color, tinted
              warm instead of black so it reads as paper texture, not dirt */}
          <filter id="cupGrain" x="0%" y="0%" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" result="noise" />
            <feColorMatrix
              in="noise"
              type="matrix"
              values="0 0 0 0 0.93  0 0 0 0 0.87  0 0 0 0 0.74  0 0 0 0.22 0"
            />
          </filter>

          <clipPath id="cupBodyClip">
            <path d={CUP_BODY} />
          </clipPath>
        </defs>

        <path d={HANDLE} fill="none" stroke="url(#handleGold)" strokeWidth="4" strokeLinecap="round" />
        <path
          d={HANDLE_HIGHLIGHT}
          fill="none"
          stroke="#fffaec"
          strokeWidth="2.2"
          strokeLinecap="round"
          opacity="0.85"
        />
        <ellipse cx={FOOT.cx} cy={FOOT.cy} rx={FOOT.rx} ry={FOOT.ry} fill="url(#cupWhite)" />
        <path d={CUP_BODY} fill="url(#cupWhite)" />

        {/* warmth and texture, clipped to the body so nothing bleeds past its silhouette */}
        <g clipPath="url(#cupBodyClip)">
          {/* soft brushstroke-style mottling in the same warm/cool-neutral family */}
          <ellipse cx="56" cy="80" rx="22" ry="16" fill="#e9c89e" opacity="0.3" filter="url(#cupBlur)" />
          <ellipse cx="102" cy="64" rx="18" ry="14" fill="#cfd7e2" opacity="0.22" filter="url(#cupBlur)" />

          {/* near-white focal highlight, upper-left */}
          <ellipse cx="58" cy="62" rx="28" ry="22" fill="url(#cupHighlight)" style={{ mixBlendMode: 'overlay' }} />

          {/* glossy highlight streak, horizontal, toward the top right of
              the cup; the gradient fill fades in/out along its length for
              a realistic shine rather than a flat painted bar */}
          <rect
            x="86"
            y="58"
            width="36"
            height="10"
            rx="5"
            fill="url(#streakGlow)"
            transform="rotate(8 104 63)"
            filter="url(#streakBlur)"
          />

          {/* just a touch of shadow grounding the base — most of the gray
              shading lives inside the bowl, not on the lit exterior */}
          <ellipse cx="80" cy="91" rx="30" ry="7" fill="url(#cupShadow)" style={{ mixBlendMode: 'multiply' }} opacity="0.4" />

          <rect x="0" y="0" width="160" height="120" filter="url(#cupGrain)" opacity="0.5" />
        </g>
      </svg>

      {/* empty interior backdrop, visible behind the falling stream until
          poured. shaded gray toward the back/rim, like looking down into a
          recessed bowl, rather than the flat cream it was */}
      <svg viewBox="0 0 160 120" className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <clipPath id="interiorClip">
            <ellipse cx={RIM.cx} cy={RIM.cy} rx={LIQUID_RX} ry={LIQUID_RY} />
          </clipPath>
          <radialGradient id="interiorShade" cx="50%" cy="32%" r="80%">
            <stop offset="0%" stopColor="#8d97a6" stopOpacity="0" />
            <stop offset="100%" stopColor="#8d97a6" stopOpacity="0.6" />
          </radialGradient>
        </defs>
        <ellipse cx={RIM.cx} cy={RIM.cy} rx={LIQUID_RX} ry={LIQUID_RY} fill="#fdf8ef" />
        <g clipPath="url(#interiorClip)">
          <ellipse
            cx={RIM.cx}
            cy={RIM.cy}
            rx={LIQUID_RX}
            ry={LIQUID_RY}
            fill="url(#interiorShade)"
            style={{ mixBlendMode: 'multiply' }}
          />
        </g>
      </svg>

      {/* far half of the burgundy rim: sits behind the stream so the pour visibly covers it */}
      <svg viewBox="0 0 160 120" className="absolute inset-0 w-full h-full overflow-visible">
        <path d={RIM_OUTER_BACK} fill="none" stroke="#6d1b34" strokeWidth="5" />
        <path
          d={RIM_HIGHLIGHT}
          fill="none"
          stroke="#eec3cf"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.85"
        />
      </svg>
    </div>
  )
}
