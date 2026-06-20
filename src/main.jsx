import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// StrictMode's dev-only double-invoke of effects fights with Framer
// Motion's animation-completion tracking on this page, making the pour
// sequence misfire only in `npm run dev` (production is unaffected) — so
// it's left out to keep local preview matching the real behavior
createRoot(document.getElementById('root')).render(<App />)
