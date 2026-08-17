import { fetchAllSources } from "./feedFetcher.service";
import { processFeedItems, filterAndRankPosts } from "./feedProcessor.service";
import { feedRepository } from "../repositories/feed.repository";
import { FeedItem } from "../types";

export class DailyFeedScheduler {
  private minRelevanceScore = 0.3;
  private maxPostsPerDay = 10;

  async runDailyUpdate(): Promise<any> {
    console.log("Starting daily feed scheduler update...");
    const log = await feedRepository.createFetchLog({
      source_name: "all_sources",
      status: "in_progress",
    });

    try {
      // Step 1: Fetch from all sources
      const rawItems = await fetchAllSources();
      console.log(`Fetched ${rawItems.length} raw items from all sources`);

      // Step 2: Remove duplicates
      const uniqueItems = await this.removeDuplicates(rawItems);
      console.log(`Deduplicated: ${uniqueItems.length} unique items remaining`);

      // Step 3: Process items
      const processed = processFeedItems(uniqueItems);
      console.log(`Processed: ${processed.length} items`);

      // Step 4: Filter and rank
      const ranked = filterAndRankPosts(processed, this.minRelevanceScore);
      console.log(`Filtered and ranked: ${ranked.length} items`);

      // Step 5: Save top posts
      const postsToSave = ranked.slice(0, this.maxPostsPerDay);
      let savedCount = 0;

      for (const post of postsToSave) {
        try {
          const existing = await feedRepository.findPostBySourceId(post.source_id);
          if (!existing) {
            await feedRepository.createPost({
              ...post,
              is_published: true,
            });
            savedCount++;
          }
        } catch (e: any) {
          console.error(`Error saving post ${post.title}: ${e.message}`);
        }
      }

      console.log(`Saved ${savedCount} new posts to the database`);

      // Update log
      await feedRepository.updateFetchLog(log.id, {
        status: "success",
        items_fetched: rawItems.length,
        items_processed: processed.length,
        items_published: savedCount,
      });

      return {
        status: "success",
        items_fetched: rawItems.length,
        items_processed: processed.length,
        items_published: savedCount,
        completed_at: new Date().toISOString(),
      };
    } catch (error: any) {
      console.error("Error in daily feed scheduler update:", error);
      await feedRepository.updateFetchLog(log.id, {
        status: "failed",
        error_message: error.message || "Unknown error",
      });
      throw error;
    }
  }

  private async removeDuplicates(items: FeedItem[]): Promise<FeedItem[]> {
    const seenIds = new Set<string>();
    const seenTitles = new Set<string>();
    const unique: FeedItem[] = [];

    for (const item of items) {
      const sourceId = item.source_id;
      const title = item.title ? item.title.toLowerCase().trim() : "";

      if (!sourceId) continue;

      // Check database to see if we already have this source_id
      const inDb = await feedRepository.findPostBySourceId(sourceId);
      if (inDb) continue;

      if (seenIds.has(sourceId)) continue;

      const titleKey = this.normalizeTitle(title);
      if (seenTitles.has(titleKey)) continue;

      seenIds.add(sourceId);
      seenTitles.add(titleKey);
      unique.push(item);
    }

    return unique;
  }

  private normalizeTitle(title: string): string {
    // Remove special characters and spaces
    let normalized = title.toLowerCase().replace(/[^\w\s]/g, "");
    normalized = normalized.replace(/\s+/g, " ").trim();
    return normalized.slice(0, 50); // take first 50 chars for comparison
  }
}

export async function checkShouldFetch(): Promise<boolean> {
  const lastLog = await feedRepository.getLastSuccessfulFetchLog();
  if (!lastLog || !lastLog.completed_at) {
    return true;
  }

  const timeSinceLast = Date.now() - lastLog.completed_at.getTime();
  const twentyHoursMs = 20 * 60 * 60 * 1000;
  return timeSinceLast > twentyHoursMs;
}
