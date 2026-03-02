import React, { useState } from "react";

interface SensorCardProps {
  title: string;
  value: string | number;
  unit: string;
  color: string;
}
// Un componente rápido para las tarjetas de sensores
const SensorCard = ({ title, value, unit, color }: SensorCardProps) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <p className="text-gray-500 text-sm font-medium uppercase tracking-wider">
      {title}
    </p>
    <div className="flex items-baseline mt-2">
      <span className="text-4xl font-bold text-gray-800">{value}</span>
      <span className="ml-1 text-gray-400 font-medium">{unit}</span>
    </div>
    <div className={`h-1 w-12 mt-4 rounded-full ${color}`}></div>
  </div>
);

function App() {
  const [status, setStatus] = useState("Online");

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-sans text-gray-900">
      {/* Header */}
      <header className="flex justify-between items-center mb-10">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-indigo-600">
            SmartMonitor<span className="text-gray-400">Tech</span>
          </h1>
          <p className="text-gray-500">Panel de Control Residencial</p>
        </div>
        <div className="flex items-center space-x-2 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
          <span
            className={`h-3 w-3 rounded-full ${status === "Online" ? "bg-green-500" : "bg-red-500"}`}
          ></span>
          <span className="text-sm font-medium text-gray-600">
            Sistema {status}
          </span>
        </div>
      </header>

      {/* Grid de Sensores */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <SensorCard
          title="Temperatura"
          value="22.5"
          unit="°C"
          color="bg-orange-400"
        />
        <SensorCard title="Humedad" value="45" unit="%" color="bg-blue-400" />
        <SensorCard
          title="Consumo Hoy"
          value="12.4"
          unit="kWh"
          color="bg-yellow-400"
        />
        <SensorCard
          title="Calidad Aire"
          value="98"
          unit="AQI"
          color="bg-green-400"
        />
      </div>

      {/* Sección Inferior: Control de Dispositivos */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6">Dispositivos Activos</h2>
        <div className="flex space-x-4">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition">
            Encender Luces Salón
          </button>
          <button className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-semibold hover:bg-gray-200 transition">
            Cerrar Persianas
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
