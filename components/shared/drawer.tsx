'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { X } from 'lucide-react'

type DrawerProps = {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  width?: string
  background?: string
  zIndex?: string
  title?: string
  children: React.ReactNode
  lockScroll?: boolean
  side?: 'left' | 'right'
}

export function Drawer({
  open,
  setOpen,
  width = '400px',
  background = 'bg-white',
  zIndex = 'z-50',
  title,
  children,
  lockScroll = true,
  side = 'right'
}: DrawerProps) {
  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (!lockScroll) return
    if (open) {
      document.body.style.overflow = 'hidden'
      document.body.style.pointerEvents = 'none'
    } else {
      document.body.style.overflow = 'unset'
      document.body.style.pointerEvents = 'unset'
    }
  }, [open, lockScroll])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={e => {
            if (e.target === e.currentTarget) setOpen(false)
          }}
          className={`fixed inset-0 ${zIndex} bg-black/50 flex pointer-events-auto ${
            side === 'right' ? 'justify-end' : 'justify-start'
          }`}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width }}
            exit={{ width: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className={`h-screen ${background} flex flex-col gap-y-5 pt-5 overflow-y-auto`}
          >
            {title && (
              <div className="text-lg text-black flex px-5 items-center justify-between w-full">
                <span className="font-bold">{title}</span>
                <button
                  onClick={() => setOpen(false)}
                  className="p-2 cursor-pointer"
                  aria-label="Close drawer"
                >
                  <X className="size-7 stroke-gray-400" />
                </button>
              </div>
            )}
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
