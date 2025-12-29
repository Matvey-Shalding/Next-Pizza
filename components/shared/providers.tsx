'use client'

import { SessionProvider } from 'next-auth/react'
import NextTopLoader from 'nextjs-toploader'
import React from 'react'
import { Toaster } from 'react-hot-toast'
interface Props {
	children: React.ReactNode
}
export const Providers: React.FC<Props> = ({ children }) => {
	return (
		<>
			<NextTopLoader />
			<SessionProvider>{children}</SessionProvider>
			<Toaster />
		</>
	)
}
