import {
  AudioWaveform,
  Ban,
  Bell,
  Bug,
  Command,
  GalleryVerticalEnd,
  HelpCircle,
  LayoutDashboard,
  Lock,
  Monitor,
  Palette,
  Play,
  Settings,
  Users,
  Wrench,
} from 'lucide-react'

import { paths } from '@/configs/paths'
import { SidebarData } from '@/types/nav'

export const sidebarData: SidebarData = {
  user: {
    name: 'satnaing',
    email: 'satnaingdev@gmail.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Shadcn Admin',
      logo: Command,
      plan: 'Vite + ShadcnUI',
    },
    {
      name: 'Acme Inc',
      logo: GalleryVerticalEnd,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Corp.',
      logo: AudioWaveform,
      plan: 'Startup',
    },
  ],
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/app',
          icon: LayoutDashboard,
        },
        {
          title: 'Playground',
          url: '/app/playground',
          icon: Play,
        },
      ],
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: Lock,
          items: [
            {
              title: 'Sign In',
              url: paths.auth.login.path,
            },
          ],
        },
        {
          title: 'Errors',
          icon: Bug,
          items: [
            {
              title: 'Not Found',
              url: '/404',
              icon: Ban,
            },
          ],
        },
      ],
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Profile',
              url: paths.app.settings.profile.getHref(),
              icon: Users,
            },
            {
              title: 'Account',
              url: paths.app.settings.account.getHref(),
              icon: Wrench,
            },
            {
              title: 'Appearance',
              url: paths.app.settings.apperance.getHref(),
              icon: Palette,
            },
            {
              title: 'Notifications',
              url: paths.app.settings.notifications.getHref(),
              icon: Bell,
            },
            {
              title: 'Display',
              url: paths.app.settings.display.getHref(),
              icon: Monitor,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
