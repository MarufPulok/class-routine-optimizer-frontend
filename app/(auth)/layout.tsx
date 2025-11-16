import { ReactNode } from 'react';
import { ModeToggle } from '@/components/mode-toggle';

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted/20 p-4 relative">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

