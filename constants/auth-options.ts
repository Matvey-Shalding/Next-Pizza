import prisma from '@/lib/prisma'
import { compare } from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

//https://next-pizza-l6i6fecr4-matvey-shaldings-projects.vercel.app
//https://next-pizza-l6i6fecr4-matvey-shaldings-projects.vercel.app/api/auth/callback/google

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID ?? '',
			clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ''
		}),
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
				if (!credentials?.email || !credentials?.password) {
					return null
				}

				const user = await prisma.user.findUnique({
					where: { email: credentials.email }
				})

				if (!user || !user.password) {
					return null
				}

				const isPasswordValid = await compare(
					credentials.password,
					user.password
				)
				if (!isPasswordValid) {
					return null
				}

				// Return DB user ID so jwt callback can use it
				return { id: user.id.toString(), email: user.email }
			}
		})
	],

	callbacks: {
		async signIn({ user, account }) {
			try {
				if (account?.provider === 'credentials') {
					// Credentials provider already returns DB user id
					return true
				}

				if (!user.email) {
					return false
				}

				// Find or create DB user for OAuth
				let dbUser = await prisma.user.findFirst({
					where: {
						OR: [
							{ email: user.email },
							{
								provider: account?.provider,
								providerId: account?.providerAccountId
							}
						]
					}
				})

				if (dbUser) {
					await prisma.user.update({
						where: { id: dbUser.id },
						data: {
							provider: account?.provider,
							providerId: account?.providerAccountId
						}
					})
				} else {
					dbUser = await prisma.user.create({
						data: {
							email: user.email,
							provider: account?.provider,
							providerId: account?.providerAccountId,
							fullName: user.name ?? 'User',
							password: crypto.randomUUID()
						}
					})
				}

				// Attach DB user id to the user object so jwt can pick it up
				;(user as any).dbId = dbUser.id.toString()

				return true
			} catch (error) {
				console.error('signIn error', error)
				return false
			}
		},

		async jwt({ token, user }) {
			// For credentials provider, user.id is already DB id
			if (user?.id) {
				token.sub = user.id.toString()
			}

			// For OAuth providers, we attached dbId in signIn
			if ((user as any)?.dbId) {
				token.sub = (user as any).dbId
			}

			return token
		},

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
