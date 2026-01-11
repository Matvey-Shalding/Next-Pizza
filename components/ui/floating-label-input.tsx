import * as React from 'react'
import { cn } from '@/lib/utils'
import { Input } from '@/components/ui' 

interface FloatingLabelInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
}

const FloatingLabelInput = React.forwardRef<HTMLInputElement, FloatingLabelInputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          id={id}
          placeholder=" "
          className={cn(
            'peer pt-4',
            className
          )}
          {...props}
        />

        <label
          htmlFor={id}
          className={cn(
            'pointer-events-none absolute left-3 text-muted-foreground transition-all duration-200 ease-out',
            'px-1.5 bg-white dark:bg-background/80',
            'top-1/2 -translate-y-1/2',
            'peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:font-medium',
            'peer-focus:top-0 peer-focus:-translate-y-1/2 peer-focus:text-sm peer-focus:text-primary',
            'peer-[&:not(:placeholder-shown)]:top-0 peer-[&:not(:placeholder-shown)]:-translate-y-1/2 peer-[&:not(:placeholder-shown)]:text-xs'
          )}
        >
          {label}
        </label>
      </div>
    )
  }
)

FloatingLabelInput.displayName = 'FloatingLabelInput'

export { FloatingLabelInput }
