import { API_ROUTES } from '@/config/routes'
import { Ingredient } from '@prisma/client'
import { axiosInstance } from './instance'

export const getAll = async (): Promise<Ingredient[]> => {
	const { data } = await axiosInstance.get<Ingredient[]>(
		API_ROUTES.INGREDIENTS,
		{}
	)

	return data
}
