import { useTranslation } from 'react-i18next'
import { ListTodo, SearchX } from 'lucide-react'
import { Spinner } from '@/shared/components'
import type { Todo } from '../types/todo.types'
import type { TodoFormValues } from '../schemas/todo.schema'
import { TodoCard } from './TodoCard'
import './todo.css'

interface TodoListProps {
  todos: Todo[]
  isLoading: boolean
  isError: boolean
  isFiltered: boolean
  updatingId?: string
  deletingId?: string
  onToggle: (todo: Todo) => void
  onUpdate: (id: string, values: TodoFormValues) => void
  onDelete: (id: string) => void
}

export function TodoList({
  todos,
  isLoading,
  isError,
  isFiltered,
  updatingId,
  deletingId,
  onToggle,
  onUpdate,
  onDelete,
}: TodoListProps) {
  const { t } = useTranslation()

  if (isLoading) {
    return (
      <div className="todo-list__state">
        <Spinner label={t('todo.loading')} />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="todo-list__state">
        <p>{t('todo.error')}</p>
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list__empty">
        {isFiltered ? <SearchX size={40} aria-hidden /> : <ListTodo size={40} aria-hidden />}
        <p className="todo-list__empty-title">
          {isFiltered ? t('todo.noResultsTitle') : t('todo.emptyTitle')}
        </p>
        <p className="todo-list__empty-text">
          {isFiltered ? t('todo.noResultsText') : t('todo.emptyText')}
        </p>
      </div>
    )
  }

  return (
    <ul className="todo-list">
      {todos.map((todo) => (
        <li key={todo.id}>
          <TodoCard
            todo={todo}
            isUpdating={updatingId === todo.id}
            isDeleting={deletingId === todo.id}
            onToggle={onToggle}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </li>
      ))}
    </ul>
  )
}
