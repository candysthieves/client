'use client'

import type { ReactNode } from 'react'
import { clsx, LogOut, Menu, Sidebar } from '@candy.thieves/ui-kit-lumos'
import { usePathname } from 'next/navigation'
import { isAuthenticated } from '@/shared/config/isAuthenticated'
import { mobileMenuItems } from '@/shared/navigation/mobileMenuItems'
import { sidebarItems } from '@/shared/navigation/sidebarItems'
import s from './ProtectedShell.module.scss'

export const ProtectedShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const activeSidebarId = sidebarItems.find(item => item.href === pathname)?.id ?? ''
  const activeMobileMenuId = mobileMenuItems.find(item => item.href === pathname)?.id ?? ''

  const content = (
    <main className={clsx(s.content, { [s.contentAuthenticated]: isAuthenticated })}>
      {children}
    </main>
  )

  return (
    <div className={s.layout}>
      {isAuthenticated ? (
        <>
          <div className={s.container}>
            <aside className={s.sidebar}>
              <Sidebar
                activeId={activeSidebarId}
                items={sidebarItems}
                logOutIcon={<LogOut />}
                onLogout={() => undefined}
              />
            </aside>

            {content}
          </div>

          <div className={s.bottomNavigation}>
            <Menu activeId={activeMobileMenuId} items={mobileMenuItems} />
          </div>
        </>
      ) : (
        content
      )}
    </div>
  )
}
