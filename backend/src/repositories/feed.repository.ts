import { prisma } from "../lib/prisma";

export interface PostFilters {
  contentType?: string;
  tag?: string;
  sourceType?: string;
  search?: string;
  days?: number;
}

function mapPost(post: any) {
  if (!post) return post;
  let keyInsights: string[] = [];
  let practicalTakeaways: string[] = [];
  let tags: string[] = [];

  if (post.key_insights) {
    try {
      keyInsights =
        typeof post.key_insights === "string" ? JSON.parse(post.key_insights) : post.key_insights;
    } catch (e) {
      keyInsights = [];
    }
  }
  if (post.practical_takeaways) {
    try {
      practicalTakeaways =
        typeof post.practical_takeaways === "string"
          ? JSON.parse(post.practical_takeaways)
          : post.practical_takeaways;
    } catch (e) {
      practicalTakeaways = [];
    }
  }
  if (post.tags) {
    try {
      tags = typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags;
    } catch (e) {
      tags = [];
    }
  }

  return {
    ...post,
    key_insights: keyInsights,
    practical_takeaways: practicalTakeaways,
    tags: tags,
  };
}

export const feedRepository = {
  async findPostById(id: number) {
    const post = await prisma.aIKnowledgePost.findUnique({
      where: { id },
    });
    return mapPost(post);
  },

  async findPostBySourceId(sourceId: string) {
    const post = await prisma.aIKnowledgePost.findUnique({
      where: { source_id: sourceId },
    });
    return mapPost(post);
  },

  async incrementViewCount(id: number) {
    return prisma.aIKnowledgePost.update({
      where: { id },
      data: {
        view_count: {
          increment: 1,
        },
      },
    });
  },

  buildWhereClause(filters: PostFilters) {
    const days = filters.days !== undefined ? filters.days : 30;
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const where: any = {
      is_published: true,
      created_at: {
        gte: cutoffDate,
      },
    };

    if (filters.contentType) {
      where.content_type = filters.contentType;
    }

    if (filters.sourceType) {
      where.source_type = filters.sourceType;
    }

    if (filters.search) {
      where.OR = [
        { title: { contains: filters.search } },
        { summary: { contains: filters.search } },
      ];
    }

    return { where, tag: filters.tag };
  },

  async findPosts(filters: PostFilters, page = 1, pageSize = 10) {
    const { where, tag } = this.buildWhereClause(filters);

    const posts = await prisma.aIKnowledgePost.findMany({
      where,
      orderBy: { created_at: "desc" },
    });

    let mappedPosts = posts.map(mapPost);

    // Filter by tag in JS since it is stored as serialized JSON string in DB
    if (tag) {
      mappedPosts = mappedPosts.filter((post) => {
        return post.tags && Array.isArray(post.tags) && post.tags.includes(tag);
      });
    }

    const total = mappedPosts.length;
    const paginatedPosts = mappedPosts.slice((page - 1) * pageSize, page * pageSize);

    return {
      posts: paginatedPosts,
      total,
    };
  },

  async countActiveSources() {
    return prisma.feedSource.count({
      where: { is_active: true },
    });
  },

  async getLastSuccessfulFetchLog() {
    return prisma.feedFetchLog.findFirst({
      where: { status: "success" },
      orderBy: { completed_at: "desc" },
    });
  },

  async getRecentPosts(days = 7, limit = 20) {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);

    const posts = await prisma.aIKnowledgePost.findMany({
      where: {
        is_published: true,
        created_at: { gte: cutoffDate },
      },
      orderBy: { created_at: "desc" },
      take: limit,
    });
    return posts.map(mapPost);
  },

  async getTodayPosts() {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const posts = await prisma.aIKnowledgePost.findMany({
      where: {
        is_published: true,
        created_at: { gte: todayStart },
      },
      orderBy: { relevance_score: "desc" },
    });
    return posts.map(mapPost);
  },

  async countPostsCreatedSince(date: Date) {
    return prisma.aIKnowledgePost.count({
      where: {
        is_published: true,
        created_at: { gte: date },
      },
    });
  },

  async countTotalPosts() {
    return prisma.aIKnowledgePost.count({
      where: { is_published: true },
    });
  },

  async getAllTagsSince(date: Date): Promise<string[]> {
    const posts = await prisma.aIKnowledgePost.findMany({
      where: {
        is_published: true,
        created_at: { gte: date },
      },
      select: { tags: true },
    });

    const tagsList: string[] = [];
    for (const post of posts) {
      if (post.tags) {
        try {
          const parsed = typeof post.tags === "string" ? JSON.parse(post.tags) : post.tags;
          if (Array.isArray(parsed)) {
            tagsList.push(...parsed);
          }
        } catch (e) {}
      }
    }
    return tagsList;
  },

  async createPost(data: any) {
    const created = await prisma.aIKnowledgePost.create({
      data: {
        source_id: data.source_id,
        source_type: data.source_type,
        source_name: data.source_name,
        source_url: data.source_url,
        title: data.title,
        original_content: data.original_content,
        summary: data.summary,
        key_insights: data.key_insights ? JSON.stringify(data.key_insights) : "[]",
        practical_takeaways: data.practical_takeaways
          ? JSON.stringify(data.practical_takeaways)
          : "[]",
        why_it_matters: data.why_it_matters,
        content_type: data.content_type,
        tags: data.tags ? JSON.stringify(data.tags) : "[]",
        relevance_score: data.relevance_score || 0.0,
        credibility_score: data.credibility_score || 0.0,
        author: data.author,
        published_at: data.published_at ? new Date(data.published_at) : null,
        processed_at: data.processed_at ? new Date(data.processed_at) : null,
        is_published: data.is_published !== undefined ? data.is_published : false,
        is_featured: data.is_featured !== undefined ? data.is_featured : false,
        view_count: data.view_count || 0,
      },
    });
    return mapPost(created);
  },

  async createFetchLog(data: { source_name: string; status: string }) {
    return prisma.feedFetchLog.create({
      data: {
        source_name: data.source_name,
        status: data.status,
        started_at: new Date(),
      },
    });
  },

  async updateFetchLog(
    id: number,
    data: {
      status: string;
      items_fetched?: number;
      items_processed?: number;
      items_published?: number;
      error_message?: string;
    }
  ) {
    return prisma.feedFetchLog.update({
      where: { id },
      data: {
        status: data.status,
        items_fetched: data.items_fetched,
        items_processed: data.items_processed,
        items_published: data.items_published,
        error_message: data.error_message,
        completed_at: new Date(),
      },
    });
  },

  async getRecentFetchLogs(limit = 10) {
    return prisma.feedFetchLog.findMany({
      orderBy: { started_at: "desc" },
      take: limit,
    });
  },
};
