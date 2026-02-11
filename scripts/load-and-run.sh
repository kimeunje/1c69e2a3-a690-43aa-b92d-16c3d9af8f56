#!/bin/bash
# ============================================
# SecuHub 폐쇄망 실행 스크립트
# 폐쇄망 서버에서 실행하세요
# ============================================

set -e

IMAGES_DIR="./secuhub-offline-images"

# 이미지 디렉토리 확인
if [ ! -d "$IMAGES_DIR" ]; then
    echo "❌ $IMAGES_DIR 폴더를 찾을 수 없습니다."
    echo "   secuhub/ 폴더와 같은 위치에 secuhub-offline-images/ 폴더를 놓아주세요."
    echo ""
    echo "   secuhub/"
    echo "   ├── backend/"
    echo "   ├── frontend/"
    echo "   ├── docker-compose.offline.yml"
    echo "   └── secuhub-offline-images/"
    echo "       ├── postgres-16-alpine.tar"
    echo "       ├── redis-7-alpine.tar"
    echo "       ├── secuhub-api.tar"
    echo "       └── secuhub-frontend.tar"
    exit 1
fi

echo "============================================"
echo "SecuHub 폐쇄망 실행"
echo "============================================"
echo ""

# -------------------------------------------
# Step 1: Docker 이미지 로드
# -------------------------------------------
echo "[1/3] Docker 이미지 로드 중..."

for tarfile in "$IMAGES_DIR"/*.tar; do
    filename=$(basename "$tarfile")
    echo "  로드 중: $filename"
    docker load -i "$tarfile"
done

echo "  ✓ 모든 이미지 로드 완료"
echo ""

# 로드된 이미지 확인
echo "  로드된 이미지:"
docker images --format "  {{.Repository}}:{{.Tag}} ({{.Size}})" | grep -E "postgres|redis|secuhub"
echo ""

# -------------------------------------------
# Step 2: 서비스 실행
# -------------------------------------------
echo "[2/3] 서비스 시작 중..."
docker compose -f docker-compose.offline.yml up -d
echo ""

# 서비스 상태 대기
echo "  서비스 준비 대기 중 (최대 30초)..."
for i in $(seq 1 30); do
    if docker compose -f docker-compose.offline.yml ps | grep -q "healthy"; then
        break
    fi
    sleep 1
    printf "."
done
echo ""
echo ""

# 상태 출력
docker compose -f docker-compose.offline.yml ps
echo ""

# -------------------------------------------
# Step 3: DB 시드 데이터
# -------------------------------------------
echo "[3/3] DB 시드 데이터 생성 중..."
sleep 3  # DB 완전 준비 대기
docker compose -f docker-compose.offline.yml exec api python -m app.core.seed
echo ""

# -------------------------------------------
# 완료
# -------------------------------------------
echo "============================================"
echo "✅ SecuHub 실행 완료!"
echo "============================================"
echo ""
echo "  프론트엔드:  http://$(hostname -I | awk '{print $1}'):5173"
echo "  API 문서:    http://$(hostname -I | awk '{print $1}'):8000/docs"
echo "  API 헬스:    http://$(hostname -I | awk '{print $1}'):8000/health"
echo ""
echo "  데모 계정:"
echo "  ┌──────────┬─────────────────────┬──────────┐"
echo "  │ 역할     │ 이메일              │ 비밀번호 │"
echo "  ├──────────┼─────────────────────┼──────────┤"
echo "  │ 관리자   │ admin@company.com   │ admin1234│"
echo "  │ 결재자   │ park_tl@company.com │ park1234 │"
echo "  │ 개발자   │ kim@company.com     │ dev1234  │"
echo "  └──────────┴─────────────────────┴──────────┘"
echo ""
echo "  중지: docker compose -f docker-compose.offline.yml down"
echo ""
