import {
  IconBrowserCheck,
  IconHelp,
  IconLayoutDashboard,
  IconLockAccess,
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
import { AudioWaveform, Command, GalleryVerticalEnd } from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Karasu',
    email: 'karasu@karasu256.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'Karasu Lab Admin',
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
          url: '/',
          icon: IconLayoutDashboard,
        },
        {
          title: 'Authenicated Apps',
          url: '/apps',
          icon: IconApps,
        }
      ],
    },
    {
      'title': 'Genshin Impact Wiki',
      items: [
        {
          title: 'Characters',
          url: '/characters',
          icon: IconUser,
        },
        {
          title: 'Weapons',
          url: '/weapons',
          icon: IconSword,
        },
        {
          title: 'Artifacts',
          url: '/artifacts',
          icon: IconApps,
        },
        {
          title: 'Countries',
          url: '/countries',
          icon: IconWorld,
        },
      ]
    },
    {
      title: 'Pages',
      items: [
        {
          title: 'Auth',
          icon: IconLockAccess,
          items: [
            {
              title: 'Sign In',
              url: '/sign-in',
            },
            {
              title: 'Sign In (2 Col)',
              url: '/sign-in-2',
            },
            {
              title: 'Sign Up',
              url: '/sign-up',
            },
            {
              title: 'Forgot Password',
              url: '/forgot-password',
            },
            {
              title: 'OTP',
              url: '/otp',
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
