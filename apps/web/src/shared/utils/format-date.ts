/** Parse a "YYYY-MM-DD" date string into a local Date (no timezone shift). */
export function parseDateOnly(value: string): Date | null {
  const parts = value.split('-').map(Number)
  if (parts.length !== 3 || parts.some(Number.isNaN)) return null
  const [year, month, day] = parts as [number, number, number]
  return new Date(year, month - 1, day)
}

/** Format a "YYYY-MM-DD" date for display in the given locale. */
export function formatDateOnly(value: string, locale: string): string {
  const date = parseDateOnly(value)
  if (!date) return value
  return new Intl.DateTimeFormat(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

/** True if the date-only string is before today (local). */
export function isOverdue(value: string): boolean {
  const date = parseDateOnly(value)
  if (!date) return false
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date.getTime() < today.getTime()
}
