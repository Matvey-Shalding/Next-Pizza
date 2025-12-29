import { CircleUser, User } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useState } from 'react'
import { Button } from '../ui/button'
import { AuthModal } from './modals/auth/auth-modal'

interface Props {
	onClickSignIn?: () => void
	className?: string
}

export const ProfileButton: React.FC<Props> = ({
	className,
	onClickSignIn
}) => {
	const { data: session } = useSession()

	console.log(session)

	const [open, setOpen] = useState(false)

	return (
		<div className={className}>
			{!session ? (
				<Button
					onClick={() => setOpen(true)}
					variant="outline"
					className="flex items-center gap-1"
				>
					<User size={16} />
					<AuthModal
						open={open}
						onClose={() => setOpen(false)}
					/>
					Sign in
				</Button>
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
