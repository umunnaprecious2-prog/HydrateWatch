import { Response, NextFunction } from "express";
import { parseCSV, parseJSON } from "../services/fileParser.service";
import { sensorRepository } from "../repositories/sensor.repository";
import { AuthenticatedRequest } from "../types";

export const uploadController = {
  async uploadSensorData(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      if (!req.file) {
        return res.status(400).json({ detail: "No file was uploaded" });
      }

      const contentStr = req.file.buffer.toString("utf-8");
      const filename = req.file.originalname.toLowerCase();

      let records = [];
      try {
        if (filename.endsWith(".csv")) {
          records = parseCSV(contentStr);
        } else if (filename.endsWith(".json")) {
          records = parseJSON(contentStr);
        } else {
          return res.status(400).json({ detail: "Only CSV and JSON files are supported" });
        }
      } catch (err: any) {
        return res.status(400).json({ detail: err.message });
      }

      // Bulk insert readings sequentially so each row goes through the repository's
      // create() path (keeps behavior consistent if per-row logic is added later).
      const savedReadings = [];
      for (const record of records) {
        const sensor = await sensorRepository.create(record);
        savedReadings.push(sensor);
      }

      return res.status(200).json({
        message: `Successfully uploaded ${savedReadings.length} sensor readings`,
        count: savedReadings.length,
      });
    } catch (error) {
      next(error);
    }
  },
};
