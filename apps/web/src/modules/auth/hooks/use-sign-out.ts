import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { ROUTES } from '@/shared/constants/routes'
import { authService } from '../services/auth.service'

export function useSignOut() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { t } = useTranslation()
  const [isSigningOut, setIsSigningOut] = useState(false)

  const signOut = async () => {
    setIsSigningOut(true)
    try {
      await authService.signOut()
      queryClient.clear()
      navigate(ROUTES.login)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.signOutFailed'))
      setIsSigningOut(false)
    }
  }

  return { signOut, isSigningOut }
}
