import { Button } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'

export default function Home() {
  return (
    <main>
      <h1>Welcome to LumosApp</h1>
      <Link href={'/sign-up'} style={{ marginRight: 16 }}>
        <Button>Sign up</Button>
      </Link>
      <Link href={'/sign-in'}>
        <Button>Sign in</Button>
      </Link>
    </main>
  )
}
