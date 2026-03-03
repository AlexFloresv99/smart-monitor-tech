import type {
  PredictionRequest,
  PredictionResponse,
  TelemetryResponse,
} from "../models/SensorData";
import { TELEMETRY_URL, PREDICT_URL } from "./serviceConfig";
/**
 * Obtiene la telemetría en tiempo real de los sensores
 */
export const getTelemetry = async (): Promise<TelemetryResponse> => {
  try {
    const response = await fetch(TELEMETRY_URL);
    if (!response.ok) throw new Error("Error al obtener telemetría");
    return await response.json();
  } catch (error) {
    console.error("Service Error (Telemetry):", error);
    throw error;
  }
};

/**
 * Envía datos a la IA para predecir anomalías
 * @param {Object} sensorData - { sensor_id, temperature }
 */
export const predictAnomaly = async (
  sensorData: PredictionRequest,
): Promise<PredictionResponse> => {
  try {
    const response = await fetch(PREDICT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(sensorData),
    });
    if (!response.ok) throw new Error("Error en la predicción de IA");
    return await response.json();
  } catch (error) {
    console.error("Service Error (Predict):", error);
    throw error;
  }
};
