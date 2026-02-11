from typing import Optional
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.security import decode_access_token
from app.models.user import User, UserRole, UserStatus

security_scheme = HTTPBearer()


async def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security_scheme),
    db: AsyncSession = Depends(get_db),
) -> User:
    """현재 인증된 사용자 반환"""
    token = credentials.credentials
    payload = decode_access_token(token)

    if payload is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="유효하지 않은 인증 토큰입니다.",
        )

    user_id: int = payload.get("sub")
    if user_id is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="토큰에 사용자 정보가 없습니다.",
        )

    result = await db.execute(select(User).where(User.id == user_id))
    user = result.scalar_one_or_none()

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="사용자를 찾을 수 없습니다.",
        )

    if user.status != UserStatus.ACTIVE:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="비활성화된 계정입니다.",
        )

    return user


async def get_current_active_user(
    current_user: User = Depends(get_current_user),
) -> User:
    """활성 상태의 현재 사용자"""
    return current_user


class RoleChecker:
    """역할 기반 권한 체크 의존성"""

    def __init__(self, allowed_roles: list[UserRole]):
        self.allowed_roles = allowed_roles

    async def __call__(self, current_user: User = Depends(get_current_user)) -> User:
        if current_user.role not in self.allowed_roles:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="이 작업에 대한 권한이 없습니다.",
            )
        return current_user


class PermissionChecker:
    """기능별 접근 권한 체크"""

    def __init__(self, require_evidence: bool = False, require_vuln: bool = False):
        self.require_evidence = require_evidence
        self.require_vuln = require_vuln

    async def __call__(self, current_user: User = Depends(get_current_user)) -> User:
        if self.require_evidence and not current_user.permission_evidence:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="증빙 수집 기능에 대한 접근 권한이 없습니다.",
            )
        if self.require_vuln and not current_user.permission_vuln:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="취약점 관리 기능에 대한 접근 권한이 없습니다.",
            )
        return current_user


# 자주 쓰는 의존성 인스턴스
require_admin = RoleChecker([UserRole.ADMIN])
require_approver_or_admin = RoleChecker([UserRole.ADMIN, UserRole.APPROVER])
require_evidence_access = PermissionChecker(require_evidence=True)
require_vuln_access = PermissionChecker(require_vuln=True)
