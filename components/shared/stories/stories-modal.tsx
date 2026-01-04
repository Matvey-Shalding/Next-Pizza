'use client'

import { StoryWithItems } from '@/services/dto/stories.dto'
import ReactStories from 'react-insta-stories'
import { X } from 'lucide-react'
import { useEffect, useState } from 'react'

interface Props {
  story: StoryWithItems
  onClose: () => void
}

export const StoryModal = ({ story, onClose }: Props) => {
  const [storyHeight, setStoryHeight] = useState(600)

  useEffect(() => {
    setStoryHeight(window.innerHeight * 0.85)
  }, [])

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[520px]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute -right-12 top-0 text-white/70 hover:text-white"
        >
          <X className="w-8 h-8" />
        </button>

        <ReactStories
          stories={story.items.map((item) => ({
            url: item.sourceUrl,
            type: 'image',
          }))}
          width="100%"
          height={storyHeight}
          onAllStoriesEnd={onClose}
          defaultInterval={3000}
          loop
          keyboardNavigation
        />
      </div>
    </div>
  )
}