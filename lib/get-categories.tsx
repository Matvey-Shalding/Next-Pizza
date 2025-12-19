import prisma from './prisma';

export interface SearchParams {
	sizes?: string;
	pizzaTypes?: string;
	ingredients?: string;
	priceFrom?: string;
	priceTo?: string;
}

const DEFAULT_MIN_PRICE = 0;
const DEFAULT_MAX_PRICE = 1000;

export const getCategories = async (params: SearchParams) => {
	// Parse & sanitize size filter
	const mappedSizes = params.sizes
		? params.sizes
				.split(',')
				.map(Number)
				.filter(n => !isNaN(n))
		: [];

	// Parse & sanitize pizzaType filter
	const mappedPizzaTypes = params.pizzaTypes
		? params.pizzaTypes
				.split(',')
				.map(Number)
				.filter(n => !isNaN(n))
		: [];

	// Parse & sanitize ingredients filter
	const mappedIngredients = params.ingredients
		? params.ingredients
				.split(',')
				.map(Number)
				.filter(n => !isNaN(n))
		: [];

	// Parse price (safe)
	const minPrice =
		params.priceFrom && !isNaN(Number(params.priceFrom)) ? Number(params.priceFrom) : DEFAULT_MIN_PRICE;
	const maxPrice =
		params.priceTo && !isNaN(Number(params.priceTo)) ? Number(params.priceTo) : DEFAULT_MAX_PRICE;

	return await prisma.category.findMany({
		include: {
			products: {
				where: {
					// Ingredient filter (on product level)
					...(mappedIngredients.length > 0 && {
						ingredients: {
							some: {
								id: {
									in: mappedIngredients,
								},
							},
						},
					}),
					// Item-based filters (on product relation)
					items: {
						some: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
							...(mappedSizes.length > 0 && {
								size: { in: mappedSizes },
							}),
							...(mappedPizzaTypes.length > 0 && {
								pizzaType: { in: mappedPizzaTypes },
							}),
						},
					},
				},
				include: {
					ingredients: true,
					items: {
						where: {
							price: {
								gte: minPrice,
								lte: maxPrice,
							},
							...(mappedSizes.length > 0 && {
								size: { in: mappedSizes },
							}),
							...(mappedPizzaTypes.length > 0 && {
								pizzaType: { in: mappedPizzaTypes },
							}),
						},
						orderBy: {
							price: 'asc',
						},
					},
				},
			},
		},
	});
};
