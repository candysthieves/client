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

export const sidebarItems: NavigationItem[] = [
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
    activeIcon: <Person />,
    href: '/profile',
    icon: <PersonOutline />,
    id: 'profile',
    label: 'My Profile',
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
    activeIcon: <TrendingUp />,
    href: '/statistics',
    icon: <TrendingUpOutline />,
    id: 'statistics',
    label: 'Statistics',
  },
  {
    activeIcon: <Bookmark />,
    href: '/favorites',
    icon: <BookmarkOutline />,
    id: 'favorites',
    label: 'Favorites',
  },
]
