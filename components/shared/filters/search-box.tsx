'use client'

import { Input } from '@/components/ui'


interface Props {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export function SearchBox({ value, onChange, placeholder }: Props) {
  return (
    <Input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="bg-gray-100 border-gray-300 h-10 pb-0 mb-1.5"
      aria-label="Search items"
    />
  )
}