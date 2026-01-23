from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.sensor import SensorReading
from app.models.prediction import Prediction
from app.schemas.prediction import PredictionResponse
from app.services.risk_engine import calculate_hydrate_risk

router = APIRouter()


@router.get("/{sensor_id}", response_model=PredictionResponse)
def get_prediction(
    sensor_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Get sensor reading
    sensor = db.query(SensorReading).filter(SensorReading.id == sensor_id).first()

    if not sensor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Sensor reading not found: {sensor_id}"
        )

    # Check if prediction already exists
    prediction = db.query(Prediction).filter(Prediction.sensor_id == sensor_id).first()

    if not prediction:
        # Calculate and create new prediction
        risk = calculate_hydrate_risk(
            sensor.temperature,
            sensor.pressure,
            sensor.flow_rate
        )

        prediction = Prediction(
            sensor_id=sensor_id,
            hydrate_risk=risk
        )
        db.add(prediction)
        db.commit()
        db.refresh(prediction)

    return prediction
