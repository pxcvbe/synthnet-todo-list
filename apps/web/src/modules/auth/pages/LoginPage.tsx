import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button, Input } from '@/shared/components'
import { ROUTES } from '@/shared/constants/routes'
import { loginSchema } from '../schemas/auth.schema'
import type { LoginInput } from '../schemas/auth.schema'
import { authService } from '../services/auth.service'
import { AuthShell } from '../components/AuthShell'
import { GoogleButton } from '../components/GoogleButton'

export function LoginPage() {
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
      toast.success('Welcome back!')
      navigate(ROUTES.dashboard)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to sign in')
    }
  }

  const handleGoogle = async () => {
    setIsGoogleLoading(true)
    try {
      await authService.signInWithGoogle()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Google sign-in failed')
      setIsGoogleLoading(false)
    }
  }

  return (
    <AuthShell
      title="Sign in"
      subtitle="Welcome back. Enter your details to continue."
      footer={
        <>
          Don&apos;t have an account? <Link to={ROUTES.register}>Create one</Link>
        </>
      }
    >
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          error={errors.email?.message}
          {...register('email')}
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="••••••••"
          error={errors.password?.message}
          {...register('password')}
        />
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Sign in
        </Button>
      </form>

      <div className="auth__divider">or</div>

      <GoogleButton onClick={handleGoogle} isLoading={isGoogleLoading} />
    </AuthShell>
  )
}
