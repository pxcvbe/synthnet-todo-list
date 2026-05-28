import { useState } from 'react'
import { Check, Pencil, Trash2 } from 'lucide-react'
import { Button, Card } from '@/shared/components'
import { cn } from '@/shared/utils/cn'
import type { Todo } from '../types/todo.types'
import { TodoForm } from './TodoForm'
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
  const [isEditing, setIsEditing] = useState(false)

  if (isEditing) {
    return (
      <Card>
        <TodoForm
          defaultValues={{ title: todo.title, description: todo.description ?? '' }}
          submitLabel="Save changes"
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

  return (
    <Card hoverable className="todo-card">
      <button
        type="button"
        className={cn('todo-card__check', todo.is_completed && 'todo-card__check--done')}
        onClick={() => onToggle(todo)}
        aria-pressed={todo.is_completed}
        aria-label={todo.is_completed ? 'Mark as not completed' : 'Mark as completed'}
      >
        {todo.is_completed && <Check size={14} aria-hidden />}
      </button>

      <div className="todo-card__body">
        <p className={cn('todo-card__title', todo.is_completed && 'todo-card__title--done')}>
          {todo.title}
        </p>
        {todo.description && <p className="todo-card__description">{todo.description}</p>}
      </div>

      <div className="todo-card__actions">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsEditing(true)}
          aria-label="Edit todo"
        >
          <Pencil size={16} aria-hidden />
        </Button>
        <Button
          variant="ghost"
          size="sm"
          isLoading={isDeleting}
          onClick={() => onDelete(todo.id)}
          aria-label="Delete todo"
        >
          {!isDeleting && <Trash2 size={16} aria-hidden />}
        </Button>
      </div>
    </Card>
  )
}
