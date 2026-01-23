"""
AI Knowledge Feed - Data Source Connectors
Fetches content from approved public sources only.

APPROVED SOURCES:
- Google News RSS (AI-related queries)
- ArXiv (AI/ML/Agents categories)
- Hacker News API (AI-related threads)
- Dev.to RSS feeds
- Medium RSS feeds (AI publications)
- GitHub Trending (AI repositories)
- Official AI blogs (OpenAI, Anthropic, Google AI, Meta AI)

NO SCRAPING of private platforms (Instagram, Facebook, LinkedIn).
NO bypassing paywalls.
"""

import httpx
import xml.etree.ElementTree as ET
from datetime import datetime, timedelta
from typing import List, Dict, Any, Optional
import json
import re
from urllib.parse import quote_plus
import asyncio


class FeedItem:
    """Standardized feed item structure."""

    def __init__(
        self,
        source_id: str,
        source_type: str,
        source_name: str,
        source_url: str,
        title: str,
        content: str,
        author: Optional[str] = None,
        published_at: Optional[datetime] = None,
        tags: List[str] = None,
    ):
        self.source_id = source_id
        self.source_type = source_type
        self.source_name = source_name
        self.source_url = source_url
        self.title = title
        self.content = content
        self.author = author
        self.published_at = published_at or datetime.utcnow()
        self.tags = tags or []

    def to_dict(self) -> Dict[str, Any]:
        return {
            "source_id": self.source_id,
            "source_type": self.source_type,
            "source_name": self.source_name,
            "source_url": self.source_url,
            "title": self.title,
            "content": self.content,
            "author": self.author,
            "published_at": self.published_at.isoformat() if self.published_at else None,
            "tags": self.tags,
        }


class BaseFeedSource:
    """Base class for feed sources."""

    source_type: str = "base"
    source_name: str = "Base Source"
    credibility_weight: float = 0.5

    def __init__(self, config: Optional[Dict] = None):
        self.config = config or {}
        self.client = httpx.AsyncClient(timeout=30.0)

    async def fetch(self) -> List[FeedItem]:
        """Fetch items from the source."""
        raise NotImplementedError

    async def close(self):
        await self.client.aclose()


class GoogleNewsRSSSource(BaseFeedSource):
    """Google News RSS feed for AI-related queries."""

    source_type = "rss"
    source_name = "Google News"
    credibility_weight = 0.7

    AI_QUERIES = [
        "AI agents technology",
        "multi-agent systems artificial intelligence",
        "AI automation workflows",
        "applied AI engineering",
        "large language models applications",
    ]

    async def fetch(self) -> List[FeedItem]:
        items = []
        for query in self.AI_QUERIES:
            try:
                encoded_query = quote_plus(query)
                url = f"https://news.google.com/rss/search?q={encoded_query}&hl=en-US&gl=US&ceid=US:en"
                response = await self.client.get(url)
                if response.status_code == 200:
                    items.extend(self._parse_rss(response.text, query))
            except Exception as e:
                print(f"Error fetching Google News for '{query}': {e}")
        return items

    def _parse_rss(self, xml_content: str, query: str) -> List[FeedItem]:
        items = []
        try:
            root = ET.fromstring(xml_content)
            for item in root.findall(".//item")[:5]:  # Limit per query
                title = item.find("title")
                link = item.find("link")
                description = item.find("description")
                pub_date = item.find("pubDate")

                if title is not None and link is not None:
                    source_id = f"gnews_{hash(link.text)}"
                    pub_datetime = None
                    if pub_date is not None and pub_date.text:
                        try:
                            pub_datetime = datetime.strptime(
                                pub_date.text, "%a, %d %b %Y %H:%M:%S %Z"
                            )
                        except:
                            pub_datetime = datetime.utcnow()

                    items.append(
                        FeedItem(
                            source_id=source_id,
                            source_type=self.source_type,
                            source_name=self.source_name,
                            source_url=link.text if link is not None else "",
                            title=title.text or "",
                            content=description.text if description is not None else "",
                            published_at=pub_datetime,
                            tags=["AI", query.split()[0].upper()],
                        )
                    )
        except ET.ParseError as e:
            print(f"Error parsing RSS: {e}")
        return items


class ArxivSource(BaseFeedSource):
    """ArXiv API for AI/ML research papers."""

    source_type = "arxiv"
    source_name = "ArXiv"
    credibility_weight = 0.9  # High credibility for peer-reviewed research

    CATEGORIES = [
        "cs.AI",  # Artificial Intelligence
        "cs.MA",  # Multiagent Systems
        "cs.LG",  # Machine Learning
        "cs.CL",  # Computation and Language (NLP)
    ]

    async def fetch(self) -> List[FeedItem]:
        items = []
        categories = "+OR+".join([f"cat:{cat}" for cat in self.CATEGORIES])
        url = f"http://export.arxiv.org/api/query?search_query={categories}&sortBy=submittedDate&sortOrder=descending&max_results=20"

        try:
            response = await self.client.get(url)
            if response.status_code == 200:
                items = self._parse_atom(response.text)
        except Exception as e:
            print(f"Error fetching ArXiv: {e}")
        return items

    def _parse_atom(self, xml_content: str) -> List[FeedItem]:
        items = []
        try:
            # ArXiv uses Atom format with namespaces
            ns = {
                "atom": "http://www.w3.org/2005/Atom",
                "arxiv": "http://arxiv.org/schemas/atom",
            }
            root = ET.fromstring(xml_content)

            for entry in root.findall("atom:entry", ns):
                title = entry.find("atom:title", ns)
                summary = entry.find("atom:summary", ns)
                link = entry.find('atom:link[@type="text/html"]', ns)
                if link is None:
                    link = entry.find("atom:id", ns)
                published = entry.find("atom:published", ns)
                authors = entry.findall("atom:author/atom:name", ns)
                categories = entry.findall("arxiv:primary_category", ns)

                if title is not None:
                    source_id = f"arxiv_{entry.find('atom:id', ns).text.split('/')[-1]}"
                    pub_datetime = None
                    if published is not None and published.text:
                        try:
                            pub_datetime = datetime.fromisoformat(
                                published.text.replace("Z", "+00:00")
                            )
                        except:
                            pub_datetime = datetime.utcnow()

                    author_names = [a.text for a in authors if a.text]
                    author_str = ", ".join(author_names[:3])
                    if len(author_names) > 3:
                        author_str += " et al."

                    tags = ["Research", "AI"]
                    for cat in categories:
                        term = cat.get("term", "")
                        if term:
                            tags.append(term)

                    items.append(
                        FeedItem(
                            source_id=source_id,
                            source_type=self.source_type,
                            source_name=self.source_name,
                            source_url=link.text if hasattr(link, "text") else link.get("href", ""),
                            title=title.text.strip().replace("\n", " ") if title.text else "",
                            content=summary.text.strip() if summary is not None and summary.text else "",
                            author=author_str,
                            published_at=pub_datetime,
                            tags=tags,
                        )
                    )
        except ET.ParseError as e:
            print(f"Error parsing ArXiv Atom: {e}")
        return items


class HackerNewsSource(BaseFeedSource):
    """Hacker News API for AI-related discussions."""

    source_type = "hackernews"
    source_name = "Hacker News"
    credibility_weight = 0.6

    AI_KEYWORDS = [
        "AI", "GPT", "LLM", "agent", "automation", "machine learning",
        "neural", "transformer", "anthropic", "openai", "claude",
    ]

    async def fetch(self) -> List[FeedItem]:
        items = []
        try:
            # Get top stories
            response = await self.client.get(
                "https://hacker-news.firebaseio.com/v0/topstories.json"
            )
            if response.status_code == 200:
                story_ids = response.json()[:100]  # Get top 100

                # Fetch story details in parallel (batch of 20)
                tasks = []
                for story_id in story_ids[:50]:
                    tasks.append(self._fetch_story(story_id))

                stories = await asyncio.gather(*tasks, return_exceptions=True)

                for story in stories:
                    if isinstance(story, FeedItem):
                        items.append(story)

        except Exception as e:
            print(f"Error fetching Hacker News: {e}")
        return items[:15]  # Limit to top 15 AI-related

    async def _fetch_story(self, story_id: int) -> Optional[FeedItem]:
        try:
            response = await self.client.get(
                f"https://hacker-news.firebaseio.com/v0/item/{story_id}.json"
            )
            if response.status_code == 200:
                story = response.json()
                if story and self._is_ai_related(story):
                    return FeedItem(
                        source_id=f"hn_{story_id}",
                        source_type=self.source_type,
                        source_name=self.source_name,
                        source_url=story.get("url", f"https://news.ycombinator.com/item?id={story_id}"),
                        title=story.get("title", ""),
                        content=story.get("text", story.get("title", "")),
                        author=story.get("by"),
                        published_at=datetime.fromtimestamp(story.get("time", 0)),
                        tags=["Discussion", "Tech"],
                    )
        except Exception:
            pass
        return None

    def _is_ai_related(self, story: Dict) -> bool:
        title = story.get("title", "").lower()
        text = story.get("text", "").lower() if story.get("text") else ""
        content = f"{title} {text}"
        return any(kw.lower() in content for kw in self.AI_KEYWORDS)


class DevToRSSSource(BaseFeedSource):
    """Dev.to RSS feed for AI-related articles."""

    source_type = "rss"
    source_name = "Dev.to"
    credibility_weight = 0.6

    async def fetch(self) -> List[FeedItem]:
        items = []
        tags = ["ai", "machinelearning", "llm", "automation", "agents"]

        for tag in tags:
            try:
                url = f"https://dev.to/feed/tag/{tag}"
                response = await self.client.get(url)
                if response.status_code == 200:
                    items.extend(self._parse_rss(response.text, tag))
            except Exception as e:
                print(f"Error fetching Dev.to tag '{tag}': {e}")
        return items[:15]

    def _parse_rss(self, xml_content: str, tag: str) -> List[FeedItem]:
        items = []
        try:
            root = ET.fromstring(xml_content)
            for item in root.findall(".//item")[:5]:
                title = item.find("title")
                link = item.find("link")
                description = item.find("description")
                creator = item.find("{http://purl.org/dc/elements/1.1/}creator")
                pub_date = item.find("pubDate")

                if title is not None and link is not None:
                    source_id = f"devto_{hash(link.text)}"
                    pub_datetime = None
                    if pub_date is not None and pub_date.text:
                        try:
                            pub_datetime = datetime.strptime(
                                pub_date.text, "%a, %d %b %Y %H:%M:%S %z"
                            )
                        except:
                            pub_datetime = datetime.utcnow()

                    items.append(
                        FeedItem(
                            source_id=source_id,
                            source_type=self.source_type,
                            source_name=self.source_name,
                            source_url=link.text if link is not None else "",
                            title=title.text or "",
                            content=self._clean_html(description.text) if description is not None else "",
                            author=creator.text if creator is not None else None,
                            published_at=pub_datetime,
                            tags=["Tutorial", tag.upper()],
                        )
                    )
        except ET.ParseError as e:
            print(f"Error parsing Dev.to RSS: {e}")
        return items

    def _clean_html(self, html: str) -> str:
        if not html:
            return ""
        clean = re.sub(r"<[^>]+>", "", html)
        return clean[:1000]  # Limit content length


class GitHubTrendingSource(BaseFeedSource):
    """GitHub API for trending AI repositories."""

    source_type = "github"
    source_name = "GitHub Trending"
    credibility_weight = 0.7

    async def fetch(self) -> List[FeedItem]:
        items = []
        queries = [
            "ai-agents",
            "llm-agents",
            "autonomous-agents",
            "multi-agent",
            "langchain",
            "autogen",
        ]

        for query in queries:
            try:
                # Search for recently updated repos
                url = f"https://api.github.com/search/repositories?q={query}+language:python&sort=updated&order=desc&per_page=5"
                headers = {"Accept": "application/vnd.github.v3+json"}
                response = await self.client.get(url, headers=headers)

                if response.status_code == 200:
                    data = response.json()
                    for repo in data.get("items", []):
                        source_id = f"gh_{repo['id']}"
                        items.append(
                            FeedItem(
                                source_id=source_id,
                                source_type=self.source_type,
                                source_name=self.source_name,
                                source_url=repo["html_url"],
                                title=f"{repo['full_name']}: {repo.get('description', 'No description')[:100]}",
                                content=repo.get("description", ""),
                                author=repo["owner"]["login"],
                                published_at=datetime.fromisoformat(
                                    repo["updated_at"].replace("Z", "+00:00")
                                ),
                                tags=["Tooling", "Open Source", query],
                            )
                        )
                await asyncio.sleep(1)  # Rate limiting
            except Exception as e:
                print(f"Error fetching GitHub for '{query}': {e}")
        return items[:15]


class OfficialBlogRSSSource(BaseFeedSource):
    """Official AI company blogs via RSS."""

    source_type = "rss"
    source_name = "AI Company Blogs"
    credibility_weight = 0.95  # Very high credibility for official sources

    BLOG_FEEDS = [
        ("https://openai.com/blog/rss/", "OpenAI Blog"),
        ("https://www.anthropic.com/news.rss", "Anthropic News"),
        # Add more official blogs as needed
    ]

    async def fetch(self) -> List[FeedItem]:
        items = []
        for url, name in self.BLOG_FEEDS:
            try:
                response = await self.client.get(url)
                if response.status_code == 200:
                    items.extend(self._parse_rss(response.text, name, url))
            except Exception as e:
                print(f"Error fetching {name}: {e}")
        return items

    def _parse_rss(self, xml_content: str, source_name: str, base_url: str) -> List[FeedItem]:
        items = []
        try:
            root = ET.fromstring(xml_content)
            for item in root.findall(".//item")[:10]:
                title = item.find("title")
                link = item.find("link")
                description = item.find("description")
                pub_date = item.find("pubDate")

                if title is not None and link is not None:
                    source_id = f"blog_{hash(link.text)}"
                    pub_datetime = None
                    if pub_date is not None and pub_date.text:
                        try:
                            pub_datetime = datetime.strptime(
                                pub_date.text, "%a, %d %b %Y %H:%M:%S %Z"
                            )
                        except:
                            try:
                                pub_datetime = datetime.strptime(
                                    pub_date.text, "%a, %d %b %Y %H:%M:%S %z"
                                )
                            except:
                                pub_datetime = datetime.utcnow()

                    items.append(
                        FeedItem(
                            source_id=source_id,
                            source_type=self.source_type,
                            source_name=source_name,
                            source_url=link.text if link is not None else "",
                            title=title.text or "",
                            content=self._clean_html(description.text) if description is not None else "",
                            published_at=pub_datetime,
                            tags=["Official", "AI News"],
                        )
                    )
        except ET.ParseError as e:
            print(f"Error parsing {source_name} RSS: {e}")
        return items

    def _clean_html(self, html: str) -> str:
        if not html:
            return ""
        clean = re.sub(r"<[^>]+>", "", html)
        return clean[:2000]


# Registry of all available sources
FEED_SOURCES = {
    "google_news": GoogleNewsRSSSource,
    "arxiv": ArxivSource,
    "hackernews": HackerNewsSource,
    "devto": DevToRSSSource,
    "github": GitHubTrendingSource,
    "official_blogs": OfficialBlogRSSSource,
}


async def fetch_all_sources() -> List[FeedItem]:
    """Fetch from all registered sources."""
    all_items = []
    for name, source_class in FEED_SOURCES.items():
        try:
            source = source_class()
            items = await source.fetch()
            all_items.extend(items)
            await source.close()
            print(f"Fetched {len(items)} items from {name}")
        except Exception as e:
            print(f"Error fetching from {name}: {e}")
    return all_items
