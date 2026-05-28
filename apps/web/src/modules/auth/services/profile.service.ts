import { supabase } from '@/shared/lib/supabase'
import type { Database } from '@/shared/types/database'

export type Profile = Database['public']['Tables']['profiles']['Row']

export const profileService = {
  async getById(userId: string): Promise<Profile | null> {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .maybeSingle()
    if (error) throw error
    return data
  },
}
