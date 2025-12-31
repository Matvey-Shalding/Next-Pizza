'use client'

import { Api } from '@/services/api-client'
import { StoryWithItems } from '@/services/dto/stories.dto'
import { useEffect, useState } from 'react'
import { Skeleton } from '../ui'
import { StoriesCarousel } from './stories-carousel'

interface Props {
	className?: string
}

export const Stories = ({ className }: Props) => {
	const [stories, setStories] = useState<StoryWithItems[]>([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		const loadStories = async () => {
			try {
				const data = await Api.stories.getAll()
				setStories(data)
			} finally {
				setIsLoading(false)
			}
		}
		loadStories()
	}, [])

	if (isLoading) {
		return (
			<div className={className}>
				<div className="flex gap-x-5 py-4">
					{[...Array(6)].map((_, i) => (
						<Skeleton
							key={i}
							className="w-[200px] h-[250px] rounded-md shrink-0"
						/>
					))}
				</div>
			</div>
		)
	}

	return (
		<StoriesCarousel
			stories={stories}
			className={className}
		/>
	)
}
