import { LOCALES } from '@/constants'

import { SidebarInset, SidebarProvider } from '../ui/sidebar'
import { NavigationLoadingBar } from './LoadingBar'
import PrivateHeader from './PrivateHeader'
import { AppSidebar } from './app-sidebar'

export function PrivateLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <NavigationLoadingBar />
        <PrivateHeader defaultLocale={LOCALES.ENGLISH as LOCALES} />
        <div className="flex flex-1 flex-col gap-4 p-4">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  )
}
