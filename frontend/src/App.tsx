import React, { useState, useEffect } from "react";
// Importamos nuestras funciones de la capa API
import { getTelemetry, predictAnomaly } from "./service/sensorService";
import {
  initialTelemetry,
  type PredictionResponse,
  type SensorData,
} from "./models/SensorData";

interface SensorCardProps {
  title: string;
  value: number | string;
  unit: string;
  color: string;
  status?: "NORMAL" | "WARNING" | "CRITICAL";
}

const SensorCard = ({ title, value, unit, color, status }: SensorCardProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
    <div className="flex justify-between items-start">
      <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
        {title}
      </p>
      {status && (
        <span
          className={`px-2 py-1 rounded text-[10px] font-bold ${status === "CRITICAL" ? "bg-red-100 text-red-600" : status === "WARNING" ? "bg-yellow-100 text-yellow-600" : "bg-green-100 text-green-600"}`}
        >
          {status}
        </span>
      )}
    </div>
    <div className="flex items-baseline mt-2">
      <span className="text-4xl font-bold text-gray-800">{value}</span>
      <span className="ml-1 text-gray-400 font-medium">{unit}</span>
    </div>
    <div className={`h-1 w-12 mt-4 rounded-full ${color}`}></div>
  </div>
);

function App() {
  const [telemetry, setTelemetry] = useState<SensorData>(initialTelemetry);
  const [prediction, setPrediction] = useState<PredictionResponse | null>(null);
  const [loading, setLoading] = useState(true);

  const updateDashboard = async () => {
    try {
      // Usamos las funciones importadas
      const data = await getTelemetry();
      setTelemetry(data);

      if (data.sensors.temperature > 25) {
        const predictData = await predictAnomaly({
          sensor_id: data.sensor_id,
          temperature: data.sensors.temperature,
        });
        setPrediction(predictData);
      } else {
        setPrediction(null);
      }

      setLoading(false);
    } catch (error) {
      console.error("Dashboard Sync Error:", error);
    }
  };

  useEffect(() => {
    const interval = setInterval(updateDashboard, 3000);
    updateDashboard();
    return () => clearInterval(interval);
  }, []);

  if (loading)
    return (
      <div className="flex h-screen items-center justify-center font-bold text-indigo-600">
        Sincronizando con la red de sensores...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-black text-indigo-700 tracking-tighter">
            Smart<span className="text-gray-400">Monitor</span>
          </h1>
          <p className="text-gray-500 font-medium">
            {telemetry?.location} • {telemetry.timestamp}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <SensorCard
          title="Temperatura"
          value={telemetry?.sensors.temperature || 0}
          unit="°C"
          color="bg-orange-500"
          status={prediction?.prediction}
        />
        <SensorCard
          title="Humedad"
          value={telemetry?.sensors.humidity || 0}
          unit="%"
          color="bg-blue-500"
        />
        <SensorCard
          title="Consumo"
          value={telemetry?.sensors.energy_consumption || 0}
          unit="kW"
          color="bg-emerald-500"
        />
      </div>

      {prediction?.prediction === "CRITICAL" && (
        <div className="mt-8 p-4 bg-red-600 text-white rounded-2xl flex items-center justify-between animate-pulse">
          <span className="font-bold uppercase tracking-widest text-sm text-center w-full inline-block">
            ⚠️ Alerta de Anomalía Crítica - Confianza:{" "}
            {prediction.confidence * 100}%
          </span>
        </div>
      )}
    </div>
  );
}

export default App;
