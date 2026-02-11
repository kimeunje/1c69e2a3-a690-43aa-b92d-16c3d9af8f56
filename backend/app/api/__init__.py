from fastapi import APIRouter

api_router = APIRouter()

# Phase 1: 인증
# from app.api.v1.endpoints import auth, users
# api_router.include_router(auth.router, prefix="/auth", tags=["인증"])
# api_router.include_router(users.router, prefix="/users", tags=["사용자"])
