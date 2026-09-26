'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import s from '@/components/ProtectedShell/ProtectedShellContent.module.scss'
import { useAuth } from '@/lib/hooks'

export const ProtectedShellContent = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { isAuthenticated, isLoading, isHydrated } = useAuth()

  const isPublicRoute = pathname === '/'

  useEffect(() => {
    if (isHydrated && !isLoading && !isAuthenticated && !isPublicRoute) {
      router.replace('/')
    }
  }, [isAuthenticated, isHydrated, isLoading, isPublicRoute, router])

  if (!isHydrated || isLoading || (!isAuthenticated && !isPublicRoute)) {
    return <div>Loading....</div> // change Loading... later
  }

  return <main className={s.content}>{children}</main>
}
