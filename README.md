# SecuHub - 보안 운영 통합 관리 플랫폼

정보보안 컴플라이언스 증빙자료 수집 자동화 및 취약점 관리를 통합한 보안 운영 플랫폼

## 기술 스택

- **Frontend**: Vue 3 + TypeScript + Vite + PrimeVue + TailwindCSS
- **Backend**: Python FastAPI + SQLAlchemy + PostgreSQL
- **Queue**: Celery + Redis
- **Infra**: Docker Compose + Nginx

## 시작하기

```bash
# 개발 환경 실행
docker-compose up -d

# API 문서: http://localhost:8000/docs
# 프론트엔드: http://localhost:5173
```

## 프로젝트 구조

```
secuhub/
├── backend/
│   ├── app/
│   │   ├── api/v1/endpoints/   # API 엔드포인트
│   │   ├── core/               # 설정, DB, 인증
│   │   ├── models/             # SQLAlchemy 모델
│   │   ├── schemas/            # Pydantic 스키마
│   │   └── services/           # 비즈니스 로직
│   ├── alembic/                # DB 마이그레이션
│   └── requirements.txt
├── frontend/
│   └── src/
│       ├── components/         # Vue 컴포넌트
│       ├── views/              # 페이지 컴포넌트
│       ├── router/             # Vue Router
│       ├── stores/             # Pinia 스토어
│       └── types/              # TypeScript 타입
├── nginx/                      # Nginx 설정
├── docker-compose.yml
└── README.md
```
