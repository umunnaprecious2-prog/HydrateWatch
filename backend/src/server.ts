import app from "./app";
import { config } from "./config";
import { prisma } from "./lib/prisma";

async function startServer() {
  try {
    // Test database connection
    await prisma.$connect();
    console.log("Connected to database successfully");

    app.listen(config.port, () => {
      console.log(`==========================================`);
      console.log(`HydrateWatch API Server started!`);
      console.log(`URL: http://localhost:${config.port}`);
      console.log(`API Docs: http://localhost:${config.port}/api/v1/health`);
      console.log(`==========================================`);
    });
  } catch (error) {
    console.error("Failed to start server due to database connection issue:", error);
    process.exit(1);
  }
}

// Handle termination signals gracefully
process.on("SIGINT", async () => {
  await prisma.$disconnect();
  console.log("Database disconnected. Exiting process.");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await prisma.$disconnect();
  console.log("Database disconnected. Exiting process.");
  process.exit(0);
});

startServer();
