'use client'

import { clsx, LogOut, Menu, Sidebar } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { LogoutModal } from '@/components'
import s from '@/components/ProtectedShell/ProtectedShellContent.module.scss'
import { useActiveMenuItem, useAuth } from '@/lib/hooks'
import { mobileMenuItems } from '@/shared/navigation/mobileMenuItems'
import { isMobileMenuHiddenByPath } from '@/shared/navigation/mobileMenuVisibility'
import { sidebarItems } from '@/shared/navigation/sidebarItems'

export const ProtectedShellContent = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const { sidebarId: activeSidebarId, mobileMenuId: activeMobileMenuId } = useActiveMenuItem(
    user?.id
  )

  const isMobileMenuHidden = isMobileMenuHiddenByPath(pathname)
  const [logoutOpen, setLogoutOpen] = useState(false)
  const isPublicProfileRoute = pathname.startsWith('/profile/')

  useEffect(() => {
    if (!isLoading) {
      // Редирект с /profile на /profile/{userId}
      if (pathname === '/profile') {
        if (isAuthenticated && user?.id) {
          router.replace(`/profile/${user.id}`)
        } else {
          router.replace('/')
        }
        return
      }

      if (!isAuthenticated && !isPublicProfileRoute) {
        router.replace('/')
      }
    }
  }, [isAuthenticated, isLoading, isPublicProfileRoute, router, pathname, user?.id])

  const content =
    !isLoading || isPublicProfileRoute ? (
      <main className={s.content}>{children}</main>
    ) : (
      <div>Loading....</div> // change Loading... later
    )

  const userId = user?.id

  return (
    <div className={s.layout}>
      {isAuthenticated ? (
        <div className={clsx(s.container, s.containerAuthenticated)}>
          <aside className={s.sidebar}>
            <Sidebar
              linkTag={Link}
              userId={userId}
              activeId={activeSidebarId}
              items={sidebarItems}
              logOutIcon={<LogOut />}
              onLogout={() => setLogoutOpen(true)}
            />
          </aside>

          <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />

          {content}

          {!isMobileMenuHidden && (
            <div className={s.bottomNavigation}>
              <Menu
                userId={userId}
                linkTag={Link}
                activeId={activeMobileMenuId}
                items={mobileMenuItems}
              />
            </div>
          )}
        </div>
      ) : (
        content
      )}
    </div>
  )
}

// export const ProtectedShell = ({ children }: { children: ReactNode }) => {
//   return (
//     <Suspense fallback={null}>
//       <ProtectedShellContent>{children}</ProtectedShellContent>
//     </Suspense>
//   )
// }
