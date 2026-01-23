"""
AI Knowledge Feed - Content Processing Pipeline
Processes raw content to extract insights and generate summaries.

Processing steps:
1. Extract key insights from content
2. Generate concise, readable summary
3. Explain why it matters
4. Highlight practical takeaways
5. Tag content appropriately
6. Score for relevance and credibility
"""

import re
from typing import List, Dict, Any, Tuple
from datetime import datetime


# AI-related keywords for relevance scoring
AI_KEYWORDS = {
    "high_relevance": [
        "ai agent", "ai agents", "autonomous agent", "multi-agent",
        "llm", "large language model", "gpt", "claude", "gemini",
        "automation", "workflow automation", "agentic", "langchain",
        "autogen", "crew ai", "agent framework", "tool use",
        "function calling", "rag", "retrieval augmented", "embedding",
        "prompt engineering", "fine-tuning", "inference",
    ],
    "medium_relevance": [
        "artificial intelligence", "machine learning", "neural network",
        "deep learning", "transformer", "natural language processing",
        "nlp", "computer vision", "reinforcement learning",
        "generative ai", "chatbot", "conversational ai",
    ],
    "low_relevance": [
        "algorithm", "model", "data science", "python", "api",
        "engineering", "software", "development", "open source",
    ],
}

# Content type classification keywords
CONTENT_TYPE_KEYWORDS = {
    "Research": [
        "paper", "study", "research", "experiment", "findings",
        "arxiv", "peer-reviewed", "methodology", "results",
    ],
    "Tooling": [
        "library", "framework", "tool", "sdk", "api", "github",
        "release", "version", "install", "package", "repository",
    ],
    "Tutorial": [
        "how to", "guide", "tutorial", "step by step", "learn",
        "beginner", "example", "walkthrough", "building",
    ],
    "News": [
        "announced", "launch", "release", "update", "news",
        "company", "funding", "acquisition", "partnership",
    ],
    "AI Insight": [
        "insight", "analysis", "opinion", "perspective", "thought",
        "trend", "future", "prediction", "implications",
    ],
}

# Tag mapping for content categorization
TAG_KEYWORDS = {
    "AI Agents": ["agent", "agents", "agentic", "autonomous"],
    "Automation": ["automation", "automate", "workflow", "pipeline"],
    "LLMs": ["llm", "language model", "gpt", "claude", "gemini", "mistral"],
    "Research": ["research", "paper", "study", "arxiv"],
    "Open Source": ["github", "open source", "repository", "library"],
    "Tutorials": ["tutorial", "guide", "how to", "learn"],
    "Multi-Agent": ["multi-agent", "multi agent", "swarm", "collective"],
    "RAG": ["rag", "retrieval", "vector", "embedding"],
    "Prompt Engineering": ["prompt", "prompting", "instruction"],
    "Fine-tuning": ["fine-tune", "fine-tuning", "training", "finetune"],
}


class ContentProcessor:
    """Processes raw feed content into structured knowledge posts."""

    def __init__(self):
        self.processed_count = 0

    def process(self, feed_item: Dict[str, Any]) -> Dict[str, Any]:
        """
        Process a single feed item into a structured knowledge post.

        Args:
            feed_item: Raw feed item with title, content, source info

        Returns:
            Processed post with summary, insights, takeaways, etc.
        """
        title = feed_item.get("title", "")
        content = feed_item.get("content", "")
        source_type = feed_item.get("source_type", "")
        existing_tags = feed_item.get("tags", [])

        # Generate summary
        summary = self._generate_summary(title, content)

        # Extract key insights
        key_insights = self._extract_insights(title, content)

        # Generate practical takeaways
        practical_takeaways = self._generate_takeaways(title, content, source_type)

        # Explain why it matters
        why_it_matters = self._explain_importance(title, content, source_type)

        # Classify content type
        content_type = self._classify_content_type(title, content, source_type)

        # Generate tags
        suggested_tags = self._generate_tags(title, content, existing_tags)

        # Calculate relevance score
        relevance_score = self._calculate_relevance_score(title, content)

        # Calculate credibility score based on source
        credibility_score = self._calculate_credibility_score(feed_item)

        self.processed_count += 1

        return {
            "summary": summary,
            "key_insights": key_insights,
            "practical_takeaways": practical_takeaways,
            "why_it_matters": why_it_matters,
            "content_type": content_type,
            "tags": suggested_tags,
            "relevance_score": relevance_score,
            "credibility_score": credibility_score,
            "processed_at": datetime.utcnow().isoformat(),
        }

    def _generate_summary(self, title: str, content: str) -> str:
        """Generate a concise summary of the content."""
        # Clean and normalize content
        text = self._clean_text(f"{title}. {content}")

        if len(text) < 100:
            return text

        # Extract first meaningful sentences
        sentences = self._split_sentences(text)
        summary_sentences = []
        char_count = 0
        max_chars = 300

        for sentence in sentences[:5]:
            if char_count + len(sentence) <= max_chars:
                summary_sentences.append(sentence)
                char_count += len(sentence)
            else:
                break

        summary = " ".join(summary_sentences)
        if len(summary) < len(text):
            summary = summary.rstrip(".") + "..."

        return summary

    def _extract_insights(self, title: str, content: str) -> List[str]:
        """Extract key insights from the content."""
        text = self._clean_text(f"{title}. {content}")
        insights = []

        # Look for insight patterns
        insight_patterns = [
            r"(?:key|main|important|significant)\s+(?:finding|insight|result|takeaway)[s]?[:\s]+([^.]+\.)",
            r"(?:we found|research shows|study reveals|results indicate)[:\s]+([^.]+\.)",
            r"(?:notably|importantly|significantly)[,\s]+([^.]+\.)",
        ]

        for pattern in insight_patterns:
            matches = re.findall(pattern, text.lower())
            for match in matches[:2]:
                insight = match.strip().capitalize()
                if len(insight) > 20 and insight not in insights:
                    insights.append(insight)

        # If no patterns found, extract from first sentences
        if not insights:
            sentences = self._split_sentences(text)
            for sentence in sentences[:3]:
                if len(sentence) > 30 and len(sentence) < 200:
                    insights.append(sentence)
                if len(insights) >= 3:
                    break

        return insights[:3]

    def _generate_takeaways(self, title: str, content: str, source_type: str) -> List[str]:
        """Generate practical takeaways for the reader."""
        text = self._clean_text(f"{title}. {content}")
        takeaways = []

        # Source-specific takeaways
        if source_type == "github":
            takeaways.append("Explore the repository for implementation details and examples")
            if "install" in text.lower() or "pip" in text.lower():
                takeaways.append("Can be installed and tested locally")

        elif source_type == "arxiv":
            takeaways.append("Review the full paper for methodology and detailed results")
            if "code" in text.lower() or "github" in text.lower():
                takeaways.append("Implementation code may be available")

        elif source_type == "hackernews":
            takeaways.append("Check the discussion thread for community insights")

        # Content-based takeaways
        if "api" in text.lower():
            takeaways.append("API integration possibilities for your projects")

        if any(word in text.lower() for word in ["tutorial", "guide", "how to"]):
            takeaways.append("Follow along to build hands-on experience")

        if any(word in text.lower() for word in ["benchmark", "comparison", "vs"]):
            takeaways.append("Use benchmarks to inform technology choices")

        if any(word in text.lower() for word in ["production", "deploy", "scale"]):
            takeaways.append("Consider for production deployment scenarios")

        # Ensure we have at least one takeaway
        if not takeaways:
            takeaways.append("Stay informed about developments in this area")

        return takeaways[:4]

    def _explain_importance(self, title: str, content: str, source_type: str) -> str:
        """Explain why this content matters."""
        text = self._clean_text(f"{title}. {content}").lower()

        importance_factors = []

        # Check for specific importance indicators
        if any(word in text for word in ["breakthrough", "novel", "first", "new approach"]):
            importance_factors.append("introduces new approaches or methodologies")

        if any(word in text for word in ["production", "real-world", "deployed", "scale"]):
            importance_factors.append("demonstrates practical, real-world applications")

        if any(word in text for word in ["open source", "github", "available"]):
            importance_factors.append("provides accessible tools for practitioners")

        if source_type == "arxiv":
            importance_factors.append("contributes to the research foundation of AI")

        if any(word in text for word in ["agent", "autonomous", "multi-agent"]):
            importance_factors.append("advances the field of AI agents and automation")

        if any(word in text for word in ["efficiency", "faster", "improve", "better"]):
            importance_factors.append("offers potential performance improvements")

        if importance_factors:
            return f"This {importance_factors[0]}" + (
                f" and {importance_factors[1]}" if len(importance_factors) > 1 else ""
            ) + "."

        return "This content provides valuable insights into current AI developments and practices."

    def _classify_content_type(self, title: str, content: str, source_type: str) -> str:
        """Classify the type of content."""
        text = self._clean_text(f"{title}. {content}").lower()

        # Source-based classification
        if source_type == "arxiv":
            return "Research"
        if source_type == "github":
            return "Tooling"

        # Keyword-based classification
        scores = {}
        for content_type, keywords in CONTENT_TYPE_KEYWORDS.items():
            score = sum(1 for kw in keywords if kw in text)
            scores[content_type] = score

        if scores:
            best_type = max(scores, key=scores.get)
            if scores[best_type] > 0:
                return best_type

        return "AI Insight"

    def _generate_tags(self, title: str, content: str, existing_tags: List[str]) -> List[str]:
        """Generate relevant tags for the content."""
        text = self._clean_text(f"{title}. {content}").lower()
        tags = set(existing_tags)

        for tag, keywords in TAG_KEYWORDS.items():
            if any(kw in text for kw in keywords):
                tags.add(tag)

        # Ensure we have the basic AI tag
        if not any("ai" in t.lower() for t in tags):
            tags.add("AI")

        return list(tags)[:6]

    def _calculate_relevance_score(self, title: str, content: str) -> float:
        """Calculate relevance score (0-1) based on AI-related keywords."""
        text = self._clean_text(f"{title}. {content}").lower()
        score = 0.0

        # High relevance keywords (weight: 0.15 each, max 0.6)
        high_count = sum(1 for kw in AI_KEYWORDS["high_relevance"] if kw in text)
        score += min(high_count * 0.15, 0.6)

        # Medium relevance keywords (weight: 0.08 each, max 0.3)
        medium_count = sum(1 for kw in AI_KEYWORDS["medium_relevance"] if kw in text)
        score += min(medium_count * 0.08, 0.3)

        # Low relevance keywords (weight: 0.02 each, max 0.1)
        low_count = sum(1 for kw in AI_KEYWORDS["low_relevance"] if kw in text)
        score += min(low_count * 0.02, 0.1)

        return min(score, 1.0)

    def _calculate_credibility_score(self, feed_item: Dict[str, Any]) -> float:
        """Calculate credibility score based on source."""
        source_type = feed_item.get("source_type", "")
        source_name = feed_item.get("source_name", "").lower()

        # Base scores by source type
        base_scores = {
            "arxiv": 0.9,
            "github": 0.7,
            "rss": 0.6,
            "hackernews": 0.6,
        }

        score = base_scores.get(source_type, 0.5)

        # Boost for official sources
        if any(name in source_name for name in ["openai", "anthropic", "google", "meta"]):
            score = min(score + 0.2, 1.0)

        return score

    def _clean_text(self, text: str) -> str:
        """Clean and normalize text."""
        if not text:
            return ""
        # Remove HTML tags
        text = re.sub(r"<[^>]+>", "", text)
        # Remove extra whitespace
        text = re.sub(r"\s+", " ", text)
        # Remove special characters but keep punctuation
        text = re.sub(r"[^\w\s.,!?;:'\"-]", "", text)
        return text.strip()

    def _split_sentences(self, text: str) -> List[str]:
        """Split text into sentences."""
        sentences = re.split(r"(?<=[.!?])\s+", text)
        return [s.strip() for s in sentences if s.strip()]


def process_feed_items(feed_items: List[Dict]) -> List[Dict]:
    """
    Process multiple feed items.

    Args:
        feed_items: List of raw feed items

    Returns:
        List of processed posts
    """
    processor = ContentProcessor()
    processed = []

    for item in feed_items:
        try:
            processed_data = processor.process(item)
            # Merge original item with processed data
            result = {**item, **processed_data}
            processed.append(result)
        except Exception as e:
            print(f"Error processing item '{item.get('title', 'unknown')}': {e}")

    return processed


def filter_and_rank_posts(posts: List[Dict], min_relevance: float = 0.3) -> List[Dict]:
    """
    Filter posts by relevance and rank by combined score.

    Args:
        posts: List of processed posts
        min_relevance: Minimum relevance score threshold

    Returns:
        Filtered and ranked posts
    """
    # Filter by minimum relevance
    filtered = [p for p in posts if p.get("relevance_score", 0) >= min_relevance]

    # Calculate combined score (relevance + credibility)
    for post in filtered:
        post["combined_score"] = (
            post.get("relevance_score", 0) * 0.6 +
            post.get("credibility_score", 0) * 0.4
        )

    # Sort by combined score
    ranked = sorted(filtered, key=lambda x: x.get("combined_score", 0), reverse=True)

    return ranked
