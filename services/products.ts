import { API_ROUTES } from '@/config/routes'
import { Product } from '@prisma/client'
import { axiosInstance } from './instance'

export const search = async (query: string): Promise<Product[]> => {
	const { data } = await axiosInstance.get<Product[]>(
		API_ROUTES.PRODUCTS_SEARCH,
		{
			params: {
				query
			}
		}
	)

	return data
}

export const getDefault = async (): Promise<Product[]> => {
	const { data } = await axiosInstance.get<Product[]>(
		API_ROUTES.PRODUCTS_DEFAULT,
		{}
	)

	return data
}
