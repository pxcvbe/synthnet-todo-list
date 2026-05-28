import { Loader2 } from 'lucide-react'
import './Spinner.css'

interface SpinnerProps {
  size?: number
  label?: string
}

export function Spinner({ size = 24, label }: SpinnerProps) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <Loader2 className="spinner__icon" size={size} aria-hidden />
      {label && <span className="spinner__label">{label}</span>}
    </div>
  )
}
