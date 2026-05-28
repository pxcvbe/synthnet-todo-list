import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'
import './Card.css'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
}

export function Card({ hoverable = false, className, children, ...props }: CardProps) {
  return (
    <div className={cn('card', hoverable && 'card--hoverable', className)} {...props}>
      {children}
    </div>
  )
}
