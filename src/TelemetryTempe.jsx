import  { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS, 
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend 
} from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
    CategoryScale, 
    LinearScale, 
    PointElement, 
    LineElement, 
    Title, 
    Tooltip, 
    Legend
);

const MAX_POINTS = 360; // Máximo de puntos a mostrar (igual que en tu config de Python)
const BACKEND_URL = 'https://grafica-back.onrender.com'; // Asegúrate de que coincida con tu Node.js

const TelemetryTempe = () => {
    const [status, setStatus] = useState('Conectando...');
    // Estado para almacenar los datos del primer dispositivo (THB-01)
    const [chartData, setChartData] = useState({
        labels: [], // Eje X: Horas
        temperature: [], // Eje Y: Temperatura (°C)
    });

    useEffect(() => {
        const socket = io(BACKEND_URL);

        socket.on('connect', () => {
            setStatus('Conectado al Backend ');
        });
        
        // --- HANDLER CLAVE: RECIBIR Y PROCESAR DATOS ---
        socket.on('telemetry', (data) => {
            // Solo graficaremos el primer dispositivo como ejemplo (THB-01)
            if (data.device === 'THB-02') {
                
                const timeLabel = new Date(data.ts * 1000 || Date.now()).toLocaleTimeString();
                
                setChartData(prevData => {
                    // Copiar y truncar a MAX_POINTS
                    const newLabels = [...prevData.labels, timeLabel].slice(-MAX_POINTS);
                    const newTemps = [...prevData.temperature, data.temp_c].slice(-MAX_POINTS);

                    return {
                        labels: newLabels,
                        temperature: newTemps,
                    };
                });

            }
        });

        socket.on('disconnect', () => setStatus('Desconectado '));
        socket.on('connect_error', () => setStatus('Error de Conexión '));

        return () => {
            socket.disconnect();
        };
    }, []);

    // --- CONFIGURACIÓN DEL GRÁFICO ---
    const data = {
        labels: chartData.labels,
        datasets: [
            {
                label: 'Temperatura THB-02 (°C)',
                data: chartData.temperature,
                borderColor: 'rgb(255, 99, 132)', // Rojo
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                tension: 0.1, // Suaviza la línea
                pointRadius: 0, // Ocultar puntos para looks de tiempo real
            },
            // Aquí se añadirían Presión y Humedad si quisieras varias líneas
        ],
    };
    console.log(data);
    
    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite que el gráfico use el espacio del contenedor
        scales: {
            y: {
                title: {
                    display: true,
                    text: 'Temperatura (°C)'
                },
                min: 0, // Coincide con tu TEMP_RANGE
                max: 50, // Coincide con tu TEMP_RANGE
            },
            x: {
                title: {
                    display: true,
                    text: 'Hora'
                },
                ticks: {
                    // Mostrar solo una fracción de las etiquetas si hay muchos puntos
                    maxTicksLimit: 15,
                }
            }
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Temperatura en Tiempo Real (THB-02)',
            },
        },
    };

    return (
        <div>
            <h1>Grafico en Tiempo Real - Temperatura</h1>
            <p>Estado del Backend: "{status}"</p>
            
            <div style={{ height: '400px', width: '90%' }}>
                {/* Renderizar el componente Line */}
                <Line options={options} data={data} />
            </div>
            
            
            <p>Se reciben datos para {chartData.temperature.length} puntos. (Máx. {MAX_POINTS})</p>
        </div>
    );
};

export default TelemetryTempe;
