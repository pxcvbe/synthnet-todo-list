import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button, Input } from '@/shared/components'
import { ROUTES } from '@/shared/constants/routes'
import { registerSchema } from '../schemas/auth.schema'
import type { RegisterInput } from '../schemas/auth.schema'
import { authService } from '../services/auth.service'
import { AuthShell } from '../components/AuthShell'
import { GoogleButton } from '../components/GoogleButton'

export function RegisterPage() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (values: RegisterInput) => {
    try {
      await authService.signUp({
        email: values.email,
        password: values.password,
        fullName: values.fullName,
      })
      toast.success(t('toast.accountCreated'))
      navigate(ROUTES.login)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : t('toast.createAccountFailed'))
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
      title={t('auth.signUpTitle')}
      subtitle={t('auth.signUpSubtitle')}
      footer={
        <>
          {t('auth.haveAccount')} <Link to={ROUTES.login}>{t('auth.signInLink')}</Link>
        </>
      }
    >
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label={t('auth.fullNameLabel')}
          type="text"
          autoComplete="name"
          placeholder={t('auth.fullNamePlaceholder')}
          error={errors.fullName?.message ? t(errors.fullName.message) : undefined}
          {...register('fullName')}
        />
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
          autoComplete="new-password"
          placeholder={t('auth.passwordCreatePlaceholder')}
          error={errors.password?.message ? t(errors.password.message) : undefined}
          {...register('password')}
        />
        <Input
          label={t('auth.confirmPasswordLabel')}
          type="password"
          autoComplete="new-password"
          placeholder={t('auth.confirmPasswordPlaceholder')}
          error={errors.confirmPassword?.message ? t(errors.confirmPassword.message) : undefined}
          {...register('confirmPassword')}
        />
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          {t('auth.createAccountButton')}
        </Button>
      </form>

      <div className="auth__divider">{t('common.or')}</div>

      <GoogleButton onClick={handleGoogle} isLoading={isGoogleLoading} label={t('auth.googleSignUp')} />
    </AuthShell>
  )
}
