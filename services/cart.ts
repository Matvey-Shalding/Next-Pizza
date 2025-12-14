import { API_ROUTES } from '@/config/routes';
import { axiosInstance } from './instance';
import { CartDTO } from './dto/cart.dto';



export const getCart = async (): Promise<CartDTO> => {
  const { data } = await axiosInstance.get<CartDTO>(API_ROUTES.CART, {});

  return data;
};