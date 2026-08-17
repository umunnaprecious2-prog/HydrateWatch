import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });

const isProduction = process.env.NODE_ENV === "production";

if (isProduction && !process.env.SECRET_KEY) {
  throw new Error("SECRET_KEY environment variable is required in production");
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is required (PostgreSQL connection string)");
}

export const config = {
  port: process.env.PORT ? parseInt(process.env.PORT, 10) : 8000,
  databaseUrl: process.env.DATABASE_URL,
  // Dev-only fallback so local `npm run dev` still works without a .env file present;
  // never used when NODE_ENV=production (enforced above).
  secretKey: process.env.SECRET_KEY || "dev-only-insecure-secret-do-not-use-in-production",
  algorithm: process.env.ALGORITHM || "HS256",
  accessTokenExpireMinutes: process.env.ACCESS_TOKEN_EXPIRE_MINUTES
    ? parseInt(process.env.ACCESS_TOKEN_EXPIRE_MINUTES, 10)
    : 30,
  googleClientId: process.env.GOOGLE_CLIENT_ID || null,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET || null,
};
