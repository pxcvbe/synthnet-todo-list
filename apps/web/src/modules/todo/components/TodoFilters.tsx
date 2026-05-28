import { useTranslation } from 'react-i18next'
import { cn } from '@/shared/utils/cn'
import type { TodoStatusFilter } from '../types/todo.types'
import './todo.css'

interface TodoFiltersProps {
  value: TodoStatusFilter
  counts: Record<TodoStatusFilter, number>
  onChange: (filter: TodoStatusFilter) => void
}

const FILTERS: TodoStatusFilter[] = ['all', 'active', 'completed']

export function TodoFilters({ value, counts, onChange }: TodoFiltersProps) {
  const { t } = useTranslation()

  return (
    <div className="todo-filters" role="tablist" aria-label={t('filter.all')}>
      {FILTERS.map((filter) => (
        <button
          key={filter}
          type="button"
          role="tab"
          aria-selected={value === filter}
          className={cn('todo-filters__tab', value === filter && 'todo-filters__tab--active')}
          onClick={() => onChange(filter)}
        >
          {t(`filter.${filter}`)}
          <span className="todo-filters__count">{counts[filter]}</span>
        </button>
      ))}
    </div>
  )
}
