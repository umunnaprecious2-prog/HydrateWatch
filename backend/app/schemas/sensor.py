from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class SensorReadingBase(BaseModel):
    mode: str
    temperature: float
    pressure: float
    flow_rate: float


class SensorReadingCreate(SensorReadingBase):
    pass


class SensorReadingResponse(SensorReadingBase):
    id: int
    timestamp: datetime
    hydrate_risk: Optional[float] = None

    class Config:
        from_attributes = True
