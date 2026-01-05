'use client'

import { PizzaSize, PizzaType, pizzaSizes, pizzaTypes } from '@/constants/pizza'
import { ProductFormContext } from '@/context/ProductForm'
import { cn } from '@/lib/utils'
import { ProductItem } from '@/prisma/generated/prisma'
import { useContext, useMemo } from 'react'
import { Toggles } from '..'

interface Props {
  size: PizzaSize
  type: PizzaType
  items: ProductItem[]
  onSizeChange: (size: PizzaSize) => void
  onTypeChange: (type: PizzaType) => void
}

export const PizzaFormSelectors = ({
  size,
  type,
  items,
  onSizeChange,
  onTypeChange,
}: Props) => {
  const availablePizzaTypes = useMemo(() => {
    return items
      .filter((item) => item.size === size)
      .map((item) => item.pizzaType) as PizzaType[]
  }, [items, size])

  const inline = useContext(ProductFormContext)

  const sizeToggleItems = pizzaSizes.map((s) => ({
    name: s.name,
    value: String(s.value),
    disabled: false,
  }))

  const typeToggleItems = useMemo(
    () =>
      pizzaTypes.map((t) => ({
        name: t.name,
        value: String(t.value),
        disabled: !availablePizzaTypes.includes(t.value),
      })),
    [availablePizzaTypes]
  )

  return (
    <div
      className={cn(
        'flex flex-col gap-y-2 -mx-4 p-4 bg-gray-50 rounded-md min-w-full',
        {
          'max-w-105': !inline,
        }
      )}
    >
      <Toggles
        selectedValue={String(size)}
        onClick={(v) => onSizeChange(Number(v) as PizzaSize)}
        items={sizeToggleItems}
      />
      <Toggles
        selectedValue={String(type)}
        onClick={(v) => onTypeChange(Number(v) as PizzaType)}
        items={typeToggleItems}
      />
    </div>
  )
}