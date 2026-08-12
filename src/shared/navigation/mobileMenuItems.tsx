import {
  Bookmark,
  BookmarkOutline,
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
  TrendingUp,
  TrendingUpOutline,
} from '@candy.thieves/ui-kit-lumos'
import { ReactNode } from 'react'

type NavigationItem = {
  id: string
  label: string
  href: string
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
    href: '/create',
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
