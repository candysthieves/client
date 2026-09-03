'use client'

import { clsx, LogOut, Sidebar } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { LogoutModal } from '@/components'
import { useAuth } from '@/lib/hooks/useAuth'
import { sidebarItems } from '@/shared/navigation/sidebarItems'
import s from './ProtectedShell.module.scss'

export const ProtectedShell = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()
  const router = useRouter()
  const { user, isAuthenticated, isLoading } = useAuth()
  const activeSidebarId = sidebarItems.find(item => item.href === pathname)?.id ?? ''
  const [logoutOpen, setLogoutOpen] = useState(false)
  const isPublicProfileRoute = pathname.startsWith('/profile/')

  // useEffect(() => {
  //   // if (!isLoading && !isAuthenticated && pathname !== '/') {
  //   if (!isLoading && !isAuthenticated) {
  //     // router.replace('/sign-in')
  //     router.replace('/')
  //   }
  //   // }, [isAuthenticated, isLoading, router])
  // }, [isAuthenticated, isLoading, router, pathname])

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

      // Остальная логика редиректа для защищенных страниц
      if (!isAuthenticated && !isPublicProfileRoute) {
        router.replace('/')
      }
    }
  }, [isAuthenticated, isLoading, isPublicProfileRoute, router, pathname, user?.id])

  // if (!isAuthenticated) { // avoid blinking on load - check if needed when isLoading will work
  //   return null
  // }

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
        </div>
      ) : (
        content
      )}
    </div>
  )
}

// 'use client'
//
// import { clsx, LogOut, Sidebar } from '@candy.thieves/ui-kit-lumos'
// import { usePathname, useRouter } from 'next/navigation'
// import { ReactNode, useEffect, useState } from 'react'
// import { LogoutModal } from '@/components'
// import { sidebarItems } from '@/shared/navigation/sidebarItems'
// import s from './ProtectedShell.module.scss'
//
// export const isAuthenticated = false
// export const isLoading = false
//
// export const ProtectedShell = ({ children }: { children: ReactNode }) => {
//   const pathname = usePathname()
//   const router = useRouter()
//   // const { isAuthenticated, isLoading } = useAuth()
//   const activeSidebarId = sidebarItems.find(item => item.href === pathname)?.id ?? ''
//   const [logoutOpen, setLogoutOpen] = useState(false)
//
//   useEffect(() => {
//     // if (!isLoading && !isAuthenticated && pathname !== '/') {
//     if (!isLoading && !isAuthenticated) {
//       // router.replace('/sign-in')
//       router.replace('/')
//     }
//   }, [isAuthenticated, isLoading, router, pathname])
//
//   // if (!isAuthenticated) { // avoid blinking on load - check if needed when isLoading will work
//   //   return null
//   // }
//
//   if (isLoading) {
//     return <div>Loading...</div>
//   }
//
//   return (
//     <div className={s.layout}>
//
//
//        {isAuthenticated && (
//       <div className={clsx(s.container, s.containerAuthenticated)}>
//          <aside className={s.sidebar}>
//         <Sidebar
//               activeId={activeSidebarId}
//                items={sidebarItems}
//                logOutIcon={<LogOut />}
//               onLogout={() => setLogoutOpen(true)}
//              />
//            </aside>
//
//           <LogoutModal open={logoutOpen} onClose={() => setLogoutOpen(false)} />
//
//         <main className={s.content}>{children}</main>
//          </div>
//        )}
//     </div>
//   )
// }
