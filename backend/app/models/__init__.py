# 모든 모델을 여기서 import하여 Alembic이 감지할 수 있도록 합니다
from app.models.user import User, UserRole, UserStatus
from app.models.evidence import (
    Framework,
    Control,
    EvidenceType,
    EvidenceFile,
    CollectionJob,
    JobExecution,
    CollectionMethod,
    JobType,
    ExecutionStatus,
)
from app.models.vulnerability import (
    Assessment,
    Vulnerability,
    VulnActionLog,
    ApprovalRequest,
    AssessmentStatus,
    VulnStatus,
    ActionType,
    ApprovalStatus,
)

__all__ = [
    "User", "UserRole", "UserStatus",
    "Framework", "Control", "EvidenceType", "EvidenceFile",
    "CollectionJob", "JobExecution",
    "CollectionMethod", "JobType", "ExecutionStatus",
    "Assessment", "Vulnerability", "VulnActionLog", "ApprovalRequest",
    "AssessmentStatus", "VulnStatus", "ActionType", "ApprovalStatus",
]
