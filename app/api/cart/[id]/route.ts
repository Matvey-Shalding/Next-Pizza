import { getCartItemPrice } from '@/lib/get-cart-item-price';
import prisma from '@/lib/prisma';
import { updateCartTotalAmount } from '@/lib/update-cart-total-amount';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const idNum = Number(id);
    const { quantity } = (await req.json()) as { quantity: number };
    const token = '123';

    if (!token) {
      return NextResponse.json({ error: 'Cart token not found' }, { status: 400 });
    }

    // 1. Update item
    const cartItem = await prisma.cartItem.update({
      where: { id: idNum },
      data: { quantity },
      include: { cart: true },
    });

    if (!cartItem.cart) {
      throw new Error('CART_NOT_FOUND');
    }

    // 2. Recalculate total
    const result = await updateCartTotalAmount(cartItem.cart.id);

    return NextResponse.json(result);
  } catch (error: any) {
    if (error.code === 'P2025' || error.message?.includes('CART_ITEM_NOT_FOUND')) {
      return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
    }
    if (error.message === 'CART_NOT_FOUND') {
      return NextResponse.json({ error: 'Cart not found' }, { status: 404 });
    }

    console.error('[CART_PATCH] server error', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
	try {
		const { id } = params;
		const idNum = Number(id);
		const token = '123';

		if (!token) {
			return NextResponse.json({ error: 'Cart token not found' }, { status: 400 });
		}

		const cartItem = await prisma.cartItem.findFirst({
			where: { id: idNum },
      include: { cart: true },
		});

		if (!cartItem) {
			return NextResponse.json({ error: 'Cart item not found' }, { status: 404 });
		}

		await prisma.cartItem.delete({ where: { id: idNum } });

		const result = await updateCartTotalAmount(cartItem.cart.id);

    return NextResponse.json(result);
	} catch(e) {
		console.error('[CART_DELETE] server error', e);
		return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
	}
}
