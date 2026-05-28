import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/shared/lib/supabase'
import { ROUTES } from '@/shared/constants/routes'
import type { SignInParams, SignUpParams } from '../types/auth.types'

/** Thin, framework-agnostic wrapper around Supabase Auth. */
export const authService = {
  async signUp({ email, password, fullName }: SignUpParams): Promise<void> {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName },
        emailRedirectTo: `${window.location.origin}${ROUTES.dashboard}`,
      },
    })
    if (error) throw error
  },

  async signInWithPassword({ email, password }: SignInParams): Promise<void> {
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  },

  async signInWithGoogle(): Promise<void> {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}${ROUTES.dashboard}`,
      },
    })
    if (error) throw error
  },

  async signOut(): Promise<void> {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  },

  async getSession(): Promise<Session | null> {
    const { data, error } = await supabase.auth.getSession()
    if (error) throw error
    return data.session
  },

  onAuthStateChange(callback: (session: Session | null) => void): () => void {
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(session)
    })
    return () => data.subscription.unsubscribe()
  },
}
