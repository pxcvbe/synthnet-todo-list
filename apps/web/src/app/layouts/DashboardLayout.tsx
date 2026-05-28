import { Outlet } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { CheckCheck } from 'lucide-react'
import { LanguageSwitcher, ThemeToggle } from '@/shared/components'
import { AccountMenu } from '@/modules/auth/components/AccountMenu'
import './dashboard-layout.css'

export function DashboardLayout() {
  const { t } = useTranslation()

  return (
    <div className="layout">
      <header className="layout__header">
        <div className="container layout__header-inner">
          <div className="layout__brand">
            <span className="layout__brand-mark">
              <CheckCheck size={18} aria-hidden />
            </span>
            <span className="layout__brand-name">{t('app.name')}</span>
          </div>

          <div className="layout__actions">
            <LanguageSwitcher />
            <ThemeToggle />
            <AccountMenu />
          </div>
        </div>
      </header>

      <main className="layout__main container">
        <Outlet />
      </main>
    </div>
  )
}
