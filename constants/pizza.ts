export const mapPizzaSize = {
	20: 'Small',
	30: 'Medium',
	40: 'Large',
} as const;

export const mapPizzaType = {
	1: 'Traditional',
	2: 'Thin',
} as const;

// Convert string keys from Object.entries back to numbers
export const pizzaSizes = (Object.entries(mapPizzaSize) as [string, string][]).map(([valueStr, name]) => ({
	name,
	value: Number(valueStr) as keyof typeof mapPizzaSize,
}));

export const pizzaTypes = (Object.entries(mapPizzaType) as [string, string][]).map(([valueStr, name]) => ({
	name,
	value: Number(valueStr) as keyof typeof mapPizzaType,
}));

export type PizzaSize = keyof typeof mapPizzaSize; // 20 | 30 | 40
export type PizzaType = keyof typeof mapPizzaType; // 1 | 2
