import { motion } from 'framer-motion'
import { POUR_DURATION } from './cupGeometry'

// a thicker, gently wavering ribbon with a darker core streak, highlights
// and ripples layered in so it reads as textured liquid, not a flat line.
// the path overshoots the 400-tall viewBox down to 430 so the tip visually
// plunges past the cup's back rim into its interior, instead of stopping
// right at the rim edge and looking like it's pouring behind the cup
const STREAM_PATH =
  'M11,0 C9,45 6,90 6,133 C6,177 13,222 15,266 C16,310 11,355 10,400 ' +
  'C9.5,412 10,422 11,430 L16,430 C16,422 15,412 14.5,400 ' +
  'C15,355 18,310 18,266 C18,222 19,177 20,133 C20,90 22,45 23,0 Z'
const STREAM_CORE =
  'M17,0 C14,45 11,90 13,133 C13,177 19,222 20,266 C21,310 16,355 15,400 C14.5,410 14,420 13.5,426'
const STREAM_HIGHLIGHT_1 = 'M9,8 C7,50 5,94 5,135 C5,178 11,220 13,262'
const STREAM_HIGHLIGHT_2 = 'M21,10 C19,50 22,92 23,134 C23,170 17,205 16,232'

export default function PourStream({ pouring, onReachedCup }) {
  return (
    <motion.div
      className="absolute left-1/2 -translate-x-1/2 top-0 w-8 h-[calc(35.4vh+37px)] sm:h-[calc(35.4vh+42px)]"
      style={{ transformOrigin: pouring ? 'top' : 'bottom' }}
      initial={{ scaleY: 0, opacity: 0 }}
      animate={pouring ? { scaleY: 1, opacity: 1 } : { scaleY: 0, opacity: 1 }}
      transition={{
        duration: pouring ? POUR_DURATION : 0.5,
        ease: 'easeInOut',
      }}
      onAnimationComplete={() => {
        if (pouring) onReachedCup?.()
      }}
    >
      <svg viewBox="0 0 36 400" preserveAspectRatio="none" className="w-full h-full overflow-visible">
        <defs>
          <linearGradient id="streamLiquid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c1602f" />
            <stop offset="100%" stopColor="#7a2e2a" />
          </linearGradient>
        </defs>
        <path d={STREAM_PATH} fill="url(#streamLiquid)" />
        <path
          d={STREAM_CORE}
          fill="none"
          stroke="#5c2018"
          strokeOpacity="0.35"
          strokeWidth="5"
          strokeLinecap="round"
        />
        <path
          d={STREAM_HIGHLIGHT_1}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.5"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d={STREAM_HIGHLIGHT_2}
          fill="none"
          stroke="#ffffff"
          strokeOpacity="0.3"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <ellipse cx="8" cy="70" rx="5" ry="1.6" fill="#ffffff" opacity="0.25" />
        <ellipse cx="18" cy="172" rx="6" ry="1.8" fill="#ffffff" opacity="0.2" />
        <ellipse cx="12" cy="296" rx="5" ry="1.5" fill="#ffffff" opacity="0.22" />
      </svg>
    </motion.div>
  )
}
