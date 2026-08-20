import type { Metadata } from 'next'
import { LinearProgress } from '@candy.thieves/ui-kit-lumos'
import '@candy.thieves/ui-kit-lumos/dist/index.css'
import '../styles/index.scss'
import { ReactNode } from 'react'
import { ToastContainer } from '@/components'
import { AppHeader } from '@/components/AppHeader'
import { QueryProviders } from '@/providers'

export const metadata: Metadata = {
  title: 'Client',
  description: 'Client application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body>
        <QueryProviders>
          <AppHeader />
          <LinearProgress size={'sm'} />
          {/*<AuthProvider>*/}
          <ToastContainer />
          {children}
        </QueryProviders>
        {/*</AuthProvider>*/}
      </body>
    </html>
  )
}

// // на любой клиентской странице получить user и проверить authorized
// добавить useAuth и защиту маршрутов
// 'use client'
//
// import { useContext } from 'react'
// import { AuthContext } from '@/app/providers/AuthProvider'
//
// export default function ProfilePage() {
//   const { user, isLoading } = useContext(AuthContext)
//
//   if (isLoading) {
//     return <div>Loading...</div>
//   }
//
//   if (!user) {
//     return <div>Not authorized</div>
//   }
//
//   return <div>Hello, {user.username}</div>
// }
