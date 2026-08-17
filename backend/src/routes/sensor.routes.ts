import { Router } from "express";
import { sensorController } from "../controllers/sensor.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.post("/add", requireAuth, sensorController.addSensorReading);
router.get("/latest/:mode", requireAuth, sensorController.getLatestSensorData);
router.get("/history/:mode", requireAuth, sensorController.getSensorHistory);

export default router;
