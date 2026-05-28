import { create } from 'zustand'
import type { TodoFilter } from '../types/todo.types'

interface TodoFilterState {
  filter: TodoFilter
  setFilter: (filter: TodoFilter) => void
}

export const useTodoFilterStore = create<TodoFilterState>((set) => ({
  filter: 'all',
  setFilter: (filter) => set({ filter }),
}))
