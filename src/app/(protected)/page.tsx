'use client'

import { Button } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { LogoutModal } from '@/components'
import s from './page.module.css'

export default function Home() {
  return (
    <main className={s.container}>
      <h1 className={s.title}>Welcome to LumosApp</h1>
      <Link href={'/sign-up'} style={{ marginRight: 16 }}>
        <Button>Sign up</Button>
      </Link>
      <Link href={'/sign-in'} style={{ marginRight: 16 }}>
        <Button>Sign in</Button>
      </Link>
      <LogoutModal
        trigger={onClick => (
          <Button variant={'secondary'} onClick={onClick}>
            Log out
          </Button>
        )}
      />
    </main>
  )
}
