import type { Language } from '@/shared/i18n'

interface FlagProps {
  size?: number
}

/** Simplified US flag. */
export function FlagUS({ size = 18 }: FlagProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden role="img">
      <defs>
        <clipPath id="flag-us-clip">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-us-clip)">
        <rect width="24" height="24" fill="#fff" />
        {[0, 2, 4, 6, 8, 10].map((y) => (
          <rect key={y} y={(y * 24) / 13} width="24" height={24 / 13} fill="#b22234" />
        ))}
        <rect width="12" height={(24 / 13) * 7} fill="#3c3b6e" />
      </g>
    </svg>
  )
}

/** Indonesia flag (red over white). */
export function FlagID({ size = 18 }: FlagProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden role="img">
      <defs>
        <clipPath id="flag-id-clip">
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath="url(#flag-id-clip)">
        <rect width="24" height="12" fill="#ce1126" />
        <rect y="12" width="24" height="12" fill="#fff" />
      </g>
    </svg>
  )
}

export function Flag({ language, size }: { language: Language; size?: number }) {
  return language === 'id' ? <FlagID size={size} /> : <FlagUS size={size} />
}
