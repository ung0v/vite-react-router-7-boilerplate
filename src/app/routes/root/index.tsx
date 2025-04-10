import { Outlet } from 'react-router'

import { PrivateLayout } from '@/components/layouts'

export const ErrorBoundary = () => {
  return <div>Something went wrong!</div>
}

const AppRoot = () => {
  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  )
}

export default AppRoot
