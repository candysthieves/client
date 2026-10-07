'use client'

import { Button } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useEffect } from 'react'
import { UniversalLottie } from '@/components/UniversalLottie'
import s from './not-found-error.module.scss'

type GlobalErrorProps = {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error)
  }, [error])

  return (
    <section className={s.error} role={'alert'}>
      <UniversalLottie animationName={'went-wrong'} className={s.animationWrapperError} />

      <div className={s.actions}>
        <Button as={Link} href={'/'} variant={'secondary'}>
          Go to home
        </Button>
      </div>
    </section>
  )
}
