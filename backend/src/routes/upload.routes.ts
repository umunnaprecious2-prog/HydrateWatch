import { Router } from "express";
import { uploadController } from "../controllers/upload.controller";
import { requireAuth } from "../middlewares/auth";
import { upload } from "../middlewares/upload";

const router = Router();

router.post("", requireAuth, upload.single("file"), uploadController.uploadSensorData);

export default router;
