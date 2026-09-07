import type { ReactNode } from 'react'
import {
  Home,
  HomeOutline,
  MessageCircle,
  MessageCircleOutline,
  Person,
  PersonOutline,
  PlusSquare,
  PlusSquareOutline,
  Search,
  SearchOutline,
} from '@candy.thieves/ui-kit-lumos'

type NavigationItem = {
  id: string
  label: string
  href?: ((userId: string) => string) | string
  icon: ReactNode
  activeIcon: ReactNode
}

export const mobileMenuItems: NavigationItem[] = [
  {
    activeIcon: <Home />,
    href: '/feed',
    icon: <HomeOutline />,
    id: 'feed',
    label: 'Feed',
  },
  {
    activeIcon: <PlusSquare />,
    href: (userId: string) => `/profile/${userId}?action=create`,
    icon: <PlusSquareOutline />,
    id: 'create',
    label: 'Create',
  },

  {
    activeIcon: <MessageCircle />,
    href: '/messenger',
    icon: <MessageCircleOutline />,
    id: 'messenger',
    label: 'Messenger',
  },
  {
    activeIcon: <Search />,
    href: '/search',
    icon: <SearchOutline />,
    id: 'search',
    label: 'Search',
  },
  {
    activeIcon: <Person />,
    href: '/profile',
    icon: <PersonOutline />,
    id: 'profile',
    label: 'My Profile',
  },
]
