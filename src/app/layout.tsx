import type { Metadata, Viewport } from 'next'
import '@candy.thieves/ui-kit-lumos/dist/index.css'
import 'react-loading-skeleton/dist/skeleton.css'
import '../styles/index.scss'
import { ReactNode } from 'react'
import { AuthShell, ClientLayout } from '@/components'
import { AppSkeleton } from '@/components/AppSkeleton/AppSkeleton'
import { APP_NAME } from '@/constants'

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_NAME,
    template: `%s | ${APP_NAME}`,
  },
  description: 'Lumos — your personal space to connect and share',
  icons: {
    icon: [
      {
        url: '/favicons/favicon-light-48.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/favicons/favicon-dark-48.svg',
        type: 'image/svg+xml',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: [
      {
        url: '/favicons/apple-touch-icon.png',
        sizes: '108x108',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    type: 'website',
    siteName: APP_NAME,
    title: APP_NAME,
    description: 'Lumos — your personal space to connect and share.',
  },
  robots: {
    index: false,
    follow: false,
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
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
