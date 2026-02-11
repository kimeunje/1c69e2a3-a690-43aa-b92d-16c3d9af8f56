from datetime import datetime
from typing import Optional
from pydantic import BaseModel, EmailStr
from app.models.user import UserRole, UserStatus


# ========================================
# Base
# ========================================
class UserBase(BaseModel):
    email: EmailStr
    name: str
    team: Optional[str] = None
    role: UserRole = UserRole.DEVELOPER
    permission_evidence: bool = False
    permission_vuln: bool = True


# ========================================
# Create / Update
# ========================================
class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    name: Optional[str] = None
    team: Optional[str] = None
    role: Optional[UserRole] = None
    permission_evidence: Optional[bool] = None
    permission_vuln: Optional[bool] = None
    status: Optional[UserStatus] = None


class UserPasswordUpdate(BaseModel):
    current_password: str
    new_password: str


# ========================================
# Response
# ========================================
class UserResponse(UserBase):
    id: int
    status: UserStatus
    last_login_at: Optional[datetime] = None
    created_at: datetime
    updated_at: datetime

    model_config = {"from_attributes": True}


class UserListResponse(BaseModel):
    items: list[UserResponse]
    total: int


class UserBrief(BaseModel):
    """간략한 사용자 정보 (목록용)"""
    id: int
    name: str
    email: str
    team: Optional[str] = None
    role: UserRole

    model_config = {"from_attributes": True}
