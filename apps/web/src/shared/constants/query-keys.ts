/** Centralized TanStack Query keys for cache consistency across modules. */
export const QUERY_KEYS = {
  todos: ['todos'] as const,
  session: ['session'] as const,
  profile: (userId: string) => ['profile', userId] as const,
}
