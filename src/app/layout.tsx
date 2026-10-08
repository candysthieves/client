import type { Metadata } from 'next'
import '@candy.thieves/ui-kit-lumos/dist/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/index.scss'
import { ReactNode } from 'react'
import { AuthShell, ClientLayout } from '@/components'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'

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
          <AppSkeleton>
            <AuthShell>{children}</AuthShell>
          </AppSkeleton>
        </ClientLayout>
      </body>
    </html>
  )
}
