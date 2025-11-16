'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import authService from '@/lib/services/auth.service';
import { LoginRequestDto, RegisterRequestDto } from '@/lib/dtos/auth.req.dto';

export default function useAuthAction() {
  const { data: session } = useSession();

  const signinMutation = useMutation({
    mutationFn: async (data: LoginRequestDto) => {
      const res = await signIn('credentials', {
        redirect: false,
        callbackUrl: '/dashboard',
        username: data.username,
        password: data.password,
      });

      if (!res?.ok) {
        throw new Error(res?.error || 'Invalid credentials');
      }

      return res;
    },
  });

  const signupMutation = useMutation({
    mutationFn: async (data: RegisterRequestDto) => {
      const res = await authService.register(data);
      // After successful registration, automatically sign in
      await signIn('credentials', {
        redirect: false,
        callbackUrl: '/dashboard',
        username: data.username,
        password: data.password,
      });
      return res;
    },
  });

  const signoutMutation = useMutation({
    mutationFn: async () => {
      // Get refresh token from session before logging out
      const refreshToken = session?.tokens?.refresh;
      
      // Try to logout from backend using refresh token, but don't fail if token is invalid
      if (refreshToken) {
        try {
          await authService.logout(refreshToken);
        } catch (error) {
          // Token might be invalid/expired, continue with NextAuth signOut anyway
          console.warn('Backend logout failed, continuing with session cleanup:', error);
        }
      }
      
      // Always sign out from NextAuth session
      await signOut({
        callbackUrl: '/login',
      });
    },
  });

  return {
    signinMutation,
    signupMutation,
    signoutMutation,
  };
}

