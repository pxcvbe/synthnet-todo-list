/**
 * Validated environment variables. Fails fast at startup if misconfigured,
 * so the rest of the app can treat these as guaranteed non-empty strings.
 */
function requireEnv(key: string, value: string | undefined): string {
  if (!value || value.trim() === '') {
    throw new Error(
      `Missing environment variable "${key}". Copy .env.example to .env and fill in your Supabase credentials.`,
    )
  }
  return value
}

export const env = {
  supabaseUrl: requireEnv('VITE_SUPABASE_URL', import.meta.env.VITE_SUPABASE_URL),
  supabaseAnonKey: requireEnv('VITE_SUPABASE_ANON_KEY', import.meta.env.VITE_SUPABASE_ANON_KEY),
} as const
