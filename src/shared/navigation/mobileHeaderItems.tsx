import type { ReactNode } from 'react'
import {
  BookmarkOutline,
  LogOutOutline,
  SettingsOutline,
  TrendingUp,
  TrendingUpOutline,
} from '@candy.thieves/ui-kit-lumos'

type NavigationItem = {
  id: string
  label: string
  href?: ((userId: string) => string) | string
  icon: ReactNode
  activeIcon: ReactNode
}

export const mobileHeaderItems: NavigationItem[] = [
  {
    activeIcon: <SettingsOutline />,
    href: '/settings',
    icon: <SettingsOutline />,
    id: 'profile Settings',
    label: 'Profile Settings',
  },
  {
    activeIcon: <TrendingUpOutline />,
    href: '/statistics',
    icon: <TrendingUp />,
    id: 'statistics',
    label: 'Statistics',
  },

  {
    activeIcon: <BookmarkOutline />,
    href: '/favorites',
    icon: <BookmarkOutline />,
    id: 'favorites',
    label: 'Favorites',
  },
  {
    activeIcon: <LogOutOutline />,
    icon: <LogOutOutline />,
    id: 'logOut',
    label: 'Log Out',
  },
]
