import TelemetryTempe from './TelemetryTempe'
import TelemetryPresion from './TelemetryPresion'
import TelemetryHume from './TelemetryHume'
import './App.css'
const selector = process.env.REACT_APP_SELECTOR_THB;


const App = () => {
  console.log("vvariavle:"+ selector);
  
  return (
    
    <>
      <div className='app-container'>
        <h2>Graficos de {SelectHBB} en Tiempo Real</h2>
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
