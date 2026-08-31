import type { Metadata } from 'next'
import '@candy.thieves/ui-kit-lumos/dist/index.css'
import '../styles/index.scss'
import { ReactNode } from 'react'
import { ClientLayout } from '@/components'

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
