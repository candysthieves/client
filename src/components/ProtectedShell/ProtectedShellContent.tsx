'use client'

import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import s from '@/components/ProtectedShell/ProtectedShellContent.module.scss'
import { useAuth } from '@/lib/hooks'

export const ProtectedShellContent = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()

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

  if (!isLoading || isPublicProfileRoute) {
    return <main className={s.content}>{children}</main>
  }

  return <div>Loading....</div> // change Loading... later
}
