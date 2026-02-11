"""
초기 데이터 시드 스크립트
실행: python -m app.core.seed
"""
import asyncio
from datetime import datetime, date
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.database import async_session, engine, Base
from app.core.security import get_password_hash
from app.models import *


async def seed_users(session: AsyncSession):
    """기본 사용자 계정 생성"""
    users = [
        User(
            email="admin@company.com",
            name="보안팀 관리자",
            hashed_password=get_password_hash("admin1234"),
            team="보안팀",
            role=UserRole.ADMIN,
            permission_evidence=True,
            permission_vuln=True,
            status=UserStatus.ACTIVE,
        ),
        User(
            email="park_tl@company.com",
            name="박팀장",
            hashed_password=get_password_hash("park1234"),
            team="백엔드팀",
            role=UserRole.APPROVER,
            permission_evidence=False,
            permission_vuln=True,
            status=UserStatus.ACTIVE,
        ),
        User(
            email="kim_tl@company.com",
            name="김팀장",
            hashed_password=get_password_hash("kim1234"),
            team="프론트팀",
            role=UserRole.APPROVER,
            permission_evidence=False,
            permission_vuln=True,
            status=UserStatus.ACTIVE,
        ),
        User(
            email="kim@company.com",
            name="김개발",
            hashed_password=get_password_hash("dev1234"),
            team="백엔드팀",
            role=UserRole.DEVELOPER,
            permission_evidence=False,
            permission_vuln=True,
            status=UserStatus.ACTIVE,
        ),
        User(
            email="lee@company.com",
            name="이보안",
            hashed_password=get_password_hash("dev1234"),
            team="보안팀",
            role=UserRole.DEVELOPER,
            permission_evidence=True,
            permission_vuln=True,
            status=UserStatus.ACTIVE,
        ),
        User(
            email="park_dev@company.com",
            name="박백엔드",
            hashed_password=get_password_hash("dev1234"),
            team="백엔드팀",
            role=UserRole.DEVELOPER,
            permission_evidence=False,
            permission_vuln=True,
            status=UserStatus.ACTIVE,
        ),
        User(
            email="choi@company.com",
            name="최인프라",
            hashed_password=get_password_hash("dev1234"),
            team="인프라팀",
            role=UserRole.DEVELOPER,
            permission_evidence=False,
            permission_vuln=True,
            status=UserStatus.ACTIVE,
        ),
    ]
    session.add_all(users)
    await session.flush()
    print(f"  ✓ {len(users)}개 사용자 계정 생성")
    return users


async def seed_frameworks(session: AsyncSession):
    """프레임워크 및 통제 항목 생성"""
    fw = Framework(name="ISMS-P", description="정보보호 및 개인정보보호 관리체계 인증")
    session.add(fw)
    await session.flush()

    controls_data = [
        ("1.1.1", "관리체계 기반", "정보보호 정책 수립", "정보보호 정책서, 개인정보 처리방침"),
        ("1.1.2", "관리체계 기반", "조직 체계 구성", "정보보호 조직도, R&R 정의서"),
        ("2.1.1", "보호대책", "인적 보안", "보안교육 이수 명단"),
        ("2.3.1", "보호대책", "접근권한 관리", "시스템 접근권한 현황표, DB 접근권한 현황표"),
        ("3.1.1", "보호대책", "네트워크 보안", "방화벽 정책 스크린샷"),
    ]

    controls = []
    for code, domain, name, desc in controls_data:
        c = Control(framework_id=fw.id, code=code, domain=domain, name=name, description=desc)
        session.add(c)
        controls.append(c)
    await session.flush()

    # 증빙 유형 생성
    evidence_types_data = {
        controls[0].id: [
            ("정보보호 정책서", "pdf"),
            ("개인정보 처리방침", "pdf"),
            ("정보보호 조직도", "png"),
        ],
        controls[1].id: [
            ("정보보호 조직도", "png"),
            ("R&R 정의서", "xlsx"),
        ],
        controls[2].id: [
            ("보안교육 이수 명단", "xlsx"),
        ],
        controls[3].id: [
            ("시스템 접근권한 현황", "xlsx"),
            ("DB 접근권한 현황", "xlsx"),
        ],
        controls[4].id: [
            ("방화벽 정책 스크린샷", "png"),
        ],
    }

    for control_id, types in evidence_types_data.items():
        for name, file_type in types:
            et = EvidenceType(control_id=control_id, name=name, file_type=file_type)
            session.add(et)

    await session.flush()
    print(f"  ✓ 1개 프레임워크, {len(controls)}개 통제 항목 생성")
    return fw, controls


async def seed_assessments(session: AsyncSession, users: list):
    """점검 및 취약점 데이터 생성"""
    assessments_data = [
        Assessment(
            name="2025년 웹 취약점 점검",
            assessor="A보안업체",
            assessed_at=date(2025, 1, 15),
            description="2025년 상반기 웹 애플리케이션 취약점 점검",
            status=AssessmentStatus.IN_PROGRESS,
        ),
        Assessment(
            name="2024년 그룹 보안 점검",
            assessor="그룹 보안팀",
            assessed_at=date(2024, 11, 20),
            status=AssessmentStatus.COMPLETED,
        ),
    ]
    session.add_all(assessments_data)
    await session.flush()

    # users: [admin, park_tl, kim_tl, kim_dev, lee_dev, park_dev, choi_dev]
    kim_dev = users[3]
    lee_dev = users[4]
    park_dev = users[5]
    choi_dev = users[6]
    park_tl = users[1]

    vulns_data = [
        Vulnerability(
            assessment_id=assessments_data[0].id,
            category="웹 취약점", asset="결제 API", item="SQL Injection",
            content="사용자 입력값이 SQL 쿼리에 직접 삽입됨",
            issue="공격자가 DB 데이터 탈취 가능",
            status=VulnStatus.UNASSIGNED,
        ),
        Vulnerability(
            assessment_id=assessments_data[0].id,
            category="웹 취약점", asset="회원 서비스", item="CSRF",
            content="CSRF 토큰 미적용",
            issue="사용자 권한으로 악의적 요청 실행 가능",
            assignee_id=kim_dev.id, approver_id=park_tl.id,
            due_date=date(2025, 1, 28),
            status=VulnStatus.PENDING_APPROVAL,
            action_plan="프레임워크 CSRF 미들웨어 적용",
        ),
        Vulnerability(
            assessment_id=assessments_data[0].id,
            category="데이터 보안", asset="회원 DB", item="민감정보 평문저장",
            content="비밀번호 및 개인정보 평문 저장",
            issue="DB 유출 시 즉시 피해 발생",
            assignee_id=park_dev.id,
            due_date=date(2025, 1, 20),
            status=VulnStatus.DONE,
            action_result="AES-256 암호화 적용 완료",
            note="AES-256 암호화 적용 완료",
        ),
        Vulnerability(
            assessment_id=assessments_data[0].id,
            category="웹 취약점", asset="관리자 페이지", item="XSS",
            content="게시판 입력값 필터링 미흡",
            issue="관리자 세션 탈취 가능",
            status=VulnStatus.UNASSIGNED,
        ),
        Vulnerability(
            assessment_id=assessments_data[0].id,
            category="인프라", asset="웹서버", item="불필요 포트 오픈",
            content="22, 3389 포트 외부 노출",
            issue="무작위 대입 공격에 취약",
            assignee_id=choi_dev.id,
            due_date=date(2025, 2, 5),
            status=VulnStatus.IN_PROGRESS,
            note="방화벽 정책 변경 요청 중",
        ),
    ]
    session.add_all(vulns_data)
    await session.flush()
    print(f"  ✓ {len(assessments_data)}개 점검, {len(vulns_data)}개 취약점 생성")


async def seed():
    """전체 시드 실행"""
    print("🌱 SecuHub 초기 데이터 시드 시작...")

    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session() as session:
        async with session.begin():
            users = await seed_users(session)
            await seed_frameworks(session)
            await seed_assessments(session, users)

    print("✅ 시드 완료!")


if __name__ == "__main__":
    asyncio.run(seed())
