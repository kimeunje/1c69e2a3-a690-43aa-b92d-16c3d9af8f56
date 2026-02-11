#!/bin/bash
# ============================================
# SecuHub 오프라인 빌드 스크립트
# 인터넷 되는 외부 PC에서 실행하세요
# ============================================

set -e

echo "============================================"
echo "SecuHub 오프라인 이미지 빌드"
echo "============================================"
echo ""

# 출력 디렉토리
OUTPUT_DIR="./secuhub-offline-images"
mkdir -p "$OUTPUT_DIR"

# -------------------------------------------
# Step 1: 공개 이미지 Pull
# -------------------------------------------
echo "[1/4] 공개 이미지 다운로드 중..."
docker pull postgres:16-alpine
docker pull redis:7-alpine
echo "  ✓ postgres, redis 다운로드 완료"
echo ""

# -------------------------------------------
# Step 2: Backend 이미지 빌드
# -------------------------------------------
echo "[2/4] Backend 이미지 빌드 중... (pip install 포함)"
docker build -t secuhub-api:latest ./backend
echo "  ✓ secuhub-api 빌드 완료"
echo ""

# -------------------------------------------
# Step 3: Frontend 이미지 빌드
# -------------------------------------------
echo "[3/4] Frontend 이미지 빌드 중... (npm install 포함)"
docker build -t secuhub-frontend:latest -f ./frontend/Dockerfile.dev ./frontend
echo "  ✓ secuhub-frontend 빌드 완료"
echo ""

# -------------------------------------------
# Step 4: 모든 이미지를 tar 파일로 저장
# -------------------------------------------
echo "[4/4] 이미지를 파일로 저장 중..."

docker save postgres:16-alpine -o "$OUTPUT_DIR/postgres-16-alpine.tar"
echo "  ✓ postgres-16-alpine.tar"

docker save redis:7-alpine -o "$OUTPUT_DIR/redis-7-alpine.tar"
echo "  ✓ redis-7-alpine.tar"

docker save secuhub-api:latest -o "$OUTPUT_DIR/secuhub-api.tar"
echo "  ✓ secuhub-api.tar"

docker save secuhub-frontend:latest -o "$OUTPUT_DIR/secuhub-frontend.tar"
echo "  ✓ secuhub-frontend.tar"

echo ""

# -------------------------------------------
# 결과 요약
# -------------------------------------------
echo "============================================"
echo "빌드 완료! 아래 파일들을 폐쇄망으로 옮기세요:"
echo "============================================"
echo ""
echo "1. secuhub/ 프로젝트 폴더 전체"
echo "2. $OUTPUT_DIR/ 폴더 안의 tar 파일들:"
ls -lh "$OUTPUT_DIR"/*.tar
echo ""
echo "총 크기:"
du -sh "$OUTPUT_DIR"
echo ""
echo "============================================"
echo "폐쇄망에서 실행 방법:"
echo "============================================"
echo ""
echo "  cd secuhub"
echo "  bash scripts/load-and-run.sh"
echo ""
