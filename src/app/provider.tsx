import * as React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'

import { MainErrorFallback } from '@/components/errors/main'
import { Spinner } from '@/components/ui/spinner'
import { Toaster } from '@/components/ui/toaster'
import DialogProvider from '@/contexts/DialogProvider'
import DrawerProvider from '@/contexts/DrawerProvider'
import QueryProvider from '@/contexts/QueryProvider'
import { ThemeProvider } from '@/contexts/ThemeProvider'
import { AuthLoader } from '@/lib/auth'

type AppProviderProps = {
  children: React.ReactNode
}

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex h-screen w-screen items-center justify-center">
          <Spinner size="xl" />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={MainErrorFallback}>
        <ThemeProvider defaultTheme="dark">
          <Toaster />
          <HelmetProvider>
            <QueryProvider>
              <DrawerProvider>
                <DialogProvider>{children}</DialogProvider>
              </DrawerProvider>
            </QueryProvider>
          </HelmetProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.Suspense>
  )
}
