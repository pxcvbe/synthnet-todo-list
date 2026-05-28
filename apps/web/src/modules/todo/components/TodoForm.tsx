import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Button, Input, Select, Textarea } from '@/shared/components'
import { TODO_CATEGORIES } from '@/shared/constants/categories'
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

const EMPTY: TodoFormInput = { title: '', description: '', dueDate: '', category: '' }

export function TodoForm({
  defaultValues,
  submitLabel,
  isSubmitting = false,
  onSubmit,
  onCancel,
}: TodoFormProps) {
  const { t } = useTranslation()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoFormInput, unknown, TodoFormValues>({
    resolver: zodResolver(todoFormSchema),
    defaultValues: defaultValues ?? EMPTY,
  })

  const categoryOptions = TODO_CATEGORIES.map((category) => ({
    value: category,
    label: t(`category.${category}`),
  }))

  const submit = handleSubmit((values) => {
    onSubmit(values)
    if (!onCancel) reset(EMPTY)
  })

  return (
    <form className="todo-form" onSubmit={submit} noValidate>
      <Input
        label={t('todo.titleLabel')}
        placeholder={t('todo.titlePlaceholder')}
        error={errors.title?.message ? t(errors.title.message) : undefined}
        {...register('title')}
      />
      <Textarea
        label={t('todo.descriptionLabel')}
        placeholder={t('todo.descriptionPlaceholder')}
        error={errors.description?.message ? t(errors.description.message) : undefined}
        {...register('description')}
      />
      <div className="todo-form__row">
        <Input label={t('todo.dueDateLabel')} type="date" {...register('dueDate')} />
        <Select
          label={t('todo.categoryLabel')}
          placeholder={t('todo.categoryNone')}
          options={categoryOptions}
          {...register('category')}
        />
      </div>
      <div className="todo-form__actions">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            {t('common.cancel')}
          </Button>
        )}
        <Button type="submit" isLoading={isSubmitting}>
          {submitLabel ?? t('todo.add')}
        </Button>
      </div>
    </form>
  )
}
