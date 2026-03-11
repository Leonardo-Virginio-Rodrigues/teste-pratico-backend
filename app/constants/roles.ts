export const ROLES = {
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  FINANCE: 'FINANCE',
  USER: 'USER',
} as const

export type UserRole = (typeof ROLES)[keyof typeof ROLES]
