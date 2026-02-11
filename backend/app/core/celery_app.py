from celery import Celery
from app.core.config import settings

celery_app = Celery(
    "secuhub",
    broker=settings.REDIS_URL,
    backend=settings.REDIS_URL,
)

celery_app.conf.update(
    task_serializer="json",
    accept_content=["json"],
    result_serializer="json",
    timezone="Asia/Seoul",
    enable_utc=True,
    task_track_started=True,
    task_acks_late=True,
    worker_prefetch_multiplier=1,
)

# Beat 스케줄 (Phase 2에서 활성화)
celery_app.conf.beat_schedule = {}
