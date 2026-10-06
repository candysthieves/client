'use client'

import { Button } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useEffect } from 'react'
import { UniversalLottie } from '@/components/UniversalLottie'
import s from './ProfileClient.module.scss'

type ProfileErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function ProfileError({ error, reset }: ProfileErrorProps) {
  useEffect(() => {
    console.error('Profile error:', error)
  }, [error])

  return (
    <section className={s.error} role={'alert'}>
      <UniversalLottie animationName={'went-wrong'} className={s.animationWrapper} />

      <div className={s.actions}>
        <Button onClick={reset} variant={'primary'}>
          Try again
        </Button>
        <Button as={Link} href={'/'} variant={'secondary'}>
          Go to home
        </Button>
      </div>
    </section>
  )
}
