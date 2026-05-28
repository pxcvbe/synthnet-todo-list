import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import { Button, Input } from '@/shared/components'
import { ROUTES } from '@/shared/constants/routes'
import { registerSchema } from '../schemas/auth.schema'
import type { RegisterInput } from '../schemas/auth.schema'
import { authService } from '../services/auth.service'
import { AuthShell } from '../components/AuthShell'
import { GoogleButton } from '../components/GoogleButton'

export function RegisterPage() {
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
      toast.success('Account created! Check your email to confirm, then sign in.')
      navigate(ROUTES.login)
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to create account')
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
      title="Create account"
      subtitle="Start organizing your day in seconds."
      footer={
        <>
          Already have an account? <Link to={ROUTES.login}>Sign in</Link>
        </>
      }
    >
      <form className="auth__form" onSubmit={handleSubmit(onSubmit)} noValidate>
        <Input
          label="Full name"
          type="text"
          autoComplete="name"
          placeholder="Jane Doe"
          error={errors.fullName?.message}
          {...register('fullName')}
        />
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
          autoComplete="new-password"
          placeholder="At least 8 characters"
          error={errors.password?.message}
          {...register('password')}
        />
        <Input
          label="Confirm password"
          type="password"
          autoComplete="new-password"
          placeholder="Re-enter your password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword')}
        />
        <Button type="submit" fullWidth isLoading={isSubmitting}>
          Create account
        </Button>
      </form>

      <div className="auth__divider">or</div>

      <GoogleButton onClick={handleGoogle} isLoading={isGoogleLoading} label="Sign up with Google" />
    </AuthShell>
  )
}
