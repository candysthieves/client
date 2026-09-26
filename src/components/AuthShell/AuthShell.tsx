'use client'

import { Suspense } from 'react'
import { AppHeader } from '@/components/AppHeader'
import { GlobalLoader } from '@/components/GlobalLoader/GlobalLoader'
import { useAuth } from '@/lib/hooks'
import s from './AuthShell.module.scss'
import { AuthShellContent } from './AuthShellContent'

export function AuthShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, isHydrated } = useAuth()

  if (!isHydrated || isLoading) return <div>Loading...</div>

  return (
    <>
      <div className={s.headerWrapper}>
        <AppHeader />
        <GlobalLoader />
      </div>

      <div className={s.layout}>
        {isAuthenticated ? (
          <Suspense fallback={null}>
            <AuthShellContent>{children}</AuthShellContent>
          </Suspense>
        ) : (
          children
        )}
      </div>
    </>
  )
}
