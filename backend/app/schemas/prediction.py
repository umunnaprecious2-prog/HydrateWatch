from pydantic import BaseModel
from datetime import datetime


class PredictionBase(BaseModel):
    sensor_id: int
    hydrate_risk: float


class PredictionCreate(PredictionBase):
    pass


class PredictionResponse(PredictionBase):
    id: int
    timestamp: datetime

    class Config:
        from_attributes = True
