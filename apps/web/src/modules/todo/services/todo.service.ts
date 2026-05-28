import { supabase } from '@/shared/lib/supabase'
import type { Todo } from '../types/todo.types'

interface CreateTodoParams {
  title: string
  description: string | null
}

interface UpdateTodoParams {
  id: string
  title?: string
  description?: string | null
  is_completed?: boolean
}

/** Data access for todos. RLS scopes every query to the authenticated user. */
export const todoService = {
  async list(): Promise<Todo[]> {
    const { data, error } = await supabase
      .from('todos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data
  },

  async create({ title, description }: CreateTodoParams): Promise<Todo> {
    const { data: userData, error: userError } = await supabase.auth.getUser()
    if (userError) throw userError
    if (!userData.user) throw new Error('You must be signed in to create a todo')

    const { data, error } = await supabase
      .from('todos')
      .insert({ title, description, user_id: userData.user.id })
      .select()
      .single()
    if (error) throw error
    return data
  },

  async update({ id, ...changes }: UpdateTodoParams): Promise<Todo> {
    const { data, error } = await supabase
      .from('todos')
      .update(changes)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async remove(id: string): Promise<void> {
    const { error } = await supabase.from('todos').delete().eq('id', id)
    if (error) throw error
  },
}
