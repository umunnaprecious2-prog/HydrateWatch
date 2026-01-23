"""
Seed script to populate database with initial test data.
"""
from datetime import datetime, timedelta
from app.database import SessionLocal, engine, Base
from app.models.user import User
from app.models.sensor import SensorReading
from app.core.security import get_password_hash

# Create tables
Base.metadata.create_all(bind=engine)

db = SessionLocal()

# Create test user
test_user = db.query(User).filter(User.email == "test@example.com").first()
if not test_user:
    test_user = User(
        email="test@example.com",
        name="Test User",
        hashed_password=get_password_hash("password123"),
        is_active=True,
        role="user"
    )
    db.add(test_user)
    print("Created test user: test@example.com / password123")

# Create sample sensor data
base_time = datetime.utcnow()

# Offshore data - higher risk scenario
offshore_data = [
    {"mode": "offshore", "temperature": 2.5, "pressure": 65.0, "flow_rate": 25.0},
    {"mode": "offshore", "temperature": 3.0, "pressure": 62.0, "flow_rate": 28.0},
    {"mode": "offshore", "temperature": 2.8, "pressure": 68.0, "flow_rate": 22.0},
    {"mode": "offshore", "temperature": 1.5, "pressure": 70.0, "flow_rate": 20.0},
    {"mode": "offshore", "temperature": 3.5, "pressure": 60.0, "flow_rate": 30.0},
]

# Onshore data - lower risk scenario
onshore_data = [
    {"mode": "onshore", "temperature": 15.0, "pressure": 25.0, "flow_rate": 55.0},
    {"mode": "onshore", "temperature": 16.5, "pressure": 23.0, "flow_rate": 58.0},
    {"mode": "onshore", "temperature": 14.5, "pressure": 27.0, "flow_rate": 52.0},
    {"mode": "onshore", "temperature": 17.0, "pressure": 22.0, "flow_rate": 60.0},
    {"mode": "onshore", "temperature": 15.5, "pressure": 24.0, "flow_rate": 56.0},
]

# Add offshore readings
for i, data in enumerate(offshore_data):
    timestamp = base_time - timedelta(minutes=(len(offshore_data) - i - 1) * 5)
    sensor = SensorReading(
        **data,
        timestamp=timestamp
    )
    db.add(sensor)

# Add onshore readings
for i, data in enumerate(onshore_data):
    timestamp = base_time - timedelta(minutes=(len(onshore_data) - i - 1) * 5)
    sensor = SensorReading(
        **data,
        timestamp=timestamp
    )
    db.add(sensor)

db.commit()
db.close()

print("Seeded database with sample sensor data")
print("- 5 offshore readings")
print("- 5 onshore readings")
