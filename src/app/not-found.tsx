import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { RobotAnimation } from '@/components/RobotAnimation'
import s from './not-found.module.scss'

export default function NotFound() {
  return (
    <main className={s.notFoundContainer}>
      <div className={s.notFoundContent}>
        <RobotAnimation className={s.animationWrapper} />

        <Typography variant={'h1'}>Page Not Found</Typography>

        <Typography variant={'body1'} color={'var(--color-light-900)'}>
          Oops! The page you are looking for doesn’t exist or has been moved.
        </Typography>

        <Button as={Link} href={'/'} variant={'outlined'}>
          Back to Home
        </Button>
      </div>
    </main>
  )
}
