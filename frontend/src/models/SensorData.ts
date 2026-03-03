export interface SensorData {
  temperature: number;
  humidity: number;
  energy_consumption: number;
}

export interface TelemetryResponse {
  timestamp: string;
  sensor_id: string;
  sensors: SensorData;
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
export const initialTelemetry: TelemetryResponse = {
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
export const initialPrediction: PredictionResponse = {
  sensor_id: "",
  prediction: "NORMAL",
  confidence: 0,
  timestamp: "",
};

export interface LogEntry extends TelemetryResponse {
  prediction: PredictionResponse | null;
}
