import authService from "@/lib/services/auth.service";
import { TokenResponse } from "@/lib/types/auth";
import type { User } from "next-auth";
import { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null;
        }

        const { username, password } = credentials;

        try {
          const res = await authService.login({ username, password });
          const fullName =
            res.user.first_name && res.user.last_name
              ? `${res.user.first_name} ${res.user.last_name}`.trim()
              : res.user.first_name || res.user.last_name || res.user.username;

          return {
            id: res.user.id.toString(), // Convert number to string for NextAuth
            username: res.user.username,
            email: res.user.email,
            name: fullName,
            first_name: res.user.first_name,
            last_name: res.user.last_name,
            date_joined: res.user.date_joined,
            tokens: res.tokens,
          };
        } catch {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Initial sign in
      if (user) {
        const extendedUser = user as User & { tokens?: TokenResponse };
        token.user = {
          id: user.id,
          username: extendedUser.username,
          email: user.email || "",
          name: user.name || undefined,
          first_name: extendedUser.first_name,
          last_name: extendedUser.last_name,
          date_joined: extendedUser.date_joined,
        };
        token.tokens = extendedUser.tokens;
        return token;
      }

      // Check if token needs refresh
      const tokens = token.tokens as TokenResponse | undefined;
      if (!tokens?.refresh) {
        return token;
      }

      const now = Math.floor(Date.now() / 1000); // Current time in seconds
      const accessExpiresAt = tokens.access_expires_at;
      const refreshExpiresAt = tokens.refresh_expires_at;

      // Check if refresh token is expired
      if (refreshExpiresAt && refreshExpiresAt < now) {
        // Refresh token expired, force re-authentication by returning empty token
        return {} as JWT;
      }

      // Check if access token is expired or about to expire (within 5 minutes)
      const fiveMinutesFromNow = now + 5 * 60;
      if (!accessExpiresAt || accessExpiresAt < fiveMinutesFromNow) {
        try {
          // Refresh the token
          const newTokens = await authService.refreshToken(tokens.refresh);

          // Update tokens in token object
          token.tokens = {
            ...tokens,
            ...newTokens,
            // If refresh token wasn't rotated, keep the old one
            refresh: newTokens.refresh || tokens.refresh,
            refresh_expires_at:
              newTokens.refresh_expires_at || tokens.refresh_expires_at,
          };
        } catch (error) {
          // Refresh failed, force re-authentication by returning empty token
          console.error("Token refresh failed:", error);
          return {} as JWT;
        }
      }

      return token;
    },
    async session({ token, session }) {
      if (token.user) {
        session.user = token.user as User;
      }
      if (token.tokens) {
        session.tokens = token.tokens;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
