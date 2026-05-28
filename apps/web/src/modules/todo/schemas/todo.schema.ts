import { z } from 'zod'

export const todoFormSchema = z.object({
  title: z.string().min(1, 'Title is required').max(120, 'Title is too long'),
  description: z
    .string()
    .max(1000, 'Description is too long')
    .optional()
    .transform((value) => (value?.trim() ? value.trim() : null)),
})

export type TodoFormInput = z.input<typeof todoFormSchema>
export type TodoFormValues = z.output<typeof todoFormSchema>
