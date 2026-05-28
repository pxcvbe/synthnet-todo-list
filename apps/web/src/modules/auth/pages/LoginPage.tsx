import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button, Input } from '@/shared/components'
import { ROUTES } from '@/shared/constants/routes'
import { loginSchema } from '../schemas/auth.schema'
import type { LoginInput } from '../schemas/auth.schema'
import { authService } from '../services/auth.service'
import { AuthShell } from '../components/AuthShell'
import { GoogleButton } from '../components/GoogleButton'

export function LoginPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: LoginInput) => {
    try {
      await authService.signInWithPassword(values)
      toast.success(t('toast.welcomeBack'))
      navigate(ROUTES.dashboard)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.signInFailed'))
    }
  }

  const handleGoogle = async () => {
    setIsGoogleLoading(true)
    try {
      await authService.signInWithGoogle()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.googleFailed'))
      setIsGoogleLoading(false)
    }
  }

  return (
    <AuthShell
      title={t('auth.signInTitle')}
      subtitle={t('auth.signInSubtitle')}
      footer={
        <>
          {t('auth.noAccount')} <Link to={ROUTES.register}>{t('auth.createOne')}</Link>
        </>
      }
    >
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t('auth.emailLabel')}
          type="email"
          autoComplete="email"
          placeholder={t('auth.emailPlaceholder')}
          error={errors.email?.message ? t(errors.email.message) : undefined}
          {...register('email')}
        />
        <Input
          label={t('auth.passwordLabel')}
          type="password"
          autoComplete="current-password"
          placeholder={t('auth.passwordSignInPlaceholder')}
          error={errors.password?.message ? t(errors.password.message) : undefined}
          {...register('password')}
        />
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          {t('auth.signInButton')}
        </Button>
      </form>

      <div className="auth__divider">{t('common.or')}</div>

      <GoogleButton onClick={handleGoogle} isLoading={isGoogleLoading} label={t('auth.google')} />
    </AuthShell>
  )
}
