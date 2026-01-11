'use client'

import { Button } from '@/components/ui'
import { useCart } from '@/hooks'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { CartDrawerEmpty, CartDrawerList } from '.'
import { Drawer } from '../drawer'

export const CartDrawer = ({
  open,
  setOpen,
  children
}: {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  children: React.ReactNode
}) => {
  const { items, onClickCountButton, removeCartItem, totalAmount } = useCart()
  const router = useRouter()

  return (
    <>
      {children}
      <Drawer
			side='right'
        open={open}
        setOpen={setOpen}
        width="400px"
        background="bg-[#F4F1EE]"
        zIndex="z-50"
        title={items.length > 0 ? `${items.length} item${items.length !== 1 ? 's' : ''} in your cart` : undefined}
      >
        {items.length > 0 ? (
          <>
            <CartDrawerList
              items={items}
              onClickCountButton={onClickCountButton}
              removeCartItem={removeCartItem}
            />

            <div className="bg-white px-9 py-8 flex flex-col gap-y-5">
              <div className="flex items-center gap-x-4 w-full">
                <span className="text-black">Total</span>
                <div className="basis-full h-px border-dashed border border-gray-200"></div>
                <span className="text-black text-lg font-bold">{totalAmount}$</span>
              </div>
              <div className="flex items-center gap-x-4 w-full">
                <span className="text-black">Tax</span>
                <div className="basis-full h-px border-dashed border border-gray-200"></div>
                <span className="text-black text-lg font-bold">150$</span>
              </div>
              <Button
                onClick={() => router.push('/checkout')}
                className="flex items-center gap-x-1 min-h-12"
              >
                <span>Make an order</span>
                <ArrowRight size={16} className="stroke-white" />
              </Button>
            </div>
          </>
        ) : (
          <div className="grid place-content-center h-screen">
            <CartDrawerEmpty onClose={() => setOpen(false)} />
          </div>
        )}
      </Drawer>
    </>
  )
}
