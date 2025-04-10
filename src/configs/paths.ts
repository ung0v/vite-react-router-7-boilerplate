export const paths = {
  home: {
    path: '/',
    getHref: () => '/',
  },

  auth: {
    register: {
      path: '/auth/register',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/register${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
    login: {
      path: '/auth/login',
      getHref: (redirectTo?: string | null | undefined) =>
        `/auth/login${redirectTo ? `?redirectTo=${encodeURIComponent(redirectTo)}` : ''}`,
    },
  },

  app: {
    root: {
      path: '/app',
      getHref: () => '/app',
    },
    dashboard: {
      path: '/app/dashboard',
      getHref: () => '/app/dashboard',
    },
    playground: {
      path: '/app/playground',
      getHref: () => '/app/playground',
    },
    settings: {
      path: '/app/settings',
      getHref: () => '/app/settings',

      profile: {
        path: '/app/settings/profile',
        getHref: () => '/app/settings/profile',
      },
      account: {
        path: '/app/settings/account',
        getHref: () => '/app/settings/account',
      },
      apperance: {
        path: '/app/settings/apperance',
        getHref: () => '/app/settings/apperance',
      },
      notifications: {
        path: '/app/settings/notifications',
        getHref: () => '/app/settings/notifications',
      },
      display: {
        path: '/app/settings/display',
        getHref: () => '/app/settings/display',
      },
    },
  },
} as const
