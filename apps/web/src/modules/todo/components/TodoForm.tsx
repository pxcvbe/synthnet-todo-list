import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Input, Textarea } from '@/shared/components'
import { todoFormSchema } from '../schemas/todo.schema'
import type { TodoFormInput, TodoFormValues } from '../schemas/todo.schema'
import './todo.css'

interface TodoFormProps {
  defaultValues?: TodoFormInput
  submitLabel?: string
  isSubmitting?: boolean
  onSubmit: (values: TodoFormValues) => void
  onCancel?: () => void
}

export function TodoForm({
  defaultValues,
  submitLabel = 'Add todo',
  isSubmitting = false,
  onSubmit,
  onCancel,
}: TodoFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormInput, unknown, TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: defaultValues ?? { title: '', description: '' },
  })

  const submit = handleSubmit((values) => {
    onSubmit(values)
    if (!onCancel) reset({ title: '', description: '' })
  })

  return (
    <form className="todo-form" onSubmit={submit} noValidate>
      <Input
        label="Title"
        placeholder="What needs to be done?"
        error={errors.title?.message}
        {...register('title')}
      />
      <Textarea
        label="Description"
        placeholder="Add details (optional)"
        error={errors.description?.message}
        {...register('description')}
      />
      <div className="todo-form__actions">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel}
        </Button>
      </div>
    </form>
  )
}
