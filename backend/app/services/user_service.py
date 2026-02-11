from typing import Optional
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from app.models.user import User, UserStatus
from app.core.security import get_password_hash, verify_password
from app.schemas.user import UserCreate, UserUpdate


class UserService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_by_id(self, user_id: int) -> Optional[User]:
        result = await self.db.execute(select(User).where(User.id == user_id))
        return result.scalar_one_or_none()

    async def get_by_email(self, email: str) -> Optional[User]:
        result = await self.db.execute(select(User).where(User.email == email))
        return result.scalar_one_or_none()

    async def get_list(
        self,
        page: int = 1,
        size: int = 20,
        role: Optional[str] = None,
        status: Optional[str] = None,
        search: Optional[str] = None,
    ) -> tuple[list[User], int]:
        """사용자 목록 조회 (필터, 페이지네이션)"""
        query = select(User)
        count_query = select(func.count()).select_from(User)

        # 필터
        if role:
            query = query.where(User.role == role)
            count_query = count_query.where(User.role == role)
        if status:
            query = query.where(User.status == status)
            count_query = count_query.where(User.status == status)
        if search:
            search_filter = User.name.ilike(f"%{search}%") | User.email.ilike(f"%{search}%")
            query = query.where(search_filter)
            count_query = count_query.where(search_filter)

        # 총 건수
        total_result = await self.db.execute(count_query)
        total = total_result.scalar()

        # 페이지네이션
        offset = (page - 1) * size
        query = query.order_by(User.created_at.desc()).offset(offset).limit(size)

        result = await self.db.execute(query)
        users = list(result.scalars().all())

        return users, total

    async def create(self, data: UserCreate) -> User:
        """사용자 생성"""
        # 이메일 중복 체크
        existing = await self.get_by_email(data.email)
        if existing:
            raise ValueError("이미 등록된 이메일입니다.")

        user = User(
            email=data.email,
            name=data.name,
            hashed_password=get_password_hash(data.password),
            team=data.team,
            role=data.role,
            permission_evidence=data.permission_evidence,
            permission_vuln=data.permission_vuln,
        )
        self.db.add(user)
        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def update(self, user_id: int, data: UserUpdate) -> Optional[User]:
        """사용자 정보 수정"""
        user = await self.get_by_id(user_id)
        if user is None:
            return None

        update_data = data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(user, field, value)

        await self.db.commit()
        await self.db.refresh(user)
        return user

    async def change_password(
        self, user_id: int, current_password: str, new_password: str
    ) -> bool:
        """비밀번호 변경"""
        user = await self.get_by_id(user_id)
        if user is None:
            return False

        if not verify_password(current_password, user.hashed_password):
            raise ValueError("현재 비밀번호가 일치하지 않습니다.")

        user.hashed_password = get_password_hash(new_password)
        await self.db.commit()
        return True

    async def delete(self, user_id: int) -> bool:
        """사용자 삭제 (비활성화)"""
        user = await self.get_by_id(user_id)
        if user is None:
            return False

        user.status = UserStatus.INACTIVE
        await self.db.commit()
        return True

    async def get_approvers(self) -> list[User]:
        """결재자 목록 조회"""
        from app.models.user import UserRole
        result = await self.db.execute(
            select(User).where(
                User.role.in_([UserRole.APPROVER, UserRole.ADMIN]),
                User.status == UserStatus.ACTIVE,
            ).order_by(User.name)
        )
        return list(result.scalars().all())

    async def get_developers(self, team: Optional[str] = None) -> list[User]:
        """개발자 목록 조회"""
        from app.models.user import UserRole
        query = select(User).where(
            User.role == UserRole.DEVELOPER,
            User.status == UserStatus.ACTIVE,
        )
        if team:
            query = query.where(User.team == team)
        query = query.order_by(User.name)

        result = await self.db.execute(query)
        return list(result.scalars().all())
