#!/bin/bash
# 폐쇄망 일상 명령어 모음

case "$1" in
  start)
    echo "서비스 시작..."
    docker compose -f docker-compose.offline.yml up -d
    docker compose -f docker-compose.offline.yml ps
    ;;
  stop)
    echo "서비스 중지..."
    docker compose -f docker-compose.offline.yml down
    ;;
  restart)
    echo "서비스 재시작..."
    docker compose -f docker-compose.offline.yml restart
    ;;
  status)
    docker compose -f docker-compose.offline.yml ps
    ;;
  logs)
    # 사용법: bash manage.sh logs api
    docker compose -f docker-compose.offline.yml logs -f ${2:-api}
    ;;
  seed)
    echo "DB 시드 데이터 생성..."
    docker compose -f docker-compose.offline.yml exec api python -m app.core.seed
    ;;
  reset-db)
    echo "⚠️  DB 초기화 (모든 데이터 삭제)..."
    read -p "정말 초기화하시겠습니까? (y/N): " confirm
    if [ "$confirm" = "y" ]; then
      docker compose -f docker-compose.offline.yml down -v
      docker compose -f docker-compose.offline.yml up -d
      sleep 5
      docker compose -f docker-compose.offline.yml exec api python -m app.core.seed
      echo "✓ DB 초기화 및 시드 완료"
    fi
    ;;
  db)
    echo "PostgreSQL 접속..."
    docker compose -f docker-compose.offline.yml exec postgres psql -U secuhub -d secuhub
    ;;
  *)
    echo "SecuHub 관리 스크립트"
    echo ""
    echo "사용법: bash manage.sh [명령어]"
    echo ""
    echo "  start      서비스 시작"
    echo "  stop       서비스 중지"
    echo "  restart    서비스 재시작"
    echo "  status     서비스 상태 확인"
    echo "  logs [서비스]  로그 확인 (기본: api)"
    echo "  seed       DB 시드 데이터 생성"
    echo "  reset-db   DB 초기화 (주의!)"
    echo "  db         PostgreSQL 직접 접속"
    ;;
esac
