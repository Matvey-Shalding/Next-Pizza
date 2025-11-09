import { Api } from '@/services/api-client';
import { useEffect, useState } from 'react';

interface Ingredient {
	text: string;
	value: string;
}

interface ReturnProps {
	ingredients: Ingredient[];
	loading:boolean
}

export const useFilterIngredients = (): ReturnProps => {
	const [ingredients, setIngredients] = useState<Ingredient[]>([]);

	const [loading,setLoading] = useState(true);

	useEffect(() => {
		const fetchIngredients = async () => {
			try {
				setLoading(true)
				const ingredients = await Api.ingredients.getAll();

				const formattedIngredients = ingredients.map(ingredient => ({
					text: ingredient.name,
					value: String(ingredient.id),
				}));

				setIngredients(formattedIngredients);
			} catch (e) {
				console.error(e)
			} finally {
				setLoading(false)
			}
		};

		fetchIngredients();
	}, []);

	return { ingredients,loading };
};
