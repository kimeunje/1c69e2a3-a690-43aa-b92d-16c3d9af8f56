import axios from 'axios'
import type { LoginPayload, TokenResponse, User, UserListResponse, UserBrief, UserCreatePayload, UserUpdatePayload } from '@/types'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
})

// 요청 인터셉터: Authorization 헤더 자동 추가
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 응답 인터셉터: 401 시 로그인 페이지로 리다이렉트
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

// ========================================
// Auth API
// ========================================
export const authApi = {
  login(data: LoginPayload) {
    return api.post<TokenResponse>('/auth/login', data)
  },
  getMe() {
    return api.get<User>('/auth/me')
  },
}

// ========================================
// Users API
// ========================================
export const usersApi = {
  list(params?: { page?: number; size?: number; role?: string; status?: string; search?: string }) {
    return api.get<UserListResponse>('/users', { params })
  },
  get(id: number) {
    return api.get<User>(`/users/${id}`)
  },
  create(data: UserCreatePayload) {
    return api.post<User>('/users', data)
  },
  update(id: number, data: UserUpdatePayload) {
    return api.patch<User>(`/users/${id}`, data)
  },
  delete(id: number) {
    return api.delete(`/users/${id}`)
  },
  getApprovers() {
    return api.get<UserBrief[]>('/users/approvers')
  },
  getDevelopers(team?: string) {
    return api.get<UserBrief[]>('/users/developers', { params: { team } })
  },
  changePassword(currentPassword: string, newPassword: string) {
    return api.patch('/users/me/password', {
      current_password: currentPassword,
      new_password: newPassword,
    })
  },
}

export default api
