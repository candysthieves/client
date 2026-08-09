'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import { useRouter } from 'next/navigation'

export default function CongratulationsPage() {
  const router = useRouter()

  const handleSignIn = () => {
    router.replace('/sign-in')
  }

  return (
    <div style={{ textAlign: 'center', padding: '3.25rem' }}>
      <Typography variant={'h1'} color={'var(--color-light-100)'}>
        Congratulations!
      </Typography>
      <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
        Your email has been confirmed!
      </Typography>
      <Button onClick={handleSignIn}>Sign In</Button>
    </div>
  )
}

// congratulations
// verification-success
