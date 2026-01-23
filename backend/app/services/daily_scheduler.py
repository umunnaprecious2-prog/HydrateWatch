"""
AI Knowledge Feed - Daily Automation Scheduler
Runs scheduled jobs to fetch, process, and publish AI knowledge content.

Schedule:
- Daily fetch at configured times
- Processes content through the pipeline
- Removes duplicates
- Ranks and publishes top posts
"""

import asyncio
from datetime import datetime, timedelta
from typing import List, Dict, Optional
from sqlalchemy.orm import Session

from app.models.ai_knowledge import AIKnowledgePost, FeedSource, FeedFetchLog
from app.services.feed_sources import fetch_all_sources, FeedItem, FEED_SOURCES
from app.services.content_processor import process_feed_items, filter_and_rank_posts


class DailyFeedScheduler:
    """Manages daily feed fetching and processing."""

    def __init__(self, db: Session):
        self.db = db
        self.min_posts_per_day = 5
        self.max_posts_per_day = 10
        self.min_relevance_score = 0.3

    async def run_daily_update(self) -> Dict:
        """
        Run the complete daily update cycle.

        Returns:
            Summary of the update operation
        """
        log = FeedFetchLog(
            source_name="all_sources",
            started_at=datetime.utcnow(),
            status="in_progress"
        )
        self.db.add(log)
        self.db.commit()

        try:
            # Step 1: Fetch from all sources
            raw_items = await fetch_all_sources()
            log.items_fetched = len(raw_items)

            # Step 2: Convert FeedItems to dicts
            items_dict = [item.to_dict() if isinstance(item, FeedItem) else item for item in raw_items]

            # Step 3: Remove duplicates
            unique_items = self._remove_duplicates(items_dict)

            # Step 4: Process content
            processed_items = process_feed_items(unique_items)
            log.items_processed = len(processed_items)

            # Step 5: Filter and rank
            ranked_items = filter_and_rank_posts(processed_items, self.min_relevance_score)

            # Step 6: Select top posts for publishing
            posts_to_publish = ranked_items[:self.max_posts_per_day]

            # Step 7: Save to database
            published_count = self._save_posts(posts_to_publish)
            log.items_published = published_count

            # Update log
            log.completed_at = datetime.utcnow()
            log.status = "success"
            self.db.commit()

            return {
                "status": "success",
                "items_fetched": log.items_fetched,
                "items_processed": log.items_processed,
                "items_published": log.items_published,
                "completed_at": log.completed_at.isoformat(),
            }

        except Exception as e:
            log.completed_at = datetime.utcnow()
            log.status = "failed"
            log.error_message = str(e)
            self.db.commit()
            raise

    def _remove_duplicates(self, items: List[Dict]) -> List[Dict]:
        """Remove duplicate items based on source_id and title similarity."""
        seen_ids = set()
        seen_titles = set()
        unique = []

        # Also check existing posts in database
        existing_ids = {
            post.source_id for post in
            self.db.query(AIKnowledgePost.source_id).all()
        }

        for item in items:
            source_id = item.get("source_id", "")
            title = item.get("title", "").lower().strip()

            # Skip if already in database
            if source_id in existing_ids:
                continue

            # Skip if duplicate source_id
            if source_id in seen_ids:
                continue

            # Skip if very similar title
            title_key = self._normalize_title(title)
            if title_key in seen_titles:
                continue

            seen_ids.add(source_id)
            seen_titles.add(title_key)
            unique.append(item)

        return unique

    def _normalize_title(self, title: str) -> str:
        """Normalize title for duplicate detection."""
        import re
        # Remove special characters and extra spaces
        normalized = re.sub(r"[^\w\s]", "", title.lower())
        normalized = re.sub(r"\s+", " ", normalized).strip()
        # Take first 50 chars for comparison
        return normalized[:50]

    def _save_posts(self, posts: List[Dict]) -> int:
        """Save processed posts to database."""
        saved_count = 0

        for post_data in posts:
            try:
                # Check if already exists
                existing = self.db.query(AIKnowledgePost).filter(
                    AIKnowledgePost.source_id == post_data.get("source_id")
                ).first()

                if existing:
                    continue

                # Parse published_at
                published_at = post_data.get("published_at")
                if isinstance(published_at, str):
                    try:
                        published_at = datetime.fromisoformat(published_at.replace("Z", "+00:00"))
                    except:
                        published_at = datetime.utcnow()

                # Create new post
                post = AIKnowledgePost(
                    source_id=post_data.get("source_id"),
                    source_type=post_data.get("source_type"),
                    source_name=post_data.get("source_name"),
                    source_url=post_data.get("source_url"),
                    title=post_data.get("title", "")[:500],
                    original_content=post_data.get("content"),
                    summary=post_data.get("summary"),
                    key_insights=post_data.get("key_insights", []),
                    practical_takeaways=post_data.get("practical_takeaways", []),
                    why_it_matters=post_data.get("why_it_matters"),
                    content_type=post_data.get("content_type", "AI Insight"),
                    tags=post_data.get("tags", []),
                    relevance_score=post_data.get("relevance_score", 0.5),
                    credibility_score=post_data.get("credibility_score", 0.5),
                    author=post_data.get("author"),
                    published_at=published_at,
                    processed_at=datetime.utcnow(),
                    is_published=True,
                )
                self.db.add(post)
                saved_count += 1

            except Exception as e:
                print(f"Error saving post '{post_data.get('title', 'unknown')}': {e}")
                continue

        self.db.commit()
        return saved_count

    def get_today_posts(self) -> List[AIKnowledgePost]:
        """Get posts published today."""
        today_start = datetime.utcnow().replace(hour=0, minute=0, second=0, microsecond=0)
        return self.db.query(AIKnowledgePost).filter(
            AIKnowledgePost.created_at >= today_start,
            AIKnowledgePost.is_published == True
        ).order_by(AIKnowledgePost.relevance_score.desc()).all()

    def get_recent_posts(self, days: int = 7, limit: int = 20) -> List[AIKnowledgePost]:
        """Get recent published posts."""
        cutoff = datetime.utcnow() - timedelta(days=days)
        return self.db.query(AIKnowledgePost).filter(
            AIKnowledgePost.created_at >= cutoff,
            AIKnowledgePost.is_published == True
        ).order_by(AIKnowledgePost.created_at.desc()).limit(limit).all()

    def get_fetch_logs(self, limit: int = 10) -> List[FeedFetchLog]:
        """Get recent fetch logs."""
        return self.db.query(FeedFetchLog).order_by(
            FeedFetchLog.started_at.desc()
        ).limit(limit).all()


# Background task for scheduled execution
async def scheduled_daily_fetch(db: Session):
    """Background task that runs the daily fetch."""
    scheduler = DailyFeedScheduler(db)
    result = await scheduler.run_daily_update()
    return result


def check_should_fetch(db: Session) -> bool:
    """Check if we should run a fetch based on last fetch time."""
    last_log = db.query(FeedFetchLog).filter(
        FeedFetchLog.status == "success"
    ).order_by(FeedFetchLog.completed_at.desc()).first()

    if not last_log:
        return True

    # Fetch if last successful fetch was more than 20 hours ago
    time_since_last = datetime.utcnow() - last_log.completed_at
    return time_since_last > timedelta(hours=20)
