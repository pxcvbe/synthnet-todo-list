import { useContext } from 'react'
import { AuthContext } from './auth-context'
import type { AuthState } from '../types/auth.types'

export function useAuth(): AuthState {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
