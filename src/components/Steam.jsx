import { motion } from 'framer-motion'
import { RIM, CUP_BOX_CLASS, CUP_TOP_CLASS } from './cupGeometry'

// each wisp is a small elongated streak that travels up a gentle wave path
// (translation only, no self-rotation, so it never just pivots in place).
// the three are phase-offset by a third of a cycle, so as they rise they
// weave past each other once rather than spiraling in tight loops
const RISE_Y = [10, 4.25, -1.5, -7.25, -13, -18.75, -24.5, -30.25, -36]
const OPACITY = [0, 0.65, 0.85, 0.8, 0.75, 0.65, 0.5, 0.25, 0]
const SHIMMER_OPACITY = [0, 0.7, 1, 0.6, 0.95, 0.55, 0.8, 0.35, 0]

const WISPS = [
  { base: RIM.cx - 6, sway: [0, 5, 7, 5, 0, -5, -7, -5, 0], delay: 0 },
  { base: RIM.cx, sway: [6, 2, -3.5, -7, -6, -2, 3.5, 7, 6], delay: 0.9 },
  { base: RIM.cx + 6, sway: [-6, -7, -3.5, 2, 6, 7, 3.5, -2, -6], delay: 1.8 },
]

export default function Steam({ show }) {
  if (!show) return null

  return (
    <div className={`absolute left-1/2 -translate-x-1/2 ${CUP_TOP_CLASS} ${CUP_BOX_CLASS}`}>
      <svg viewBox="0 0 160 120" className="absolute inset-0 w-full h-full overflow-visible">
        <defs>
          <filter id="steamBlur" x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="1.1" />
          </filter>
        </defs>

        {WISPS.map((w, i) => (
          <motion.rect
            key={`body-${i}`}
            x={w.base - 2}
            y="29"
            width="4"
            height="14"
            rx="2"
            fill="#fff8ec"
            filter="url(#steamBlur)"
            initial={{ attrX: w.base - 2, attrY: 29, opacity: 0 }}
            animate={{
              attrX: w.sway.map((s) => w.base - 2 + s),
              attrY: RISE_Y,
              opacity: OPACITY,
            }}
            transition={{ duration: 4.4, repeat: Infinity, delay: w.delay, ease: 'easeInOut' }}
          />
        ))}

        {WISPS.map((w, i) => (
          <motion.rect
            key={`shimmer-${i}`}
            x={w.base - 0.9}
            y="29"
            width="1.8"
            height="14"
            rx="0.9"
            fill="#ffffff"
            initial={{ attrX: w.base - 0.9, attrY: 29, opacity: 0 }}
            animate={{
              attrX: w.sway.map((s) => w.base - 0.9 + s),
              attrY: RISE_Y,
              opacity: SHIMMER_OPACITY,
            }}
            transition={{ duration: 2, repeat: Infinity, delay: w.delay + 0.3, ease: 'easeInOut' }}
          />
        ))}
      </svg>
    </div>
  )
}
