"""
AI Knowledge Feed - Pydantic Schemas
Request/Response models for the AI Knowledge Feed API.
"""

from pydantic import BaseModel, Field
from typing import List, Optional
from datetime import datetime


class AIKnowledgePostBase(BaseModel):
    """Base schema for AI Knowledge posts."""

    title: str
    summary: Optional[str] = None
    content_type: str = "AI Insight"
    tags: List[str] = []
    source_name: str
    source_url: Optional[str] = None


class AIKnowledgePostCreate(AIKnowledgePostBase):
    """Schema for creating new posts (admin/system use)."""

    source_id: str
    source_type: str
    original_content: Optional[str] = None
    key_insights: List[str] = []
    practical_takeaways: List[str] = []
    why_it_matters: Optional[str] = None
    author: Optional[str] = None
    published_at: Optional[datetime] = None
    relevance_score: float = 0.5
    credibility_score: float = 0.5


class AIKnowledgePostResponse(AIKnowledgePostBase):
    """Schema for API responses."""

    id: int
    key_insights: List[str] = []
    practical_takeaways: List[str] = []
    why_it_matters: Optional[str] = None
    author: Optional[str] = None
    published_at: Optional[datetime] = None
    relevance_score: float = 0.0
    credibility_score: float = 0.0
    is_featured: bool = False
    view_count: int = 0
    created_at: datetime
    fetched_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class AIKnowledgePostList(BaseModel):
    """Schema for paginated post list."""

    posts: List[AIKnowledgePostResponse]
    total: int
    page: int
    page_size: int
    has_more: bool


class FeedSourceBase(BaseModel):
    """Base schema for feed sources."""

    name: str
    source_type: str
    url: str
    is_active: bool = True
    fetch_interval_hours: int = 24
    credibility_weight: float = 0.5


class FeedSourceCreate(FeedSourceBase):
    """Schema for creating feed sources."""

    config: Optional[dict] = None


class FeedSourceResponse(FeedSourceBase):
    """Schema for feed source responses."""

    id: int
    last_fetched_at: Optional[datetime] = None
    config: Optional[dict] = None
    created_at: datetime

    class Config:
        from_attributes = True


class FetchLogResponse(BaseModel):
    """Schema for fetch log responses."""

    id: int
    source_name: str
    started_at: datetime
    completed_at: Optional[datetime] = None
    status: str
    items_fetched: int = 0
    items_processed: int = 0
    items_published: int = 0
    error_message: Optional[str] = None

    class Config:
        from_attributes = True


class ContentProcessingRequest(BaseModel):
    """Request schema for content processing."""

    title: str
    content: str
    source_url: Optional[str] = None
    source_type: str = "manual"


class ContentProcessingResponse(BaseModel):
    """Response schema for processed content."""

    summary: str
    key_insights: List[str]
    practical_takeaways: List[str]
    why_it_matters: str
    suggested_tags: List[str]
    content_type: str
    relevance_score: float


class FeedStatsResponse(BaseModel):
    """Statistics about the feed."""

    total_posts: int
    posts_today: int
    posts_this_week: int
    sources_active: int
    last_fetch_time: Optional[datetime] = None
    top_tags: List[dict] = []
