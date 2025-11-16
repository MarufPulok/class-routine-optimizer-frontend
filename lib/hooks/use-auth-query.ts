'use client';

import { useQuery } from '@tanstack/react-query';
import httpClient from '@/lib/utils/httpClient';
import { APIUrl } from '@/lib/constants/url.config';
import { UserResponse } from '@/lib/types/auth';
import { useSession } from 'next-auth/react';

export function useUser() {
  const { data: session } = useSession();
  
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: async (): Promise<UserResponse> => {
      const res = await httpClient.get<UserResponse>(APIUrl.auth.profile());
      return res.data;
    },
    retry: 1,
    retryDelay: 1000,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    enabled: !!session, // Only fetch if user is authenticated
  });
}
