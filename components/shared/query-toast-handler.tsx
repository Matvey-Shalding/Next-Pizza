'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import toast from 'react-hot-toast'

export function QueryToastHandler() {
	const searchParams = useSearchParams()
	const router = useRouter()

	useEffect(() => {
		if (searchParams.has('paid')) {
			toast.success('Order successfully paid!')
			const id = setTimeout(() => router.push('/'), 500)
			return () => clearTimeout(id)
		}

		if (searchParams.has('signOut')) {
			toast.success('You have successfully signed out!')
			const id = setTimeout(() => router.push('/'), 500)
			return () => clearTimeout(id)
		}

		if (searchParams.has('updateProfile')) {
			toast.success('You have successfully updated your profile!')
			const id = setTimeout(() => router.push('/'), 500)
			return () => clearTimeout(id)
		}
	}, [searchParams, router])

	return null
}
