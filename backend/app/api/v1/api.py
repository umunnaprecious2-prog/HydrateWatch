from fastapi import APIRouter
from app.api.v1.routes import auth, sensors, predictions, upload, health, ai_knowledge

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["auth"])
api_router.include_router(sensors.router, prefix="/sensors", tags=["sensors"])
api_router.include_router(predictions.router, prefix="/predictions", tags=["predictions"])
api_router.include_router(upload.router, prefix="/upload", tags=["upload"])
api_router.include_router(health.router, prefix="/health", tags=["health"])
api_router.include_router(ai_knowledge.router, prefix="/ai-knowledge", tags=["ai-knowledge"])
