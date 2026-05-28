import { Outlet } from 'react-router-dom'
import { CheckCheck, LogOut } from 'lucide-react'
import { Button, ThemeToggle } from '@/shared/components'
import { useAuth } from '@/modules/auth/hooks/use-auth'
import { useSignOut } from '@/modules/auth/hooks/use-sign-out'
import './dashboard-layout.css'

export function DashboardLayout() {
  const { user } = useAuth()
  const { signOut, isSigningOut } = useSignOut()

  const displayName =
    (user?.user_metadata?.full_name as string | undefined) ?? user?.email ?? 'Account'

  return (
    <div className="layout">
      <header className="layout__header">
        <div className="container layout__header-inner">
          <div className="layout__brand">
            <span className="layout__brand-mark">
              <CheckCheck size={18} aria-hidden />
            </span>
            <span className="layout__brand-name">Synth NET</span>
          </div>

          <div className="layout__actions">
            <span className="layout__user" title={user?.email ?? undefined}>
              {displayName}
            </span>
            <ThemeToggle />
            <Button variant="secondary" size="sm" onClick={signOut} isLoading={isSigningOut}>
              {!isSigningOut && <LogOut size={16} aria-hidden />}
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="layout__main container">
        <Outlet />
      </main>
    </div>
  )
}
