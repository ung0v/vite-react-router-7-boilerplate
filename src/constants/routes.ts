/* eslint-disable @typescript-eslint/no-unused-vars */
export const API_ROUTES = {
  AUTH: {
    REFRESH: '/auth/refresh',
    SIGN_IN: '/auth/sign-in',
  },
} as const

export const PAGE_ROUTES = {
  PUBLIC: {
    SIGN_IN: '/sign-in',
  },
  PRIVATE: {
    HOME: '/',
  },
} as const

// Get the types of values for the PUBLIC and PRIVATE properties
type PublicRoutes = typeof PAGE_ROUTES.PUBLIC
type PrivateRoutes = typeof PAGE_ROUTES.PRIVATE

export type AllRoutes = PublicRoutes & PrivateRoutes

type NestedValueOf<T> = T extends object
  ? { [K in keyof T]: NestedValueOf<T[K]> }[keyof T]
  : T

export type API_ROUTE_TYPE = NestedValueOf<typeof API_ROUTES>

export type PAGE_ROUTER_TYPE =
  (typeof PAGE_ROUTES)['PRIVATE'][keyof (typeof PAGE_ROUTES)['PRIVATE']]

type ExtractRouteParams<T extends string> =
  T extends `${infer Start}:${infer Param}/${infer Rest}`
    ? { [K in Param | keyof ExtractRouteParams<Rest>]: string | number }
    : T extends `${infer Start}:${infer Param}`
      ? { [K in Param]: string | number }
      : Record<string, never>

export type RouteParams<T extends PAGE_ROUTER_TYPE | API_ROUTE_TYPE> =
  ExtractRouteParams<T>

export const ALL_ROUTES: AllRoutes = (() => {
  return Object.values(PAGE_ROUTES).reduce((prev, next) => {
    return { ...prev, ...next }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  }, {} as any)
})()
