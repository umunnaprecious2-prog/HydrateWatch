import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { FeedItem } from "../types";

const xmlParser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "",
});

export const AI_QUERIES = [
  "AI agents technology",
  "multi-agent systems artificial intelligence",
  "AI automation workflows",
  "applied AI engineering",
  "large language models applications",
];

export const HN_AI_KEYWORDS = [
  "AI",
  "GPT",
  "LLM",
  "agent",
  "automation",
  "machine learning",
  "neural",
  "transformer",
  "anthropic",
  "openai",
  "claude",
];

// Helper to hash string to a unique ID prefix
function hashCode(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(16);
}

export async function fetchGoogleNews(): Promise<FeedItem[]> {
  const items: FeedItem[] = [];
  for (const query of AI_QUERIES) {
    try {
      const encodedQuery = encodeURIComponent(query);
      const url = `https://news.google.com/rss/search?q=${encodedQuery}&hl=en-US&gl=US&ceid=US:en`;
      const response = await axios.get(url, { timeout: 10000 });
      if (response.status === 200) {
        const parsed = xmlParser.parse(response.data);
        const rssItems = parsed.rss?.channel?.item;
        if (rssItems) {
          const list = Array.isArray(rssItems) ? rssItems.slice(0, 5) : [rssItems];
          for (const item of list) {
            const title = item.title || "";
            const link = item.link || "";
            const description = item.description || "";
            const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

            items.push({
              source_id: `gnews_${hashCode(link)}`,
              source_type: "rss",
              source_name: "Google News",
              source_url: link,
              title,
              content: description,
              published_at: pubDate,
              tags: ["AI", query.split(" ")[0].toUpperCase()],
            });
          }
        }
      }
    } catch (e: any) {
      console.error(`Error fetching Google News for '${query}': ${e.message}`);
    }
  }
  return items;
}

export async function fetchArxiv(): Promise<FeedItem[]> {
  const items: FeedItem[] = [];
  const categories = ["cs.AI", "cs.MA", "cs.LG", "cs.CL"];
  const catQuery = categories.map((cat) => `cat:${cat}`).join("+OR+");
  const url = `http://export.arxiv.org/api/query?search_query=${catQuery}&sortBy=submittedDate&sortOrder=descending&max_results=20`;

  try {
    const response = await axios.get(url, { timeout: 15000 });
    if (response.status === 200) {
      const parsed = xmlParser.parse(response.data);
      const entries = parsed.feed?.entry;
      if (entries) {
        const list = Array.isArray(entries) ? entries : [entries];
        for (const entry of list) {
          const title = (entry.title || "").trim().replace(/\n/g, " ");
          const summary = (entry.summary || "").trim();
          const id = entry.id || "";
          const arxivId = id.split("/abs/").pop() || id.split("/").pop() || "";

          let link = id;
          if (entry.link) {
            const links = Array.isArray(entry.link) ? entry.link : [entry.link];
            const htmlLink = links.find(
              (l: any) => l.type === "text/html" || l.rel === "alternate"
            );
            if (htmlLink) {
              link = htmlLink.href;
            }
          }

          const published = entry.published ? new Date(entry.published) : new Date();

          // Authors parsing
          let authorStr = "";
          if (entry.author) {
            const authorsList = Array.isArray(entry.author) ? entry.author : [entry.author];
            const names = authorsList.map((a: any) => a.name).filter(Boolean);
            authorStr = names.slice(0, 3).join(", ");
            if (names.length > 3) {
              authorStr += " et al.";
            }
          }

          const tags = ["Research", "AI"];
          // Primary category
          const primaryCat = entry["arxiv:primary_category"];
          if (primaryCat && primaryCat.term) {
            tags.push(primaryCat.term);
          }

          items.push({
            source_id: `arxiv_${arxivId}`,
            source_type: "arxiv",
            source_name: "ArXiv",
            source_url: link,
            title,
            content: summary,
            author: authorStr,
            published_at: published,
            tags,
          });
        }
      }
    }
  } catch (e: any) {
    console.error(`Error fetching ArXiv: ${e.message}`);
  }
  return items;
}

export async function fetchHackerNews(): Promise<FeedItem[]> {
  const items: FeedItem[] = [];
  try {
    const topStoriesRes = await axios.get("https://hacker-news.firebaseio.com/v0/topstories.json", {
      timeout: 10000,
    });
    if (topStoriesRes.status === 200) {
      const storyIds = topStoriesRes.data.slice(0, 50); // Fetch top 50

      const promises = storyIds.map(async (storyId: number) => {
        try {
          const res = await axios.get(
            `https://hacker-news.firebaseio.com/v0/item/${storyId}.json`,
            {
              timeout: 5000,
            }
          );
          if (res.status === 200 && res.data) {
            const story = res.data;
            const title = story.title || "";
            const text = story.text || "";
            const content = `${title} ${text}`.toLowerCase();

            const isAIRelated = HN_AI_KEYWORDS.some((keyword) =>
              content.includes(keyword.toLowerCase())
            );

            if (isAIRelated) {
              return {
                source_id: `hn_${storyId}`,
                source_type: "hackernews",
                source_name: "Hacker News",
                source_url: story.url || `https://news.ycombinator.com/item?id=${storyId}`,
                title: story.title,
                content: story.text || story.title,
                author: story.by,
                published_at: new Date(story.time * 1000),
                tags: ["Discussion", "Tech"],
              };
            }
          }
        } catch {
          // Ignore fetch errors for individual stories
        }
        return null;
      });

      const results = await Promise.all(promises);
      for (const story of results) {
        if (story) {
          items.push(story);
        }
      }
    }
  } catch (e: any) {
    console.error(`Error fetching Hacker News: ${e.message}`);
  }
  return items.slice(0, 15);
}

export async function fetchDevTo(): Promise<FeedItem[]> {
  const items: FeedItem[] = [];
  const tags = ["ai", "machinelearning", "llm", "automation", "agents"];

  for (const tag of tags) {
    try {
      const url = `https://dev.to/feed/tag/${tag}`;
      const response = await axios.get(url, { timeout: 10000 });
      if (response.status === 200) {
        const parsed = xmlParser.parse(response.data);
        const rssItems = parsed.rss?.channel?.item;
        if (rssItems) {
          const list = Array.isArray(rssItems) ? rssItems.slice(0, 5) : [rssItems];
          for (const item of list) {
            const title = item.title || "";
            const link = item.link || "";
            const description = (item.description || "").replace(/<[^>]+>/g, "").slice(0, 1000);
            const creator = item["dc:creator"] || item.creator || "";
            const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

            items.push({
              source_id: `devto_${hashCode(link)}`,
              source_type: "rss",
              source_name: "Dev.to",
              source_url: link,
              title,
              content: description,
              author: creator,
              published_at: pubDate,
              tags: ["Tutorial", tag.toUpperCase()],
            });
          }
        }
      }
    } catch (e: any) {
      console.error(`Error fetching Dev.to tag '${tag}': ${e.message}`);
    }
  }
  return items.slice(0, 15);
}

export async function fetchGithubTrending(): Promise<FeedItem[]> {
  const items: FeedItem[] = [];
  const queries = [
    "ai-agents",
    "llm-agents",
    "autonomous-agents",
    "multi-agent",
    "langchain",
    "autogen",
  ];

  for (const query of queries) {
    try {
      const url = `https://api.github.com/search/repositories?q=${query}+language:python&sort=updated&order=desc&per_page=5`;
      const response = await axios.get(url, {
        headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "HydrateWatch-App" },
        timeout: 10000,
      });

      if (response.status === 200 && response.data && response.data.items) {
        for (const repo of response.data.items) {
          items.push({
            source_id: `gh_${repo.id}`,
            source_type: "github",
            source_name: "GitHub Trending",
            source_url: repo.html_url,
            title: `${repo.full_name}: ${(repo.description || "No description").slice(0, 100)}`,
            content: repo.description || "",
            author: repo.owner.login,
            published_at: new Date(repo.updated_at),
            tags: ["Tooling", "Open Source", query],
          });
        }
      }
      // Brief sleep to respect API limits
      await new Promise((resolve) => setTimeout(resolve, 500));
    } catch (e: any) {
      console.error(`Error fetching GitHub trending for '${query}': ${e.message}`);
    }
  }
  return items.slice(0, 15);
}

export async function fetchOfficialBlogs(): Promise<FeedItem[]> {
  const items: FeedItem[] = [];
  const feeds = [
    { url: "https://openai.com/blog/rss/", name: "OpenAI Blog" },
    { url: "https://www.anthropic.com/news.rss", name: "Anthropic News" },
  ];

  for (const feed of feeds) {
    try {
      const response = await axios.get(feed.url, { timeout: 10000 });
      if (response.status === 200) {
        const parsed = xmlParser.parse(response.data);
        const rssItems = parsed.rss?.channel?.item;
        if (rssItems) {
          const list = Array.isArray(rssItems) ? rssItems.slice(0, 10) : [rssItems];
          for (const item of list) {
            const title = item.title || "";
            const link = item.link || "";
            const description = (item.description || "").replace(/<[^>]+>/g, "").slice(0, 2000);
            const pubDate = item.pubDate ? new Date(item.pubDate) : new Date();

            items.push({
              source_id: `blog_${hashCode(link)}`,
              source_type: "rss",
              source_name: feed.name,
              source_url: link,
              title,
              content: description,
              published_at: pubDate,
              tags: ["Official", "AI News"],
            });
          }
        }
      }
    } catch (e: any) {
      console.error(`Error fetching official blog ${feed.name}: ${e.message}`);
    }
  }
  return items;
}

export async function fetchAllSources(): Promise<FeedItem[]> {
  const allItems: FeedItem[] = [];
  console.log("Starting feed fetch from all sources...");

  const results = await Promise.allSettled([
    fetchGoogleNews(),
    fetchArxiv(),
    fetchHackerNews(),
    fetchDevTo(),
    fetchGithubTrending(),
    fetchOfficialBlogs(),
  ]);

  results.forEach((res, index) => {
    const sources = [
      "Google News",
      "ArXiv",
      "Hacker News",
      "Dev.to",
      "GitHub Trending",
      "Official Blogs",
    ];
    if (res.status === "fulfilled") {
      allItems.push(...res.value);
      console.log(`Fetched ${res.value.length} items from ${sources[index]}`);
    } else {
      console.error(`Failed to fetch from ${sources[index]}:`, res.reason);
    }
  });

  return allItems;
}
