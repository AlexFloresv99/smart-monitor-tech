from pydantic import BaseModel, Field
from typing import Optional

class SensorData(BaseModel):
    temperature: float = Field(..., example=24.5)
    humidity: int = Field(..., example=55)
    energy_consumption: float = Field(..., example=1.234)

class TelemetryResponse(BaseModel):
    timestamp: str
    location: str
    system_health: str
    sensor_id: str
    sensors: SensorData

class PredictionRequest(BaseModel):
    sensor_id: str
    temperature: float

class PredictionResponse(BaseModel):
    sensor_id: str
    prediction: str
    confidence: float
    timestamp: str