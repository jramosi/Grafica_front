
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const BACKEND_URL = 'http://localhost:4000'; // Debe coincidir con el PORT_HTTP de Node.js

const TelemetryClient = () => {
    const [status, setStatus] = useState('Conectando...');
    
    useEffect(() => {
        console.log(`Intentando conectar a Socket.IO en ${BACKEND_URL}`);

        // CONEXIÓN AL BACKEND DE SOCKET.IO
        const socket = io(BACKEND_URL);

        // --- Handlers de Eventos ---
        
        socket.on('connect', () => {
            console.log(' Conectado exitosamente al Backend de Node.js (Socket.IO)');
            setStatus('Conectado a Node.js ');
        });
        
        //  PASO CRÍTICO: RECIBIR LOS DATOS EMITIDOS POR EL BACKEND
        socket.on('telemetry', (data) => {
            // Formatear para consola
            const hora = new Date(data.ts * 1000 || Date.now()).toLocaleTimeString();
            
            //  Mostrar en la Consola del Navegador
            console.log(`\n[${hora}] 📡 Dato recibido de ${data.device}:`);
            console.log('   ', {
                Temperatura: `${data.temp_c}°C`,
                Presion: `${data.pres_hpa} hPa`,
                Humedad: `${data.hum_pct}%`,
            });
            
            // Aquí es donde actualizarías el estado de React para mostrar los datos en la UI
        });

        socket.on('disconnect', () => {
            console.log(' Desconectado del Backend (Socket.IO)');
            setStatus('Desconectado ');
        });

        socket.on('connect_error', (err) => {
            console.error(' Error de conexión Socket.IO:', err.message);
            setStatus('Error de Conexión ');
        });

        // Función de limpieza
        return () => {
            socket.disconnect();
            console.log('Cliente Socket.IO desconectado.');
        };
    }, []);

    return (
        <div>
            <h2>Web App (Frontend React)</h2>
            <p>Estado del Backend: **{status}**</p>
            <p>Datos de telemetría apareciendo en la **Consola del Navegador (F12)**.</p>
        </div>
    );
};

export default TelemetryClient;
