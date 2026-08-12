import type { Metadata } from 'next'
import '@candy.thieves/ui-kit-lumos/dist/index.css'
import '../styles/index.scss'
import { Header } from '@/components/Header'

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
        <Header />
        {children}
      </body>
    </html>
  )
}
