import type { ReactNode } from 'react'
import { CheckCheck } from 'lucide-react'
import { Card } from '@/shared/components'
import './auth.css'

interface AuthShellProps {
  title: string
  subtitle: string
  children: ReactNode
  footer: ReactNode
}

export function AuthShell({ title, subtitle, children, footer }: AuthShellProps) {
  return (
    <div className="auth">
      <Card className="auth__card">
        <div className="auth__brand">
          <span className="auth__brand-mark">
            <CheckCheck size={18} aria-hidden />
          </span>
          <span className="auth__brand-name">Synth NET</span>
        </div>
        <h1 className="auth__title">{title}</h1>
        <p className="auth__subtitle">{subtitle}</p>
        {children}
        <div className="auth__footer">{footer}</div>
      </Card>
    </div>
  )
}
