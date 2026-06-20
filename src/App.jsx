import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LoadingScreen from './components/LoadingScreen'
import MainContent from './components/MainContent'
import GrainOverlay from './components/GrainOverlay'

function App() {
  const [loaded, setLoaded] = useState(false)

  return (
    <>
      <AnimatePresence mode="wait">
        {!loaded ? (
          <LoadingScreen key="loading" onDone={() => setLoaded(true)} />
        ) : (
          <MainContent key="main" />
        )}
      </AnimatePresence>
      <GrainOverlay />
    </>
  )
}

export default App
