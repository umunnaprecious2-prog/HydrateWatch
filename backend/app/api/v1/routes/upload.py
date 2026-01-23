from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.dependencies import get_current_user
from app.models.user import User
from app.models.sensor import SensorReading
from app.services.file_parser import parse_csv, parse_json

router = APIRouter()


@router.post("")
async def upload_sensor_data(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    # Read file content
    content = await file.read()
    content_str = content.decode("utf-8")

    # Parse based on file extension
    try:
        if file.filename.endswith(".csv"):
            records = parse_csv(content_str)
        elif file.filename.endswith(".json"):
            records = parse_json(content_str)
        else:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Only CSV and JSON files are supported"
            )

        # Save records to database
        for record in records:
            sensor = SensorReading(**record)
            db.add(sensor)

        db.commit()

        return {
            "message": f"Successfully uploaded {len(records)} sensor readings",
            "count": len(records)
        }

    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to process file: {str(e)}"
        )
