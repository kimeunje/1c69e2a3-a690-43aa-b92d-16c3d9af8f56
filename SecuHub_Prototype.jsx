import React, { useState } from 'react';

// 아이콘 컴포넌트
const Icon = ({ name, size = 20, className = '' }) => {
  const icons = {
    shield: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />,
    home: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
    list: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />,
    upload: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />,
    bell: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />,
    check: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />,
    x: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />,
    clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    search: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />,
    plus: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />,
    chevronDown: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />,
    chevronRight: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />,
    alertTriangle: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
    user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
    users: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />,
    mail: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
    calendar: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    file: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
    folder: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />,
    link: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />,
    arrowRight: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />,
    arrowLeft: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />,
    refresh: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />,
    eye: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />,
    settings: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />,
    bug: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />,
    play: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />,
    download: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />,
    externalLink: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />,
    terminal: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />,
    logout: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />,
    history: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
  };
  
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" className={className}>
      {icons[name]}
    </svg>
  );
};

// ============================================
// 보안팀용 사이드바
// ============================================
const AdminSidebar = ({ currentPage, setCurrentPage }) => {
  const [expandedMenus, setExpandedMenus] = useState(['evidence', 'vuln']);

  const toggleMenu = (menu) => {
    setExpandedMenus(prev => 
      prev.includes(menu) ? prev.filter(m => m !== menu) : [...prev, menu]
    );
  };

  const menuGroups = [
    {
      id: 'main',
      items: [
        { id: 'dashboard', icon: 'home', label: '대시보드' },
      ]
    },
    {
      id: 'evidence',
      label: '증빙 수집',
      items: [
        { id: 'controls', icon: 'list', label: '통제 항목' },
        { id: 'jobs', icon: 'play', label: '수집 작업' },
        { id: 'files', icon: 'folder', label: '증빙 파일' },
      ]
    },
    {
      id: 'vuln',
      label: '취약점 관리',
      items: [
        { id: 'assessments', icon: 'list', label: '점검 관리' },
      ]
    },
    {
      id: 'system',
      label: '시스템',
      items: [
        { id: 'accounts', icon: 'users', label: '계정 관리' },
        { id: 'settings', icon: 'settings', label: '설정' },
      ]
    },
  ];

  return (
    <div className="w-60 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center px-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
            <Icon name="shield" size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-gray-900">SecuHub</span>
            <span className="ml-2 px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Admin</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 overflow-y-auto">
        {menuGroups.map((group, groupIdx) => (
          <div key={group.id} className={groupIdx > 0 ? 'mt-4' : ''}>
            {group.label && (
              <button
                onClick={() => toggleMenu(group.id)}
                className="w-full flex items-center justify-between px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600"
              >
                {group.label}
                <Icon name={expandedMenus.includes(group.id) ? 'chevronDown' : 'chevronRight'} size={14} />
              </button>
            )}
            {(!group.label || expandedMenus.includes(group.id)) && (
              <div className="space-y-1">
                {group.items.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === item.id
                        ? 'bg-blue-50 text-blue-600'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <Icon name={item.icon} size={18} />
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-medium text-sm">관</div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">보안팀 관리자</p>
            <p className="text-xs text-gray-500">admin@company.com</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-500">
          <span className="w-2 h-2 bg-green-500 rounded-full"></span>
          시스템 정상 · 마지막 수집 10분 전
        </div>
      </div>
    </div>
  );
};

// ============================================
// 개발자용 사이드바
// ============================================
const DevSidebar = ({ currentPage, setCurrentPage, user }) => {
  const menuItems = [
    { id: 'dev-dashboard', icon: 'home', label: '전체 현황' },
    { id: 'dev-my-vulns', icon: 'user', label: '나의 현황' },
    { id: 'dev-vulns', icon: 'bug', label: '취약점 목록' },
    { id: 'dev-approvals', icon: 'check', label: '결재 관리' },
    { id: 'dev-history', icon: 'history', label: '조치 이력' },
  ];

  return (
    <div className="w-60 bg-white border-r border-gray-200 h-screen flex flex-col fixed left-0 top-0">
      <div className="h-16 flex items-center px-5 border-b border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Icon name="bug" size={18} className="text-white" />
          </div>
          <div>
            <span className="font-bold text-gray-900">SecuHub</span>
            <span className="ml-2 px-1.5 py-0.5 bg-emerald-100 text-emerald-700 text-xs rounded">Dev</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3">
        <div className="space-y-1">
          {menuItems.map(item => (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                currentPage === item.id
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Icon name={item.icon} size={18} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-medium text-sm">
            {user.name[0]}
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">{user.name}</p>
            <p className="text-xs text-gray-500">{user.team}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 헤더 컴포넌트
// ============================================
const Header = ({ title, subtitle, isAdmin = true }) => (
  <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10">
    <div>
      <h1 className="text-lg font-bold text-gray-900">{title}</h1>
      {subtitle && <p className="text-sm text-gray-500">{subtitle}</p>}
    </div>
    <div className="flex items-center gap-3">
      <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
        <Icon name="bell" size={20} />
        <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
      </button>
    </div>
  </header>
);

// ============================================
// 보안팀용 - 대시보드
// ============================================
const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-2 gap-6">
        {/* 증빙 수집 현황 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">증빙 수집 현황</h3>
            <span className="text-xs text-gray-500">ISMS-P 기준</span>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: '전체', value: 247, color: 'text-gray-900' },
              { label: '완료', value: 198, color: 'text-green-600' },
              { label: '미수집', value: 42, color: 'text-amber-600' },
              { label: '실패', value: 7, color: 'text-red-600' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '80%' }}></div>
          </div>
        </div>

        {/* 취약점 조치 현황 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">취약점 조치 현황</h3>
            <span className="text-xs text-gray-500">2024년 1분기</span>
          </div>
          <div className="grid grid-cols-4 gap-3 mb-4">
            {[
              { label: '전체', value: 156, color: 'text-gray-900' },
              { label: '완료', value: 98, color: 'text-green-600' },
              { label: '진행중', value: 34, color: 'text-blue-600' },
              { label: '미조치', value: 24, color: 'text-red-600' },
            ].map((stat, idx) => (
              <div key={idx} className="text-center">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-green-500 rounded-full" style={{ width: '63%' }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* 프레임워크별 현황 */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-bold text-gray-900 mb-4">프레임워크별 증빙 현황</h3>
          <div className="space-y-3">
            {[
              { name: 'ISMS-P', progress: 82, color: 'bg-blue-500' },
              { name: '전자금융감독규정', progress: 67, color: 'bg-purple-500' },
              { name: '개인정보보호법', progress: 89, color: 'bg-green-500' },
            ].map((fw, idx) => (
              <div key={idx}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{fw.name}</span>
                  <span className="text-gray-500">{fw.progress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${fw.color} rounded-full`} style={{ width: `${fw.progress}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 긴급 취약점 */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <Icon name="alertTriangle" size={16} className="text-red-500" />
            <h3 className="font-bold text-gray-900">긴급 조치 필요</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { id: 'VUL-0089', name: 'SQL Injection', due: 'D-1', assignee: '김개발' },
              { id: 'VUL-0092', name: 'XSS 취약점', due: 'D-3', assignee: '이보안' },
              { id: 'VUL-0095', name: '인증 우회', due: 'D-5', assignee: '박백엔드' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 hover:bg-gray-50 cursor-pointer">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-red-600">{item.id}</span>
                  <span className="px-1.5 py-0.5 bg-red-100 text-red-700 text-xs font-bold rounded">{item.due}</span>
                </div>
                <p className="text-sm text-gray-900 mt-1">{item.name}</p>
                <p className="text-xs text-gray-500">담당: {item.assignee}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 예정된 수집 */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <Icon name="calendar" size={16} className="text-blue-500" />
            <h3 className="font-bold text-gray-900">예정된 수집</h3>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { name: '접근권한 현황 추출', time: '오늘 18:00' },
              { name: '백신 업데이트 현황', time: '내일 09:00' },
              { name: '방화벽 정책 스크린샷', time: '내일 14:00' },
            ].map((item, idx) => (
              <div key={idx} className="p-3 hover:bg-gray-50 cursor-pointer">
                <p className="text-sm text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-500 mt-1">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 보안팀용 - 통제 항목
// ============================================
const ControlsPage = () => {
  const [expandedControl, setExpandedControl] = useState(null);
  const [expandedHistory, setExpandedHistory] = useState(null);

  const controls = [
    { 
      code: '1.1.1', 
      name: '정보보호 정책 수립', 
      evidence: '정책 문서', 
      collected: '3/3', 
      status: 'complete',
      evidenceList: [
        { 
          id: 'EV001',
          name: '정보보호 정책서', 
          currentVersion: 'v3',
          type: 'pdf', 
          size: '2.4MB', 
          collectedAt: '2025-01-15 09:30', 
          job: '정책 문서 수집',
          history: [
            { version: 'v3', date: '2025-01-15 09:30', size: '2.4MB', method: '자동 수집' },
            { version: 'v2', date: '2024-10-01 10:00', size: '2.1MB', method: '자동 수집' },
            { version: 'v1', date: '2024-07-01 09:30', size: '1.8MB', method: '수동 업로드' },
          ]
        },
        { 
          id: 'EV002',
          name: '개인정보 처리방침', 
          currentVersion: 'v2',
          type: 'pdf', 
          size: '1.8MB', 
          collectedAt: '2025-01-15 09:30', 
          job: '정책 문서 수집',
          history: [
            { version: 'v2', date: '2025-01-15 09:30', size: '1.8MB', method: '자동 수집' },
            { version: 'v1', date: '2024-07-01 09:30', size: '1.5MB', method: '수동 업로드' },
          ]
        },
        { 
          id: 'EV003',
          name: '정보보호 조직도', 
          currentVersion: 'v1',
          type: 'png', 
          size: '450KB', 
          collectedAt: '2025-01-14 14:20', 
          job: '조직도 스크린샷',
          history: [
            { version: 'v1', date: '2025-01-14 14:20', size: '450KB', method: '자동 수집' },
          ]
        },
      ]
    },
    { 
      code: '1.1.2', 
      name: '조직 체계 구성', 
      evidence: '조직도, R&R 문서', 
      collected: '2/2', 
      status: 'complete',
      evidenceList: [
        { 
          id: 'EV004',
          name: '정보보호 조직도', 
          currentVersion: 'v2',
          type: 'png', 
          size: '320KB', 
          collectedAt: '2025-01-14 14:20', 
          job: '조직도 스크린샷',
          history: [
            { version: 'v2', date: '2025-01-14 14:20', size: '320KB', method: '자동 수집' },
            { version: 'v1', date: '2024-10-05 11:00', size: '280KB', method: '자동 수집' },
          ]
        },
        { 
          id: 'EV005',
          name: 'R&R 정의서', 
          currentVersion: 'v3',
          type: 'xlsx', 
          size: '156KB', 
          collectedAt: '2025-01-14 14:25', 
          job: 'R&R 문서 추출',
          history: [
            { version: 'v3', date: '2025-01-14 14:25', size: '156KB', method: '자동 수집' },
            { version: 'v2', date: '2024-10-01 09:00', size: '142KB', method: '자동 수집' },
            { version: 'v1', date: '2024-07-01 09:00', size: '128KB', method: '수동 업로드' },
          ]
        },
      ]
    },
    { 
      code: '2.1.1', 
      name: '인적 보안', 
      evidence: '보안교육 이수 명단', 
      collected: '0/1', 
      status: 'pending',
      evidenceList: []
    },
    { 
      code: '2.3.1', 
      name: '접근권한 관리', 
      evidence: '권한 현황표', 
      collected: '1/2', 
      status: 'partial',
      evidenceList: [
        { 
          id: 'EV006',
          name: '시스템 접근권한 현황_202501', 
          currentVersion: 'v1',
          type: 'xlsx', 
          size: '89KB', 
          collectedAt: '2025-01-10 10:00', 
          job: '접근권한 추출',
          history: [
            { version: 'v1', date: '2025-01-10 10:00', size: '89KB', method: '자동 수집' },
          ]
        },
      ]
    },
    { 
      code: '3.1.1', 
      name: '네트워크 보안', 
      evidence: '방화벽 정책 스크린샷', 
      collected: '0/1', 
      status: 'failed',
      evidenceList: []
    },
  ];

  const getStatusBadge = (status) => {
    const map = {
      complete: { bg: 'bg-green-100', text: 'text-green-700', label: '완료' },
      pending: { bg: 'bg-amber-100', text: 'text-amber-700', label: '미수집' },
      partial: { bg: 'bg-blue-100', text: 'text-blue-700', label: '진행중' },
      failed: { bg: 'bg-red-100', text: 'text-red-700', label: '실패' },
    };
    return map[status];
  };

  const getFileIcon = (type) => {
    const map = {
      pdf: 'text-red-500',
      xlsx: 'text-green-500',
      png: 'text-blue-500',
      jpg: 'text-blue-500',
    };
    return map[type] || 'text-gray-500';
  };

  const toggleExpand = (code) => {
    setExpandedControl(expandedControl === code ? null : code);
    setExpandedHistory(null);
  };

  const toggleHistory = (evidenceId) => {
    setExpandedHistory(expandedHistory === evidenceId ? null : evidenceId);
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>ISMS-P</option>
            <option>전자금융감독규정</option>
            <option>개인정보보호법</option>
          </select>
          <div className="relative">
            <input type="text" placeholder="항목 검색..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64" />
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Icon name="download" size={16} />
            Import
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
            <Icon name="plus" size={16} />
            항목 추가
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 w-10"></th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">코드</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">항목명</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">필요 증빙</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">수집현황</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">상태</th>
              <th className="px-4 py-3 w-16"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {controls.map((control, idx) => (
              <React.Fragment key={idx}>
                <tr 
                  className={`hover:bg-gray-50 cursor-pointer ${expandedControl === control.code ? 'bg-blue-50' : ''}`}
                  onClick={() => toggleExpand(control.code)}
                >
                  <td className="px-4 py-3">
                    <Icon 
                      name={expandedControl === control.code ? 'chevronDown' : 'chevronRight'} 
                      size={16} 
                      className="text-gray-400" 
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-sm text-blue-600">{control.code}</span>
                  </td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900">{control.name}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{control.evidence}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{control.collected}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getStatusBadge(control.status).bg} ${getStatusBadge(control.status).text}`}>
                      {getStatusBadge(control.status).label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button className="p-1.5 text-gray-400 hover:text-blue-500" onClick={(e) => e.stopPropagation()}>
                      <Icon name="settings" size={16} />
                    </button>
                  </td>
                </tr>
                {/* 확장된 증빙 상세 */}
                {expandedControl === control.code && (
                  <tr>
                    <td colSpan={7} className="bg-gray-50 px-4 py-4">
                      <div className="ml-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="text-sm font-semibold text-gray-700">수집된 증빙 파일</h4>
                          {control.evidenceList.length > 0 && (
                            <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                              전체 다운로드 (ZIP)
                            </button>
                          )}
                        </div>
                        {control.evidenceList.length > 0 ? (
                          <div className="space-y-2">
                            {control.evidenceList.map((file, fileIdx) => (
                              <div key={fileIdx} className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                                <div className="flex items-center justify-between p-3">
                                  <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded flex items-center justify-center bg-gray-100 ${getFileIcon(file.type)}`}>
                                      <Icon name="file" size={16} />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">{file.name}</p>
                                      <p className="text-xs text-gray-500">
                                        {file.currentVersion} · {file.type.toUpperCase()} · {file.size} · {file.collectedAt}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <button 
                                      onClick={(e) => { e.stopPropagation(); toggleHistory(file.id); }}
                                      className={`px-2 py-1 text-xs font-medium rounded transition-colors ${
                                        expandedHistory === file.id 
                                          ? 'bg-blue-100 text-blue-700' 
                                          : 'text-gray-500 hover:bg-gray-100'
                                      }`}
                                    >
                                      이력 ({file.history.length})
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-blue-500" title="미리보기">
                                      <Icon name="eye" size={16} />
                                    </button>
                                    <button className="p-2 text-gray-400 hover:text-blue-500" title="다운로드">
                                      <Icon name="download" size={16} />
                                    </button>
                                  </div>
                                </div>
                                
                                {/* 버전 이력 */}
                                {expandedHistory === file.id && (
                                  <div className="border-t border-gray-200 bg-gray-50 p-3">
                                    <p className="text-xs font-semibold text-gray-600 mb-2">버전 이력</p>
                                    <div className="space-y-2">
                                      {file.history.map((ver, verIdx) => (
                                        <div key={verIdx} className="flex items-center justify-between py-2 px-3 bg-white rounded border border-gray-100">
                                          <div className="flex items-center gap-3">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                                              verIdx === 0 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-600'
                                            }`}>
                                              {ver.version}
                                              {verIdx === 0 && ' (최신)'}
                                            </span>
                                            <span className="text-xs text-gray-500">{ver.date}</span>
                                            <span className="text-xs text-gray-400">{ver.size}</span>
                                            <span className="text-xs text-gray-400">{ver.method}</span>
                                          </div>
                                          <div className="flex items-center gap-1">
                                            <button className="p-1 text-gray-400 hover:text-blue-500" title="미리보기">
                                              <Icon name="eye" size={14} />
                                            </button>
                                            <button className="p-1 text-gray-400 hover:text-blue-500" title="다운로드">
                                              <Icon name="download" size={14} />
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="bg-white rounded-lg border border-gray-200 p-6 text-center">
                            <Icon name="folder" size={32} className="mx-auto mb-2 text-gray-300" />
                            <p className="text-sm text-gray-500">수집된 증빙 파일이 없습니다.</p>
                            {control.status === 'failed' && (
                              <p className="text-xs text-red-500 mt-1">수집 작업이 실패했습니다. 작업을 확인해주세요.</p>
                            )}
                            {control.status === 'pending' && (
                              <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
                                수집 작업 실행
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================
// 보안팀용 - 수집 작업
// ============================================
const JobsPage = ({ setCurrentPage }) => {
  const jobs = [
    { name: '방화벽 정책 스크린샷', type: 'web_scraping', schedule: '매주 월요일 09:00', lastRun: '1시간 전', status: 'failed' },
    { name: '접근권한 현황 추출', type: 'excel_extract', schedule: '매월 1일 09:00', lastRun: '3일 전', status: 'success' },
    { name: 'VPN 접속 로그', type: 'log_extract', schedule: '매일 18:00', lastRun: '6시간 전', status: 'success' },
  ];

  const getTypeBadge = (type) => {
    const map = {
      web_scraping: { bg: 'bg-purple-100', text: 'text-purple-700', label: '웹 스크래핑' },
      excel_extract: { bg: 'bg-green-100', text: 'text-green-700', label: '엑셀 추출' },
      log_extract: { bg: 'bg-amber-100', text: 'text-amber-700', label: '로그 추출' },
    };
    return map[type];
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <input type="text" placeholder="작업 검색..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64" />
          <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
          <Icon name="plus" size={16} />
          새 작업 등록
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">상태</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">작업명</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">유형</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">스케줄</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">마지막 실행</th>
              <th className="px-4 py-3 w-24"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {jobs.map((job, idx) => (
              <tr key={idx} className="hover:bg-gray-50 cursor-pointer" onClick={() => setCurrentPage('job-detail')}>
                <td className="px-4 py-3">
                  <span className={`w-2.5 h-2.5 rounded-full inline-block ${job.status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}></span>
                </td>
                <td className="px-4 py-3 text-sm font-medium text-gray-900">{job.name}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getTypeBadge(job.type).bg} ${getTypeBadge(job.type).text}`}>
                    {getTypeBadge(job.type).label}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{job.schedule}</td>
                <td className="px-4 py-3 text-sm text-gray-500">{job.lastRun}</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-blue-500" onClick={(e) => e.stopPropagation()}>
                      <Icon name="play" size={16} />
                    </button>
                    <button className="p-1.5 text-gray-400 hover:text-blue-500" onClick={(e) => e.stopPropagation()}>
                      <Icon name="settings" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================
// 보안팀용 - 작업 상세
// ============================================
const JobDetailPage = ({ setCurrentPage }) => {
  const steps = [
    { name: '로그인 페이지 접속', status: 'success' },
    { name: '로그인 수행', status: 'success' },
    { name: '방화벽 메뉴 이동', status: 'success' },
    { name: '정책 목록 로딩 대기', status: 'failed' },
  ];

  return (
    <div className="p-6 space-y-6">
      <button onClick={() => setCurrentPage('jobs')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
        <Icon name="arrowLeft" size={16} />
        목록으로
      </button>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">방화벽 정책 스크린샷 수집</h2>
            <p className="text-sm text-gray-500 mt-1">2024-01-15 09:30:15 실행 (소요: 45초)</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-sm font-medium">실패</span>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
              <Icon name="refresh" size={16} />
              재실행
            </button>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4">실행 과정</h3>
          <div className="space-y-3">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center ${step.status === 'success' ? 'bg-green-100' : 'bg-red-100'}`}>
                  <Icon name={step.status === 'success' ? 'check' : 'x'} size={14} className={step.status === 'success' ? 'text-green-600' : 'text-red-600'} />
                </div>
                <span className={`text-sm ${step.status === 'failed' ? 'text-red-600 font-medium' : 'text-gray-700'}`}>
                  Step {idx + 1}: {step.name}
                </span>
                {step.status === 'failed' && <span className="text-xs text-red-500">← 실패 지점</span>}
              </div>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4">실패 시점 스크린샷</h3>
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <Icon name="file" size={48} className="mx-auto mb-2 text-gray-400" />
            <p className="text-sm text-gray-500">방화벽 관리 화면</p>
          </div>
        </div>

        <div>
          <h3 className="font-bold text-gray-900 mb-4">에러 로그</h3>
          <div className="bg-gray-900 rounded-lg p-4 font-mono text-sm text-gray-300">
            <p>TimeoutError: locator.wait_for: Timeout 30000ms exceeded</p>
            <p className="text-red-400">waiting for selector "#policy-table"</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 보안팀용 - 증빙 파일 (전체 이력 관리)
// ============================================
const FilesPage = () => {
  const [viewMode, setViewMode] = useState('list'); // list, timeline
  const [selectedPeriod, setSelectedPeriod] = useState('2025-Q1');

  const allFiles = [
    // 2025년 1월
    { id: 1, name: '정보보호 정책서', version: 'v3', type: 'pdf', control: '1.1.1', controlName: '정보보호 정책 수립', date: '2025-01-15', size: '2.4MB', method: '자동 수집', job: '정책 문서 수집' },
    { id: 2, name: '개인정보 처리방침', version: 'v2', type: 'pdf', control: '1.1.1', controlName: '정보보호 정책 수립', date: '2025-01-15', size: '1.8MB', method: '자동 수집', job: '정책 문서 수집' },
    { id: 3, name: '정보보호 조직도', version: 'v2', type: 'png', control: '1.1.2', controlName: '조직 체계 구성', date: '2025-01-14', size: '320KB', method: '자동 수집', job: '조직도 스크린샷' },
    { id: 4, name: 'R&R 정의서', version: 'v3', type: 'xlsx', control: '1.1.2', controlName: '조직 체계 구성', date: '2025-01-14', size: '156KB', method: '자동 수집', job: 'R&R 문서 추출' },
    { id: 5, name: '시스템 접근권한 현황_202501', version: 'v1', type: 'xlsx', control: '2.3.1', controlName: '접근권한 관리', date: '2025-01-10', size: '89KB', method: '자동 수집', job: '접근권한 추출' },
    // 2024년 10월
    { id: 6, name: '정보보호 정책서', version: 'v2', type: 'pdf', control: '1.1.1', controlName: '정보보호 정책 수립', date: '2024-10-01', size: '2.1MB', method: '자동 수집', job: '정책 문서 수집' },
    { id: 7, name: '정보보호 조직도', version: 'v1', type: 'png', control: '1.1.2', controlName: '조직 체계 구성', date: '2024-10-05', size: '280KB', method: '자동 수집', job: '조직도 스크린샷' },
    { id: 8, name: 'R&R 정의서', version: 'v2', type: 'xlsx', control: '1.1.2', controlName: '조직 체계 구성', date: '2024-10-01', size: '142KB', method: '자동 수집', job: 'R&R 문서 추출' },
    // 2024년 7월
    { id: 9, name: '정보보호 정책서', version: 'v1', type: 'pdf', control: '1.1.1', controlName: '정보보호 정책 수립', date: '2024-07-01', size: '1.8MB', method: '수동 업로드', job: '-' },
    { id: 10, name: '개인정보 처리방침', version: 'v1', type: 'pdf', control: '1.1.1', controlName: '정보보호 정책 수립', date: '2024-07-01', size: '1.5MB', method: '수동 업로드', job: '-' },
    { id: 11, name: 'R&R 정의서', version: 'v1', type: 'xlsx', control: '1.1.2', controlName: '조직 체계 구성', date: '2024-07-01', size: '128KB', method: '수동 업로드', job: '-' },
  ];

  const getFileIcon = (type) => {
    const map = {
      pdf: 'text-red-500',
      xlsx: 'text-green-500',
      png: 'text-blue-500',
    };
    return map[type] || 'text-gray-500';
  };

  // 월별 그룹핑
  const groupByMonth = (files) => {
    const groups = {};
    files.forEach(file => {
      const month = file.date.substring(0, 7); // YYYY-MM
      if (!groups[month]) groups[month] = [];
      groups[month].push(file);
    });
    return groups;
  };

  const groupedFiles = groupByMonth(allFiles);
  const sortedMonths = Object.keys(groupedFiles).sort().reverse();

  return (
    <div className="p-6 space-y-4">
      {/* 상단 필터 및 액션 */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select 
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="all">전체 기간</option>
            <option value="2025-Q1">2025년 1분기</option>
            <option value="2024-Q4">2024년 4분기</option>
            <option value="2024-Q3">2024년 3분기</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>전체 유형</option>
            <option>PDF</option>
            <option>Excel</option>
            <option>이미지</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>전체 통제항목</option>
            <option>1.1.1 정보보호 정책 수립</option>
            <option>1.1.2 조직 체계 구성</option>
            <option>2.3.1 접근권한 관리</option>
          </select>
          <div className="relative">
            <input type="text" placeholder="파일명 검색..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64" />
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* 뷰 모드 토글 */}
          <div className="flex border border-gray-300 rounded-lg overflow-hidden">
            <button 
              onClick={() => setViewMode('list')}
              className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon name="list" size={16} />
            </button>
            <button 
              onClick={() => setViewMode('timeline')}
              className={`px-3 py-2 text-sm ${viewMode === 'timeline' ? 'bg-blue-500 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Icon name="clock" size={16} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Icon name="download" size={16} />
            감사용 리포트
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
            <Icon name="upload" size={16} />
            수동 업로드
          </button>
        </div>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '전체 파일', value: allFiles.length, unit: '건' },
          { label: '이번 분기', value: 5, unit: '건' },
          { label: '총 용량', value: '12.4', unit: 'MB' },
          { label: '통제항목 커버리지', value: '80', unit: '%' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className="text-2xl font-bold text-gray-900">{stat.value}<span className="text-sm font-normal text-gray-500 ml-1">{stat.unit}</span></p>
          </div>
        ))}
      </div>

      {/* 리스트 뷰 */}
      {viewMode === 'list' && (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">파일명</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">버전</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">통제 항목</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">수집일</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">크기</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">수집 방법</th>
                <th className="px-4 py-3 w-24"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allFiles.map((file, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-8 h-8 rounded flex items-center justify-center bg-gray-100 ${getFileIcon(file.type)}`}>
                        <Icon name="file" size={16} />
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-900">{file.name}</span>
                        <p className="text-xs text-gray-400">{file.type.toUpperCase()}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs font-medium">{file.version}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs text-blue-600">{file.control}</span>
                    <p className="text-xs text-gray-500">{file.controlName}</p>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{file.date}</td>
                  <td className="px-4 py-3 text-sm text-gray-500">{file.size}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs ${file.method === '자동 수집' ? 'text-green-600' : 'text-gray-500'}`}>
                      {file.method}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-500" title="미리보기">
                        <Icon name="eye" size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-500" title="다운로드">
                        <Icon name="download" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 타임라인 뷰 */}
      {viewMode === 'timeline' && (
        <div className="space-y-6">
          {sortedMonths.map((month, idx) => (
            <div key={idx} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="calendar" size={16} className="text-gray-500" />
                  <span className="font-semibold text-gray-900">
                    {month.replace('-', '년 ')}월
                  </span>
                  <span className="text-sm text-gray-500">({groupedFiles[month].length}건)</span>
                </div>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                  이 기간 전체 다운로드
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {groupedFiles[month].map((file, fileIdx) => (
                  <div key={fileIdx} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded flex items-center justify-center bg-gray-100 ${getFileIcon(file.type)}`}>
                        <Icon name="file" size={16} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium text-gray-900">{file.name}</span>
                          <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">{file.version}</span>
                        </div>
                        <p className="text-xs text-gray-500">
                          <span className="font-mono text-blue-600">{file.control}</span> · {file.date} · {file.size}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs px-2 py-1 rounded ${file.method === '자동 수집' ? 'bg-green-50 text-green-600' : 'bg-gray-50 text-gray-500'}`}>
                        {file.method}
                      </span>
                      <button className="p-1.5 text-gray-400 hover:text-blue-500" title="미리보기">
                        <Icon name="eye" size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-500" title="다운로드">
                        <Icon name="download" size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// ============================================
// 보안팀용 - 점검 관리 (목록)
// ============================================
const AssessmentsPage = ({ setCurrentPage }) => {
  const assessments = [
    { 
      id: 'ASM-2025-001', 
      name: '2025년 웹 취약점 점검', 
      assessor: 'A보안업체',
      assessedAt: '2025-01-15',
      total: 45, 
      done: 12, 
      inProgress: 18, 
      pending: 15,
      progress: 27
    },
    { 
      id: 'ASM-2024-003', 
      name: '2024년 그룹 보안 점검', 
      assessor: '그룹 보안팀',
      assessedAt: '2024-11-20',
      total: 32, 
      done: 30, 
      inProgress: 2, 
      pending: 0,
      progress: 94
    },
    { 
      id: 'ASM-2024-002', 
      name: '2024년 인프라 취약점 점검', 
      assessor: 'B컨설팅',
      assessedAt: '2024-09-10',
      total: 28, 
      done: 28, 
      inProgress: 0, 
      pending: 0,
      progress: 100
    },
    { 
      id: 'ASM-2024-001', 
      name: '2024년 상반기 모의해킹', 
      assessor: 'C보안업체',
      assessedAt: '2024-06-15',
      total: 18, 
      done: 18, 
      inProgress: 0, 
      pending: 0,
      progress: 100
    },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative">
          <input type="text" placeholder="점검명 검색..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64" />
          <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
          <Icon name="plus" size={16} />
          점검 등록
        </button>
      </div>

      <div className="space-y-4">
        {assessments.map((item, idx) => (
          <div 
            key={idx} 
            className="bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 cursor-pointer transition-colors"
            onClick={() => setCurrentPage('vuln-list')}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  {item.progress === 100 && (
                    <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">완료</span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  점검기관: {item.assessor} | 점검일: {item.assessedAt}
                </p>
              </div>
              <span className="font-mono text-xs text-gray-400">{item.id}</span>
            </div>

            <div className="flex items-center gap-6 mb-3">
              <div className="flex items-center gap-4 text-sm">
                <span className="text-gray-500">총 <span className="font-bold text-gray-900">{item.total}</span>건</span>
                <span className="text-gray-300">|</span>
                <span className="text-gray-500">완료 <span className="font-bold text-green-600">{item.done}</span></span>
                <span className="text-gray-500">진행중 <span className="font-bold text-blue-600">{item.inProgress}</span></span>
                <span className="text-gray-500">미조치 <span className="font-bold text-red-600">{item.pending}</span></span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full ${item.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`} 
                  style={{ width: `${item.progress}%` }}
                ></div>
              </div>
              <span className={`text-sm font-bold ${item.progress === 100 ? 'text-green-600' : 'text-blue-600'}`}>
                {item.progress}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ============================================
// 보안팀용 - 취약점 목록 (점검 상세)
// ============================================
const VulnListPage = ({ setCurrentPage }) => {
  const vulnerabilities = [
    { 
      id: 1,
      category: '웹 취약점', 
      asset: '결제 API', 
      item: 'SQL Injection', 
      content: '사용자 입력값이 SQL 쿼리에 직접 삽입됨',
      issue: '공격자가 DB 데이터 탈취 가능',
      dueDate: '2025-01-25', 
      assignee: '김개발', 
      status: 'pending',
      note: ''
    },
    { 
      id: 2,
      category: '웹 취약점', 
      asset: '회원 서비스', 
      item: 'CSRF', 
      content: 'CSRF 토큰 미적용',
      issue: '사용자 권한으로 악의적 요청 실행 가능',
      dueDate: '2025-01-28', 
      assignee: '이보안', 
      status: 'in_progress',
      note: '프레임워크 업데이트 필요'
    },
    { 
      id: 3,
      category: '데이터 보안', 
      asset: '회원 DB', 
      item: '민감정보 평문저장', 
      content: '비밀번호 및 개인정보 평문 저장',
      issue: 'DB 유출 시 즉시 피해 발생',
      dueDate: '2025-01-20', 
      assignee: '박백엔드', 
      status: 'done',
      note: 'AES-256 암호화 적용 완료'
    },
    { 
      id: 4,
      category: '웹 취약점', 
      asset: '관리자 페이지', 
      item: 'XSS', 
      content: '게시판 입력값 필터링 미흡',
      issue: '관리자 세션 탈취 가능',
      dueDate: '2025-01-30', 
      assignee: '이보안', 
      status: 'pending',
      note: ''
    },
    { 
      id: 5,
      category: '인프라', 
      asset: '웹서버', 
      item: '불필요 포트 오픈', 
      content: '22, 3389 포트 외부 노출',
      issue: '무작위 대입 공격에 취약',
      dueDate: '2025-02-05', 
      assignee: '최인프라', 
      status: 'in_progress',
      note: '방화벽 정책 변경 요청 중'
    },
  ];

  const getStatusBadge = (status) => {
    const map = {
      'pending': { bg: 'bg-red-100', text: 'text-red-700', label: '미조치' },
      'in_progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: '조치중' },
      'done': { bg: 'bg-green-100', text: 'text-green-700', label: '완료' },
    };
    return map[status];
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => setCurrentPage('assessments')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
          <Icon name="arrowLeft" size={16} />
          점검 관리
        </button>
        <span className="text-gray-300">|</span>
        <h2 className="text-lg font-bold text-gray-900">2025년 웹 취약점 점검</h2>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative">
            <input type="text" placeholder="검색..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64" />
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>전체 분류</option>
            <option>웹 취약점</option>
            <option>데이터 보안</option>
            <option>인프라</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>전체 상태</option>
            <option>미조치</option>
            <option>조치중</option>
            <option>완료</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Icon name="download" size={16} />
            엑셀 내려받기
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600">
            <Icon name="upload" size={16} />
            엑셀 Import
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">점검 분류</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">자산 구분</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">취약 항목</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap min-w-[200px]">취약 내용</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap min-w-[200px]">현황 및 문제점</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">조치일정</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">담당자</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">조치상태</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap min-w-[150px]">비고</th>
                <th className="px-4 py-3 w-16"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vulnerabilities.map((vuln, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium whitespace-nowrap">
                      {vuln.category}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{vuln.asset}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{vuln.item}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{vuln.content}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{vuln.issue}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{vuln.dueDate}</td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">{vuln.assignee}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusBadge(vuln.status).bg} ${getStatusBadge(vuln.status).text}`}>
                      {getStatusBadge(vuln.status).label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-500">{vuln.note || '-'}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button className="p-1.5 text-gray-400 hover:text-blue-500" title="조치 요청">
                        <Icon name="mail" size={16} />
                      </button>
                      <button className="p-1.5 text-gray-400 hover:text-blue-500" title="상세보기">
                        <Icon name="eye" size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 보안팀용 - 계정 관리
// ============================================
const AccountsPage = () => {
  const [showAddModal, setShowAddModal] = useState(false);

  const accounts = [
    { 
      name: '관리자', 
      email: 'admin@company.com', 
      team: '보안팀', 
      role: 'admin',
      permissions: { evidence: true, vuln: true },
      lastLogin: '2025-01-22 09:30',
      status: 'active'
    },
    { 
      name: '김개발', 
      email: 'kim@company.com', 
      team: '백엔드팀', 
      role: 'developer',
      permissions: { evidence: false, vuln: true },
      lastLogin: '2025-01-22 10:15',
      status: 'active'
    },
    { 
      name: '이보안', 
      email: 'lee@company.com', 
      team: '보안팀', 
      role: 'developer',
      permissions: { evidence: true, vuln: true },
      lastLogin: '2025-01-21 18:00',
      status: 'active'
    },
    { 
      name: '박백엔드', 
      email: 'park@company.com', 
      team: '백엔드팀', 
      role: 'developer',
      permissions: { evidence: false, vuln: true },
      lastLogin: '2025-01-22 08:45',
      status: 'active'
    },
    { 
      name: '최인프라', 
      email: 'choi@company.com', 
      team: '인프라팀', 
      role: 'developer',
      permissions: { evidence: false, vuln: true },
      lastLogin: '2025-01-20 14:30',
      status: 'active'
    },
    { 
      name: '박팀장', 
      email: 'park_tl@company.com', 
      team: '백엔드팀', 
      role: 'approver',
      permissions: { evidence: false, vuln: true },
      lastLogin: '2025-01-22 11:00',
      status: 'active'
    },
    { 
      name: '정퇴사', 
      email: 'jung@company.com', 
      team: '프론트팀', 
      role: 'developer',
      permissions: { evidence: false, vuln: true },
      lastLogin: '2024-12-15 17:00',
      status: 'inactive'
    },
  ];

  const getRoleBadge = (role) => {
    const map = {
      'admin': { bg: 'bg-purple-100', text: 'text-purple-700', label: '관리자' },
      'approver': { bg: 'bg-amber-100', text: 'text-amber-700', label: '결재자' },
      'developer': { bg: 'bg-blue-100', text: 'text-blue-700', label: '개발자' },
    };
    return map[role] || { bg: 'bg-gray-100', text: 'text-gray-700', label: role };
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">계정 관리</h3>
          <p className="text-sm text-gray-500">SecuHub에 접근할 수 있는 계정을 관리합니다.</p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600"
        >
          <Icon name="plus" size={16} />
          계정 추가
        </button>
      </div>

      {/* 요약 카드 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '전체 계정', value: accounts.length, color: 'text-gray-900' },
          { label: '관리자', value: accounts.filter(a => a.role === 'admin').length, color: 'text-purple-600' },
          { label: '결재자', value: accounts.filter(a => a.role === 'approver').length, color: 'text-amber-600' },
          { label: '비활성', value: accounts.filter(a => a.status === 'inactive').length, color: 'text-red-600' },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 계정 목록 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">사용자</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">소속</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">역할</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">접근 권한</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">마지막 로그인</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">상태</th>
              <th className="px-4 py-3 w-20"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {accounts.map((account, idx) => (
              <tr key={idx} className={`hover:bg-gray-50 ${account.status === 'inactive' ? 'opacity-50' : ''}`}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-medium text-sm ${
                      account.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                      account.role === 'approver' ? 'bg-amber-100 text-amber-600' :
                      'bg-blue-100 text-blue-600'
                    }`}>
                      {account.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{account.name}</p>
                      <p className="text-xs text-gray-500">{account.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{account.team}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getRoleBadge(account.role).bg} ${getRoleBadge(account.role).text}`}>
                    {getRoleBadge(account.role).label}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {account.permissions.evidence && (
                      <span className="px-2 py-0.5 bg-green-50 text-green-600 text-xs rounded">증빙 수집</span>
                    )}
                    {account.permissions.vuln && (
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-600 text-xs rounded">취약점 관리</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{account.lastLogin}</td>
                <td className="px-4 py-3">
                  {account.status === 'active' ? (
                    <span className="flex items-center gap-1 text-xs text-green-600">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                      활성
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-xs text-gray-400">
                      <span className="w-1.5 h-1.5 bg-gray-400 rounded-full"></span>
                      비활성
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1">
                    <button className="p-1.5 text-gray-400 hover:text-blue-500" title="수정">
                      <Icon name="settings" size={16} />
                    </button>
                    {account.role !== 'admin' && (
                      <button className="p-1.5 text-gray-400 hover:text-red-500" title="삭제">
                        <Icon name="x" size={16} />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* 계정 추가 모달 */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold text-gray-900">계정 추가</h3>
              <button onClick={() => setShowAddModal(false)} className="p-1 text-gray-400 hover:text-gray-600">
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이름 *</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="홍길동" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">이메일 *</label>
                <input type="email" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="hong@company.com" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">소속</label>
                <input type="text" className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm" placeholder="백엔드팀" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">역할 *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="developer">개발자</option>
                  <option value="approver">결재자</option>
                  <option value="admin">관리자</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">접근 권한 *</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded text-blue-500" />
                    <span className="text-sm text-gray-700">증빙 수집</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" defaultChecked className="rounded text-blue-500" />
                    <span className="text-sm text-gray-700">취약점 관리</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setShowAddModal(false)}
                className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
              >
                취소
              </button>
              <button className="flex-1 py-2.5 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600">
                추가
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ============================================
// 보안팀용 - 설정
// ============================================
const SettingsPage = () => {
  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">알림 설정</h3>
        <div className="space-y-4">
          {[
            { title: '이메일 알림', desc: '수집 실패, 조치 요청 등', checked: true },
            { title: 'Slack 알림', desc: 'Slack 채널로 알림', checked: false },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="text-sm font-medium text-gray-900">{item.title}</p>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked={item.checked} />
                <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-blue-500 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">리마인더 설정</h3>
        <div className="flex gap-2 mb-4">
          {['D-7', 'D-3', 'D-1'].map(day => (
            <label key={day} className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input type="checkbox" defaultChecked className="text-blue-500 rounded" />
              <span className="text-sm">{day}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 개발자용 - 전체 현황 대시보드
// ============================================
const DevDashboard = ({ user, setCurrentPage }) => {
  const assessments = [
    { 
      id: 'ASM-2025-001', 
      name: '2025년 웹 취약점 점검', 
      total: 45, 
      unassigned: 8,
      pending: 15,
      inProgress: 10,
      done: 12,
      progress: 27
    },
    { 
      id: 'ASM-2024-003', 
      name: '2024년 그룹 보안 점검', 
      total: 32, 
      unassigned: 0,
      pending: 0,
      inProgress: 2,
      done: 30,
      progress: 94
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 전체 현황 요약 */}
      <div className="grid grid-cols-5 gap-4">
        {[
          { label: '전체', value: 77, color: 'text-gray-900', bg: 'bg-white' },
          { label: '미배정', value: 8, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: '결재대기', value: 5, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '조치중', value: 12, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '완료', value: 42, color: 'text-green-600', bg: 'bg-green-50' },
        ].map((stat, idx) => (
          <div key={idx} className={`${stat.bg} rounded-xl p-5 border border-gray-200`}>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 점검별 현황 */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">점검별 현황</h3>
          <button 
            onClick={() => setCurrentPage('dev-vulns')}
            className="text-sm text-emerald-600 hover:text-emerald-700 font-medium"
          >
            전체 보기 →
          </button>
        </div>
        <div className="divide-y divide-gray-100">
          {assessments.map((item, idx) => (
            <div key={idx} className="p-4 hover:bg-gray-50 cursor-pointer" onClick={() => setCurrentPage('dev-vulns')}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <span className="text-sm text-gray-500">총 {item.total}건</span>
              </div>
              <div className="flex items-center gap-4 text-sm mb-2">
                {item.unassigned > 0 && (
                  <span className="text-purple-600">미배정 <span className="font-bold">{item.unassigned}</span></span>
                )}
                <span className="text-blue-600">조치중 <span className="font-bold">{item.inProgress}</span></span>
                <span className="text-green-600">완료 <span className="font-bold">{item.done}</span></span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.progress === 100 ? 'bg-green-500' : 'bg-emerald-500'}`} 
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium text-gray-600">{item.progress}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 담당자 배정 필요 & 결재 대기 */}
      <div className="grid grid-cols-2 gap-6">
        {/* 담당자 배정 필요 */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <Icon name="alertTriangle" size={18} className="text-purple-500" />
            <h3 className="font-bold text-gray-900">담당자 배정 필요</h3>
            <span className="ml-auto px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded">8건</span>
          </div>
          <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
            {[
              { item: 'SQL Injection', asset: '결제 API', assessment: '2025년 웹 취약점' },
              { item: 'XSS 취약점', asset: '관리자 페이지', assessment: '2025년 웹 취약점' },
              { item: '인증 우회', asset: '로그인 모듈', assessment: '2025년 웹 취약점' },
            ].map((vuln, idx) => (
              <div key={idx} className="p-3 hover:bg-gray-50 cursor-pointer" onClick={() => setCurrentPage('dev-vuln-detail')}>
                <p className="text-sm font-medium text-gray-900">{vuln.item}</p>
                <p className="text-xs text-gray-500">{vuln.asset} · {vuln.assessment}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 결재 대기중 */}
        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <Icon name="clock" size={18} className="text-amber-500" />
            <h3 className="font-bold text-gray-900">결재 대기중</h3>
            <span className="ml-auto px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-bold rounded">5건</span>
          </div>
          <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
            {[
              { item: 'CSRF 토큰 미적용', assignee: '김개발', dueDate: '2025-01-28', approver: '박팀장' },
              { item: '세션 타임아웃', assignee: '이보안', dueDate: '2025-02-01', approver: '박팀장' },
            ].map((vuln, idx) => (
              <div key={idx} className="p-3 hover:bg-gray-50">
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm font-medium text-gray-900">{vuln.item}</p>
                  <span className="text-xs text-gray-500">~{vuln.dueDate}</span>
                </div>
                <p className="text-xs text-gray-500">담당: {vuln.assignee} · 결재자: {vuln.approver}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 최근 활동 */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <h3 className="font-bold text-gray-900">최근 활동</h3>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            { action: '조치 완료', item: '민감정보 암호화', user: '박백엔드', time: '2시간 전', type: 'done' },
            { action: '결재 승인', item: 'CSRF 토큰 적용', user: '박팀장', time: '3시간 전', type: 'approved' },
            { action: '담당자 배정', item: 'XSS 취약점', user: '김개발', time: '5시간 전', type: 'assigned' },
            { action: '일정 등록', item: 'SQL Injection', user: '이보안', time: '어제', type: 'scheduled' },
          ].map((activity, idx) => (
            <div key={idx} className="p-4 flex items-center gap-4">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activity.type === 'done' ? 'bg-green-100' :
                activity.type === 'approved' ? 'bg-blue-100' :
                activity.type === 'assigned' ? 'bg-purple-100' :
                'bg-amber-100'
              }`}>
                <Icon 
                  name={activity.type === 'done' ? 'check' : activity.type === 'approved' ? 'check' : activity.type === 'assigned' ? 'user' : 'calendar'} 
                  size={14} 
                  className={
                    activity.type === 'done' ? 'text-green-600' :
                    activity.type === 'approved' ? 'text-blue-600' :
                    activity.type === 'assigned' ? 'text-purple-600' :
                    'text-amber-600'
                  } 
                />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-900">
                  <span className="font-medium">{activity.user}</span>님이 <span className="font-medium">{activity.item}</span> {activity.action}
                </p>
              </div>
              <span className="text-xs text-gray-400">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 개발자용 - 취약점 목록 (전체)
// ============================================
const DevVulnList = ({ setCurrentPage }) => {
  const vulnerabilities = [
    { 
      id: 1,
      assessment: '2025년 웹 취약점',
      category: '웹 취약점', 
      asset: '결제 API', 
      item: 'SQL Injection', 
      content: '사용자 입력값이 SQL 쿼리에 직접 삽입됨',
      dueDate: '', 
      assignee: '', 
      status: 'unassigned',
    },
    { 
      id: 2,
      assessment: '2025년 웹 취약점',
      category: '웹 취약점', 
      asset: '회원 서비스', 
      item: 'CSRF', 
      content: 'CSRF 토큰 미적용',
      dueDate: '2025-01-28', 
      assignee: '김개발', 
      status: 'pending_approval',
      approver: '박팀장'
    },
    { 
      id: 3,
      assessment: '2025년 웹 취약점',
      category: '데이터 보안', 
      asset: '회원 DB', 
      item: '민감정보 평문저장', 
      content: '비밀번호 및 개인정보 평문 저장',
      dueDate: '2025-01-20', 
      assignee: '박백엔드', 
      status: 'done',
    },
    { 
      id: 4,
      assessment: '2025년 웹 취약점',
      category: '웹 취약점', 
      asset: '관리자 페이지', 
      item: 'XSS', 
      content: '게시판 입력값 필터링 미흡',
      dueDate: '', 
      assignee: '', 
      status: 'unassigned',
    },
    { 
      id: 5,
      assessment: '2025년 웹 취약점',
      category: '인프라', 
      asset: '웹서버', 
      item: '불필요 포트 오픈', 
      content: '22, 3389 포트 외부 노출',
      dueDate: '2025-02-05', 
      assignee: '최인프라', 
      status: 'in_progress',
    },
  ];

  const getStatusBadge = (status) => {
    const map = {
      'unassigned': { bg: 'bg-purple-100', text: 'text-purple-700', label: '미배정' },
      'pending_approval': { bg: 'bg-amber-100', text: 'text-amber-700', label: '결재대기' },
      'in_progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: '조치중' },
      'done': { bg: 'bg-green-100', text: 'text-green-700', label: '완료' },
    };
    return map[status] || map['unassigned'];
  };

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>전체 점검</option>
            <option>2025년 웹 취약점 점검</option>
            <option>2024년 그룹 보안 점검</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>전체 상태</option>
            <option>미배정</option>
            <option>결재대기</option>
            <option>조치중</option>
            <option>완료</option>
          </select>
          <div className="relative">
            <input type="text" placeholder="검색..." className="pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm w-64" />
            <Icon name="search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50">
            <Icon name="download" size={16} />
            엑셀 내려받기
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">점검</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">자산 구분</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">취약 항목</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap min-w-[200px]">취약 내용</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">담당자</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">조치일정</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 whitespace-nowrap">상태</th>
                <th className="px-4 py-3 w-28"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {vulnerabilities.map((vuln, idx) => (
                <tr key={idx} className="hover:bg-gray-50">
                  <td className="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">{vuln.assessment}</td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{vuln.asset}</td>
                  <td className="px-4 py-3 text-sm font-medium text-gray-900 whitespace-nowrap">{vuln.item}</td>
                  <td className="px-4 py-3 text-sm text-gray-600">{vuln.content}</td>
                  <td className="px-4 py-3 text-sm whitespace-nowrap">
                    {vuln.assignee ? (
                      <span className="text-gray-900">{vuln.assignee}</span>
                    ) : (
                      <span className="text-purple-600 font-medium">미배정</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                    {vuln.dueDate || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs font-medium whitespace-nowrap ${getStatusBadge(vuln.status).bg} ${getStatusBadge(vuln.status).text}`}>
                      {getStatusBadge(vuln.status).label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {vuln.status === 'unassigned' ? (
                      <button 
                        onClick={() => setCurrentPage('dev-vuln-detail')}
                        className="px-3 py-1.5 bg-emerald-500 text-white rounded text-xs font-medium hover:bg-emerald-600 whitespace-nowrap"
                      >
                        담당 지정
                      </button>
                    ) : vuln.status === 'in_progress' ? (
                      <button 
                        onClick={() => setCurrentPage('dev-vuln-detail')}
                        className="px-3 py-1.5 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600 whitespace-nowrap"
                      >
                        조치 입력
                      </button>
                    ) : (
                      <button 
                        onClick={() => setCurrentPage('dev-vuln-detail')}
                        className="p-1.5 text-gray-400 hover:text-blue-500"
                      >
                        <Icon name="eye" size={16} />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 개발자용 - 취약점 상세 (담당자 지정 + 일정 등록 + 조치 입력)
// ============================================
const DevVulnDetail = ({ setCurrentPage }) => {
  const [step, setStep] = useState('assign'); // assign, schedule, action
  const [assignee, setAssignee] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [approver, setApprover] = useState('');

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <button onClick={() => setCurrentPage('dev-vulns')} className="flex items-center gap-2 text-gray-500 hover:text-gray-700">
        <Icon name="arrowLeft" size={16} />
        목록으로
      </button>

      {/* 취약점 정보 */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className="px-2 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded">미배정</span>
            <h2 className="text-xl font-bold text-gray-900 mt-2">SQL Injection</h2>
            <p className="text-sm text-gray-500 mt-1">2025년 웹 취약점 점검 · 결제 API</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-sm text-gray-500">점검 분류</p>
            <p className="text-sm font-medium text-gray-900">웹 취약점</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">자산 구분</p>
            <p className="text-sm font-medium text-gray-900">결제 API</p>
          </div>
        </div>

        <div className="mb-4">
          <p className="text-sm text-gray-500 mb-2">취약 내용</p>
          <div className="p-4 bg-gray-50 rounded-lg text-sm text-gray-700">
            사용자 입력값이 SQL 쿼리에 직접 삽입되어 SQL Injection 공격에 취약한 상태입니다.
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">현황 및 문제점</p>
          <div className="p-4 bg-red-50 rounded-lg text-sm text-gray-700">
            공격자가 악의적인 SQL 구문을 삽입하여 데이터베이스를 조작할 수 있습니다.
            개인정보 유출 및 데이터 변조 위험이 있습니다.
          </div>
        </div>
      </div>

      {/* 단계별 탭 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          {[
            { id: 'assign', label: '1. 담당자 지정' },
            { id: 'schedule', label: '2. 일정 등록 & 결재' },
            { id: 'action', label: '3. 조치 결과' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setStep(tab.id)}
              className={`flex-1 py-3 text-sm font-medium transition-colors ${
                step === tab.id 
                  ? 'bg-emerald-50 text-emerald-600 border-b-2 border-emerald-500' 
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-6">
          {/* Step 1: 담당자 지정 */}
          {step === 'assign' && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">담당자 선택 *</label>
                <select 
                  value={assignee}
                  onChange={(e) => setAssignee(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">담당자를 선택하세요</option>
                  <option value="me">나 (김개발)</option>
                  <option value="lee">이보안</option>
                  <option value="park">박백엔드</option>
                  <option value="choi">최인프라</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">본인 또는 같은 팀원을 담당자로 지정할 수 있습니다.</p>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setCurrentPage('dev-vulns')}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  취소
                </button>
                <button 
                  onClick={() => setStep('schedule')}
                  disabled={!assignee}
                  className={`flex-1 py-3 rounded-lg font-medium ${
                    assignee 
                      ? 'bg-emerald-500 text-white hover:bg-emerald-600' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  다음: 일정 등록
                </button>
              </div>
            </div>
          )}

          {/* Step 2: 일정 등록 & 결재 요청 */}
          {step === 'schedule' && (
            <div className="space-y-4">
              <div className="p-4 bg-emerald-50 rounded-lg mb-4">
                <p className="text-sm text-emerald-800">
                  <span className="font-medium">담당자:</span> 김개발 (나)
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">조치 예정일 *</label>
                <input 
                  type="date" 
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">결재자 (팀장) *</label>
                <select 
                  value={approver}
                  onChange={(e) => setApprover(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="">결재자를 선택하세요</option>
                  <option value="park_tl">박팀장 (백엔드팀)</option>
                  <option value="kim_tl">김팀장 (프론트팀)</option>
                  <option value="lee_tl">이팀장 (인프라팀)</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">일정은 팀장 결재 후 확정됩니다.</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">조치 계획 (선택)</label>
                <textarea 
                  rows={3}
                  placeholder="조치 계획을 간략히 작성하세요. (선택사항)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                ></textarea>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setStep('assign')}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  이전
                </button>
                <button 
                  disabled={!dueDate || !approver}
                  className={`flex-1 py-3 rounded-lg font-medium ${
                    dueDate && approver 
                      ? 'bg-amber-500 text-white hover:bg-amber-600' 
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  결재 요청
                </button>
              </div>
            </div>
          )}

          {/* Step 3: 조치 결과 입력 */}
          {step === 'action' && (
            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg mb-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">담당자:</span> 김개발
                    </p>
                    <p className="text-sm text-blue-800">
                      <span className="font-medium">조치 예정일:</span> 2025-01-28
                    </p>
                  </div>
                  <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded">결재 승인됨</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">조치 상태 *</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                  <option value="">선택하세요</option>
                  <option value="done">조치 완료</option>
                  <option value="in_progress">조치 진행중</option>
                  <option value="delay">일정 연장 필요</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">조치 내용 *</label>
                <textarea 
                  rows={4}
                  placeholder="수행한 조치 내용을 상세히 기재해주세요."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">증빙 파일</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-emerald-400 cursor-pointer">
                  <Icon name="upload" size={24} className="mx-auto mb-2 text-gray-400" />
                  <p className="text-sm text-gray-500">클릭하여 파일 첨부</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button 
                  onClick={() => setCurrentPage('dev-vulns')}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50"
                >
                  취소
                </button>
                <button className="flex-1 py-3 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600">
                  조치 결과 제출
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 개발자용 - 나의 현황 (배정된 취약점)
// ============================================
const DevMyVulns = ({ setCurrentPage }) => {
  const myVulns = [
    { 
      id: 1,
      item: 'CSRF 토큰 미적용', 
      asset: '회원 서비스',
      assessment: '2025년 웹 취약점',
      dueDate: '2025-01-28', 
      status: 'pending_approval',
      approver: '박팀장',
      dDay: 'D-6'
    },
    { 
      id: 2,
      item: '세션 타임아웃 미설정', 
      asset: '관리자 페이지',
      assessment: '2025년 웹 취약점',
      dueDate: '2025-02-05', 
      status: 'in_progress',
      dDay: 'D-14'
    },
    { 
      id: 3,
      item: '에러 메시지 정보 노출', 
      asset: 'API 서버',
      assessment: '2024년 그룹 보안',
      dueDate: '2025-01-25', 
      status: 'in_progress',
      dDay: 'D-3'
    },
  ];

  const getStatusBadge = (status) => {
    const map = {
      'pending_approval': { bg: 'bg-amber-100', text: 'text-amber-700', label: '결재대기' },
      'in_progress': { bg: 'bg-blue-100', text: 'text-blue-700', label: '조치중' },
    };
    return map[status] || { bg: 'bg-gray-100', text: 'text-gray-700', label: status };
  };

  return (
    <div className="p-6 space-y-6">
      {/* 내 현황 요약 */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: '배정됨', value: 3, color: 'text-gray-900', bg: 'bg-white' },
          { label: '결재대기', value: 1, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '조치중', value: 2, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: '마감 임박', value: 1, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, idx) => (
          <div key={idx} className={`${stat.bg} rounded-xl p-5 border border-gray-200`}>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 배정된 취약점 목록 */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h3 className="font-bold text-gray-900">나에게 배정된 취약점</h3>
          <p className="text-sm text-gray-500">총 <span className="font-medium text-gray-900">{myVulns.length}건</span></p>
        </div>
        <div className="divide-y divide-gray-100">
          {myVulns.map((vuln, idx) => (
            <div 
              key={idx} 
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => setCurrentPage('dev-vuln-detail')}
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-medium text-gray-900">{vuln.item}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-medium ${getStatusBadge(vuln.status).bg} ${getStatusBadge(vuln.status).text}`}>
                      {getStatusBadge(vuln.status).label}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">{vuln.asset} · {vuln.assessment}</p>
                </div>
                <div className="text-right">
                  <span className={`px-2 py-1 rounded text-xs font-bold ${
                    parseInt(vuln.dDay.replace('D-', '')) <= 3 ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {vuln.dDay}
                  </span>
                  <p className="text-xs text-gray-500 mt-1">~{vuln.dueDate}</p>
                </div>
              </div>
              {vuln.status === 'pending_approval' && (
                <p className="text-xs text-amber-600">결재자: {vuln.approver}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================
// 개발자용 - 결재 관리
// ============================================
const DevApprovals = ({ setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('pending');
  
  const pendingApprovals = [
    { 
      id: 1,
      item: 'SQL Injection', 
      asset: '결제 API',
      requester: '이보안',
      requestDate: '2025-01-20',
      dueDate: '2025-01-30',
      plan: 'Prepared Statement 적용 예정'
    },
    { 
      id: 2,
      item: 'XSS 취약점', 
      asset: '관리자 페이지',
      requester: '박백엔드',
      requestDate: '2025-01-21',
      dueDate: '2025-02-01',
      plan: '입력값 필터링 적용'
    },
    { 
      id: 3,
      item: '인증 우회', 
      asset: '로그인 모듈',
      requester: '최인프라',
      requestDate: '2025-01-22',
      dueDate: '2025-02-05',
      plan: '세션 검증 로직 강화'
    },
  ];

  const completedApprovals = [
    { 
      id: 1,
      item: 'CSRF 토큰 미적용', 
      asset: '회원 서비스',
      requester: '김개발',
      approvedDate: '2025-01-19',
      dueDate: '2025-01-28',
      status: 'approved'
    },
    { 
      id: 2,
      item: '세션 타임아웃', 
      asset: '관리자 페이지',
      requester: '김개발',
      approvedDate: '2025-01-18',
      dueDate: '2025-02-05',
      status: 'approved'
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* 결재 현황 요약 */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: '결재 대기', value: pendingApprovals.length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: '승인 완료', value: completedApprovals.length, color: 'text-green-600', bg: 'bg-green-50' },
          { label: '반려', value: 0, color: 'text-red-600', bg: 'bg-red-50' },
        ].map((stat, idx) => (
          <div key={idx} className={`${stat.bg} rounded-xl p-5 border border-gray-200`}>
            <p className="text-sm text-gray-500 mb-1">{stat.label}</p>
            <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      {/* 탭 */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('pending')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'pending' 
                ? 'bg-amber-50 text-amber-600 border-b-2 border-amber-500' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            결재 대기 ({pendingApprovals.length})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              activeTab === 'completed' 
                ? 'bg-green-50 text-green-600 border-b-2 border-green-500' 
                : 'text-gray-500 hover:bg-gray-50'
            }`}
          >
            처리 완료 ({completedApprovals.length})
          </button>
        </div>

        {/* 결재 대기 목록 */}
        {activeTab === 'pending' && (
          <div className="divide-y divide-gray-100">
            {pendingApprovals.map((item, idx) => (
              <div key={idx} className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{item.item}</h4>
                      <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-xs font-medium rounded">결재대기</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.asset}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-gray-500">요청일: {item.requestDate}</p>
                    <p className="text-gray-900 font-medium">조치예정: {item.dueDate}</p>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs text-gray-500 mb-1">요청자: {item.requester}</p>
                  <p className="text-sm text-gray-700">{item.plan}</p>
                </div>

                <div className="flex gap-2 justify-end">
                  <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg text-sm font-medium hover:bg-red-50">
                    반려
                  </button>
                  <button className="px-4 py-2 bg-emerald-500 text-white rounded-lg text-sm font-medium hover:bg-emerald-600">
                    승인
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* 처리 완료 목록 */}
        {activeTab === 'completed' && (
          <div className="divide-y divide-gray-100">
            {completedApprovals.map((item, idx) => (
              <div key={idx} className="p-5">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-gray-900">{item.item}</h4>
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs font-medium rounded">승인완료</span>
                    </div>
                    <p className="text-sm text-gray-500">{item.asset}</p>
                    <p className="text-xs text-gray-400 mt-1">요청자: {item.requester} · 승인일: {item.approvedDate}</p>
                  </div>
                  <div className="text-right text-sm">
                    <p className="text-gray-900">조치예정: {item.dueDate}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// 개발자용 - 조치 이력
// ============================================
const DevHistory = () => {
  const history = [
    { id: 'VUL-2024-0085', name: '민감정보 평문 저장', status: 'done', date: '2024-01-15', severity: '심각' },
    { id: 'VUL-2024-0078', name: '세션 타임아웃 미설정', status: 'done', date: '2024-01-10', severity: '중간' },
    { id: 'VUL-2024-0072', name: '불필요 포트 오픈', status: 'done', date: '2024-01-05', severity: '중간' },
    { id: 'VUL-2024-0065', name: '취약한 암호화 알고리즘', status: 'done', date: '2023-12-28', severity: '높음' },
  ];

  return (
    <div className="p-6 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">조치 이력</h3>
        <p className="text-sm text-gray-500">총 <span className="font-medium text-gray-900">{history.length}건</span> 완료</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">ID</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">취약점명</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">위험도</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">완료일</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {history.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <span className="font-mono text-sm text-gray-600">{item.id}</span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-900">{item.name}</td>
                <td className="px-4 py-3">
                  <span className={`px-2 py-0.5 rounded text-xs font-medium ${
                    item.severity === '심각' ? 'bg-red-100 text-red-700' :
                    item.severity === '높음' ? 'bg-orange-100 text-orange-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {item.severity}
                  </span>
                </td>
                <td className="px-4 py-3 text-sm text-gray-500">{item.date}</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">완료</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ============================================
// 로그인 화면
// ============================================
const LoginPage = ({ onLogin }) => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Icon name="shield" size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">SecuHub</h1>
          <p className="text-gray-500 mt-1">보안 운영 통합 관리 플랫폼</p>
        </div>

        <div className="space-y-4">
          <p className="text-sm text-center text-gray-600 mb-6">데모 계정으로 로그인하세요</p>
          
          <button
            onClick={() => onLogin('admin')}
            className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 hover:bg-blue-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                관
              </div>
              <div>
                <p className="font-medium text-gray-900">보안팀 관리자</p>
                <p className="text-sm text-gray-500">전체 기능 접근 가능</p>
              </div>
            </div>
          </button>

          <button
            onClick={() => onLogin('dev')}
            className="w-full p-4 border-2 border-gray-200 rounded-xl hover:border-emerald-500 hover:bg-emerald-50 transition-colors text-left"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 font-bold">
                김
              </div>
              <div>
                <p className="font-medium text-gray-900">김개발 (백엔드팀)</p>
                <p className="text-sm text-gray-500">취약점 조치 및 담당자 지정</p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// 메인 앱
// ============================================
const SecuHubApp = () => {
  const [userRole, setUserRole] = useState(null); // null, 'admin', 'dev'
  const [currentPage, setCurrentPage] = useState('dashboard');

  const devUser = { name: '김개발', team: '백엔드팀', email: 'kim@company.com' };

  const handleLogin = (role) => {
    setUserRole(role);
    setCurrentPage(role === 'admin' ? 'dashboard' : 'dev-dashboard');
  };

  const handleLogout = () => {
    setUserRole(null);
    setCurrentPage('dashboard');
  };

  // 로그인 전
  if (!userRole) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // 페이지 정보
  const getPageInfo = () => {
    const adminPages = {
      dashboard: { title: '대시보드', subtitle: '컴플라이언스 현황 한눈에 보기' },
      controls: { title: '통제 항목', subtitle: '프레임워크별 통제 항목 관리' },
      jobs: { title: '수집 작업', subtitle: '자동화 스크립트 관리' },
      'job-detail': { title: '작업 상세', subtitle: '실행 결과 및 로그' },
      files: { title: '증빙 파일', subtitle: '수집된 증빙 파일' },
      'assessments': { title: '점검 관리', subtitle: '취약점 점검 회차 관리' },
      'vuln-list': { title: '취약점 목록', subtitle: '점검별 취약점 관리' },
      'accounts': { title: '계정 관리', subtitle: 'SecuHub 접근 계정 관리' },
      settings: { title: '설정', subtitle: '알림 및 시스템 설정' },
    };

    const devPages = {
      'dev-dashboard': { title: '전체 현황', subtitle: '취약점 현황 및 진행 상태' },
      'dev-my-vulns': { title: '나의 현황', subtitle: '나에게 배정된 취약점' },
      'dev-vulns': { title: '취약점 목록', subtitle: '전체 취약점 조회 및 담당자 지정' },
      'dev-approvals': { title: '결재 관리', subtitle: '일정 결재 승인 및 반려' },
      'dev-vuln-detail': { title: '취약점 상세', subtitle: '담당자 지정 및 조치 입력' },
      'dev-history': { title: '조치 이력', subtitle: '완료한 취약점 이력' },
    };

    return userRole === 'admin' ? adminPages[currentPage] : devPages[currentPage];
  };

  // 페이지 렌더링
  const renderPage = () => {
    if (userRole === 'admin') {
      switch (currentPage) {
        case 'dashboard': return <AdminDashboard />;
        case 'controls': return <ControlsPage />;
        case 'jobs': return <JobsPage setCurrentPage={setCurrentPage} />;
        case 'job-detail': return <JobDetailPage setCurrentPage={setCurrentPage} />;
        case 'files': return <FilesPage />;
        case 'assessments': return <AssessmentsPage setCurrentPage={setCurrentPage} />;
        case 'vuln-list': return <VulnListPage setCurrentPage={setCurrentPage} />;
        case 'accounts': return <AccountsPage />;
        case 'settings': return <SettingsPage />;
        default: return <AdminDashboard />;
      }
    } else {
      switch (currentPage) {
        case 'dev-dashboard': return <DevDashboard user={devUser} setCurrentPage={setCurrentPage} />;
        case 'dev-my-vulns': return <DevMyVulns setCurrentPage={setCurrentPage} />;
        case 'dev-vulns': return <DevVulnList setCurrentPage={setCurrentPage} />;
        case 'dev-approvals': return <DevApprovals setCurrentPage={setCurrentPage} />;
        case 'dev-vuln-detail': return <DevVulnDetail setCurrentPage={setCurrentPage} />;
        case 'dev-history': return <DevHistory />;
        default: return <DevDashboard user={devUser} setCurrentPage={setCurrentPage} />;
      }
    }
  };

  const pageInfo = getPageInfo() || { title: '', subtitle: '' };

  return (
    <div className="min-h-screen bg-gray-100" style={{ fontFamily: 'Pretendard, -apple-system, sans-serif' }}>
      {userRole === 'admin' ? (
        <AdminSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      ) : (
        <DevSidebar currentPage={currentPage} setCurrentPage={setCurrentPage} user={devUser} />
      )}
      
      <div className="ml-60">
        <Header title={pageInfo.title} subtitle={pageInfo.subtitle} isAdmin={userRole === 'admin'} />
        {renderPage()}
      </div>

      {/* 로그아웃 버튼 */}
      <button
        onClick={handleLogout}
        className="fixed bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg text-sm shadow-lg hover:bg-gray-700"
      >
        <Icon name="logout" size={16} />
        다른 계정으로 전환
      </button>
    </div>
  );
};

export default SecuHubApp;
