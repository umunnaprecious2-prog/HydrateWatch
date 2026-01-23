"""
AI Knowledge Feed - API Routes
Endpoints for accessing and managing AI knowledge content.
"""

from fastapi import APIRouter, Depends, HTTPException, Query, BackgroundTasks
from sqlalchemy.orm import Session
from sqlalchemy import func
from typing import List, Optional
from datetime import datetime, timedelta

from app.database import get_db
from app.models.ai_knowledge import AIKnowledgePost, FeedSource, FeedFetchLog
from app.schemas.ai_knowledge import (
    AIKnowledgePostResponse,
    AIKnowledgePostList,
    FeedSourceCreate,
    FeedSourceResponse,
    FetchLogResponse,
    FeedStatsResponse,
)
from app.services.daily_scheduler import DailyFeedScheduler, check_should_fetch

router = APIRouter()


@router.get("/posts", response_model=AIKnowledgePostList)
async def get_ai_knowledge_posts(
    page: int = Query(1, ge=1),
    page_size: int = Query(10, ge=1, le=50),
    content_type: Optional[str] = None,
    tag: Optional[str] = None,
    source_type: Optional[str] = None,
    search: Optional[str] = None,
    days: int = Query(30, ge=1, le=365),
    db: Session = Depends(get_db),
):
    """
    Get paginated list of AI knowledge posts.

    - **page**: Page number (default: 1)
    - **page_size**: Items per page (default: 10, max: 50)
    - **content_type**: Filter by content type (Research, Tooling, Tutorial, News, AI Insight)
    - **tag**: Filter by tag
    - **source_type**: Filter by source (arxiv, github, hackernews, rss)
    - **search**: Search in title and summary
    - **days**: Include posts from last N days (default: 30)
    """
    query = db.query(AIKnowledgePost).filter(
        AIKnowledgePost.is_published == True,
        AIKnowledgePost.created_at >= datetime.utcnow() - timedelta(days=days),
    )

    # Apply filters
    if content_type:
        query = query.filter(AIKnowledgePost.content_type == content_type)

    if tag:
        query = query.filter(AIKnowledgePost.tags.contains([tag]))

    if source_type:
        query = query.filter(AIKnowledgePost.source_type == source_type)

    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (AIKnowledgePost.title.ilike(search_term)) |
            (AIKnowledgePost.summary.ilike(search_term))
        )

    # Get total count
    total = query.count()

    # Apply pagination and ordering
    posts = query.order_by(
        AIKnowledgePost.created_at.desc()
    ).offset((page - 1) * page_size).limit(page_size).all()

    return AIKnowledgePostList(
        posts=[AIKnowledgePostResponse.model_validate(p) for p in posts],
        total=total,
        page=page,
        page_size=page_size,
        has_more=total > page * page_size,
    )


@router.get("/posts/{post_id}", response_model=AIKnowledgePostResponse)
async def get_ai_knowledge_post(
    post_id: int,
    db: Session = Depends(get_db),
):
    """Get a single AI knowledge post by ID."""
    post = db.query(AIKnowledgePost).filter(
        AIKnowledgePost.id == post_id,
        AIKnowledgePost.is_published == True,
    ).first()

    if not post:
        raise HTTPException(status_code=404, detail="Post not found")

    # Increment view count
    post.view_count += 1
    db.commit()

    return AIKnowledgePostResponse.model_validate(post)


@router.get("/stats", response_model=FeedStatsResponse)
async def get_feed_stats(db: Session = Depends(get_db)):
    """Get statistics about the AI knowledge feed."""
    today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
    week_start = today_start - timedelta(days=7)

    total_posts = db.query(AIKnowledgePost).filter(
        AIKnowledgePost.is_published == True
    ).count()

    posts_today = db.query(AIKnowledgePost).filter(
        AIKnowledgePost.is_published == True,
        AIKnowledgePost.created_at >= today_start,
    ).count()

    posts_this_week = db.query(AIKnowledgePost).filter(
        AIKnowledgePost.is_published == True,
        AIKnowledgePost.created_at >= week_start,
    ).count()

    sources_active = db.query(FeedSource).filter(
        FeedSource.is_active == True
    ).count()

    # Get last successful fetch
    last_fetch = db.query(FeedFetchLog).filter(
        FeedFetchLog.status == "success"
    ).order_by(FeedFetchLog.completed_at.desc()).first()

    # Get top tags
    # This is a simplified approach - for production, you'd want to aggregate JSON arrays properly
    all_posts = db.query(AIKnowledgePost.tags).filter(
        AIKnowledgePost.is_published == True,
        AIKnowledgePost.created_at >= week_start,
    ).all()

    tag_counts = {}
    for (tags,) in all_posts:
        if tags:
            for tag in tags:
                tag_counts[tag] = tag_counts.get(tag, 0) + 1

    top_tags = sorted(
        [{"tag": k, "count": v} for k, v in tag_counts.items()],
        key=lambda x: x["count"],
        reverse=True,
    )[:10]

    return FeedStatsResponse(
        total_posts=total_posts,
        posts_today=posts_today,
        posts_this_week=posts_this_week,
        sources_active=sources_active or len(["arxiv", "github", "hackernews", "devto", "google_news"]),
        last_fetch_time=last_fetch.completed_at if last_fetch else None,
        top_tags=top_tags,
    )


@router.post("/fetch")
async def trigger_fetch(
    background_tasks: BackgroundTasks,
    force: bool = Query(False),
    db: Session = Depends(get_db),
):
    """
    Trigger a manual fetch of AI knowledge content.

    - **force**: Force fetch even if recently fetched (default: False)
    """
    if not force and not check_should_fetch(db):
        last_log = db.query(FeedFetchLog).filter(
            FeedFetchLog.status == "success"
        ).order_by(FeedFetchLog.completed_at.desc()).first()

        return {
            "status": "skipped",
            "message": "Recent fetch already completed",
            "last_fetch": last_log.completed_at.isoformat() if last_log else None,
        }

    # Run fetch in background
    async def run_fetch():
        scheduler = DailyFeedScheduler(db)
        await scheduler.run_daily_update()

    background_tasks.add_task(run_fetch)

    return {
        "status": "started",
        "message": "Fetch job started in background",
    }


@router.get("/fetch-logs", response_model=List[FetchLogResponse])
async def get_fetch_logs(
    limit: int = Query(10, ge=1, le=100),
    db: Session = Depends(get_db),
):
    """Get recent fetch operation logs."""
    logs = db.query(FeedFetchLog).order_by(
        FeedFetchLog.started_at.desc()
    ).limit(limit).all()

    return [FetchLogResponse.model_validate(log) for log in logs]


@router.get("/content-types")
async def get_content_types():
    """Get list of available content types."""
    return {
        "content_types": [
            {"value": "Research", "label": "Research Papers"},
            {"value": "Tooling", "label": "Tools & Libraries"},
            {"value": "Tutorial", "label": "Tutorials & Guides"},
            {"value": "News", "label": "Industry News"},
            {"value": "AI Insight", "label": "AI Insights"},
        ]
    }


@router.get("/sources")
async def get_sources():
    """Get list of configured feed sources."""
    return {
        "sources": [
            {"value": "arxiv", "label": "ArXiv Research", "credibility": 0.9},
            {"value": "github", "label": "GitHub Trending", "credibility": 0.7},
            {"value": "hackernews", "label": "Hacker News", "credibility": 0.6},
            {"value": "rss", "label": "News & Blogs", "credibility": 0.6},
        ]
    }


@router.get("/tags")
async def get_popular_tags(
    limit: int = Query(20, ge=1, le=50),
    db: Session = Depends(get_db),
):
    """Get list of popular tags."""
    week_start = datetime.utcnow() - timedelta(days=7)

    all_posts = db.query(AIKnowledgePost.tags).filter(
        AIKnowledgePost.is_published == True,
        AIKnowledgePost.created_at >= week_start,
    ).all()

    tag_counts = {}
    for (tags,) in all_posts:
        if tags:
            for tag in tags:
                tag_counts[tag] = tag_counts.get(tag, 0) + 1

    sorted_tags = sorted(
        [{"tag": k, "count": v} for k, v in tag_counts.items()],
        key=lambda x: x["count"],
        reverse=True,
    )[:limit]

    return {"tags": sorted_tags}
