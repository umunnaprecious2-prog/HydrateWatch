import { Response, NextFunction } from "express";
import { prisma } from "../lib/prisma";
import { predictionRepository } from "../repositories/prediction.repository";
import { calculateHydrateRisk } from "../services/riskEngine.service";
import { AuthenticatedRequest } from "../types";

export const predictionController = {
  async getPrediction(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const sensorId = parseInt(req.params.sensor_id, 10);
      if (isNaN(sensorId)) {
        return res.status(400).json({ detail: "Invalid sensor ID" });
      }

      // 1. Get sensor reading
      const sensorReading = await prisma.sensorReading.findUnique({
        where: { id: sensorId },
      });
      if (!sensorReading) {
        return res.status(404).json({ detail: `Sensor reading not found: ${sensorId}` });
      }

      // 2. Check if prediction exists
      let prediction = await predictionRepository.findBySensorId(sensorId);

      if (!prediction) {
        // Compute and create prediction
        const risk = calculateHydrateRisk(
          sensorReading.temperature,
          sensorReading.pressure,
          sensorReading.flow_rate
        );

        prediction = await predictionRepository.create({
          sensor_id: sensorId,
          hydrate_risk: risk,
        });
      }

      return res.status(200).json(prediction);
    } catch (error) {
      next(error);
    }
  },
};
