import prisma from '@/lib/prisma';

export const initCart = async (token: string) => {
  let cart = await prisma.cart.findFirst({ where: { token } });
  
  if(!cart) {
    cart = await prisma.cart.create({ data: { token } });
  }

  return cart
};
