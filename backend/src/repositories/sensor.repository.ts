import { prisma } from "../lib/prisma";

export const sensorRepository = {
  async create(data: {
    mode: string;
    temperature: number;
    pressure: number;
    flow_rate: number;
    timestamp?: Date;
  }) {
    return prisma.sensorReading.create({
      data: {
        mode: data.mode,
        temperature: data.temperature,
        pressure: data.pressure,
        flow_rate: data.flow_rate,
        timestamp: data.timestamp || new Date(),
      },
    });
  },

  async findLatestByMode(mode: string) {
    return prisma.sensorReading.findFirst({
      where: { mode },
      orderBy: { timestamp: "desc" },
    });
  },

  async findHistoryByMode(mode: string, limit = 50) {
    return prisma.sensorReading.findMany({
      where: { mode },
      orderBy: { timestamp: "desc" },
      take: limit,
    });
  },

  async countByMode(mode: string) {
    return prisma.sensorReading.count({ where: { mode } });
  },
};
