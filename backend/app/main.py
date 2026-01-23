from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1.api import api_router
from app.database import engine, Base
from app.core.logging import logger

# Import models to ensure they're registered with Base
from app.models import user, sensor, prediction
from app.models import ai_knowledge  # AI Knowledge Feed models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="HydrateWatch API",
    description="Real-time hydrate formation monitoring and simulation platform",
    version="1.0.0"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
        "http://localhost:3002",
        "http://127.0.0.1:3002",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)

# Include API router
app.include_router(api_router, prefix="/api/v1")


@app.on_event("startup")
async def startup_event():
    logger.info("HydrateWatch API starting up...")


@app.on_event("shutdown")
async def shutdown_event():
    logger.info("HydrateWatch API shutting down...")


@app.get("/")
def root():
    return {
        "message": "HydrateWatch API",
        "version": "1.0.0",
        "docs": "/docs"
    }
