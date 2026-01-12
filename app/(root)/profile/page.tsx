import { ProfileForm } from '@/components/shared/profile-form'
import { getUserSession } from '@/lib/get-user-session'
import prisma from '@/lib/prisma'
import { redirect } from 'next/navigation'
interface Props {
	className?: string
}
export default async function ProfilePage({ className }: Props) {
	const session = await getUserSession()


	if (!session?.user) {
		redirect('/unauthorized')
	}

	const user = await prisma.user.findFirst({
		where: {
			OR: [{ id: +session.user.id }, { email: session.user.email }]
		}
	})

	if (!user) {
		redirect('/unauthorized')
	}

	return <ProfileForm user={user} />
}
