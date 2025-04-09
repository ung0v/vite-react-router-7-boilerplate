import { PropsWithChildren, useState } from 'react'

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AxiosError } from 'axios'
import { toast } from 'sonner'

import { HTTP_STATUS_CODE, IErrorData, __IS_DEV__ } from '@/constants'

declare module '@tanstack/react-query' {
  interface Register {
    defaultError: AxiosError<IErrorData>
  }
}

export const defaultQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
  queryCache: new QueryCache({
    onError: (error, query) => {
      // Handle for specific error
      if (query?.meta?.errorMessage) {
        toast.error(String(query?.meta?.errorMessage))
      }
      // Handle for interal server error 500
      else if (error.status === HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR) {
        toast.error('Something went wrong.')
      }
    },
  }),
})

export default function QueryProvider({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => defaultQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={__IS_DEV__} />
      {children}
    </QueryClientProvider>
  )
}
