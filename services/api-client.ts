import * as ingredients from './ingredients';
import * as products from './products';

// export type CategoryWithProducts = Awaited<ReturnType<typeof categories.getAll>>;

export const Api = {
	products,
	ingredients,
};
