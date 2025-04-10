import { Outlet } from 'react-router'

import { Bell, Monitor, Palette, User, Wrench } from 'lucide-react'

import { Separator } from '@/components/ui/separator'
import { paths } from '@/configs/paths'

import SidebarNav from './components/SideBarNav'

export default function SettingsPage() {
  return (
    <>
      <div className="space-y-0.5">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          Settings
        </h1>
        <p className="text-muted-foreground">
          Manage your account settings and set e-mail preferences.
        </p>
      </div>
      <Separator className="my-4 lg:my-6" />
      <div className="flex flex-1 flex-col space-y-2 overflow-hidden md:space-y-2 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="top-0 lg:sticky lg:w-1/5">
          <SidebarNav items={sidebarNavItems} />
        </aside>
        <div className="flex w-full overflow-y-hidden p-1 pr-4">
          <Outlet />
        </div>
      </div>
    </>
  )
}

const sidebarNavItems = [
  {
    title: 'Profile',
    icon: <User size={18} />,
    href: paths.app.settings.profile.getHref(),
  },
  {
    title: 'Account',
    icon: <Wrench size={18} />,
    href: paths.app.settings.account.getHref(),
  },
  {
    title: 'Appearance',
    icon: <Palette size={18} />,
    href: paths.app.settings.apperance.getHref(),
  },
  {
    title: 'Notifications',
    icon: <Bell size={18} />,
    href: paths.app.settings.notifications.getHref(),
  },
  {
    title: 'Display',
    icon: <Monitor size={18} />,
    href: paths.app.settings.display.getHref(),
  },
]
