import type { Metadata } from 'next'
import { LinearProgress } from '@candy.thieves/ui-kit-lumos'
import '@candy.thieves/ui-kit-lumos/dist/index.css'
import '../styles/index.scss'
import { AppHeader } from '@/components/AppHeader'
import s from './layout.module.scss'

export const metadata: Metadata = {
  title: 'Client',
  description: 'Client application',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang={'en'}>
      <body>
        <AppHeader />
        <LinearProgress className={s.progress} size={'sm'} />
        {children}
      </body>
    </html>
  )
}
