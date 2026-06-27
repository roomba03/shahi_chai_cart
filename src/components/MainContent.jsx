import { motion } from 'framer-motion'
import BackgroundGlow from './BackgroundGlow'

export default function MainContent() {
  return (
    <motion.main
      className="min-h-screen w-full flex flex-col items-center justify-center bg-[#faf1e4] px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      <BackgroundGlow />
      <motion.h1
        className="font-display sheen-text text-5xl sm:text-6xl md:text-7xl text-center drop-shadow-[0_4px_6px_rgba(58,46,20,0.3)]"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        Shahi Chai Cart
      </motion.h1>

      <motion.a
        href="mailto:hello@shahichaicart.com"
        className="mt-6 font-serif text-lg sm:text-xl text-[#a8425c] hover:text-[#caa052] transition-colors"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.5 }}
      >
        Contact
      </motion.a>
    </motion.main>
  )
}
