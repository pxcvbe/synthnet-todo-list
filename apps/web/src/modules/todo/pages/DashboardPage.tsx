import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { Search } from 'lucide-react'
import { Card, Select } from '@/shared/components'
import { TODO_CATEGORIES } from '@/shared/constants/categories'
import type { TodoCategory } from '@/shared/constants/categories'
import { useTodoFilterStore } from '../stores/todo-filter.store'
import {
  useCreateTodo,
  useDeleteTodo,
  useToggleTodo,
  useTodos,
  useUpdateTodo,
} from '../hooks/use-todos'
import type { Todo, TodoStatusFilter } from '../types/todo.types'
import { TodoForm } from '../components/TodoForm'
import { TodoList } from '../components/TodoList'
import { TodoFilters } from '../components/TodoFilters'
import './dashboard.css'

export function DashboardPage() {
  const { t } = useTranslation()
  const { data: todos = [], isLoading, isError } = useTodos()
  const createTodo = useCreateTodo()
  const updateTodo = useUpdateTodo()
  const toggleTodo = useToggleTodo()
  const deleteTodo = useDeleteTodo()

  const { status, search, category, setStatus, setSearch, setCategory } = useTodoFilterStore()

  // Base list filtered by search + category (status tabs count within this base).
  const baseList = useMemo(() => {
    const query = search.trim().toLowerCase()
    return todos.filter((todo) => {
      const matchesCategory = category === 'all' || todo.category === category
      const matchesSearch =
        query === '' ||
        todo.title.toLowerCase().includes(query) ||
        (todo.description?.toLowerCase().includes(query) ?? false)
      return matchesCategory && matchesSearch
    })
  }, [todos, search, category])

  const counts = useMemo<Record<TodoStatusFilter, number>>(
    () => ({
      all: baseList.length,
      active: baseList.filter((todo) => !todo.is_completed).length,
      completed: baseList.filter((todo) => todo.is_completed).length,
    }),
    [baseList],
  )

  const visibleTodos = useMemo(() => {
    if (status === 'active') return baseList.filter((todo) => !todo.is_completed)
    if (status === 'completed') return baseList.filter((todo) => todo.is_completed)
    return baseList
  }, [baseList, status])

  const totalActive = todos.filter((todo) => !todo.is_completed).length
  const totalCompleted = todos.length - totalActive
  const isFiltered = search.trim() !== '' || category !== 'all' || status !== 'all'

  const categoryOptions = [
    { value: 'all', label: t('filter.allCategories') },
    ...TODO_CATEGORIES.map((value) => ({ value, label: t(`category.${value}`) })),
  ]

  const handleToggle = (todo: Todo) => {
    toggleTodo.mutate({ id: todo.id, is_completed: !todo.is_completed })
  }

  return (
    <div className="dashboard">
      <header className="dashboard__intro">
        <h1 className="dashboard__title">{t('dashboard.title')}</h1>
        <p className="dashboard__subtitle">
          {t('dashboard.stats', { active: totalActive, completed: totalCompleted })}
        </p>
      </header>

      <Card className="dashboard__composer">
        <TodoForm
          isSubmitting={createTodo.isPending}
          onSubmit={(values) =>
            createTodo.mutate({
              title: values.title,
              description: values.description,
              due_date: values.dueDate,
              category: values.category,
            })
          }
        />
      </Card>

      <div className="dashboard__toolbar">
        <div className="dashboard__search">
          <Search className="dashboard__search-icon" size={16} aria-hidden />
          <input
            type="search"
            className="dashboard__search-input"
            placeholder={t('dashboard.searchPlaceholder')}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            aria-label={t('dashboard.searchPlaceholder')}
          />
        </div>
        <div className="dashboard__category">
          <Select
            options={categoryOptions}
            value={category}
            onChange={(event) => setCategory(event.target.value as TodoCategory | 'all')}
            aria-label={t('todo.categoryLabel')}
          />
        </div>
      </div>

      <div className="dashboard__toolbar">
        <TodoFilters value={status} counts={counts} onChange={setStatus} />
      </div>

      <TodoList
        todos={visibleTodos}
        isLoading={isLoading}
        isError={isError}
        isFiltered={isFiltered}
        updatingId={updateTodo.isPending ? updateTodo.variables?.id : undefined}
        deletingId={deleteTodo.isPending ? deleteTodo.variables : undefined}
        onToggle={handleToggle}
        onUpdate={(id, values) =>
          updateTodo.mutate({
            id,
            title: values.title,
            description: values.description,
            due_date: values.dueDate,
            category: values.category,
          })
        }
        onDelete={(id) => deleteTodo.mutate(id)}
      />
    </div>
  )
}
