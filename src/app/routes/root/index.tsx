import { Outlet } from 'react-router'

import { PrivateLayout } from '@/components/layouts'

export const ErrorBoundary = (error) => {
  console.log(error)
  return <div>Something went wrong!22</div>
}

const AppRoot = () => {
  return (
    <PrivateLayout>
      <Outlet />
    </PrivateLayout>
  )
}

export default AppRoot
