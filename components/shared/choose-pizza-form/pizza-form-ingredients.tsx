import { Ingredient } from '@/prisma/generated/prisma';
import { IngredientItem } from '..';
import { cn } from '@/lib/utils';

interface Props {
	ingredients: Ingredient[];
	selectedIds: Set<number>;
	onToggle: (id: number) => void;
}

export const PizzaFormIngredients = ({ ingredients, selectedIds, onToggle }: Props) => {
	return (
		<div className='flex flex-col gap-y-2'>
			<span className='font-semibold text-xl text-black'>Add to taste</span>
			<div className={cn('bg-gray-50 rounded-md -mx-4 py-4 px-4 grid place-content-center', {
				'-mx-4': false
			})}>
				<div className='flex flex-wrap gap-3'>
					{ingredients.map(ingredient => (
						<IngredientItem
							key={ingredient.id}
							name={ingredient.name}
							price={ingredient.price}
							imageUrl={ingredient.imageUrl}
							onClick={() => onToggle(ingredient.id)}
							active={selectedIds.has(ingredient.id)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};
