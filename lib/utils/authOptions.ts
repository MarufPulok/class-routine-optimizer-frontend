import authService from '@/lib/services/auth.service';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const { username, password } = credentials;

        try {
          const res = await authService.login({ username, password });
          return {
            id: res.user.id.toString(), // Convert number to string for NextAuth
            username: res.user.username,
            email: res.user.email,
            name: `${res.user.first_name} ${res.user.last_name}`.trim() || res.user.username,
            first_name: res.user.first_name,
            last_name: res.user.last_name,
            date_joined: res.user.date_joined,
            tokens: res.tokens,
          };
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = {
          id: user.id,
          username: (user as any).username,
          email: user.email || '',
          name: user.name || undefined,
          first_name: (user as any).first_name,
          last_name: (user as any).last_name,
          date_joined: (user as any).date_joined,
        };
        token.tokens = (user as any).tokens;
      }
      return token;
    },
    async session({ token, session }) {
      if (token.user) {
        session.user = token.user as any;
      }
      if (token.tokens) {
        session.tokens = token.tokens as any;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    signOut: '/login',
    error: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};

