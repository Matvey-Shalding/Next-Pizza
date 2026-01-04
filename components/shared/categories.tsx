'use client'

import { cn } from '@/lib/utils'
import { Category } from '@/prisma/generated/prisma'
import { useCategoryStore } from '@/store/category'
import { useRef } from 'react'
import React from 'react'
import { useSlidingMarker } from '@/hooks/use-sliding-marker'

interface Props {
  className?: string
  categories: Category[]
}

export const Categories = React.memo(function Categories({
  className,
  categories,
}: Props) {
  const activeId = useCategoryStore((state) => state.activeId)
  const containerRef = useRef<HTMLDivElement>(null)

  // Reuse the hook — no resize handling
  const markerStyle = useSlidingMarker({
    containerRef,
    selectedValue: String(activeId),
  })

  return (
    <div
      ref={containerRef}
      className={cn(
        className,
        'relative inline-flex gap-x-1 p-1 bg-gray-50 rounded-2xl'
      )}
    >
      {/* Sliding marker */}
      <span
        className="absolute top-1 bottom-1 rounded-2xl bg-white shadow-md shadow-gray-200 ease-in-out"
        style={markerStyle}
      />

      {categories.map(({ name, id }) => (
        <button
          key={id}
          data-value={id} // ✅ matches hook selector
          onClick={() =>
            document.getElementById(name)?.scrollIntoView({ behavior: 'smooth' })
          }
          className={cn(
            'relative z-10 flex items-center font-bold h-11 rounded-2xl px-5 transition-colors duration-300',
            activeId === id ? 'text-primary' : 'text-gray-700'
          )}
        >
          {name}
        </button>
      ))}
    </div>
  )
})