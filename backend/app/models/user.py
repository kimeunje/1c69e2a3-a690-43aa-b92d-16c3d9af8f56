import enum
from datetime import datetime
from typing import Optional
from sqlalchemy import String, Boolean, Enum, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base
from app.models.base import TimestampMixin


class UserRole(str, enum.Enum):
    ADMIN = "admin"          # 보안팀 관리자
    APPROVER = "approver"    # 개발팀 팀장 (결재자)
    DEVELOPER = "developer"  # 조치 담당자


class UserStatus(str, enum.Enum):
    ACTIVE = "active"
    INACTIVE = "inactive"


class User(Base, TimestampMixin):
    __tablename__ = "users"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True, nullable=False)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    hashed_password: Mapped[str] = mapped_column(String(255), nullable=False)
    team: Mapped[Optional[str]] = mapped_column(String(100), nullable=True)
    role: Mapped[UserRole] = mapped_column(
        Enum(UserRole, name="user_role"),
        default=UserRole.DEVELOPER,
        nullable=False,
    )

    # 접근 권한
    permission_evidence: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    permission_vuln: Mapped[bool] = mapped_column(Boolean, default=True, nullable=False)

    # 상태
    status: Mapped[UserStatus] = mapped_column(
        Enum(UserStatus, name="user_status"),
        default=UserStatus.ACTIVE,
        nullable=False,
    )
    last_login_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    assigned_vulnerabilities = relationship(
        "Vulnerability", foreign_keys="Vulnerability.assignee_id", back_populates="assignee"
    )
    approval_vulnerabilities = relationship(
        "Vulnerability", foreign_keys="Vulnerability.approver_id", back_populates="approver"
    )

    def __repr__(self) -> str:
        return f"<User(id={self.id}, email='{self.email}', role='{self.role}')>"
