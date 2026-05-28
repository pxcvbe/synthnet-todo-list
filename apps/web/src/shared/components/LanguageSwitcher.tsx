import { useTranslation } from 'react-i18next'
import { Check } from 'lucide-react'
import { SUPPORTED_LANGUAGES } from '@/shared/i18n'
import type { Language } from '@/shared/i18n'
import { cn } from '@/shared/utils/cn'
import { DropdownMenu, DropdownItem } from './DropdownMenu'
import { Flag } from './Flags'

export function LanguageSwitcher() {
  const { i18n, t } = useTranslation()
  const current = (i18n.resolvedLanguage ?? 'en') as Language

  return (
    <DropdownMenu
      align="end"
      ariaLabel={t('language.switch')}
      trigger={
        <span className="lang-trigger" aria-hidden>
          <Flag language={current} size={20} />
        </span>
      }
    >
      {SUPPORTED_LANGUAGES.map((lang) => (
        <DropdownItem
          key={lang}
          className={cn(current === lang && 'dropdown__item--active')}
          onClick={() => void i18n.changeLanguage(lang)}
        >
          <Flag language={lang} size={18} />
          <span style={{ flex: 1 }}>{t(`language.${lang}`)}</span>
          {current === lang && <Check size={16} aria-hidden />}
        </DropdownItem>
      ))}
    </DropdownMenu>
  )
}
