import { prisma } from "../lib/prisma";

export const predictionRepository = {
  async findBySensorId(sensorId: number) {
    return prisma.prediction.findFirst({
      where: { sensor_id: sensorId },
    });
  },

  async create(data: { sensor_id: number; hydrate_risk: number }) {
    return prisma.prediction.create({
      data: {
        sensor_id: data.sensor_id,
        hydrate_risk: data.hydrate_risk,
      },
    });
  },
};
