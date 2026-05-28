import { useState } from 'react'
import { User } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import './Avatar.css'

interface AvatarProps {
  src?: string | null
  alt?: string
  size?: number
  className?: string
}

export function Avatar({ src, alt = '', size = 36, className }: AvatarProps) {
  const [errored, setErrored] = useState(false)
  const showImage = Boolean(src) && !errored

  return (
    <span
      className={cn('avatar', className)}
      style={{ width: size, height: size }}
      aria-hidden={alt === ''}
    >
      {showImage ? (
        <img
          className="avatar__img"
          src={src as string}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setErrored(true)}
        />
      ) : (
        <User size={Math.round(size * 0.55)} aria-hidden />
      )}
    </span>
  )
}
