'use client'

import type { ReactNode } from 'react'
import { Menu } from '@candy.thieves/ui-kit-lumos'
import { usePathname } from 'next/navigation'
import { mobileMenuItems } from '@/shared/navigation/mobileMenuItems'
import s from './layout.module.scss'

export default function WithMobileMenuLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname()

  const activeMobileMenuId = mobileMenuItems.find(item => item.href === pathname)?.id ?? ''

  return (
    <div className={s.container}>
      {children}

      <div className={s.bottomNavigation}>
        <Menu activeId={activeMobileMenuId} items={mobileMenuItems} />
      </div>
    </div>
  )
}
