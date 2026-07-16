'use client';

import { SessionProvider } from 'next-auth/react';
import { DatabaseProvider } from './contexts/DatabaseContext';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <DatabaseProvider>
        {children}
      </DatabaseProvider>
    </SessionProvider>
  );
}
