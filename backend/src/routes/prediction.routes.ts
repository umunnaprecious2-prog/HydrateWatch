import { Router } from "express";
import { predictionController } from "../controllers/prediction.controller";
import { requireAuth } from "../middlewares/auth";

const router = Router();

router.get("/:sensor_id", requireAuth, predictionController.getPrediction);

export default router;
