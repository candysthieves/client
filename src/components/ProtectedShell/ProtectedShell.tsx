'use client'

import type { ReactNode } from 'react'
import { clsx, LogOut, Sidebar } from '@candy.thieves/ui-kit-lumos'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { LogoutModal } from '@/components'
import { isAuthenticated } from '@/shared/config/isAuthenticated'
import { sidebarItems } from '@/shared/navigation/sidebarItems'
import s from './ProtectedShell.module.scss'

export const ProtectedShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const activeSidebarId = sidebarItems.find(item => item.href === pathname)?.id ?? ''
  const [logoutOpen, setLogoutOpen] = useState(false)

  const content = <main className={s.content}>{children}</main>

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
