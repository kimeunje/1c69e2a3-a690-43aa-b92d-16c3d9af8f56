/**
 * Mock API Adapter
 *
 * axios 요청을 가로채 Mock 데이터를 반환합니다.
 * 환경변수 VITE_USE_MOCK=true 일 때만 활성화됩니다.
 *
 * 사용법:
 *   1. .env 또는 .env.development 에  VITE_USE_MOCK=true 추가
 *   2. 기존 api.ts 코드 변경 없이 자동 적용
 */
import type { AxiosInstance, InternalAxiosRequestConfig } from 'axios'
import {
  mockUsers,
  mockPasswords,
  mockVulnerabilities,
  mockAssessments,
  mockApprovalRequests,
  mockControls,
  mockFrameworks,
  toUserBrief,
} from './data'
import type { User } from '@/types'

// ========================================
// 유틸리티
// ========================================

/** 가짜 네트워크 지연 (50~200ms) */
function delay(ms = 100): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, Math.random() * 150 + 50))
}

/** URL 경로에서 path param 추출 */
function matchPath(url: string, pattern: string): Record<string, string> | null {
  const patternParts = pattern.split('/')
  const urlParts = url.split('?')[0].split('/')
  if (patternParts.length !== urlParts.length) return null

  const params: Record<string, string> = {}
  for (let i = 0; i < patternParts.length; i++) {
    if (patternParts[i].startsWith(':')) {
      params[patternParts[i].slice(1)] = urlParts[i]
    } else if (patternParts[i] !== urlParts[i]) {
      return null
    }
  }
  return params
}

/** URL 쿼리 파라미터 파싱 */
function getQueryParams(config: InternalAxiosRequestConfig): Record<string, string> {
  const params: Record<string, string> = {}
  if (config.params) {
    Object.entries(config.params).forEach(([k, v]) => {
      if (v !== undefined && v !== null) params[k] = String(v)
    })
  }
  return params
}

/** Mock 응답 생성 (axios 응답 형태) */
function mockResponse(data: any, status = 200) {
  return {
    data,
    status,
    statusText: status === 200 ? 'OK' : 'Error',
    headers: {},
    config: {} as any,
  }
}

function mockError(message: string, status = 400) {
  const error: any = new Error(message)
  error.response = {
    data: { detail: message },
    status,
    statusText: 'Error',
    headers: {},
    config: {} as any,
  }
  return error
}

// ========================================
// 현재 로그인 사용자 추적 (토큰 → 사용자 매핑)
// ========================================
const tokenUserMap: Record<string, User> = {}

function generateToken(user: User): string {
  const token = `mock-jwt-${user.id}-${Date.now()}`
  tokenUserMap[token] = user
  return token
}

function getUserFromToken(token: string): User | null {
  return tokenUserMap[token] || null
}

// ========================================
// Route Handlers
// ========================================

type MockHandler = (
  config: InternalAxiosRequestConfig
) => Promise<any>

interface Route {
  method: string
  pattern: string
  handler: MockHandler
}

const routes: Route[] = [
  // ── Auth ──
  {
    method: 'post',
    pattern: '/auth/login',
    handler: async (config) => {
      const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
      const { email, password } = body

      if (mockPasswords[email] && mockPasswords[email] === password) {
        const user = mockUsers.find((u) => u.email === email)!
        const token = generateToken(user)
        return mockResponse({
          access_token: token,
          token_type: 'bearer',
          user,
        })
      }
      throw mockError('이메일 또는 비밀번호가 올바르지 않습니다.', 401)
    },
  },
  {
    method: 'get',
    pattern: '/auth/me',
    handler: async (config) => {
      const token = config.headers?.Authorization?.toString().replace('Bearer ', '')
      const user = token ? getUserFromToken(token) : null
      if (user) return mockResponse(user)
      throw mockError('인증이 필요합니다.', 401)
    },
  },

  // ── Users ──
  {
    method: 'get',
    pattern: '/users/approvers',
    handler: async () => {
      const approvers = mockUsers
        .filter((u) => u.role === 'approver' && u.status === 'active')
        .map(toUserBrief)
      return mockResponse(approvers)
    },
  },
  {
    method: 'get',
    pattern: '/users/developers',
    handler: async (config) => {
      const params = getQueryParams(config)
      let devs = mockUsers.filter(
        (u) => (u.role === 'developer' || u.role === 'approver') && u.status === 'active'
      )
      if (params.team) {
        devs = devs.filter((u) => u.team === params.team)
      }
      return mockResponse(devs.map(toUserBrief))
    },
  },
  {
    method: 'get',
    pattern: '/users',
    handler: async (config) => {
      const params = getQueryParams(config)
      let filtered = [...mockUsers]

      if (params.search) {
        const s = params.search.toLowerCase()
        filtered = filtered.filter(
          (u) => u.name.toLowerCase().includes(s) || u.email.toLowerCase().includes(s)
        )
      }
      if (params.role) {
        filtered = filtered.filter((u) => u.role === params.role)
      }
      if (params.status) {
        filtered = filtered.filter((u) => u.status === params.status)
      }

      const page = parseInt(params.page || '0')
      const size = parseInt(params.size || '20')
      const start = page * size
      const items = filtered.slice(start, start + size)

      return mockResponse({ items, total: filtered.length })
    },
  },
  {
    method: 'get',
    pattern: '/users/:id',
    handler: async (config) => {
      const p = matchPath(config.url || '', '/users/:id')
      if (!p) throw mockError('잘못된 요청입니다.')
      const user = mockUsers.find((u) => u.id === parseInt(p.id))
      if (!user) throw mockError('사용자를 찾을 수 없습니다.', 404)
      return mockResponse(user)
    },
  },
  {
    method: 'post',
    pattern: '/users',
    handler: async (config) => {
      const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
      const newUser: User = {
        id: mockUsers.length + 1,
        email: body.email,
        name: body.name,
        team: body.team,
        role: body.role,
        permission_evidence: body.permission_evidence ?? false,
        permission_vuln: body.permission_vuln ?? true,
        status: 'active',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      mockUsers.push(newUser)
      if (body.password) {
        mockPasswords[body.email] = body.password
      }
      return mockResponse(newUser)
    },
  },
  {
    method: 'patch',
    pattern: '/users/me/password',
    handler: async () => {
      return mockResponse({ message: '비밀번호가 변경되었습니다.' })
    },
  },
  {
    method: 'patch',
    pattern: '/users/:id',
    handler: async (config) => {
      const p = matchPath(config.url || '', '/users/:id')
      if (!p) throw mockError('잘못된 요청입니다.')
      const user = mockUsers.find((u) => u.id === parseInt(p.id))
      if (!user) throw mockError('사용자를 찾을 수 없습니다.', 404)
      const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
      Object.assign(user, body, { updated_at: new Date().toISOString() })
      return mockResponse(user)
    },
  },
  {
    method: 'delete',
    pattern: '/users/:id',
    handler: async (config) => {
      const p = matchPath(config.url || '', '/users/:id')
      if (!p) throw mockError('잘못된 요청입니다.')
      const idx = mockUsers.findIndex((u) => u.id === parseInt(p.id))
      if (idx === -1) throw mockError('사용자를 찾을 수 없습니다.', 404)
      mockUsers.splice(idx, 1)
      return mockResponse({ message: '삭제되었습니다.' })
    },
  },

  // ── Frameworks ──
  {
    method: 'get',
    pattern: '/frameworks',
    handler: async () => mockResponse(mockFrameworks),
  },

  // ── Controls ──
  {
    method: 'get',
    pattern: '/controls',
    handler: async (config) => {
      const params = getQueryParams(config)
      let filtered = [...mockControls]
      if (params.framework_id) {
        filtered = filtered.filter((c) => c.framework_id === parseInt(params.framework_id))
      }
      return mockResponse(filtered)
    },
  },

  // ── Assessments ──
  {
    method: 'get',
    pattern: '/assessments',
    handler: async () => mockResponse(mockAssessments),
  },
  {
    method: 'get',
    pattern: '/assessments/:id',
    handler: async (config) => {
      const p = matchPath(config.url || '', '/assessments/:id')
      if (!p) throw mockError('잘못된 요청입니다.')
      const assessment = mockAssessments.find((a) => a.id === parseInt(p.id))
      if (!assessment) throw mockError('점검을 찾을 수 없습니다.', 404)
      return mockResponse(assessment)
    },
  },

  // ── Vulnerabilities ──
  {
    method: 'get',
    pattern: '/vulnerabilities',
    handler: async (config) => {
      const params = getQueryParams(config)
      let filtered = [...mockVulnerabilities]

      if (params.assessment_id) {
        filtered = filtered.filter((v) => v.assessment_id === parseInt(params.assessment_id))
      }
      if (params.status) {
        filtered = filtered.filter((v) => v.status === params.status)
      }
      if (params.assignee_id) {
        filtered = filtered.filter((v) => v.assignee_id === parseInt(params.assignee_id))
      }
      if (params.category) {
        filtered = filtered.filter((v) => v.category === params.category)
      }

      const page = parseInt(params.page || '0')
      const size = parseInt(params.size || '20')
      const start = page * size
      const items = filtered.slice(start, start + size)

      return mockResponse({ items, total: filtered.length })
    },
  },
  {
    method: 'get',
    pattern: '/vulnerabilities/:id',
    handler: async (config) => {
      const p = matchPath(config.url || '', '/vulnerabilities/:id')
      if (!p) throw mockError('잘못된 요청입니다.')
      const vuln = mockVulnerabilities.find((v) => v.id === parseInt(p.id))
      if (!vuln) throw mockError('취약점을 찾을 수 없습니다.', 404)
      return mockResponse(vuln)
    },
  },
  {
    method: 'patch',
    pattern: '/vulnerabilities/:id',
    handler: async (config) => {
      const p = matchPath(config.url || '', '/vulnerabilities/:id')
      if (!p) throw mockError('잘못된 요청입니다.')
      const vuln = mockVulnerabilities.find((v) => v.id === parseInt(p.id))
      if (!vuln) throw mockError('취약점을 찾을 수 없습니다.', 404)
      const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data

      if (body.assignee_id) {
        const assignee = mockUsers.find((u) => u.id === body.assignee_id)
        if (assignee) vuln.assignee = toUserBrief(assignee)
      }
      if (body.approver_id) {
        const approver = mockUsers.find((u) => u.id === body.approver_id)
        if (approver) vuln.approver = toUserBrief(approver)
      }

      Object.assign(vuln, body)
      return mockResponse(vuln)
    },
  },

  // ── Approval Requests ──
  {
    method: 'get',
    pattern: '/approvals',
    handler: async (config) => {
      const params = getQueryParams(config)
      let filtered = [...mockApprovalRequests]

      if (params.approver_id) {
        filtered = filtered.filter((a) => a.approver_id === parseInt(params.approver_id))
      }
      if (params.status) {
        filtered = filtered.filter((a) => a.status === params.status)
      }

      return mockResponse(filtered)
    },
  },
  {
    method: 'post',
    pattern: '/approvals/:id/approve',
    handler: async (config) => {
      const p = matchPath(config.url || '', '/approvals/:id/approve')
      if (!p) throw mockError('잘못된 요청입니다.')
      const req = mockApprovalRequests.find((a) => a.id === parseInt(p.id))
      if (!req) throw mockError('결재 요청을 찾을 수 없습니다.', 404)
      req.status = 'approved'
      req.approved_at = new Date().toISOString()
      const vuln = mockVulnerabilities.find((v) => v.id === req.vulnerability_id)
      if (vuln) vuln.status = 'in_progress'
      return mockResponse(req)
    },
  },
  {
    method: 'post',
    pattern: '/approvals/:id/reject',
    handler: async (config) => {
      const p = matchPath(config.url || '', '/approvals/:id/reject')
      if (!p) throw mockError('잘못된 요청입니다.')
      const req = mockApprovalRequests.find((a) => a.id === parseInt(p.id))
      if (!req) throw mockError('결재 요청을 찾을 수 없습니다.', 404)
      const body = typeof config.data === 'string' ? JSON.parse(config.data) : config.data
      req.status = 'rejected'
      req.reject_reason = body?.reason || '반려'
      const vuln = mockVulnerabilities.find((v) => v.id === req.vulnerability_id)
      if (vuln) {
        vuln.status = 'unassigned'
        vuln.assignee_id = undefined
        vuln.assignee = undefined
        vuln.approver_id = undefined
        vuln.approver = undefined
        vuln.due_date = undefined
      }
      return mockResponse(req)
    },
  },

  // ── Dashboard Stats ──
  {
    method: 'get',
    pattern: '/dashboard/stats',
    handler: async () => {
      const total = mockVulnerabilities.length
      const done = mockVulnerabilities.filter((v) => v.status === 'done').length
      const inProgress = mockVulnerabilities.filter((v) => v.status === 'in_progress').length
      const pending = total - done - inProgress

      return mockResponse({
        evidence: {
          total: 247,
          completed: 198,
          uncollected: 42,
          failed: 7,
          progressPercent: 80,
        },
        vulnerability: {
          total,
          done,
          inProgress,
          pending,
          progressPercent: Math.round((done / total) * 100),
        },
      })
    },
  },
]

// ========================================
// Mock Adapter 설치
// ========================================

/**
 * axios 인스턴스에 Mock 어댑터를 설치합니다.
 * 요청 인터셉터에서 매칭되는 Mock 핸들러를 찾으면 실제 HTTP 요청 없이 응답을 반환합니다.
 */
export function installMockAdapter(apiInstance: AxiosInstance): void {
  apiInstance.interceptors.request.use(async (config) => {
    const method = config.method || 'get'
    const url = config.url || ''
    const cleanUrl = url.replace(/^\/api\/v1/, '').split('?')[0]

    let matchedRoute: Route | null = null

    for (const route of routes) {
      if (route.method !== method.toLowerCase()) continue

      if (route.pattern === cleanUrl || matchPath(cleanUrl, route.pattern)) {
        matchedRoute = route
        break
      }
    }

    if (matchedRoute) {
      const mockConfig = { ...config, url: cleanUrl }

      await delay()

      try {
        const response = await matchedRoute.handler(mockConfig as InternalAxiosRequestConfig)
        config.adapter = () => Promise.resolve(response)
      } catch (error) {
        config.adapter = () => Promise.reject(error)
      }
    } else {
      console.warn(`[Mock] 매칭되지 않는 API: ${method.toUpperCase()} ${url}`)
      config.adapter = () =>
        Promise.resolve(mockResponse({ message: 'Mock: 아직 구현되지 않은 API입니다.' }))
    }

    return config
  })

  console.log(
    '%c🔧 Mock API 활성화됨 %c— 백엔드 없이 임시 데이터로 동작합니다.',
    'color: #10b981; font-weight: bold; font-size: 14px;',
    'color: #6b7280; font-size: 12px;'
  )
}
