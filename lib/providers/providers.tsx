'use client';

import { QueryProvider } from './query-provider';
import { SessionProvider } from 'next-auth/react';
import { GlobalLoading } from '@/components/global-loading';
import { Toaster } from 'sonner';
import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <QueryProvider>
          {children}
          <GlobalLoading />
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
