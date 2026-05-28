import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Calendar, Check, Pencil, Trash2 } from 'lucide-react'
import { Button, Card, ConfirmDialog } from '@/shared/components'
import { cn } from '@/shared/utils/cn'
import { formatDateOnly, isOverdue } from '@/shared/utils/format-date'
import { isTodoCategory } from '@/shared/constants/categories'
import type { Todo } from '../types/todo.types'
import { TodoForm } from './TodoForm'
import { CategoryBadge } from './CategoryBadge'
import type { TodoFormValues } from '../schemas/todo.schema'
import './todo.css'

interface TodoCardProps {
  todo: Todo
  isUpdating?: boolean
  isDeleting?: boolean
  onToggle: (todo: Todo) => void
  onUpdate: (id: string, values: TodoFormValues) => void
  onDelete: (id: string) => void
}

export function TodoCard({ todo, isUpdating, isDeleting, onToggle, onUpdate, onDelete }: TodoCardProps) {
  const { t, i18n } = useTranslation()
  const [isEditing, setIsEditing] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  if (isEditing) {
    return (
      <Card>
        <TodoForm
          defaultValues={{
            title: todo.title,
            description: todo.description ?? '',
            dueDate: todo.due_date ?? '',
            category: isTodoCategory(todo.category) ? todo.category : '',
          }}
          submitLabel={t('todo.saveChanges')}
          isSubmitting={isUpdating}
          onCancel={() => setIsEditing(false)}
          onSubmit={(values) => {
            onUpdate(todo.id, values)
            setIsEditing(false)
          }}
        />
      </Card>
    )
  }

  const overdue = todo.due_date != null && !todo.is_completed && isOverdue(todo.due_date)

  return (
    <>
      <Card hoverable className="todo-card">
        <button
          type="button"
          className={cn('todo-card__check', todo.is_completed && 'todo-card__check--done')}
          onClick={() => onToggle(todo)}
          aria-pressed={todo.is_completed}
          aria-label={todo.is_completed ? t('todo.markIncomplete') : t('todo.markComplete')}
        >
          {todo.is_completed && <Check size={14} aria-hidden />}
        </button>

        <div className="todo-card__body">
          <p className={cn('todo-card__title', todo.is_completed && 'todo-card__title--done')}>
            {todo.title}
          </p>
          {todo.description && <p className="todo-card__description">{todo.description}</p>}

          {(todo.due_date || isTodoCategory(todo.category)) && (
            <div className="todo-card__meta">
              {todo.due_date && (
                <span className={cn('todo-card__due', overdue && 'todo-card__due--overdue')}>
                  <Calendar size={13} aria-hidden />
                  {formatDateOnly(todo.due_date, i18n.language)}
                  {overdue && <span className="todo-card__overdue-tag">{t('todo.overdue')}</span>}
                </span>
              )}
              {isTodoCategory(todo.category) && <CategoryBadge category={todo.category} />}
            </div>
          )}
        </div>

        <div className="todo-card__actions">
          <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} aria-label={t('todo.edit')}>
            <Pencil size={16} aria-hidden />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setConfirmDelete(true)}
            aria-label={t('todo.delete')}
          >
            <Trash2 size={16} aria-hidden />
          </Button>
        </div>
      </Card>

      <ConfirmDialog
        open={confirmDelete}
        title={t('dialog.deleteTodoTitle')}
        message={t('dialog.deleteTodoMessage', { title: todo.title })}
        confirmLabel={t('dialog.deleteConfirm')}
        destructive
        isConfirming={isDeleting}
        onConfirm={() => {
          onDelete(todo.id)
          setConfirmDelete(false)
        }}
        onCancel={() => setConfirmDelete(false)}
      />
    </>
  )
}
