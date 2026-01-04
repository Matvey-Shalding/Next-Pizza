'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export function PaymentToastHandler() {
	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		if (searchParams.has('paid')) {
			toast.success('Order successfully paid!')
			const id = setTimeout(() => router.push('/'), 500)
			return () => clearTimeout(id)
		}
	}, [searchParams, router])

	return null
}
