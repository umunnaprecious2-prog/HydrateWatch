import { Response, NextFunction } from "express";
import { decodeAccessToken as decode } from "../utils/auth";
import { prisma } from "../lib/prisma";
import { AuthenticatedRequest } from "../types";

export async function requireAuth(req: AuthenticatedRequest, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ detail: "Could not validate credentials" });
  }

  const token = authHeader.split(" ")[1];
  const payload = decode(token);

  if (!payload || !payload.sub) {
    return res.status(401).json({ detail: "Could not validate credentials" });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: payload.sub },
    });

    if (!user) {
      return res.status(401).json({ detail: "Could not validate credentials" });
    }

    req.user = {
      id: user.id,
      email: user.email,
      name: user.name,
      is_active: user.is_active,
      role: user.role,
    };

    next();
  } catch (error) {
    return res.status(500).json({ detail: "Internal Server Error" });
  }
}
