"""
AI Knowledge Feed - Database Models
Stores AI-curated knowledge posts from approved data sources.
"""

from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, Float, JSON
from sqlalchemy.sql import func
from app.database import Base


class AIKnowledgePost(Base):
    """Model for AI-curated knowledge posts."""

    __tablename__ = "ai_knowledge_posts"

    id = Column(Integer, primary_key=True, index=True)

    # Content identification
    source_id = Column(String(255), unique=True, index=True)  # Unique ID from source
    source_type = Column(String(50), index=True)  # arxiv, hackernews, github, rss, etc.
    source_name = Column(String(100))  # Human-readable source name
    source_url = Column(Text)  # Original URL

    # Content
    title = Column(String(500), nullable=False)
    original_content = Column(Text)  # Raw content from source
    summary = Column(Text)  # AI-generated summary
    key_insights = Column(JSON)  # List of key insights
    practical_takeaways = Column(JSON)  # List of practical applications
    why_it_matters = Column(Text)  # Explanation of importance

    # Categorization
    content_type = Column(String(50))  # AI Insight, Research, Tooling, Tutorial, News
    tags = Column(JSON)  # List of tags (AI Agents, Automation, etc.)
    relevance_score = Column(Float, default=0.0)  # 0-1 score for relevance
    credibility_score = Column(Float, default=0.0)  # 0-1 score for source credibility

    # Metadata
    author = Column(String(200))
    published_at = Column(DateTime)  # Original publication date
    fetched_at = Column(DateTime, server_default=func.now())
    processed_at = Column(DateTime)

    # Status
    is_published = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    view_count = Column(Integer, default=0)

    # Timestamps
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class FeedSource(Base):
    """Configuration for feed sources."""

    __tablename__ = "feed_sources"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), unique=True, nullable=False)
    source_type = Column(String(50), nullable=False)  # rss, api, github, etc.
    url = Column(Text, nullable=False)
    is_active = Column(Boolean, default=True)
    fetch_interval_hours = Column(Integer, default=24)
    last_fetched_at = Column(DateTime)
    credibility_weight = Column(Float, default=0.5)  # Base credibility for this source
    config = Column(JSON)  # Additional source-specific configuration
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())


class FeedFetchLog(Base):
    """Logging for feed fetch operations."""

    __tablename__ = "feed_fetch_logs"

    id = Column(Integer, primary_key=True, index=True)
    source_id = Column(Integer, index=True)
    source_name = Column(String(100))
    started_at = Column(DateTime, server_default=func.now())
    completed_at = Column(DateTime)
    status = Column(String(50))  # success, failed, partial
    items_fetched = Column(Integer, default=0)
    items_processed = Column(Integer, default=0)
    items_published = Column(Integer, default=0)
    error_message = Column(Text)
    created_at = Column(DateTime, server_default=func.now())
