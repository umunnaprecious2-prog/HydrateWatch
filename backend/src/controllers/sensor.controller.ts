import { Response, NextFunction } from "express";
import { sensorRepository } from "../repositories/sensor.repository";
import { calculateHydrateRisk } from "../services/riskEngine.service";
import { validateSensorBody } from "../validators";
import { AuthenticatedRequest } from "../types";

export const sensorController = {
  async addSensorReading(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const valError = validateSensorBody(req.body);
      if (valError) {
        return res.status(400).json({ detail: valError });
      }

      const { mode, temperature, pressure, flow_rate } = req.body;

      const sensor = await sensorRepository.create({
        mode,
        temperature,
        pressure,
        flow_rate,
      });

      const risk = calculateHydrateRisk(temperature, pressure, flow_rate);

      return res.status(200).json({
        id: sensor.id,
        mode: sensor.mode,
        temperature: sensor.temperature,
        pressure: sensor.pressure,
        flow_rate: sensor.flow_rate,
        timestamp: sensor.timestamp,
        hydrate_risk: risk,
      });
    } catch (error) {
      next(error);
    }
  },

  async getLatestSensorData(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { mode } = req.params;
      if (mode !== "offshore" && mode !== "onshore") {
        return res.status(400).json({ detail: "Mode must be 'offshore' or 'onshore'" });
      }

      const sensor = await sensorRepository.findLatestByMode(mode);
      if (!sensor) {
        return res.status(404).json({ detail: `No sensor data found for mode: ${mode}` });
      }

      const risk = calculateHydrateRisk(sensor.temperature, sensor.pressure, sensor.flow_rate);

      return res.status(200).json({
        id: sensor.id,
        mode: sensor.mode,
        temperature: sensor.temperature,
        pressure: sensor.pressure,
        flow_rate: sensor.flow_rate,
        timestamp: sensor.timestamp,
        hydrate_risk: risk,
      });
    } catch (error) {
      next(error);
    }
  },

  async getSensorHistory(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const { mode } = req.params;
      const limitVal = req.query.limit ? parseInt(req.query.limit as string, 10) : 50;

      if (mode !== "offshore" && mode !== "onshore") {
        return res.status(400).json({ detail: "Mode must be 'offshore' or 'onshore'" });
      }

      const sensors = await sensorRepository.findHistoryByMode(mode, limitVal);

      const responseList = sensors.map((sensor) => {
        const risk = calculateHydrateRisk(sensor.temperature, sensor.pressure, sensor.flow_rate);
        return {
          id: sensor.id,
          mode: sensor.mode,
          temperature: sensor.temperature,
          pressure: sensor.pressure,
          flow_rate: sensor.flow_rate,
          timestamp: sensor.timestamp,
          hydrate_risk: risk,
        };
      });

      // Python backend returned historical data in reverse order (oldest first for graphing)
      // `reversed(sensors)` was used in python.
      // So we reverse the array before returning!
      responseList.reverse();

      return res.status(200).json(responseList);
    } catch (error) {
      next(error);
    }
  },
};
