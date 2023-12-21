import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const authOptions = {
  pages: {
    signIn: '/pages/index',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { type: 'password' }, // You can remove the label if not needed
      },

      authorize: async (credentials: any, req) => {
        if (credentials.email && credentials.password) {
          const { email, password } = credentials
          const response = await fetch('http://localhost:3333/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' },
          })

          const data = await response.json()

          if (data) {
            return { ...data, jwt: data.jwt }
          } else {
            return null
          }
        }
        return null // Handle invalid credentials
      },
    }),
    // ...add more providers here
  ],
  secret: process.env.SECRET,
}

export default NextAuth(authOptions)
