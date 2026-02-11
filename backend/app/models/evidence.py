import enum
from datetime import datetime
from typing import Optional
from sqlalchemy import String, Boolean, Integer, BigInteger, Text, Enum, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import TimestampMixin


# ========================================
# 프레임워크
# ========================================
class Framework(Base, TimestampMixin):
    __tablename__ = "frameworks"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(200), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    controls = relationship("Control", back_populates="framework", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Framework(id={self.id}, name='{self.name}')>"


# ========================================
# 통제 항목
# ========================================
class Control(Base, TimestampMixin):
    __tablename__ = "controls"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    framework_id: Mapped[int] = mapped_column(ForeignKey("frameworks.id"), nullable=False)
    code: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    domain: Mapped[Optional[str]] = mapped_column(String(200), nullable=True)
    name: Mapped[str] = mapped_column(String(500), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    framework = relationship("Framework", back_populates="controls")
    evidence_types = relationship("EvidenceType", back_populates="control", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<Control(id={self.id}, code='{self.code}', name='{self.name}')>"


# ========================================
# 증빙 유형
# ========================================
class EvidenceType(Base, TimestampMixin):
    __tablename__ = "evidence_types"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    control_id: Mapped[int] = mapped_column(ForeignKey("controls.id"), nullable=False)
    name: Mapped[str] = mapped_column(String(300), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    file_type: Mapped[Optional[str]] = mapped_column(String(50), nullable=True)  # pdf, xlsx, png 등

    # Relationships
    control = relationship("Control", back_populates="evidence_types")
    evidence_files = relationship("EvidenceFile", back_populates="evidence_type", cascade="all, delete-orphan")
    collection_jobs = relationship("CollectionJob", back_populates="evidence_type")

    def __repr__(self) -> str:
        return f"<EvidenceType(id={self.id}, name='{self.name}')>"


# ========================================
# 증빙 파일 (버전 관리)
# ========================================
class CollectionMethod(str, enum.Enum):
    AUTO = "auto"
    MANUAL = "manual"


class EvidenceFile(Base, TimestampMixin):
    __tablename__ = "evidence_files"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    evidence_type_id: Mapped[int] = mapped_column(ForeignKey("evidence_types.id"), nullable=False)
    execution_id: Mapped[Optional[int]] = mapped_column(ForeignKey("job_executions.id"), nullable=True)

    file_name: Mapped[str] = mapped_column(String(500), nullable=False)
    file_path: Mapped[str] = mapped_column(String(1000), nullable=False)
    file_size: Mapped[int] = mapped_column(BigInteger, default=0, nullable=False)
    version: Mapped[int] = mapped_column(Integer, default=1, nullable=False)
    collection_method: Mapped[CollectionMethod] = mapped_column(
        Enum(CollectionMethod, name="collection_method"),
        default=CollectionMethod.MANUAL,
        nullable=False,
    )
    collected_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False)

    # Relationships
    evidence_type = relationship("EvidenceType", back_populates="evidence_files")
    execution = relationship("JobExecution", back_populates="evidence_files")

    def __repr__(self) -> str:
        return f"<EvidenceFile(id={self.id}, name='{self.file_name}', v{self.version})>"


# ========================================
# 수집 작업
# ========================================
class JobType(str, enum.Enum):
    WEB_SCRAPING = "web_scraping"
    EXCEL_EXTRACT = "excel_extract"
    LOG_EXTRACT = "log_extract"


class CollectionJob(Base, TimestampMixin):
    __tablename__ = "collection_jobs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    name: Mapped[str] = mapped_column(String(300), nullable=False)
    description: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    job_type: Mapped[JobType] = mapped_column(
        Enum(JobType, name="job_type"),
        nullable=False,
    )
    script_path: Mapped[Optional[str]] = mapped_column(String(1000), nullable=True)
    evidence_type_id: Mapped[Optional[int]] = mapped_column(ForeignKey("evidence_types.id"), nullable=True)
    schedule_cron: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    is_active: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # Relationships
    evidence_type = relationship("EvidenceType", back_populates="collection_jobs")
    executions = relationship("JobExecution", back_populates="job", cascade="all, delete-orphan")

    def __repr__(self) -> str:
        return f"<CollectionJob(id={self.id}, name='{self.name}')>"


# ========================================
# 실행 기록
# ========================================
class ExecutionStatus(str, enum.Enum):
    RUNNING = "running"
    SUCCESS = "success"
    FAILED = "failed"


class JobExecution(Base, TimestampMixin):
    __tablename__ = "job_executions"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    job_id: Mapped[int] = mapped_column(ForeignKey("collection_jobs.id"), nullable=False)
    status: Mapped[ExecutionStatus] = mapped_column(
        Enum(ExecutionStatus, name="execution_status"),
        default=ExecutionStatus.RUNNING,
        nullable=False,
    )
    started_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    finished_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)
    error_message: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    trace_file_path: Mapped[Optional[str]] = mapped_column(String(1000), nullable=True)

    # Relationships
    job = relationship("CollectionJob", back_populates="executions")
    evidence_files = relationship("EvidenceFile", back_populates="execution")

    def __repr__(self) -> str:
        return f"<JobExecution(id={self.id}, job_id={self.job_id}, status='{self.status}')>"
