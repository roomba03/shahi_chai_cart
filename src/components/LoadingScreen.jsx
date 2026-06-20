import { useState } from 'react'
import { motion } from 'framer-motion'
import BackgroundGlow from './BackgroundGlow'
import ChaiCupBack from './ChaiCupBack'
import ChaiCupFront from './ChaiCupFront'
import PourStream from './PourStream'
import Sparkle from './Sparkle'
import Steam from './Steam'

// DOM order here is also paint order: the cup's back layers (saucer, walls,
// empty interior) sit behind the stream, so the pour is visible falling
// into the cup, while the liquid + rim trim sit in front of it.
//
// the fill is gated on the stream's pour animation actually completing
// (reachedCup), then runs quickly (see FILL_DURATION in ChaiCupFront.jsx)
// so the chai lands at the rim right as — not long after — the stream
// finishes pouring, and never while the stream is still visibly mid-air.
// once full, the rim gets a brief one-shot sparkle and steam starts rising
// while the stream retracts, getting a couple of seconds on screen before
// the crossfade to the main page
export default function LoadingScreen({ onDone }) {
  const [pouring, setPouring] = useState(true)
  const [reachedCup, setReachedCup] = useState(false)
  const [steaming, setSteaming] = useState(false)

  return (
    <motion.div
      className="fixed inset-0 bg-[#faf1e4]"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      <BackgroundGlow />
      <ChaiCupBack />
      <PourStream pouring={pouring} onReachedCup={() => setReachedCup(true)} />
      <ChaiCupFront
        start={reachedCup}
        onFillComplete={() => {
          setSteaming(true)
          setTimeout(() => {
            setPouring(false)
            setTimeout(onDone, 1700)
          }, 500)
        }}
      />
      <Sparkle show={steaming} />
      <Steam show={steaming} />
    </motion.div>
  )
}
