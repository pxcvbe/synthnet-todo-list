/** Preset todo categories. Stored as the key string; labels are translated via i18n. */
export const TODO_CATEGORIES = ['work', 'personal', 'shopping', 'health', 'other'] as const

export type TodoCategory = (typeof TODO_CATEGORIES)[number]

/** Accent color per category (token-independent, used for category dots/badges). */
export const CATEGORY_COLORS: Record<TodoCategory, string> = {
  work: '#0d74ce',
  personal: '#8145b5',
  shopping: '#ab6400',
  health: '#16a34a',
  other: '#60646c',
}

export function isTodoCategory(value: string | null | undefined): value is TodoCategory {
  return value != null && (TODO_CATEGORIES as readonly string[]).includes(value)
}
