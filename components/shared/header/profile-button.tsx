'use client'

import { Button } from '@/components/ui'
import { CircleUser, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { AuthModal } from '../modals'

interface Props {
	onClickSignIn?: () => void
	className?: string
}

export const ProfileButton: React.FC<Props> = ({
	className,
	onClickSignIn
}) => {
	const { data: session, status } = useSession()
	const [open, setOpen] = useState(false)

	if (status === 'loading') {
		return (
			<Button
				className="min-w-25"
				loading
			/>
		)
	}

	return (
		<div className={className}>
			{!session ? (
				<>
					<Button
						onClick={() => setOpen(true)}
						variant="outline"
						className="flex items-center gap-1"
					>
						<User size={16} />
						Sign in
					</Button>

					{/* Modal rendered alongside, not inside the button */}
					<AuthModal
						open={open}
						onClose={() => setOpen(false)}
					/>
				</>
			) : (
				<Link href="/profile">
					<Button
						variant="secondary"
						className="flex items-center gap-2"
					>
						<CircleUser size={18} />
						Profile
					</Button>
				</Link>
			)}
		</div>
	)
}
