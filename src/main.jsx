import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'

//import TelemetryClient from './TelemetryClient'
import TelemetryTempe from './TelemetryTempe'
import TelemetryPresion from './TelemetryPresion'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TelemetryTempe />
    <TelemetryPresion />
  </StrictMode>,
)
