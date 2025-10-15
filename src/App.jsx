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
        <option value="La Paz">La Paz</option>
        <option value="Cobija">Cobija</option>
        <option value="Riberalta">Riberalta</option>
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
