'use client'

import { Api } from '@/services/api-client'
import { Product } from '@prisma/client'
import { useCallback, useEffect, useRef, useState } from 'react'
import { useClickAway, useDebounce } from 'react-use'

export function useSearchProducts() {
	const [defaultProducts, setDefaultProducts] = useState<Product[]>([])
	const [products, setProducts] = useState<Product[]>([])
	const [searchValue, setSearchValue] = useState('')
	const [isFocused, setIsFocused] = useState(false)
	const [loading, setLoading] = useState(true)

	// fetch defaults
	useEffect(() => {
		setLoading(true)
		Api.products
			.getDefault()
			.then(res => {
				setDefaultProducts(res)
				setProducts(res)
			})
			.finally(() => setLoading(false))
	}, [])

	// sync defaults when search is empty
	useEffect(() => {
		if (!searchValue) {
			setProducts(defaultProducts)
		}
	}, [defaultProducts, searchValue])

	const reset = useCallback(() => {
		setIsFocused(false)
		setSearchValue('')
		setProducts(defaultProducts)
		setLoading(false)
	}, [defaultProducts])

	const ref = useRef<HTMLDivElement | null>(null)
	useClickAway(ref, reset)

	// debounce search
	useDebounce(
		async () => {
			const q = searchValue.trim()
			if (q.length === 0) {
				setProducts(defaultProducts)
				return
			}
			setLoading(true)
			try {
				const found = await Api.products.search(q)
				setProducts(found)
			} finally {
				setLoading(false)
			}
		},
		250,
		[searchValue, defaultProducts]
	)

	return {
		ref,
		products,
		searchValue,
		setSearchValue,
		isFocused,
		setIsFocused,
		loading,
		reset
	}
}
