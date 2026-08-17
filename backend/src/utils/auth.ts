import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { config } from "../config";
import { TokenPayload } from "../types";

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function verifyPassword(plain: string, hashed: string): Promise<boolean> {
  return bcrypt.compare(plain, hashed);
}

export function createAccessToken(email: string): string {
  const expiresDelta = config.accessTokenExpireMinutes * 60; // in seconds
  const payload: TokenPayload = {
    sub: email,
  };
  return jwt.sign(payload, config.secretKey, {
    expiresIn: expiresDelta,
  });
}

export function decodeAccessToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, config.secretKey) as TokenPayload;
  } catch (error) {
    return null;
  }
}
