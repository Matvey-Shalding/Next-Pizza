import { API_ROUTES } from '@/config/routes';
import { CartDTO } from './dto/cart.dto';
import { axiosInstance } from './instance';

export const getCart = async (): Promise<CartDTO> => {
	const { data } = await axiosInstance.get<CartDTO>(API_ROUTES.CART, {});

	return data;
};

export const updateQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
	const { data } = await axiosInstance.patch<CartDTO>(`${API_ROUTES.CART}/${id}`, { quantity });

	return data;
};

export const removeItem = async (id: number): Promise<CartDTO> => {
	const { data } = await axiosInstance.delete<CartDTO>(`${API_ROUTES.CART}/${id}`);

	return data;
};
