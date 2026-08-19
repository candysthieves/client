'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import Link from 'next/link'
import s from './page.module.scss'

export default function RecoveryLinkExpiredPage() {
  return (
    <main className={s.container}>
      <Typography
        variant={'h1'}
        color={'var(--color-text-primary)'}
        align={'center'}
        mt={'2.2rem'}
        mb={'1.25rem'}
      >
        Email verification link expired
      </Typography>

      <Typography
        variant={'subtitle1'}
        color={'white'}
        align={'center'}
        mx={'auto'}
        className={s.caption}
      >
        Looks like the recovery link has expired. Not to worry, we can send the link again
      </Typography>

      <div className={s.button}>
        <Button as={Link} href={'/forgot-password'} fullWidth>
          Resend link
        </Button>
      </div>

      <Image
        className={s.image}
        src={'/auth/verification-expired.svg'}
        width={473}
        height={352}
        alt={''}
        aria-hidden
        loading={'eager'}
      />
    </main>
  )
}
