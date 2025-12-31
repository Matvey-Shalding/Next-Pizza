// A file used to generate mock data

import prisma from '@/lib/prisma'
import { hashSync } from 'bcrypt'
import { categories, ingredients, products } from './constants'
import { Prisma } from './generated/prisma/client'

const randomDecimalNumber = (min: number, max: number) => {
	return Math.floor(Math.random() * (max - min) * 10 + min * 10) / 10
}

const generateProductItem = ({
	productId,
	pizzaType,
	size
}: {
	productId: number
	pizzaType?: 1 | 2
	size?: 20 | 30 | 40
}) => {
	return {
		productId,
		price: randomDecimalNumber(190, 600),
		pizzaType,
		size
	} as Prisma.ProductItemUncheckedCreateInput
}

// Generate data
async function up() {
	await prisma.user.createMany({
		data: [
			{
				fullName: 'User Test',
				email: 'user@test.ru',
				password: hashSync('111111', 10),
				role: 'USER'
			},
			{
				fullName: 'Admin Admin',
				email: 'admin@test.ru',
				password: hashSync('111111', 10),
				role: 'ADMIN'
			}
		]
	})

	await prisma.category.createMany({
		data: categories
	})

	await prisma.ingredient.createMany({
		data: ingredients
	})

	await prisma.product.createMany({
		data: products
	})

	const pizza1 = await prisma.product.create({
		data: {
			name: 'Pepperoni Fresh',
			imageUrl:
				'https://media.dodostatic.net/image/r:233x233/11EE7D61304FAF5A98A6958F2BB2D260.webp',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(0, 5)
			}
		}
	})

	const pizza2 = await prisma.product.create({
		data: {
			name: 'Cheesy',
			imageUrl:
				'https://media.dodostatic.net/image/r:233x233/11EE7D610CF7E265B7C72BE5AE757CA7.webp',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(5, 10)
			}
		}
	})

	const pizza3 = await prisma.product.create({
		data: {
			name: 'Chorizo Fresh',
			imageUrl:
				'https://media.dodostatic.net/image/r:584x584/11EE7D61706D472F9A5D71EB94149304.webp',
			categoryId: 1,
			ingredients: {
				connect: ingredients.slice(10, 40)
			}
		}
	})

	await prisma.productItem.createMany({
		data: [
			generateProductItem({ productId: pizza1.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza1.id, pizzaType: 2, size: 40 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 1, size: 40 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 20 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza2.id, pizzaType: 2, size: 40 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 1, size: 20 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 30 }),
			generateProductItem({ productId: pizza3.id, pizzaType: 2, size: 40 }),
			generateProductItem({ productId: 1 }),
			generateProductItem({ productId: 2 }),
			generateProductItem({ productId: 3 }),
			generateProductItem({ productId: 4 }),
			generateProductItem({ productId: 5 }),
			generateProductItem({ productId: 6 }),
			generateProductItem({ productId: 7 }),
			generateProductItem({ productId: 8 }),
			generateProductItem({ productId: 9 }),
			generateProductItem({ productId: 10 }),
			generateProductItem({ productId: 11 }),
			generateProductItem({ productId: 12 }),
			generateProductItem({ productId: 13 }),
			generateProductItem({ productId: 14 }),
			generateProductItem({ productId: 15 }),
			generateProductItem({ productId: 16 }),
			generateProductItem({ productId: 17 })
		]
	})

	// Create cart and cart items
	await prisma.cart.createMany({
		data: [
			{
				userId: 1,
				totalAmount: 1000,
				token: '123'
			},
			{
				userId: 2,
				totalAmount: 1500,
				token: '123'
			}
		]
	})

	await prisma.cartItem.create({
		data: {
			quantity: 2,
			cartId: 1,
			productItemId: 1,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
			},
			ingredientsKey: '1,2,3,4'
		}
	})

	await prisma.cartItem.create({
		data: {
			quantity: 2,
			cartId: 1,
			productItemId: 2,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
			},
			ingredientsKey: '1,2,3,4'
		}
	})

	await prisma.cartItem.create({
		data: {
			quantity: 2,
			cartId: 1,
			productItemId: 3,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
			},
			ingredientsKey: '1,2,3,4'
		}
	})

	await prisma.cartItem.create({
		data: {
			quantity: 2,
			cartId: 1,
			productItemId: 1,
			ingredients: {
				connect: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]
			},
			ingredientsKey: '1,2,3,4'
		}
	})

	// === STORIES SECTION (UPDATED) ===
	const previewImages = [
		'https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496',
		'https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640',
		'https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020',
		'https://cdn.inappstory.ru/story/7oc/5nf/ipn/oznceu2ywv82tdlnpwriyrq/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=38903958',
		'https://cdn.inappstory.ru/story/q0t/flg/0ph/xt67uw7kgqe9bag7spwkkyw/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=2941222737',
		'https://cdn.inappstory.ru/story/lza/rsp/2gc/xrar8zdspl4saq4uajmso38/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=4207486284'
	]

	const baseStoryItems = [
		'https://cdn.inappstory.ru/file/dd/yj/sx/oqx9feuljibke3mknab7ilb35t.webp?k=IgAAAAAAAAAE',
		'https://cdn.inappstory.ru/file/jv/sb/fh/io7c5zarojdm7eus0trn7czdet.webp?k=IgAAAAAAAAAE',
		'https://cdn.inappstory.ru/file/ts/p9/vq/zktyxdxnjqbzufonxd8ffk44cb.webp?k=IgAAAAAAAAAE',
		'https://cdn.inappstory.ru/file/ur/uq/le/9ufzwtpdjeekidqq04alfnxvu2.webp?k=IgAAAAAAAAAE',
		'https://cdn.inappstory.ru/file/sy/vl/c7/uyqzmdojadcbw7o0a35ojxlcul.webp?k=IgAAAAAAAAAE'
	]

	// Make 6 items per story by duplicating the first
	const storyItems6 = [...baseStoryItems, baseStoryItems[0]]

	// Create 12 stories
	const storiesData = Array.from({ length: 12 }, (_, i) => ({
		previewImageUrl: previewImages[i % previewImages.length]
	}))

	await prisma.story.createMany({
		data: storiesData
	})

	// Create 6 story items per story (12 stories × 6 = 72 items)
	const storyItemsData = []
	for (let storyId = 1; storyId <= 12; storyId++) {
		for (const sourceUrl of storyItems6) {
			storyItemsData.push({ storyId, sourceUrl })
		}
	}

	await prisma.storyItem.createMany({
		data: storyItemsData
	})
}

// Clear data
async function down() {
	await prisma.$executeRaw`TRUNCATE TABLE "StoryItem" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Story" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Cart" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "CartItem" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Ingredient" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "Product" RESTART IDENTITY CASCADE`
	await prisma.$executeRaw`TRUNCATE TABLE "ProductItem" RESTART IDENTITY CASCADE`
}

async function main() {
	try {
		await down()
		await up()
	} catch (e) {
		console.log(e)
	}
}

main()
	.then(async () => {
		await prisma.$disconnect()
	})
	.catch(async e => {
		console.error(e)
		await prisma.$disconnect()
		process.exit(1)
	})
