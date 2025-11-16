'use client';

import { signIn, signOut } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import authService from '@/lib/services/auth.service';
import { LoginRequest, RegisterRequest } from '@/lib/types/auth';

export default function useAuthAction() {
  const signinMutation = useMutation({
    mutationFn: async (data: LoginRequest) => {
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
    mutationFn: async (data: RegisterRequest) => {
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
      // Try to logout from backend, but don't fail if token is invalid
      try {
        await authService.logout();
      } catch (error) {
        // Token might be invalid/expired, continue with NextAuth signOut anyway
        console.warn('Backend logout failed, continuing with session cleanup:', error);
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

