import { Request, Response, NextFunction } from "express";
import { feedRepository } from "../repositories/feed.repository";
import { DailyFeedScheduler, checkShouldFetch } from "../services/scheduler.service";

export const feedController = {
  async getPosts(req: Request, res: Response, next: NextFunction) {
    try {
      const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
      const pageSize = req.query.page_size ? parseInt(req.query.page_size as string, 10) : 10;
      const contentType = req.query.content_type as string | undefined;
      const tag = req.query.tag as string | undefined;
      const sourceType = req.query.source_type as string | undefined;
      const search = req.query.search as string | undefined;
      const days = req.query.days ? parseInt(req.query.days as string, 10) : 30;

      const { posts, total } = await feedRepository.findPosts(
        { contentType, tag, sourceType, search, days },
        page,
        pageSize
      );

      return res.status(200).json({
        posts,
        total,
        page,
        page_size: pageSize,
        has_more: total > page * pageSize,
      });
    } catch (error) {
      next(error);
    }
  },

  async getPost(req: Request, res: Response, next: NextFunction) {
    try {
      const id = parseInt(req.params.post_id, 10);
      if (isNaN(id)) {
        return res.status(400).json({ detail: "Invalid post ID" });
      }

      const post = await feedRepository.findPostById(id);
      if (!post || !post.is_published) {
        return res.status(404).json({ detail: "Post not found" });
      }

      // Increment view count
      await feedRepository.incrementViewCount(id);
      post.view_count += 1; // return the updated count

      return res.status(200).json(post);
    } catch (error) {
      next(error);
    }
  },

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);
      weekStart.setHours(0, 0, 0, 0);

      const total_posts = await feedRepository.countTotalPosts();
      const posts_today = await feedRepository.countPostsCreatedSince(todayStart);
      const posts_this_week = await feedRepository.countPostsCreatedSince(weekStart);
      const sources_active = await feedRepository.countActiveSources();
      const lastFetch = await feedRepository.getLastSuccessfulFetchLog();

      // Top tags
      const tags = await feedRepository.getAllTagsSince(weekStart);
      const tagCounts: Record<string, number> = {};
      for (const t of tags) {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      }

      const top_tags = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);

      return res.status(200).json({
        total_posts,
        posts_today,
        posts_this_week,
        sources_active: sources_active || 5,
        last_fetch_time: lastFetch ? lastFetch.completed_at : null,
        top_tags,
      });
    } catch (error) {
      next(error);
    }
  },

  async triggerFetch(req: Request, res: Response, next: NextFunction) {
    try {
      const force = req.query.force === "true";

      const shouldFetch = force || (await checkShouldFetch());
      if (!shouldFetch) {
        const lastLog = await feedRepository.getLastSuccessfulFetchLog();
        return res.status(200).json({
          status: "skipped",
          message: "Recent fetch already completed",
          last_fetch: lastLog ? lastLog.completed_at?.toISOString() : null,
        });
      }

      // Run fetch job in background (do not await)
      const scheduler = new DailyFeedScheduler();
      scheduler.runDailyUpdate().catch((err) => {
        console.error("Error in background manual fetch:", err);
      });

      return res.status(200).json({
        status: "started",
        message: "Fetch job started in background",
      });
    } catch (error) {
      next(error);
    }
  },

  async getFetchLogs(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
      const logs = await feedRepository.getRecentFetchLogs(limit);
      return res.status(200).json(logs);
    } catch (error) {
      next(error);
    }
  },

  async getContentTypes(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        content_types: [
          { value: "Research", label: "Research Papers" },
          { value: "Tooling", label: "Tools & Libraries" },
          { value: "Tutorial", label: "Tutorials & Guides" },
          { value: "News", label: "Industry News" },
          { value: "AI Insight", label: "AI Insights" },
        ],
      });
    } catch (error) {
      next(error);
    }
  },

  async getSources(req: Request, res: Response, next: NextFunction) {
    try {
      return res.status(200).json({
        sources: [
          { value: "arxiv", label: "ArXiv Research", credibility: 0.9 },
          { value: "github", label: "GitHub Trending", credibility: 0.7 },
          { value: "hackernews", label: "Hacker News", credibility: 0.6 },
          { value: "rss", label: "News & Blogs", credibility: 0.6 },
        ],
      });
    } catch (error) {
      next(error);
    }
  },

  async getPopularTags(req: Request, res: Response, next: NextFunction) {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 20;
      const weekStart = new Date();
      weekStart.setDate(weekStart.getDate() - 7);

      const tags = await feedRepository.getAllTagsSince(weekStart);
      const tagCounts: Record<string, number> = {};
      for (const t of tags) {
        tagCounts[t] = (tagCounts[t] || 0) + 1;
      }

      const sortedTags = Object.entries(tagCounts)
        .map(([tag, count]) => ({ tag, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, limit);

      return res.status(200).json({ tags: sortedTags });
    } catch (error) {
      next(error);
    }
  },
};
