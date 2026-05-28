import { cn } from '@/shared/utils/cn'
import type { TodoFilter } from '../types/todo.types'
import './todo.css'

interface TodoFiltersProps {
  value: TodoFilter
  counts: Record<TodoFilter, number>
  onChange: (filter: TodoFilter) => void
}

const FILTERS: Array<{ key: TodoFilter; label: string }> = [
  { key: 'all', label: 'All' },
  { key: 'active', label: 'Active' },
  { key: 'completed', label: 'Completed' },
]

export function TodoFilters({ value, counts, onChange }: TodoFiltersProps) {
  return (
    <div className="todo-filters" role="tablist" aria-label="Filter todos">
      {FILTERS.map((filter) => (
        <button
          key={filter.key}
          type="button"
          role="tab"
          aria-selected={value === filter.key}
          className={cn('todo-filters__tab', value === filter.key && 'todo-filters__tab--active')}
          onClick={() => onChange(filter.key)}
        >
          {filter.label}
          <span className="todo-filters__count">{counts[filter.key]}</span>
        </button>
      ))}
    </div>
  )
}
