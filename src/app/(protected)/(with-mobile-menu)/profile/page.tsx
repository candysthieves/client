import { ProfilePostTabs } from '@/components'
import s from './page.module.scss'

export default function ProfilePage() {
  return (
    <main className={s.page}>
      <ProfilePostTabs />
    </main>
  )
}
