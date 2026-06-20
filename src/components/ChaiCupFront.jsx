import { motion } from 'framer-motion'
import { RIM, LIQUID_RX, LIQUID_RY, CUP_BOX_CLASS, CUP_TOP_CLASS, RIM_OUTER_FRONT } from './cupGeometry'

// once the stream has reached the cup, the fill is quick (not a separate
// long animation), so the chai lands at the rim right after the pour
// arrives rather than noticeably later
const FILL_DURATION = 0.45

// the liquid ellipse's bounding box, as a percentage of the cup box, so the
// clip wrapper below can be sized to exactly that box instead of the whole
// cup — a CSS clip-path inset reveals evenly across its own box, so scoping
// it this tightly avoids "dead time" before anything becomes visible
const VB_W = 160
const VB_H = 120
const BOX_LEFT_PCT = ((RIM.cx - LIQUID_RX) / VB_W) * 100
const BOX_TOP_PCT = ((RIM.cy - LIQUID_RY) / VB_H) * 100
const BOX_W_PCT = ((LIQUID_RX * 2) / VB_W) * 100
const BOX_H_PCT = ((LIQUID_RY * 2) / VB_H) * 100

// everything that should sit in front of the stream: the liquid (which
// rises to cover the stream's lower portion as the cup fills) and the
// burgundy rim that frames the opening
export default function ChaiCupFront({ start, onFillComplete }) {
  return (
    <div className={`absolute left-1/2 -translate-x-1/2 ${CUP_TOP_CLASS} ${CUP_BOX_CLASS}`}>
      <motion.div
        className="absolute overflow-hidden"
        style={{
          left: `${BOX_LEFT_PCT}%`,
          top: `${BOX_TOP_PCT}%`,
          width: `${BOX_W_PCT}%`,
          height: `${BOX_H_PCT}%`,
        }}
        initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        animate={
          start
            ? { clipPath: 'inset(0% 0% 0% 0%)' }
            : { clipPath: 'inset(100% 0% 0% 0%)' }
        }
        transition={{ duration: FILL_DURATION, ease: 'easeInOut' }}
        onAnimationComplete={() => {
          if (start) onFillComplete?.()
        }}
      >
        <svg
          viewBox="0 0 160 120"
          className="absolute overflow-visible"
          style={{
            left: `${-(BOX_LEFT_PCT / BOX_W_PCT) * 100}%`,
            top: `${-(BOX_TOP_PCT / BOX_H_PCT) * 100}%`,
            width: `${(100 / BOX_W_PCT) * 100}%`,
            height: `${(100 / BOX_H_PCT) * 100}%`,
          }}
        >
          <defs>
            <linearGradient id="chaiLiquid" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c1602f" />
              <stop offset="100%" stopColor="#7a2e2a" />
            </linearGradient>
          </defs>
          <ellipse cx={RIM.cx} cy={RIM.cy} rx={LIQUID_RX} ry={LIQUID_RY} fill="url(#chaiLiquid)" />
        </svg>
      </motion.div>

      {/* near half of the burgundy rim: stays in front of the stream, framing the opening */}
      <svg viewBox="0 0 160 120" className="absolute inset-0 w-full h-full overflow-visible">
        <path d={RIM_OUTER_FRONT} fill="none" stroke="#6d1b34" strokeWidth="5" />
      </svg>
    </div>
  )
}
