import { z } from 'zod'
import { TODO_CATEGORIES } from '@/shared/constants/categories'

const emptyToNull = (value: string | undefined) => (value && value.trim() !== '' ? value : null)

export const todoFormSchema = z.object({
  title: z.string().min(1, 'validation.titleRequired').max(120, 'validation.titleMax'),
  description: z
    .string()
    .max(1000, 'validation.descriptionMax')
    .optional()
    .transform((value) => (value?.trim() ? value.trim() : null)),
  dueDate: z
    .string()
    .optional()
    .transform(emptyToNull),
  category: z
    .enum(TODO_CATEGORIES)
    .or(z.literal(''))
    .optional()
    .transform((value) => (value ? value : null)),
})

export type TodoFormInput = z.input<typeof todoFormSchema>
export type TodoFormValues = z.output<typeof todoFormSchema>
