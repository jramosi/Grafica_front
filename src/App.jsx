import { useState } from 'react';
import TelemetryTempe from './TelemetryTempe'
import TelemetryPresion from './TelemetryPresion'
import TelemetryHume from './TelemetryHume'

const App = () => {
  return (
    
    <>
      <div className='app-container'>
        <div className='card'>
          <TelemetryTempe th={opcion}/>
        </div>
        <div className='card'>
          <TelemetryPresion th={opcion}/>
        </div>
        <div className='card'>
          <TelemetryHume th={opcion} />
        </div>
      </div>
    </> 
  );
};

export default App;
