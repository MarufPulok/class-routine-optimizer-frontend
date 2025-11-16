import type { Metadata } from 'next';
import './globals.css';
import { Providers } from '@/lib/providers/providers';

export const metadata: Metadata = {
  title: 'Class Routine Optimizer',
  description: 'Class Routine Optimizer',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
