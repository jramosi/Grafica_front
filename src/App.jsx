import { useState } from 'react';
import TelemetryTempe from './TelemetryTempe'
import TelemetryPresion from './TelemetryPresion'
import TelemetryHume from './TelemetryHume'

const App = () => {
  return (
    
    <>
      <div className='app-container'>
        <div className='card'>
          <TelemetryTempe />
        </div>
        <div className='card'>
          <TelemetryPresion />
        </div>
        <div className='card'>
          <TelemetryHume />
        </div>
      </div>
    </> 
  );
};

export default App;
