import { Button } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import s from './page.module.css'

export default function Home() {
  return (
    <main className={s.container}>
      <h1 className={s.title}>Welcome to LumosApp</h1>
      <Link href={'/sign-up'} style={{ marginRight: 16 }}>
        <Button>Sign up</Button>
      </Link>
      <Link href={'/sign-in'}>
        <Button>Sign in</Button>
      </Link>
    </main>
  )
}
