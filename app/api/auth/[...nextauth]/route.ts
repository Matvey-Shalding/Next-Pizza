import prisma from '@/lib/prisma'
import { compare } from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import NextAuth from 'next-auth/next'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'

export const authOptions: NextAuthOptions = {
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID ?? '',
			clientSecret: process.env.GITHUB_SECRET ?? ''
		}),
		CredentialsProvider({
			name: 'Credentials',
			credentials: {
				email: { label: 'Email', type: 'email' },
				password: { label: 'Password', type: 'password' }
			},
			async authorize(credentials) {

				// If there're on credentials, return

				if (!credentials?.email || !credentials?.password) {
					return null
				}

				// Find the user

				const user = await prisma.user.findUnique({
					where: { email: credentials.email }
				})

				// User not found or has no password (e.g., OAuth-only)
				
				if (!user || !user.password) {
					return null
				}

				// Optional: reject unverified users
				if (!user.verified) {
					return null
				}

				// Compare passwords

				const isPasswordValid = await compare(
					credentials.password,
					user.password
				)

				if (!isPasswordValid) {
					return null
				}

				// Return data which will be stored in jwt token
				return {
					id: user.id.toString(), // token.sub
				}
			}
		})
	],
	callbacks: {
		// Optional: enrich session with user ID
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub as string
			}
			return session
		}
	},
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
