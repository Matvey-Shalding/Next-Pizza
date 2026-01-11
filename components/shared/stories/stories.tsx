'use client'

import { Skeleton } from '@/components/ui'
import { Api } from '@/services/api-client'
import { StoryWithItems } from '@/services/dto/stories.dto'
import { useEffect, useState } from 'react'
import { StoriesCarousel } from '.'

interface Props {
	className?: string
}

export const Stories = ({ className }: Props) => {
	const [stories, setStories] = useState<StoryWithItems[]>([])
	const [isLoading, setIsLoading] = useState(true)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const loadStories = async () => {
			try {
				const data = await Api.stories.getAll()
				setStories(data)
			} catch (err) {
				setError('Failed to load stories')
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
					{Array.from({ length: 6 }).map((_, i) => (
						<Skeleton
							key={i}
							className="small-laptop:basis-[200px] small-phone:basis-[150px] small-phone:h-[150px] small-laptop:h-[250px] rounded-md shrink-0"
						/>
					))}
				</div>
			</div>
		)
	}

	if (error) {
		return (
			<div className={className}>
				<p className="text-red-500">{error}</p>
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
