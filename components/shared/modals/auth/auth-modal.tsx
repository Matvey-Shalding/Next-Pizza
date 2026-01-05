'use client'

import { Button } from '@/components/ui'
import { AnimatePresence, motion } from 'framer-motion'
import { signIn } from 'next-auth/react'
import React from 'react'
import toast from 'react-hot-toast'
import { LoginForm } from './forms/log-in-form'
import { SignUpForm } from './forms/sign-up-form'

interface Props {
	open: boolean
	onClose: () => void
}

export const AuthModal: React.FC<Props> = ({ open, onClose }) => {
	const [type, setType] = React.useState<'login' | 'register'>('login')
	const onSwitchType = () =>
		setType(t => (t === 'login' ? 'register' : 'login'))

	// Lock body scroll while open
	React.useEffect(() => {
		document.body.style.overflow = open ? 'hidden' : 'unset'
		return () => {
			document.body.style.overflow = 'unset'
		}
	}, [open])

	const onSignIn = async (provider: 'github' | 'google') => {
		try {
			await signIn(provider, {
				redirect: false
			})

			toast.success('You have successfully signed in')
		} catch (error) {
			toast.error('Failed to sign in')
		}
	}

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					onClick={e => {
						if (e.target === e.currentTarget) onClose()
					}}
					className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
					role="dialog"
					aria-modal="true"
				>
					<motion.div
						initial={{ opacity: 0, y: -20 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -20 }}
						transition={{ duration: 0.3, ease: 'easeOut' }}
						onClick={e => e.stopPropagation()}
						className="w-[450px] bg-white rounded-xl px-9 py-8 flex flex-col gap-y-5"
					>
						{/* Smooth height transition for content */}
						<motion.div
							key={type}
							initial={{ opacity: 0, y: 10 }}
							animate={{ opacity: 1, y: 0 }}
							exit={{ opacity: 0, y: -10 }}
							transition={{ duration: 0.25 }}
							layout
							className="flex flex-col gap-y-5"
						>
							{type === 'login' ? (
								<LoginForm onClose={onClose} />
							) : (
								<SignUpForm onClose={onClose} />
							)}

							<hr />

							<div className="flex gap-2">
								<Button
									variant="secondary"
									onClick={() => onSignIn('github')}
									type="button"
									className="gap-2 h-12 p-2 flex-1"
								>
									<img
										className="w-6 h-6"
										src="https://github.githubassets.com/favicons/favicon.svg"
										alt="GitHub"
										loading="lazy"
									/>
									GitHub
								</Button>

								<Button
									variant="secondary"
									onClick={() => onSignIn('google')}
									type="button"
									className="gap-2 h-12 p-2 flex-1"
								>
									<img
										className="w-6 h-6"
										src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
										alt="Google"
										loading="lazy"
									/>
									Google
								</Button>
							</div>

							<Button
								variant="outline"
								onClick={onSwitchType}
								type="button"
								className="h-12"
							>
								{type !== 'login' ? 'Sign in' : 'Sign up'}
							</Button>
						</motion.div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
