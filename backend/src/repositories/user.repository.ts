import { prisma } from "../lib/prisma";

export const userRepository = {
  async findById(id: number) {
    return prisma.user.findUnique({ where: { id } });
  },

  async findByEmail(email: string) {
    return prisma.user.findUnique({ where: { email } });
  },

  async create(data: { email: string; name: string; hashed_password: string; role?: string }) {
    return prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        hashed_password: data.hashed_password,
        role: data.role || "user",
      },
    });
  },
};
