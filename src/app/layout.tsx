import type { Metadata } from 'next'
import { LinearProgress } from '@candy.thieves/ui-kit-lumos'
import '@candy.thieves/ui-kit-lumos/dist/index.css'
import '../styles/index.scss'
import { ReactNode } from 'react'
import { ClientLayout, ToastContainer } from '@/components'
import { AppHeader } from '@/components/AppHeader'
import { QueryProviders } from '@/providers'
import s from '../components/ClientLayout/layout.module.scss'

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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  )
}
