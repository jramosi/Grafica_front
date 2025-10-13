import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'

//import TelemetryClient from './TelemetryClient'
import TelemetryGraphs from './TelemetryGraf'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TelemetryGraphs />
  </StrictMode>,
)
