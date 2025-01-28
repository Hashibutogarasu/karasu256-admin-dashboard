import {
  IconBrowserCheck,
  IconHelp,
  IconLayoutDashboard,
  IconNotification,
  IconPalette,
  IconSettings,
  IconTool,
  IconUserCog,
  IconSword,
  IconUser,
  IconApps,
  IconWorld,
} from '@tabler/icons-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  navGroups: [
    {
      title: 'General',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: IconLayoutDashboard,
        },
      ],
    },
    {
      'title': 'Wiki',
      items: [
        {
          title: 'Genshin Impact',
          icon: IconUser,
          items: [
            {
              title: 'Characters',
              url: '/wiki/genshin/characters',
              icon: IconUser,
            },
            {
              title: 'Artifacts',
              url: '/wiki/genshin/artifacts',
              icon: IconApps,
            },
            {
              title: 'Weapons',
              url: '/wiki/genshin/weapons',
              icon: IconSword,
            },
            {
              title: 'Countries',
              url: '/wiki/genshin/countries',
              icon: IconWorld,
            },
          ],
        }
      ]
    },
    {
      title: 'Other',
      items: [
        {
          title: 'Settings',
          icon: IconSettings,
          items: [
            {
              title: 'Profile',
              url: '/settings',
              icon: IconUserCog,
            },
            {
              title: 'Account',
              url: '/settings/account',
              icon: IconTool,
            },
            {
              title: 'Appearance',
              url: '/settings/appearance',
              icon: IconPalette,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: IconNotification,
            },
            {
              title: 'Display',
              url: '/settings/display',
              icon: IconBrowserCheck,
            },
            {
              title: 'Developer',
              url: '/settings/developer',
              icon: IconTool,
            }
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: IconHelp,
        },
      ],
    },
  ],
}
