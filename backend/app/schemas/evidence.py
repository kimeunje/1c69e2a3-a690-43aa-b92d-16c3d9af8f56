from datetime import datetime
from typing import Optional
from pydantic import BaseModel
from app.models.evidence import JobType, ExecutionStatus, CollectionMethod


# ========================================
# Framework
# ========================================
class FrameworkBase(BaseModel):
    name: str
    description: Optional[str] = None


class FrameworkCreate(FrameworkBase):
    pass


class FrameworkResponse(FrameworkBase):
    id: int
    created_at: datetime

    model_config = {"from_attributes": True}


# ========================================
# Control
# ========================================
class ControlBase(BaseModel):
    code: str
    domain: Optional[str] = None
    name: str
    description: Optional[str] = None


class ControlCreate(ControlBase):
    framework_id: int


class ControlResponse(ControlBase):
    id: int
    framework_id: int
    created_at: datetime
    # 동적 필드: 증빙 수집 현황
    evidence_collected: Optional[int] = None
    evidence_total: Optional[int] = None

    model_config = {"from_attributes": True}


# ========================================
# Evidence Type
# ========================================
class EvidenceTypeBase(BaseModel):
    name: str
    description: Optional[str] = None
    file_type: Optional[str] = None


class EvidenceTypeCreate(EvidenceTypeBase):
    control_id: int


class EvidenceTypeResponse(EvidenceTypeBase):
    id: int
    control_id: int
    created_at: datetime

    model_config = {"from_attributes": True}


# ========================================
# Evidence File
# ========================================
class EvidenceFileResponse(BaseModel):
    id: int
    evidence_type_id: int
    execution_id: Optional[int] = None
    file_name: str
    file_path: str
    file_size: int
    version: int
    collection_method: CollectionMethod
    collected_at: datetime
    created_at: datetime

    model_config = {"from_attributes": True}


class EvidenceFileWithHistory(BaseModel):
    """증빙 파일 + 버전 이력"""
    current: EvidenceFileResponse
    history: list[EvidenceFileResponse]


# ========================================
# Collection Job
# ========================================
class CollectionJobBase(BaseModel):
    name: str
    description: Optional[str] = None
    job_type: JobType
    script_path: Optional[str] = None
    schedule_cron: Optional[str] = None
    is_active: bool = True


class CollectionJobCreate(CollectionJobBase):
    evidence_type_id: Optional[int] = None


class CollectionJobResponse(CollectionJobBase):
    id: int
    evidence_type_id: Optional[int] = None
    created_at: datetime
    last_execution: Optional["JobExecutionResponse"] = None

    model_config = {"from_attributes": True}


# ========================================
# Job Execution
# ========================================
class JobExecutionResponse(BaseModel):
    id: int
    job_id: int
    status: ExecutionStatus
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None
    error_message: Optional[str] = None
    trace_file_path: Optional[str] = None
    created_at: datetime

    model_config = {"from_attributes": True}
