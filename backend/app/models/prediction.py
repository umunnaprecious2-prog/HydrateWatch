from sqlalchemy import Column, Integer, Float, DateTime, ForeignKey
from datetime import datetime
from app.database import Base


class Prediction(Base):
    __tablename__ = "predictions"

    id = Column(Integer, primary_key=True, index=True)
    sensor_id = Column(Integer, ForeignKey("sensor_readings.id"), nullable=False)
    hydrate_risk = Column(Float, nullable=False)
    timestamp = Column(DateTime, default=datetime.utcnow)
