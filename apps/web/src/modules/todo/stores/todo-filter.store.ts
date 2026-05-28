import { create } from 'zustand'
import type { TodoCategory } from '@/shared/constants/categories'
import type { TodoStatusFilter } from '../types/todo.types'

interface TodoFilterState {
  status: TodoStatusFilter
  search: string
  category: TodoCategory | 'all'
  setStatus: (status: TodoStatusFilter) => void
  setSearch: (search: string) => void
  setCategory: (category: TodoCategory | 'all') => void
}

export const useTodoFilterStore = create<TodoFilterState>((set) => ({
  status: 'all',
  search: '',
  category: 'all',
  setStatus: (status) => set({ status }),
  setSearch: (search) => set({ search }),
  setCategory: (category) => set({ category }),
}))
