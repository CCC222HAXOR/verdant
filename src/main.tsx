import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'
import './styles/checker.css'
import './styles/howitworks.css'
import './styles/faq.css'
import './styles/ticker.css'
import './styles/footer.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
