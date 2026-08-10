'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import Link from 'next/link'
import s from './page.module.scss'

export default function VerificationSuccessPage() {
  return (
    <div className={s.container}>
      <Typography
        variant={'h1'}
        color={"var(--color-text-primary)"}
        align={'center'}
        mt={'2.2rem'}
        mb={'1.25rem'}
      >
        Congratulations!
      </Typography>

      <Typography variant={'subtitle1'} color={'white'} align={'center'}>
        Your email has been confirmed
      </Typography>

      <div className={s.button}>
        <Button as={Link} href={'#'} fullWidth>
          Sign in
        </Button>
      </div>

      <Image
        className={s.image}
        src={'/auth/verification-success.svg'}
        width={432}
        height={300}
        alt={''}
        aria-hidden
      />
    </div>
  )
}
