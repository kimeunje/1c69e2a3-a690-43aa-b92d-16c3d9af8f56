from datetime import datetime, timezone
from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.user import User, UserStatus
from app.core.security import verify_password, create_access_token


class AuthService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def authenticate(self, email: str, password: str) -> Optional[User]:
        """이메일/비밀번호로 사용자 인증"""
        result = await self.db.execute(
            select(User).where(User.email == email)
        )
        user = result.scalar_one_or_none()

        if user is None:
            return None
        if not verify_password(password, user.hashed_password):
            return None
        if user.status != UserStatus.ACTIVE:
            return None

        return user

    async def login(self, email: str, password: str) -> Optional[dict]:
        """로그인 처리 - 인증 + 토큰 발급 + last_login 갱신"""
        user = await self.authenticate(email, password)
        if user is None:
            return None

        # last_login_at 갱신
        user.last_login_at = datetime.now(timezone.utc)
        await self.db.commit()
        await self.db.refresh(user)

        # JWT 토큰 생성
        access_token = create_access_token(
            data={"sub": user.id, "role": user.role.value}
        )

        return {
            "access_token": access_token,
            "token_type": "bearer",
            "user": user,
        }
