import type { Metadata } from 'next'
import '@candy.thieves/ui-kit-lumos/dist/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/index.scss'
import { ReactNode } from 'react'
import { AuthShell, ClientLayout } from '@/components'

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
        <ClientLayout>
          <AuthShell>{children}</AuthShell>
        </ClientLayout>
      </body>
    </html>
  )
}
