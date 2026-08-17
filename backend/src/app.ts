import express from "express";
import cors from "cors";
import apiRouter from "./routes";
import { errorHandler } from "./middlewares/error";

const app = express();

// Configure CORS to match FastAPI configuration
const allowedOrigins = [
  "http://localhost:3000",
  "http://127.0.0.1:3000",
  "http://localhost:3001",
  "http://127.0.0.1:3001",
  "http://localhost:3002",
  "http://127.0.0.1:3002",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) !== -1) {
        return callback(null, true);
      }
      return callback(null, true); // Fallback to allow all for debugging, or strict: callback(new Error('Not allowed by CORS'))
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
    exposedHeaders: ["Content-Disposition"],
  })
);

// Support both URL-encoded bodies (OAuth2PasswordRequestForm uses this) and JSON bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Include API router under /api/v1
app.use("/api/v1", apiRouter);

// Root route
app.get("/", (req, res) => {
  return res.status(200).json({
    message: "HydrateWatch API",
    version: "1.0.0",
    docs: "/api/v1/health", // Placeholder docs
  });
});

// Global error handler
app.use(errorHandler);

export default app;
