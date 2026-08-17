import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // Create test user
  const hashedPassword = await bcrypt.hash("password123", 10);
  const email = "test@example.com";

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: "Test User",
      hashed_password: hashedPassword,
      is_active: true,
      role: "user",
    },
  });

  console.log("Seeded test user:", user.email);

  // Seed default feed sources if they don't exist
  const defaultSources = [
    { name: "Google News", source_type: "rss", url: "https://news.google.com/rss" },
    { name: "ArXiv", source_type: "arxiv", url: "http://export.arxiv.org/api/query" },
    { name: "Hacker News", source_type: "hackernews", url: "https://hacker-news.firebaseio.com/v0" },
    { name: "Dev.to", source_type: "rss", url: "https://dev.to/feed" },
    { name: "GitHub Trending", source_type: "github", url: "https://api.github.com/search/repositories" },
    { name: "AI Company Blogs", source_type: "rss", url: "https://openai.com/blog/rss/" }
  ];

  for (const src of defaultSources) {
    await prisma.feedSource.upsert({
      where: { name: src.name },
      update: {},
      create: {
        name: src.name,
        source_type: src.source_type,
        url: src.url,
        is_active: true,
        fetch_interval_hours: 24,
        credibility_weight: src.name === "ArXiv" || src.name === "AI Company Blogs" ? 0.9 : 0.6,
      }
    });
  }
  console.log("Seeded default feed sources");

  // Create sample sensor readings
  const baseTime = new Date();
  const offshoreCount = await prisma.sensorReading.count({ where: { mode: "offshore" } });
  const onshoreCount = await prisma.sensorReading.count({ where: { mode: "onshore" } });

  if (offshoreCount === 0 && onshoreCount === 0) {
    // Offshore readings
    const offshoreReadings = [
      { mode: "offshore", temperature: 2.5, pressure: 65.0, flow_rate: 25.0 },
      { mode: "offshore", temperature: 3.0, pressure: 62.0, flow_rate: 28.0 },
      { mode: "offshore", temperature: 2.8, pressure: 68.0, flow_rate: 22.0 },
      { mode: "offshore", temperature: 1.5, pressure: 70.0, flow_rate: 20.0 },
      { mode: "offshore", temperature: 3.5, pressure: 60.0, flow_rate: 30.0 },
    ];

    for (let i = 0; i < offshoreReadings.length; i++) {
      const timestamp = new Date(baseTime.getTime() - (offshoreReadings.length - i - 1) * 5 * 60 * 1000);
      await prisma.sensorReading.create({
        data: {
          ...offshoreReadings[i],
          timestamp,
        }
      });
    }

    // Onshore readings
    const onshoreReadings = [
      { mode: "onshore", temperature: 15.0, pressure: 25.0, flow_rate: 55.0 },
      { mode: "onshore", temperature: 16.5, pressure: 23.0, flow_rate: 58.0 },
      { mode: "onshore", temperature: 14.5, pressure: 27.0, flow_rate: 52.0 },
      { mode: "onshore", temperature: 17.0, pressure: 22.0, flow_rate: 60.0 },
      { mode: "onshore", temperature: 15.5, pressure: 24.0, flow_rate: 56.0 },
    ];

    for (let i = 0; i < onshoreReadings.length; i++) {
      const timestamp = new Date(baseTime.getTime() - (onshoreReadings.length - i - 1) * 5 * 60 * 1000);
      await prisma.sensorReading.create({
        data: {
          ...onshoreReadings[i],
          timestamp,
        }
      });
    }

    console.log("Seeded database with sample sensor data");
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
