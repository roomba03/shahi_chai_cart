import { motion } from 'framer-motion'
import { RIM, CUP_BOX_CLASS, CUP_TOP_CLASS } from './cupGeometry'

// a single 4-point "twinkle" sparkle: two crossed curved spikes, the classic
// glint shape (concave sides bowing into the center) rather than a plain
// star or plus. Position is baked directly into the path's own coordinates
// (not a motion x/y translate) — translate uses CSS pixels, which don't
// match this SVG's scaled viewBox units (see Steam.jsx's attrX/attrY note),
// so only scale/rotate (unitless, unaffected by that mismatch) are animated
function sparklePath(cx, cy, s) {
  const tip = s
  const waist = s * 0.16
  return `M${cx},${cy - tip} C${cx + waist},${cy - waist} ${cx + waist},${cy - waist} ${cx + tip},${cy} C${cx + waist},${cy + waist} ${cx + waist},${cy + waist} ${cx},${cy + tip} C${cx - waist},${cy + waist} ${cx - waist},${cy + waist} ${cx - tip},${cy} C${cx - waist},${cy - waist} ${cx - waist},${cy - waist} ${cx},${cy - tip} Z`
}

// one on the front (near/bottom) rim arc, one on the back (far/top) arc —
// computed from the same rim ellipse so both sit exactly on the rim line.
// the back one reads a little smaller at that distance otherwise, so it
// gets a slightly larger size to land with similar visual weight
const SPARKLES = [
  { x: RIM.cx - 20, y: 59.8, size: 5.5, delay: 0 },
  { x: RIM.cx + 17, y: 39.9, size: 7, delay: 0.22 },
]

// a brief, one-shot twinkle on the rim right as the pour finishes — not a
// looping effect like the steam, just a quick celebratory glint
export default function Sparkle({ show }) {
  if (!show) return null

  return (
    <div className={`absolute left-1/2 -translate-x-1/2 ${CUP_TOP_CLASS} ${CUP_BOX_CLASS}`}>
      <svg viewBox="0 0 160 120" className="absolute inset-0 w-full h-full overflow-visible">
        {SPARKLES.map((sp, i) => (
          <motion.path
            key={i}
            d={sparklePath(sp.x, sp.y, sp.size)}
            fill="#fff8ec"
            style={{ transformOrigin: `${sp.x}px ${sp.y}px` }}
            initial={{ opacity: 0, scale: 0, rotate: -20 }}
            animate={{
              opacity: [0, 1, 0.8, 0],
              scale: [0, 1.15, 0.9, 0],
              rotate: [-20, 0, 8, 12],
            }}
            transition={{ duration: 0.85, delay: sp.delay, ease: 'easeOut' }}
          />
        ))}
      </svg>
    </div>
  )
}
