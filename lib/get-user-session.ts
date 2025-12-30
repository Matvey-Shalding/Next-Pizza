import { authOptions } from '@/constants'
import { getServerSession } from 'next-auth'

export const getUserSession = async () => {
	return await getServerSession(authOptions)
}
