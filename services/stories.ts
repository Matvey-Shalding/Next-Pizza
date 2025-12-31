import { API_ROUTES } from '@/config/routes'
import { StoryWithItems } from './dto/stories.dto'
import { axiosInstance } from './instance'

export const getAll = async (): Promise<StoryWithItems[]> => {
	const data = (
		await axiosInstance.get<StoryWithItems[]>(API_ROUTES.STORIES, {})
	).data


	return data
}
