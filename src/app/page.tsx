import Link from 'next/link'
import { ClientButton } from '@/components'
import s from './page.module.css'
import { TestToasts } from './TestToasts'

export default function Home() {
  return (
    <main className={s.container}>
      <h1 className={s.title}>Welcome to LumosApp</h1>
      <Link href={'/sign-up'}>
        <ClientButton>Sign up</ClientButton>
      </Link>
      <TestToasts />
    </main>
  )
}
