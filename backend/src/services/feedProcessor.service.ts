import { FeedItem } from "../types";

export const AI_KEYWORDS = {
  high_relevance: [
    "ai agent",
    "ai agents",
    "autonomous agent",
    "multi-agent",
    "llm",
    "large language model",
    "gpt",
    "claude",
    "gemini",
    "automation",
    "workflow automation",
    "agentic",
    "langchain",
    "autogen",
    "crew ai",
    "agent framework",
    "tool use",
    "function calling",
    "rag",
    "retrieval augmented",
    "embedding",
    "prompt engineering",
    "fine-tuning",
    "inference",
  ],
  medium_relevance: [
    "artificial intelligence",
    "machine learning",
    "neural network",
    "deep learning",
    "transformer",
    "natural language processing",
    "nlp",
    "computer vision",
    "reinforcement learning",
    "generative ai",
    "chatbot",
    "conversational ai",
  ],
  low_relevance: [
    "algorithm",
    "model",
    "data science",
    "python",
    "api",
    "engineering",
    "software",
    "development",
    "open source",
  ],
};

export const CONTENT_TYPE_KEYWORDS = {
  Research: [
    "paper",
    "study",
    "research",
    "experiment",
    "findings",
    "arxiv",
    "peer-reviewed",
    "methodology",
    "results",
  ],
  Tooling: [
    "library",
    "framework",
    "tool",
    "sdk",
    "api",
    "github",
    "release",
    "version",
    "install",
    "package",
    "repository",
  ],
  Tutorial: [
    "how to",
    "guide",
    "tutorial",
    "step by step",
    "learn",
    "beginner",
    "example",
    "walkthrough",
    "building",
  ],
  News: [
    "announced",
    "launch",
    "release",
    "update",
    "news",
    "company",
    "funding",
    "acquisition",
    "partnership",
  ],
  "AI Insight": [
    "insight",
    "analysis",
    "opinion",
    "perspective",
    "thought",
    "trend",
    "future",
    "prediction",
    "implications",
  ],
};

export const TAG_KEYWORDS: Record<string, string[]> = {
  "AI Agents": ["agent", "agents", "agentic", "autonomous"],
  Automation: ["automation", "automate", "workflow", "pipeline"],
  LLMs: ["llm", "language model", "gpt", "claude", "gemini", "mistral"],
  Research: ["research", "paper", "study", "arxiv"],
  "Open Source": ["github", "open source", "repository", "library"],
  Tutorials: ["tutorial", "guide", "how to", "learn"],
  "Multi-Agent": ["multi-agent", "multi agent", "swarm", "collective"],
  RAG: ["rag", "retrieval", "vector", "embedding"],
  "Prompt Engineering": ["prompt", "prompting", "instruction"],
  "Fine-tuning": ["fine-tune", "fine-tuning", "training", "finetune"],
};

export interface ProcessedPost {
  source_id: string;
  source_type: string;
  source_name: string;
  source_url: string;
  title: string;
  original_content: string;
  summary: string;
  key_insights: string[];
  practical_takeaways: string[];
  why_it_matters: string;
  content_type: string;
  tags: string[];
  relevance_score: number;
  credibility_score: number;
  author?: string;
  published_at?: Date;
  processed_at: Date;
}

export class ContentProcessor {
  process(item: FeedItem): ProcessedPost {
    const title = item.title || "";
    const content = item.content || "";
    const sourceType = item.source_type || "";
    const existingTags = item.tags || [];

    const summary = this.generateSummary(title, content);
    const key_insights = this.extractInsights(title, content);
    const practical_takeaways = this.generateTakeaways(title, content, sourceType);
    const why_it_matters = this.explainImportance(title, content, sourceType);
    const contentType = this.classifyContentType(title, content, sourceType);
    const tags = this.generateTags(title, content, existingTags);
    const relevanceScore = this.calculateRelevanceScore(title, content);
    const credibilityScore = this.calculateCredibilityScore(item);

    return {
      source_id: item.source_id,
      source_type: item.source_type,
      source_name: item.source_name,
      source_url: item.source_url,
      title,
      original_content: content,
      summary,
      key_insights,
      practical_takeaways,
      why_it_matters,
      content_type: contentType,
      tags,
      relevance_score: relevanceScore,
      credibility_score: credibilityScore,
      author: item.author,
      published_at: item.published_at ? new Date(item.published_at) : undefined,
      processed_at: new Date(),
    };
  }

  private cleanText(text: string): string {
    if (!text) return "";
    // Remove HTML tags
    let clean = text.replace(/<[^>]+>/g, "");
    // Remove extra whitespace
    clean = clean.replace(/\s+/g, " ");
    // Remove special chars but keep punctuation
    clean = clean.replace(/[^\w\s.,!?;:'"-]/g, "");
    return clean.trim();
  }

  private splitSentences(text: string): string[] {
    const sentences = text.split(/(?<=[.!?])\s+/);
    return sentences.map((s) => s.trim()).filter(Boolean);
  }

  private generateSummary(title: string, content: string): string {
    const text = this.cleanText(`${title}. ${content}`);
    if (text.length < 100) return text;

    const sentences = this.splitSentences(text);
    const summarySentences: string[] = [];
    let charCount = 0;
    const maxChars = 300;

    for (const sentence of sentences.slice(0, 5)) {
      if (charCount + sentence.length <= maxChars) {
        summarySentences.push(sentence);
        charCount += sentence.length;
      } else {
        break;
      }
    }

    let summary = summarySentences.join(" ");
    if (summary.length < text.length) {
      summary = summary.replace(/\.*$/, "") + "...";
    }
    return summary;
  }

  private extractInsights(title: string, content: string): string[] {
    const text = this.cleanText(`${title}. ${content}`);
    const insights: string[] = [];

    const insightPatterns = [
      /(?:key|main|important|significant)\s+(?:finding|insight|result|takeaway)[s]?[:\s]+([^.]+)/gi,
      /(?:we found|research shows|study reveals|results indicate)[:\s]+([^.]+)/gi,
      /(?:notably|importantly|significantly)[,\s]+([^.]+)/gi,
    ];

    for (const pattern of insightPatterns) {
      let match;
      while ((match = pattern.exec(text)) !== null) {
        const insight = match[1].trim();
        const formatted = insight.charAt(0).toUpperCase() + insight.slice(1) + ".";
        if (formatted.length > 20 && !insights.includes(formatted)) {
          insights.push(formatted);
        }
      }
    }

    if (insights.length === 0) {
      const sentences = this.splitSentences(text);
      for (const sentence of sentences.slice(0, 3)) {
        if (sentence.length > 30 && sentence.length < 200) {
          insights.push(sentence);
        }
        if (insights.length >= 3) break;
      }
    }

    return insights.slice(0, 3);
  }

  private generateTakeaways(title: string, content: string, sourceType: string): string[] {
    const text = this.cleanText(`${title}. ${content}`).toLowerCase();
    const takeaways: string[] = [];

    if (sourceType === "github") {
      takeaways.push("Explore the repository for implementation details and examples");
      if (text.includes("install") || text.includes("pip")) {
        takeaways.push("Can be installed and tested locally");
      }
    } else if (sourceType === "arxiv") {
      takeaways.push("Review the full paper for methodology and detailed results");
      if (text.includes("code") || text.includes("github")) {
        takeaways.push("Implementation code may be available");
      }
    } else if (sourceType === "hackernews") {
      takeaways.push("Check the discussion thread for community insights");
    }

    if (text.includes("api")) {
      takeaways.push("API integration possibilities for your projects");
    }

    if (text.includes("tutorial") || text.includes("guide") || text.includes("how to")) {
      takeaways.push("Follow along to build hands-on experience");
    }

    if (text.includes("benchmark") || text.includes("comparison") || text.includes("vs")) {
      takeaways.push("Use benchmarks to inform technology choices");
    }

    if (text.includes("production") || text.includes("deploy") || text.includes("scale")) {
      takeaways.push("Consider for production deployment scenarios");
    }

    if (takeaways.length === 0) {
      takeaways.push("Stay informed about developments in this area");
    }

    return takeaways.slice(0, 4);
  }

  private explainImportance(title: string, content: string, sourceType: string): string {
    const text = this.cleanText(`${title}. ${content}`).toLowerCase();
    const importanceFactors: string[] = [];

    if (["breakthrough", "novel", "first", "new approach"].some((w) => text.includes(w))) {
      importanceFactors.push("introduces new approaches or methodologies");
    }

    if (["production", "real-world", "deployed", "scale"].some((w) => text.includes(w))) {
      importanceFactors.push("demonstrates practical, real-world applications");
    }

    if (["open source", "github", "available"].some((w) => text.includes(w))) {
      importanceFactors.push("provides accessible tools for practitioners");
    }

    if (sourceType === "arxiv") {
      importanceFactors.push("contributes to the research foundation of AI");
    }

    if (["agent", "autonomous", "multi-agent"].some((w) => text.includes(w))) {
      importanceFactors.push("advances the field of AI agents and automation");
    }

    if (["efficiency", "faster", "improve", "better"].some((w) => text.includes(w))) {
      importanceFactors.push("offers potential performance improvements");
    }

    if (importanceFactors.length > 0) {
      let explanation = `This ${importanceFactors[0]}`;
      if (importanceFactors.length > 1) {
        explanation += ` and ${importanceFactors[1]}`;
      }
      return explanation + ".";
    }

    return "This content provides valuable insights into current AI developments and practices.";
  }

  private classifyContentType(title: string, content: string, sourceType: string): string {
    if (sourceType === "arxiv") return "Research";
    if (sourceType === "github") return "Tooling";

    const text = this.cleanText(`${title}. ${content}`).toLowerCase();
    const scores: Record<string, number> = {};

    for (const [contentType, keywords] of Object.entries(CONTENT_TYPE_KEYWORDS)) {
      scores[contentType] = keywords.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0);
    }

    let bestType = "AI Insight";
    let maxScore = 0;

    for (const [type, score] of Object.entries(scores)) {
      if (score > maxScore) {
        maxScore = score;
        bestType = type;
      }
    }

    return bestType;
  }

  private generateTags(title: string, content: string, existingTags: string[]): string[] {
    const text = this.cleanText(`${title}. ${content}`).toLowerCase();
    const tags = new Set<string>(existingTags);

    for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
      if (keywords.some((kw) => text.includes(kw))) {
        tags.add(tag);
      }
    }

    if (!Array.from(tags).some((t) => t.toLowerCase().includes("ai"))) {
      tags.add("AI");
    }

    return Array.from(tags).slice(0, 6);
  }

  private calculateRelevanceScore(title: string, content: string): number {
    const text = this.cleanText(`${title}. ${content}`).toLowerCase();
    let score = 0.0;

    const highCount = AI_KEYWORDS.high_relevance.reduce(
      (acc, kw) => acc + (text.includes(kw) ? 1 : 0),
      0
    );
    score += Math.min(highCount * 0.15, 0.6);

    const mediumCount = AI_KEYWORDS.medium_relevance.reduce(
      (acc, kw) => acc + (text.includes(kw) ? 1 : 0),
      0
    );
    score += Math.min(mediumCount * 0.08, 0.3);

    const lowCount = AI_KEYWORDS.low_relevance.reduce(
      (acc, kw) => acc + (text.includes(kw) ? 1 : 0),
      0
    );
    score += Math.min(lowCount * 0.02, 0.1);

    return Math.min(score, 1.0);
  }

  private calculateCredibilityScore(item: FeedItem): number {
    const sourceType = item.source_type || "";
    const sourceName = (item.source_name || "").toLowerCase();

    const baseScores: Record<string, number> = {
      arxiv: 0.9,
      github: 0.7,
      rss: 0.6,
      hackernews: 0.6,
    };

    let score = baseScores[sourceType] || 0.5;

    if (["openai", "anthropic", "google", "meta"].some((name) => sourceName.includes(name))) {
      score = Math.min(score + 0.2, 1.0);
    }

    return score;
  }
}

export function processFeedItems(items: FeedItem[]): ProcessedPost[] {
  const processor = new ContentProcessor();
  const processed: ProcessedPost[] = [];
  for (const item of items) {
    try {
      processed.push(processor.process(item));
    } catch (e: any) {
      console.error(`Error processing item '${item.title}': ${e.message}`);
    }
  }
  return processed;
}

export function filterAndRankPosts(posts: ProcessedPost[], minRelevance = 0.3): ProcessedPost[] {
  const filtered = posts.filter((p) => p.relevance_score >= minRelevance);

  const postsWithScore = filtered.map((post) => ({
    ...post,
    combined_score: post.relevance_score * 0.6 + post.credibility_score * 0.4,
  }));

  const sorted = postsWithScore.sort((a, b) => b.combined_score - a.combined_score);

  // Return without combined_score field
  return sorted.map((p) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { combined_score: _, ...rest } = p as any;
    return rest;
  });
}
