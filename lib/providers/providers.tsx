'use client';

import { QueryProvider } from './query-provider';
import { SessionProvider } from 'next-auth/react';
import { GlobalLoading } from '@/components/global-loading';
import { Toaster } from 'sonner';
import { ReactNode } from 'react';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <QueryProvider>
        {children}
        <GlobalLoading />
        <Toaster position="top-right" richColors />
      </QueryProvider>
    </SessionProvider>
  );
}
