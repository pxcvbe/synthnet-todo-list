import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().min(1, 'validation.emailRequired').email('validation.emailInvalid'),
  password: z.string().min(1, 'validation.passwordRequired'),
})

export const registerSchema = z
  .object({
    fullName: z.string().min(2, 'validation.nameMin'),
    email: z.string().min(1, 'validation.emailRequired').email('validation.emailInvalid'),
    password: z.string().min(8, 'validation.passwordMin'),
    confirmPassword: z.string().min(1, 'validation.confirmRequired'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'validation.passwordsNoMatch',
    path: ['confirmPassword'],
  })

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
