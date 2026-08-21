'use client'

import { clsx, LogOut, Sidebar } from '@candy.thieves/ui-kit-lumos'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { LogoutModal } from '@/components'
import { sidebarItems } from '@/shared/navigation/sidebarItems'
import s from './ProtectedShell.module.scss'

export const isAuthenticated = true
export const isLoading = false

export const ProtectedShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  // const { isAuthenticated, isLoading } = useAuth()
  const activeSidebarId = sidebarItems.find(item => item.href === pathname)?.id ?? ''
  const [logoutOpen, setLogoutOpen] = useState(false)

  useEffect(() => {
    // if (!isLoading && !isAuthenticated && pathname !== '/') {
    if (!isLoading && !isAuthenticated) {
      // router.replace('/sign-in')
      router.replace('/')
    }
  }, [isAuthenticated, isLoading, router, pathname])

  // if (!isAuthenticated) { // avoid blinking on load - check if needed when isLoading will work
  //   return null
  // }

  const content = !isLoading ? (
    <main className={s.content}>{children}</main>
  ) : (
    <div>Loading...</div> // change Loading... later
  )

  return (
    <div className={s.layout}>
      {isAuthenticated ? (
        <div className={clsx(s.container, s.containerAuthenticated)}>
          <aside className={s.sidebar}>
            <Sidebar
              activeId={activeSidebarId}
              items={sidebarItems}
              logOutIcon={<LogOut />}
              onLogout={() => setLogoutOpen(true)}
            />
          </aside>

          <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />

          {content}
        </div>
      ) : (
        content
      )}
    </div>
  )
}
