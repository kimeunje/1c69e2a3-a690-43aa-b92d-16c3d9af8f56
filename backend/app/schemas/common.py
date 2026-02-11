from pydantic import BaseModel


class MessageResponse(BaseModel):
    """공통 메시지 응답"""
    message: str
    detail: str | None = None


class PaginationParams(BaseModel):
    """공통 페이지네이션 파라미터"""
    page: int = 1
    size: int = 20

    @property
    def offset(self) -> int:
        return (self.page - 1) * self.size
