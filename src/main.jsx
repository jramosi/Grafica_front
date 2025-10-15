import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'

//import TelemetryClient from './TelemetryClient'
import TelemetryTempe from './TelemetryTempe'
import TelemetryPresion from './TelemetryPresion'
import TelemetryHume from './TelemetryHume'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
    
  </StrictMode>,
)
