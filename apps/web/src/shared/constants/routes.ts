export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/register',
  dashboard: '/dashboard',
} as const

export type AppRoute = (typeof ROUTES)[keyof typeof ROUTES]
