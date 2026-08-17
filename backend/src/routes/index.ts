import { Router } from "express";
import authRoutes from "./auth.routes";
import sensorRoutes from "./sensor.routes";
import predictionRoutes from "./prediction.routes";
import uploadRoutes from "./upload.routes";
import feedRoutes from "./feed.routes";
import healthRoutes from "./health.routes";

const router = Router();

router.use("/auth", authRoutes);
router.use("/sensors", sensorRoutes);
router.use("/predictions", predictionRoutes);
router.use("/upload", uploadRoutes);
router.use("/health", healthRoutes);
router.use("/ai-knowledge", feedRoutes);

export default router;
