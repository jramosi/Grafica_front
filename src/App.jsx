import { useState } from 'react';
import TelemetryTempe from './TelemetryTempe'
import TelemetryPresion from './TelemetryPresion'
import TelemetryHume from './TelemetryHume'

const App = () => {
  const [opcion, setOpcion] = useState('');

  const handleChange = (event) => {
    setOpcion(event.target.value);
  }; 

  return (
    <div>
      <h2>Selecciona una opción:</h2>
      <select value={opcion} onChange={handleChange}>
        <option value="">-- Elige --</option>
        <option value="THB-02">THB-02</option>
        <option value="THB-03">THB-03</option>
        <option value="THB-04">THB-04</option>
      </select>
      {opcion && <p>Seleccionaste: <strong>{opcion}</strong></p>}
      <div>
        <div>
          <TelemetryTempe th={opcion}/>
        </div>
        <div>
          <TelemetryPresion th={opcion}/>
        </div>
        <div>
          <TelemetryHume th={opcion} />
        </div>
      </div>
    </div>
  );
};

export default App;
