import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { LogOut } from 'lucide-react'
import {
  Avatar,
  ConfirmDialog,
  DropdownItem,
  DropdownLabel,
  DropdownMenu,
  DropdownSeparator,
} from '@/shared/components'
import { useAuth } from '../hooks/use-auth'
import { useProfile } from '../hooks/use-profile'
import { useSignOut } from '../hooks/use-sign-out'
import './account-menu.css'

export function AccountMenu() {
  const { t } = useTranslation()
  const { user } = useAuth()
  const { data: profile } = useProfile()
  const { signOut, isSigningOut } = useSignOut()
  const [confirmSignOut, setConfirmSignOut] = useState(false)

  const metadata = user?.user_metadata ?? {}
  const avatarUrl = profile?.avatar_url ?? (metadata.avatar_url as string | undefined) ?? null
  const fullName =
    profile?.full_name ?? (metadata.full_name as string | undefined) ?? user?.email ?? 'Account'

  return (
    <>
      <DropdownMenu
        align="end"
        ariaLabel={t('account.menu')}
        trigger={<Avatar src={avatarUrl} alt={fullName} size={36} />}
      >
        <DropdownLabel>
          <span className="account-menu__name">{fullName}</span>
          {user?.email && <span className="account-menu__email">{user.email}</span>}
        </DropdownLabel>
        <DropdownSeparator />
        <DropdownItem destructive onClick={() => setConfirmSignOut(true)}>
          <LogOut size={16} aria-hidden />
          {t('account.signOut')}
        </DropdownItem>
      </DropdownMenu>

      <ConfirmDialog
        open={confirmSignOut}
        title={t('dialog.signOutTitle')}
        message={t('dialog.signOutMessage')}
        confirmLabel={t('dialog.signOutConfirm')}
        destructive
        isConfirming={isSigningOut}
        onConfirm={signOut}
        onCancel={() => setConfirmSignOut(false)}
      />
    </>
  )
}
