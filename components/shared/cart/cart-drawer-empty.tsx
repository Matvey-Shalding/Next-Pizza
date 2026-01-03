'use client'
import { Button } from '@/components/ui'
import { ArrowLeft } from 'lucide-react'
import React from 'react'

export const CartDrawerEmpty = ({ onClose }: { onClose: () => void }) => (
  <div className="flex flex-col items-center">
    <img className="size-30 mb-5" src="/assets/images/empty-box.png" alt="" />
    <span className="mb-1.5 inline-block text-[22px] font-bold">Your cart is empty</span>
    <span className="text-gray-400 text-center inline-block mb-5 max-w-50">
      Add at least one pizza to make an order
    </span>
    <Button
      className="flex min-w-60 min-h-[50px] items-center gap-x-1.5"
      onClick={onClose}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className="text-base font-semibold text-white">Go back</span>
    </Button>
  </div>
)