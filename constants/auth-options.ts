import prisma from '@/lib/prisma'
import { compare } from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'

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
				// If there're no credentials, return

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
					id: user.id.toString() // token.sub,
				}
			}
		})
	],
	callbacks: {
		async jwt({ token, user, account }) {
			if (user) {
				// this function ensures the id in useSession or getServerSession is the id of the user, not provider
				const dbUser = await prisma.user.findUnique({
					where: { email: user.email! }
				})
				if (dbUser) {
					token.sub = dbUser.id.toString()
				}
			}
			return token
		},

		// Optional: enrich session with user ID
		async session({ session, token }) {
			if (session.user) {
				session.user.id = token.sub as string
			}
			return session
		},
		async signIn({ user, account }) {
			try {
				//Sign in logic only applies to providers
				if (account?.provider === 'credentials') {
					return true
				}

				// Deny access when user don't have an email

				if (!user.email) {
					return false
				}

				// find user by either email or provider id

				const databaseUser = await prisma.user.findFirst({
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

				// if user exist we add provider fields to db

				if (databaseUser) {
					await prisma.user.update({
						where: {
							email: user.email
						},
						data: {
							provider: account?.provider,
							providerId: account?.providerAccountId
						}
					})

					return true
				} else {
					// if user doesn't exist we create it

					await prisma.user.create({
						data: {
							email: user.email,
							provider: account?.provider,
							providerId: account?.providerAccountId,
							fullName: user.name ?? 'User',
							password: crypto.randomUUID()
						}
					})

					return true
				}
			} catch (error) {
				return false
			}
		}
	},
	session: {
		strategy: 'jwt'
	},
	secret: process.env.NEXTAUTH_SECRET
}
