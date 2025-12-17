import { API_ROUTES } from '@/config/routes';
import { CartDTO, CreateCartItemValues } from './dto/cart.dto';
import { axiosInstance } from './instance';

export const getCart = async (): Promise<CartDTO> => {
	return (await axiosInstance.get<CartDTO>(API_ROUTES.CART, {})).data;
};

export const updateQuantity = async (id: number, quantity: number): Promise<CartDTO> => {
	return (await axiosInstance.patch<CartDTO>(`${API_ROUTES.CART}/${id}`, { quantity })).data;
};

export const removeItem = async (id: number): Promise<CartDTO> => {
	return (await axiosInstance.delete<CartDTO>(`${API_ROUTES.CART}/${id}`)).data;
};

export const addItem = async (values: CreateCartItemValues): Promise<CartDTO> => {
	return (await axiosInstance.post<CartDTO>(API_ROUTES.CART, values)).data;
};
