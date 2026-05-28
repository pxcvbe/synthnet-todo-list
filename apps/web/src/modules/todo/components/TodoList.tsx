import { ListTodo } from 'lucide-react'
import { Spinner } from '@/shared/components'
import type { Todo } from '../types/todo.types'
import type { TodoFormValues } from '../schemas/todo.schema'
import { TodoCard } from './TodoCard'
import './todo.css'

interface TodoListProps {
  todos: Todo[]
  isLoading: boolean
  isError: boolean
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
  updatingId,
  deletingId,
  onToggle,
  onUpdate,
  onDelete,
}: TodoListProps) {
  if (isLoading) {
    return (
      <div className="todo-list__state">
        <Spinner label="Loading todos..." />
      </div>
    )
  }

  if (isError) {
    return (
      <div className="todo-list__state">
        <p>Something went wrong loading your todos. Please try again.</p>
      </div>
    )
  }

  if (todos.length === 0) {
    return (
      <div className="todo-list__empty">
        <ListTodo size={40} aria-hidden />
        <p className="todo-list__empty-title">Nothing here yet</p>
        <p className="todo-list__empty-text">Add your first todo to get started.</p>
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
