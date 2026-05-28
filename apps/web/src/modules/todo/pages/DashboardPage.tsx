import { useMemo } from 'react'
import { Card } from '@/shared/components'
import { useTodoFilterStore } from '../stores/todo-filter.store'
import {
  useCreateTodo,
  useDeleteTodo,
  useToggleTodo,
  useTodos,
  useUpdateTodo,
} from '../hooks/use-todos'
import type { Todo, TodoFilter } from '../types/todo.types'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { TodoFilters } from '../components/TodoFilters'
import './dashboard.css'

export function DashboardPage() {
  const { data: todos = [], isLoading, isError } = useTodos()
  const createTodo = useCreateTodo()
  const updateTodo = useUpdateTodo()
  const toggleTodo = useToggleTodo()
  const deleteTodo = useDeleteTodo()

  const filter = useTodoFilterStore((state) => state.filter)
  const setFilter = useTodoFilterStore((state) => state.setFilter)

  const counts = useMemo<Record<TodoFilter, number>>(
    () => ({
      all: todos.length,
      active: todos.filter((todo) => !todo.is_completed).length,
      completed: todos.filter((todo) => todo.is_completed).length,
    }),
    [todos],
  )

  const visibleTodos = useMemo(() => {
    if (filter === 'active') return todos.filter((todo) => !todo.is_completed)
    if (filter === 'completed') return todos.filter((todo) => todo.is_completed)
    return todos
  }, [todos, filter])

  const handleToggle = (todo: Todo) => {
    toggleTodo.mutate({ id: todo.id, is_completed: !todo.is_completed })
  }

  return (
    <div className="dashboard">
      <header className="dashboard__intro">
        <h1 className="dashboard__title">Your todos</h1>
        <p className="dashboard__subtitle">
          {counts.active} active · {counts.completed} completed
        </p>
      </header>

      <Card className="dashboard__composer">
        <TodoForm
          isSubmitting={createTodo.isPending}
          onSubmit={(values) =>
            createTodo.mutate({ title: values.title, description: values.description })
          }
        />
      </Card>

      <div className="dashboard__toolbar">
        <TodoFilters value={filter} counts={counts} onChange={setFilter} />
      </div>

      <TodoList
        todos={visibleTodos}
        isLoading={isLoading}
        isError={isError}
        updatingId={updateTodo.isPending ? updateTodo.variables?.id : undefined}
        deletingId={deleteTodo.isPending ? deleteTodo.variables : undefined}
        onToggle={handleToggle}
        onUpdate={(id, values) =>
          updateTodo.mutate({ id, title: values.title, description: values.description })
        }
        onDelete={(id) => deleteTodo.mutate(id)}
      />
    </div>
  )
}
