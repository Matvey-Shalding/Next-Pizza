'use client'

import { cn } from '@/lib/utils'
import { StoryWithItems } from '@/services/dto/stories.dto'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { ArrowLeft, ArrowRight, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import ReactStories from 'react-insta-stories'
import { useMedia } from 'react-use'
import { Container } from '..'

interface Props {
	stories: StoryWithItems[]
	className?: string
}

export const StoriesCarousel = ({ stories, className }: Props) => {
	const [open, setOpen] = useState(false)
	const [selectedStory, setSelectedStory] = useState<StoryWithItems>()
	const [storyHeight, setStoryHeight] = useState(600)

	const [emblaRef, emblaApi] = useEmblaCarousel(
		{ loop: true, align: 'start' },
		[Autoplay({ delay: 3000, stopOnInteraction: false })]
	)

	const isMobile = useMedia('(max-width: 768px)', false)

	useEffect(() => {
		setStoryHeight(window.innerHeight * 0.85)
	}, [])

	useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : 'unset'
	}, [open])

	const handleClick = (story: StoryWithItems) => {
		setSelectedStory(story)
		setOpen(true)
	}

	const closeModal = () => {
		setOpen(false)
	}

	return (
		<>
			<div className="relative">
				<Container
					ref={emblaRef}
					className={cn('overflow-hidden', className)}
				>
					<div className="flex gap-x-5 py-4">
						{stories.map(story => (
							<div
								key={story.id}
								className="shrink-0 small-laptop:basis-[200px] small-phone:basis-[150px] small-phone:h-[150px] small-laptop:h-[250px]"
							>
								<img
									onClick={() => handleClick(story)}
									className="rounded-md cursor-pointer w-full h-full object-cover 
                             transition-transform duration-300 ease-out 
                             hover:scale-105 hover:shadow-lg hover:brightness-110"
									src={story.previewImageUrl}
									alt={`Story ${story.id}`}
									loading="lazy"
								/>
							</div>
						))}
					</div>
				</Container>

				<button
					onClick={() => emblaApi?.scrollPrev()}
					className="absolute left-0 translate-x-2 top-1/2 -translate-y-1/2 size-7 
                     grid place-content-center bg-white rounded-full shadow 
                     transition-all duration-200 ease-out 
                     hover:bg-gray-100 active:scale-95"
					aria-label="Previous"
				>
					<ArrowLeft className="size-5 text-primary" />
				</button>
				<button
					onClick={() => emblaApi?.scrollNext()}
					className="absolute right-2 -translate-x-2 top-1/2 -translate-y-1/2 size-7 
                     grid place-content-center bg-white rounded-full shadow 
                     transition-all duration-200 ease-out 
                     hover:bg-gray-100 active:scale-95"
					aria-label="Next"
				>
					<ArrowRight className="size-5 text-primary" />
				</button>
			</div>

			{open && selectedStory && (
				<div
					role="dialog"
					aria-modal="true"
					className={cn(
						'fixed inset-0 z-50 flex items-center justify-center p-4',
						isMobile ? 'bg-black' : 'bg-black/80'
					)}
					onClick={closeModal}
				>
					<div
						className={cn(
							'relative',
							isMobile ? 'w-full h-full' : 'w-full max-w-[520px]'
						)}
						onClick={e => e.stopPropagation()}
					>
						{/* Story viewer */}
						<ReactStories
							stories={selectedStory.items.map(item => ({
								url: item.sourceUrl,
								type: 'image'
							}))}
							width={isMobile ? '100vw' : '100%'}
							height={isMobile ? '100vh' : storyHeight}
							onAllStoriesEnd={closeModal}
							defaultInterval={3000}
							loop
							keyboardNavigation
						/>

						{/* Close button as sibling, always clickable */}
						<button
							onClick={closeModal}
							aria-label="Close"
							className={cn(
								'absolute text-white/70 hover:text-white transition-transform duration-200 ease-out z-50',
								isMobile
									? 'top-4 right-4' // mobile: inside fullscreen
									: '-right-12 top-0 hover:scale-110' // desktop: outside modal
							)}
						>
							<X className="w-8 h-8" />
						</button>
					</div>
				</div>
			)}
		</>
	)
}
