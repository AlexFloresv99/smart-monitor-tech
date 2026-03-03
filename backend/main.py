from models import PredictionRequest, PredictionResponse, SensorData, TelemetryResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time
import asyncio
import random

app = FastAPI(title="Telefónica Tech Smart Monitor API")

# Configuración de CORS para que React se comunique sin problemas con el backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

# Con este endpoint simulamos la llegada de datos de una red de sensores IoT
@app.get("/api/telemetry")
async def get_telemetry() -> TelemetryResponse:
    # Simulamos fluctuaciones reales
    temp = round(22 + random.uniform(-2, 8), 2)  # Entre 20 y 30 grados
    hum = random.randint(40, 65)
    consumption = round(1.5 + random.uniform(0, 0.5), 3) # en kW
    
    # Determinamos un estado basado en la temperatura (lógica simple de salud)
    health = "Good" if temp < 27 else "Warning"
    
    return TelemetryResponse(
        timestamp=time.strftime("%H:%M:%S"),
        sensor_id="sensor-mad-001",
        sensors=SensorData(
            temperature=temp,
            humidity=hum,
            energy_consumption=consumption
        ),
        system_health=health,
        location="Madrid - Distrito T"
    )

@app.get("/")
def home():
    return {"status": "Online", "service": "AI & Data Unit"}

@app.post("/api/predict")
async def predict_anomaly(data: PredictionRequest) -> PredictionResponse:
    # Simulamos que la IA procesa los datos (latencia de 2 seg para recrear situación real)
    await asyncio.sleep(2) 
    
    temp = data.temperature
    # Lógica de simulación de "IA"
    if temp > 26:
        prediction = "CRITICAL"
        confidence = random.uniform(0.85, 0.99)
    else:
        if temp > 22:
            prediction = "WARNING"
            confidence = random.uniform(0.80, 0.95)
        else:
            prediction = "NORMAL"
            confidence = random.uniform(0.90, 0.98)

    return PredictionResponse(
        sensor_id=data.sensor_id,
        prediction=prediction,
        confidence=round(confidence, 2),
        timestamp=time.strftime("%H:%M:%S")
    )