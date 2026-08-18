-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "hashed_password" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "role" TEXT NOT NULL DEFAULT 'user',

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sensor_readings" (
    "id" SERIAL NOT NULL,
    "mode" TEXT NOT NULL,
    "temperature" DOUBLE PRECISION NOT NULL,
    "pressure" DOUBLE PRECISION NOT NULL,
    "flow_rate" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sensor_readings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "predictions" (
    "id" SERIAL NOT NULL,
    "sensor_id" INTEGER NOT NULL,
    "hydrate_risk" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "predictions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ai_knowledge_posts" (
    "id" SERIAL NOT NULL,
    "source_id" TEXT,
    "source_type" TEXT,
    "source_name" TEXT,
    "source_url" TEXT,
    "title" TEXT NOT NULL,
    "original_content" TEXT,
    "summary" TEXT,
    "key_insights" TEXT,
    "practical_takeaways" TEXT,
    "why_it_matters" TEXT,
    "content_type" TEXT,
    "tags" TEXT,
    "relevance_score" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "credibility_score" DOUBLE PRECISION NOT NULL DEFAULT 0.0,
    "author" TEXT,
    "published_at" TIMESTAMP(3),
    "fetched_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processed_at" TIMESTAMP(3),
    "is_published" BOOLEAN NOT NULL DEFAULT false,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "view_count" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ai_knowledge_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feed_sources" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "source_type" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "fetch_interval_hours" INTEGER NOT NULL DEFAULT 24,
    "last_fetched_at" TIMESTAMP(3),
    "credibility_weight" DOUBLE PRECISION NOT NULL DEFAULT 0.5,
    "config" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feed_sources_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "feed_fetch_logs" (
    "id" SERIAL NOT NULL,
    "source_id" INTEGER,
    "source_name" TEXT,
    "started_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed_at" TIMESTAMP(3),
    "status" TEXT,
    "items_fetched" INTEGER NOT NULL DEFAULT 0,
    "items_processed" INTEGER NOT NULL DEFAULT 0,
    "items_published" INTEGER NOT NULL DEFAULT 0,
    "error_message" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "feed_fetch_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ai_knowledge_posts_source_id_key" ON "ai_knowledge_posts"("source_id");

-- CreateIndex
CREATE UNIQUE INDEX "feed_sources_name_key" ON "feed_sources"("name");

-- AddForeignKey
ALTER TABLE "predictions" ADD CONSTRAINT "predictions_sensor_id_fkey" FOREIGN KEY ("sensor_id") REFERENCES "sensor_readings"("id") ON DELETE CASCADE ON UPDATE CASCADE;

