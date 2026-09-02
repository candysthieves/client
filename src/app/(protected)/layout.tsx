import { ProtectedShell } from '@/components'

export default function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ProtectedShell>{children}</ProtectedShell>
}
