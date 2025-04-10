/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from 'react'
import { createBrowserRouter } from 'react-router'
import { RouterProvider } from 'react-router/dom'

import { QueryClient, useQueryClient } from '@tanstack/react-query'

import { paths } from '@/configs/paths'
import { ProtectedRoute } from '@/lib/auth'

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from './routes/root'

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  }
}

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: paths.home.path,
      lazy: () => import('./routes/landing').then(convert(queryClient)),
    },
    {
      path: paths.auth.login.path,
      lazy: () => import('./routes/auth/sign-in').then(convert(queryClient)),
    },
    {
      path: paths.app.root.path,
      element: (
        <ProtectedRoute>
          <AppRoot />
        </ProtectedRoute>
      ),
      // ErrorBoundary: AppRootErrorBoundary,
      children: [
        {
          index: true,
          path: paths.app.root.getHref(),
          lazy: () =>
            import('./routes/root/dashboard').then(convert(queryClient)),
        },
        {
          path: paths.app.dashboard.getHref(),
          lazy: () =>
            import('./routes/root/dashboard').then(convert(queryClient)),
        },
        {
          path: paths.app.playground.getHref(),
          lazy: () =>
            import('./routes/root/playground').then(convert(queryClient)),
        },
        {
          path: paths.app.settings.getHref(),
          lazy: () =>
            import('./routes/root/settings').then(convert(queryClient)),
          children: [
            {
              index: true,
              path: paths.app.settings.profile.getHref(),
              lazy: () =>
                import('./routes/root/settings/profile').then(
                  convert(queryClient),
                ),
            },
            {
              path: paths.app.settings.account.getHref(),
              lazy: () =>
                import('./routes/root/settings/account').then(
                  convert(queryClient),
                ),
            },
            {
              path: paths.app.settings.apperance.getHref(),
              lazy: () =>
                import('./routes/root/settings/appearance').then(
                  convert(queryClient),
                ),
            },
            {
              path: paths.app.settings.notifications.getHref(),
              lazy: () =>
                import('./routes/root/settings/notification').then(
                  convert(queryClient),
                ),
            },
            {
              path: paths.app.settings.display.getHref(),
              lazy: () =>
                import('./routes/root/settings/display').then(
                  convert(queryClient),
                ),
            },
          ],
        },
      ],
    },
    {
      path: '*',
      lazy: () => import('./not-found').then(convert(queryClient)),
    },
  ])

export const AppRouter = () => {
  const queryClient = useQueryClient()
  const router = useMemo(() => createAppRouter(queryClient), [queryClient])

  return <RouterProvider router={router} />
}
