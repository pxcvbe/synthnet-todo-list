import type { Database } from '@/shared/types/database'

export type Todo = Database['public']['Tables']['todos']['Row']
export type TodoInsert = Database['public']['Tables']['todos']['Insert']
export type TodoUpdate = Database['public']['Tables']['todos']['Update']

export type TodoStatusFilter = 'all' | 'active' | 'completed'
