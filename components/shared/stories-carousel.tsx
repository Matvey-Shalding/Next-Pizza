'use client';

import { cn } from '@/lib/utils';
import { StoryWithItems } from '@/services/dto/stories.dto';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useState } from 'react';
import ReactStories from 'react-insta-stories';
import { X } from 'lucide-react';
import { Container } from './container';

interface Props {
  stories: StoryWithItems[];
  className?: string;
}

export const StoriesCarousel = ({ stories, className }: Props) => {
  const [open, setOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<StoryWithItems>();
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'start' },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const handleClick = (story: StoryWithItems) => {
    setSelectedStory(story);
    setOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setOpen(false);
    document.body.style.overflow = 'unset';
  };

  return (
    <>
      <div className="relative">
        <Container ref={emblaRef} className={cn('overflow-hidden', className)}>
          <div className="flex gap-x-5 py-4">
            {stories.map(story => (
              <div
                key={story.id}
                className="shrink-0 basis-[200px] h-[250px]"
              >
                <img
                  onClick={() => handleClick(story)}
                  className="rounded-md cursor-pointer w-full h-full object-cover"
                  src={story.previewImageUrl}
                  alt={`Story ${story.id}`}
                />
              </div>
            ))}
          </div>
        </Container>

        <button
          onClick={() => emblaApi?.scrollPrev()}
          className="absolute left-0 translate-x-2 top-1/2 -translate-y-1/2 size-7 grid place-content-center border-primary bg-white rounded-full"
          aria-label="Previous"
        >
          <ArrowLeft className="size-5 text-primary" />
        </button>
        <button
          onClick={() => emblaApi?.scrollNext()}
          className="absolute right-2 -translate-x-2 top-1/2 -translate-y-1/2 size-7 grid place-content-center border-primary bg-white rounded-full"
          aria-label="Next"
        >
          <ArrowRight className="size-5 text-primary" />
        </button>
      </div>

      {open && selectedStory && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="relative w-full max-w-[520px]"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={closeModal}
              className="absolute -right-12 top-0 text-white/70 hover:text-white"
            >
              <X className="w-8 h-8" />
            </button>

            <ReactStories
              stories={selectedStory.items.map(item => ({
                url: item.sourceUrl,
                type: 'image'
              }))}
              width="100%"
              height={window.innerHeight * 0.85}
              onAllStoriesEnd={closeModal}
              defaultInterval={3000}
              loop
              keyboardNavigation
            />
          </div>
        </div>
      )}
    </>
  );
};