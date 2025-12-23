export function createIngredientsKey(ids: number[] | undefined): string {

	if(!ids) return '';

	return Array.from(
		new Set(
			ids
				.map(Number)
				.filter(id => Number.isInteger(id) && id > 0)
		)
	)
		.sort((a, b) => a - b)
		.join(',');
}
