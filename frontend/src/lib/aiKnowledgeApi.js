/**
 * AI Knowledge Feed API Client
 * Frontend service for fetching AI-curated knowledge content.
 */

import api from "./api";

/**
 * Get paginated list of AI knowledge posts
 * @param {Object} params - Query parameters
 * @param {number} params.page - Page number (default: 1)
 * @param {number} params.pageSize - Items per page (default: 10)
 * @param {string} params.contentType - Filter by content type
 * @param {string} params.tag - Filter by tag
 * @param {string} params.sourceType - Filter by source type
 * @param {string} params.search - Search query
 * @param {number} params.days - Days to include (default: 30)
 */
export async function getAIKnowledgePosts({
  page = 1,
  pageSize = 10,
  contentType,
  tag,
  sourceType,
  search,
  days = 30,
} = {}) {
  const params = new URLSearchParams();
  params.append("page", page);
  params.append("page_size", pageSize);
  params.append("days", days);

  if (contentType) params.append("content_type", contentType);
  if (tag) params.append("tag", tag);
  if (sourceType) params.append("source_type", sourceType);
  if (search) params.append("search", search);

  try {
    const response = await api.get(`/ai-knowledge/posts?${params.toString()}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching AI knowledge posts:", error);
    // Return mock data if API is unavailable
    return getMockPosts();
  }
}

/**
 * Get a single AI knowledge post by ID
 * @param {number} postId - Post ID
 */
export async function getAIKnowledgePost(postId) {
  try {
    const response = await api.get(`/ai-knowledge/posts/${postId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching AI knowledge post:", error);
    throw error;
  }
}

/**
 * Get feed statistics
 */
export async function getFeedStats() {
  try {
    const response = await api.get("/ai-knowledge/stats");
    return response.data;
  } catch (error) {
    console.error("Error fetching feed stats:", error);
    return {
      total_posts: 0,
      posts_today: 0,
      posts_this_week: 0,
      sources_active: 5,
      top_tags: [],
    };
  }
}

/**
 * Get available content types
 */
export async function getContentTypes() {
  try {
    const response = await api.get("/ai-knowledge/content-types");
    return response.data.content_types;
  } catch (error) {
    return [
      { value: "Research", label: "Research Papers" },
      { value: "Tooling", label: "Tools & Libraries" },
      { value: "Tutorial", label: "Tutorials & Guides" },
      { value: "News", label: "Industry News" },
      { value: "AI Insight", label: "AI Insights" },
    ];
  }
}

/**
 * Get available source types
 */
export async function getSources() {
  try {
    const response = await api.get("/ai-knowledge/sources");
    return response.data.sources;
  } catch (error) {
    return [
      { value: "arxiv", label: "ArXiv Research", credibility: 0.9 },
      { value: "github", label: "GitHub Trending", credibility: 0.7 },
      { value: "hackernews", label: "Hacker News", credibility: 0.6 },
      { value: "rss", label: "News & Blogs", credibility: 0.6 },
    ];
  }
}

/**
 * Get popular tags
 */
export async function getPopularTags(limit = 20) {
  try {
    const response = await api.get(`/ai-knowledge/tags?limit=${limit}`);
    return response.data.tags;
  } catch (error) {
    return [];
  }
}

/**
 * Trigger manual content fetch
 */
export async function triggerFetch(force = false) {
  try {
    const response = await api.post(`/ai-knowledge/fetch?force=${force}`);
    return response.data;
  } catch (error) {
    console.error("Error triggering fetch:", error);
    throw error;
  }
}

/**
 * Mock data for when API is unavailable
 */
function getMockPosts() {
  return {
    posts: [
      {
        id: 1001,
        title: "Building Multi-Agent Systems with LangGraph",
        summary: "A comprehensive guide to creating sophisticated multi-agent workflows using LangGraph, covering state management, agent coordination, and practical patterns for production deployments.",
        content_type: "Tutorial",
        tags: ["AI Agents", "LangGraph", "Multi-Agent", "Tutorial"],
        source_name: "Dev.to",
        source_url: "https://dev.to/example/langgraph-tutorial",
        author: "AI Developer",
        relevance_score: 0.85,
        credibility_score: 0.7,
        is_featured: true,
        view_count: 234,
        key_insights: [
          "LangGraph enables complex multi-agent orchestration",
          "State management is crucial for agent coordination",
          "Production deployments require careful error handling"
        ],
        practical_takeaways: [
          "Start with simple two-agent systems before scaling",
          "Use checkpointing for long-running workflows",
          "Implement proper logging for debugging"
        ],
        why_it_matters: "Multi-agent systems are becoming essential for complex AI applications, and understanding these patterns is crucial for modern AI engineering.",
        published_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 1002,
        title: "Attention Mechanisms in Agentic Architectures: A Survey",
        summary: "This paper surveys recent advances in attention mechanisms specifically designed for AI agent architectures, analyzing their impact on task planning and memory management.",
        content_type: "Research",
        tags: ["Research", "AI Agents", "Attention", "Architecture"],
        source_name: "ArXiv",
        source_url: "https://arxiv.org/abs/example",
        author: "Research Team et al.",
        relevance_score: 0.92,
        credibility_score: 0.95,
        is_featured: false,
        view_count: 156,
        key_insights: [
          "Novel attention patterns improve agent planning capabilities",
          "Memory-augmented attention enhances long-term task execution",
          "Hierarchical attention enables better subtask decomposition"
        ],
        practical_takeaways: [
          "Review the full paper for methodology details",
          "Implementation code available on GitHub",
          "Consider for production deployment scenarios"
        ],
        why_it_matters: "This research contributes to the foundation of AI agent development and advances practical applications.",
        published_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 1003,
        title: "AutoGen 0.4: New Features for Enterprise Agent Workflows",
        summary: "Microsoft releases AutoGen 0.4 with improved multi-agent conversation patterns, better tool integration, and enterprise-grade security features.",
        content_type: "News",
        tags: ["AutoGen", "Microsoft", "Tooling", "Enterprise"],
        source_name: "Hacker News",
        source_url: "https://news.ycombinator.com/item?id=example",
        author: "tech_insider",
        relevance_score: 0.78,
        credibility_score: 0.65,
        is_featured: false,
        view_count: 89,
        key_insights: [
          "AutoGen 0.4 introduces conversation memory persistence",
          "New security features for enterprise deployments",
          "Improved integration with Azure services"
        ],
        practical_takeaways: [
          "Check the discussion thread for community insights",
          "API integration possibilities for your projects",
          "Consider for production deployment scenarios"
        ],
        why_it_matters: "AutoGen is a leading framework for multi-agent systems and these updates expand its enterprise capabilities.",
        published_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 1004,
        title: "crewai/crewai: Framework for orchestrating AI agents",
        summary: "CrewAI - A cutting-edge framework for orchestrating role-playing, autonomous AI agents. Enable agents to work together seamlessly, tackling complex tasks.",
        content_type: "Tooling",
        tags: ["Open Source", "Tooling", "AI Agents", "CrewAI"],
        source_name: "GitHub Trending",
        source_url: "https://github.com/crewai/crewai",
        author: "crewai",
        relevance_score: 0.88,
        credibility_score: 0.75,
        is_featured: true,
        view_count: 312,
        key_insights: [
          "CrewAI enables role-based agent collaboration",
          "Supports complex multi-step task delegation",
          "Active community with regular updates"
        ],
        practical_takeaways: [
          "Explore the repository for implementation details and examples",
          "Can be installed and tested locally",
          "API integration possibilities for your projects"
        ],
        why_it_matters: "Open source tools like CrewAI democratize access to advanced AI agent capabilities.",
        published_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 1005,
        title: "Practical Prompt Engineering for AI Agents",
        summary: "Learn effective prompt engineering techniques specifically designed for AI agent systems, including tool-use prompts, chain-of-thought reasoning, and self-correction patterns.",
        content_type: "Tutorial",
        tags: ["Prompt Engineering", "Tutorial", "AI Agents", "Best Practices"],
        source_name: "Dev.to",
        source_url: "https://dev.to/example/prompt-engineering-agents",
        author: "prompt_master",
        relevance_score: 0.82,
        credibility_score: 0.68,
        is_featured: false,
        view_count: 178,
        key_insights: [
          "Tool-use prompts require specific formatting patterns",
          "Self-correction improves agent reliability",
          "Context window management is critical for complex tasks"
        ],
        practical_takeaways: [
          "Follow along to build hands-on experience",
          "Use benchmarks to inform technology choices",
          "Stay informed about developments in this area"
        ],
        why_it_matters: "Effective prompting is foundational to building reliable AI agents and directly impacts system performance.",
        published_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 36 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 1006,
        title: "Anthropic Introduces Tool Use Best Practices for Claude",
        summary: "Anthropic releases comprehensive guidelines for implementing tool use with Claude, covering function calling patterns, error handling, and multi-turn conversations.",
        content_type: "AI Insight",
        tags: ["Anthropic", "Claude", "Tool Use", "Best Practices"],
        source_name: "Anthropic News",
        source_url: "https://anthropic.com/news/example",
        author: "Anthropic Team",
        relevance_score: 0.95,
        credibility_score: 0.98,
        is_featured: true,
        view_count: 445,
        key_insights: [
          "Structured tool definitions improve reliability",
          "Multi-turn tool use requires careful state management",
          "Error recovery patterns enhance user experience"
        ],
        practical_takeaways: [
          "Review guidelines for production implementations",
          "API integration possibilities for your projects",
          "Consider for production deployment scenarios"
        ],
        why_it_matters: "Official guidance from AI providers like Anthropic sets industry standards and best practices.",
        published_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
        created_at: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
      },
    ],
    total: 6,
    page: 1,
    page_size: 10,
    has_more: false,
  };
}

export default {
  getAIKnowledgePosts,
  getAIKnowledgePost,
  getFeedStats,
  getContentTypes,
  getSources,
  getPopularTags,
  triggerFetch,
};
