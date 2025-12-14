import { API_ROUTES } from '@/config/routes';
import { axiosInstance } from './instance';
import { Ingredient } from '@/prisma/generated/prisma';

export const getAll = async (): Promise<Ingredient[]> => {
	const { data } = await axiosInstance.get<Ingredient[]>(API_ROUTES.INGREDIENTS, {});

	return data;
};
