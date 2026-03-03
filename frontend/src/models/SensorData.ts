export interface SensorData {
  timestamp: string;
  sensor_id: string;
  sensors: {
    temperature: number;
    humidity: number;
    energy_consumption: number;
  };
  system_health: string;
  location: string;
}

export interface PredictionRequest {
  sensor_id: string;
  temperature: number;
}

export interface PredictionResponse {
  sensor_id: string;
  prediction: "NORMAL" | "WARNING" | "CRITICAL";
  confidence: number;
  timestamp: string;
}

/**
 * Estructura inicial para el estado de telemetría
 */
export const initialTelemetry: SensorData = {
  timestamp: "--:--:--",
  location: "Cargando...",
  system_health: "Unknown",
  sensor_id: "Unknown",
  sensors: {
    temperature: 0,
    humidity: 0,
    energy_consumption: 0,
  },
};

/**
 * Estructura para el estado de predicción
 */
export const initialPrediction = {
  sensor_id: "",
  prediction: "NORMAL",
  confidence: 0,
  timestamp: "",
};
