from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.sensor import SensorReading
from app.schemas.sensor import SensorReadingResponse, SensorReadingCreate
from app.services.risk_engine import calculate_hydrate_risk

router = APIRouter()


@router.post("/add", response_model=SensorReadingResponse)
def add_sensor_reading(
    reading: SensorReadingCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """Add a single sensor reading manually."""
    if reading.mode not in ["offshore", "onshore"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mode must be 'offshore' or 'onshore'"
        )

    sensor = SensorReading(
        mode=reading.mode,
        temperature=reading.temperature,
        pressure=reading.pressure,
        flow_rate=reading.flow_rate
    )
    db.add(sensor)
    db.commit()
    db.refresh(sensor)

    risk = calculate_hydrate_risk(
        sensor.temperature,
        sensor.pressure,
        sensor.flow_rate
    )

    return SensorReadingResponse(
        id=sensor.id,
        mode=sensor.mode,
        temperature=sensor.temperature,
        pressure=sensor.pressure,
        flow_rate=sensor.flow_rate,
        timestamp=sensor.timestamp,
        hydrate_risk=risk
    )


@router.get("/latest/{mode}", response_model=SensorReadingResponse)
def get_latest_sensor_data(
    mode: str,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if mode not in ["offshore", "onshore"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mode must be 'offshore' or 'onshore'"
        )

    # Get latest reading for the mode
    sensor = db.query(SensorReading).filter(
        SensorReading.mode == mode
    ).order_by(desc(SensorReading.timestamp)).first()

    if not sensor:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"No sensor data found for mode: {mode}"
        )

    # Calculate hydrate risk
    risk = calculate_hydrate_risk(
        sensor.temperature,
        sensor.pressure,
        sensor.flow_rate
    )

    response = SensorReadingResponse(
        id=sensor.id,
        mode=sensor.mode,
        temperature=sensor.temperature,
        pressure=sensor.pressure,
        flow_rate=sensor.flow_rate,
        timestamp=sensor.timestamp,
        hydrate_risk=risk
    )

    return response


@router.get("/history/{mode}", response_model=List[SensorReadingResponse])
def get_sensor_history(
    mode: str,
    limit: int = 50,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if mode not in ["offshore", "onshore"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Mode must be 'offshore' or 'onshore'"
        )

    # Get historical readings
    sensors = db.query(SensorReading).filter(
        SensorReading.mode == mode
    ).order_by(desc(SensorReading.timestamp)).limit(limit).all()

    if not sensors:
        return []

    # Calculate hydrate risk for each reading
    response = []
    for sensor in reversed(sensors):
        risk = calculate_hydrate_risk(
            sensor.temperature,
            sensor.pressure,
            sensor.flow_rate
        )

        response.append(SensorReadingResponse(
            id=sensor.id,
            mode=sensor.mode,
            temperature=sensor.temperature,
            pressure=sensor.pressure,
            flow_rate=sensor.flow_rate,
            timestamp=sensor.timestamp,
            hydrate_risk=risk
        ))

    return response
