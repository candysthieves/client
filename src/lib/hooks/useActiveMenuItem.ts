import { SidebarItem } from '@candy.thieves/ui-kit-lumos'
import { usePathname, useSearchParams } from 'next/navigation'
import { mobileMenuItems } from '@/shared/navigation/mobileMenuItems'
import { sidebarItems } from '@/shared/navigation/sidebarItems'

export function useActiveMenuItem(userId?: string) {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Select link to highlight in Sidebar and Menu
  const getActiveId = (items: SidebarItem[]) => {
    const action = searchParams.get('action')

    const exactMatch = items.find(item => {
      if (typeof item.href === 'function' && userId) {
        return item.href(userId) === pathname
      }
      return item.href === pathname
    })
    if (exactMatch) return exactMatch.id

    // Profile with params and query params in URI
    if (pathname.startsWith('/profile/')) {
      if (action === 'create') {
        return 'create'
      }
      // Current user`s profile
      if (userId && pathname === `/profile/${userId}`) {
        return 'profile'
      }
      return 'profile'
    }

    return ''
  }

  return {
    sidebarId: getActiveId(sidebarItems),
    mobileMenuId: getActiveId(mobileMenuItems),
  }
}
