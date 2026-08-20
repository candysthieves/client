import { PublicShell } from '@/components/PublicShell/PublicShell'

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return <PublicShell>{children}</PublicShell>
}
