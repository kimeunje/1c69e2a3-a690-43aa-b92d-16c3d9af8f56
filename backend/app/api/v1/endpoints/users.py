from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import get_db
from app.core.deps import get_current_user, require_admin
from app.models.user import User
from app.schemas.user import (
    UserCreate,
    UserUpdate,
    UserPasswordUpdate,
    UserResponse,
    UserListResponse,
    UserBrief,
)
from app.schemas.common import MessageResponse
from app.services.user_service import UserService

router = APIRouter()


@router.get("", response_model=UserListResponse)
async def list_users(
    page: int = Query(1, ge=1),
    size: int = Query(20, ge=1, le=100),
    role: Optional[str] = Query(None),
    user_status: Optional[str] = Query(None, alias="status"),
    search: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
):
    """사용자 목록 조회 (관리자 전용)"""
    service = UserService(db)
    users, total = await service.get_list(
        page=page, size=size, role=role, status=user_status, search=search
    )
    return UserListResponse(
        items=[UserResponse.model_validate(u) for u in users],
        total=total,
    )


@router.post("", response_model=UserResponse, status_code=status.HTTP_201_CREATED)
async def create_user(
    data: UserCreate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
):
    """사용자 생성 (관리자 전용)"""
    service = UserService(db)
    try:
        user = await service.create(data)
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return UserResponse.model_validate(user)


@router.get("/approvers", response_model=list[UserBrief])
async def list_approvers(
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """결재자 목록 조회"""
    service = UserService(db)
    approvers = await service.get_approvers()
    return [UserBrief.model_validate(u) for u in approvers]


@router.get("/developers", response_model=list[UserBrief])
async def list_developers(
    team: Optional[str] = Query(None),
    db: AsyncSession = Depends(get_db),
    _: User = Depends(get_current_user),
):
    """개발자 목록 조회"""
    service = UserService(db)
    developers = await service.get_developers(team=team)
    return [UserBrief.model_validate(u) for u in developers]


@router.get("/{user_id}", response_model=UserResponse)
async def get_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
):
    """사용자 상세 조회 (관리자 전용)"""
    service = UserService(db)
    user = await service.get_by_id(user_id)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="사용자를 찾을 수 없습니다.")
    return UserResponse.model_validate(user)


@router.patch("/{user_id}", response_model=UserResponse)
async def update_user(
    user_id: int,
    data: UserUpdate,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
):
    """사용자 정보 수정 (관리자 전용)"""
    service = UserService(db)
    user = await service.update(user_id, data)
    if user is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="사용자를 찾을 수 없습니다.")
    return UserResponse.model_validate(user)


@router.delete("/{user_id}", response_model=MessageResponse)
async def delete_user(
    user_id: int,
    db: AsyncSession = Depends(get_db),
    _: User = Depends(require_admin),
):
    """사용자 비활성화 (관리자 전용)"""
    service = UserService(db)
    success = await service.delete(user_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="사용자를 찾을 수 없습니다.")
    return MessageResponse(message="사용자가 비활성화되었습니다.")


@router.patch("/me/password", response_model=MessageResponse)
async def change_my_password(
    data: UserPasswordUpdate,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """내 비밀번호 변경"""
    service = UserService(db)
    try:
        await service.change_password(
            current_user.id, data.current_password, data.new_password
        )
    except ValueError as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return MessageResponse(message="비밀번호가 변경되었습니다.")
