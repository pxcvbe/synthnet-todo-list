import { useEffect, useRef, useState } from 'react'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/shared/utils/cn'
import './DropdownMenu.css'

interface DropdownMenuProps {
  trigger: ReactNode
  children: ReactNode
  align?: 'start' | 'end'
  ariaLabel?: string
}

export function DropdownMenu({ trigger, children, align = 'end', ariaLabel }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('pointerdown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('pointerdown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <div className="dropdown" ref={rootRef}>
      <button
        type="button"
        className="dropdown__trigger"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((value) => !value)}
      >
        {trigger}
      </button>
      {open && (
        <div
          className={cn('dropdown__menu', `dropdown__menu--${align}`)}
          role="menu"
          onClick={() => setOpen(false)}
        >
          {children}
        </div>
      )}
    </div>
  )
}

interface DropdownItemProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  destructive?: boolean
}

export function DropdownItem({ destructive, className, children, ...props }: DropdownItemProps) {
  return (
    <button
      type="button"
      role="menuitem"
      className={cn('dropdown__item', destructive && 'dropdown__item--destructive', className)}
      {...props}
    >
      {children}
    </button>
  )
}

export function DropdownSeparator() {
  return <div className="dropdown__separator" role="separator" />
}

export function DropdownLabel({ children }: { children: ReactNode }) {
  return <div className="dropdown__label">{children}</div>
}
