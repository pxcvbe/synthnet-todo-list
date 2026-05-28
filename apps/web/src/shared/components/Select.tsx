import { forwardRef, useId } from 'react'
import type { SelectHTMLAttributes } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import './Select.css'

export interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, error, options, placeholder, className, id, ...props },
  ref,
) {
  const generatedId = useId()
  const selectId = id ?? generatedId

  return (
    <div className="select-field">
      {label && (
        <label className="select-field__label" htmlFor={selectId}>
          {label}
        </label>
      )}
      <div className="select-field__wrap">
        <select
          ref={ref}
          id={selectId}
          className={cn('select-field__control', error && 'select-field__control--error', className)}
          aria-invalid={Boolean(error)}
          {...props}
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <ChevronDown className="select-field__icon" size={16} aria-hidden />
      </div>
      {error && <span className="select-field__error">{error}</span>}
    </div>
  )
})
