from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import time
import random

app = FastAPI(title="Telefónica Tech Smart Monitor API")

# Configuración de CORS para que React se comunique sin problemas con el backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"status": "Online", "service": "AI & Data Unit"}

@app.post("/predict")
async def predict_anomaly(data: dict):
    # Simulamos que la IA procesa los datos (latencia de 2 seg para recrear situación real)
    time.sleep(2) 
    
    temp = data.get("temperature", 0)
    
    # Lógica de simulación de "IA"
    if temp > 80:
        prediction = "CRITICAL"
        confidence = random.uniform(0.85, 0.99)
    else:
        prediction = "NORMAL"
        confidence = random.uniform(0.90, 0.98)

    return {
        "sensor_id": data.get("sensor_id", "Unknown"),
        "prediction": prediction,
        "confidence": round(confidence, 2),
        "timestamp": time.strftime("%H:%M:%S")
    }