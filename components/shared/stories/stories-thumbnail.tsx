'use client'

import { StoryWithItems } from '@/services/dto/stories.dto'

interface Props {
  story: StoryWithItems
  onClick: (story: StoryWithItems) => void
}

export const StoryThumbnail = ({ story, onClick }: Props) => (
  <div
    key={story.id}
    className="shrink-0 basis-[200px] h-[250px]"
  >
    <img
      onClick={() => onClick(story)}
      className="rounded-md cursor-pointer w-full h-full object-cover"
      src={story.previewImageUrl}
      alt={`Story ${story.id}`}
      loading="lazy"
    />
  </div>
)