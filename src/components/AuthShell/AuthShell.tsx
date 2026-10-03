'use client'

import { Suspense } from 'react'
import { AppHeader } from '@/components/AppHeader'
import { GlobalLoader } from '@/components/GlobalLoader/GlobalLoader'
import { useAuth } from '@/lib/hooks'
import s from './AuthShell.module.scss'
import { AuthShellContent } from './AuthShellContent'

export function AuthShell({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, isHydrated } = useAuth()

  /**
   * Server cannot read localStorage, so auth state is unknown during SSR and
   * the first client render. Until it is resolved we render children as-is,
   * otherwise the whole page would be replaced by a loading stub and SSR HTML would be lost.
   */
  const isSessionResolved = isHydrated && !isLoading

  return (
    <>
      <div className={s.headerWrapper}>
        {isSessionResolved ? <AppHeader /> : <div className={s.headerPlaceholder} />}
        <GlobalLoader />
      </div>

      <div className={s.layout}>
        {isSessionResolved && isAuthenticated ? (
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
