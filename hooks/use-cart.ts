'use client'

import { useCartStore } from '@/store/cart'
import { useEffect } from 'react'

export const useCart = () => {
	const state = useCartStore()

	useEffect(() => {
		state.fetchCartItems()
	}, [])

	const onClickCountButton = (
		id: number,
		type: 'plus' | 'minus',
		quantity: number
	) => {
		const newQuantity = type === 'plus' ? quantity + 1 : quantity - 1
		state.updateItemQuantity(id, newQuantity)
	}

	return {...state, onClickCountButton}
}
