'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import s from './DeletedPosts.module.scss'

export const DeletedPosts = () => {
  return (
    <section className={s.container} aria-label={'Recently deleted posts'}>
      <Typography variant={'h2'} color={'var(--color-light-100)'} align={'center'}>
        No recently deleted posts
      </Typography>

      <Typography variant={'body1'} color={'var(--color-light-900)'} align={'center'}>
        Deleted posts will appear here.
      </Typography>
    </section>
  )
}
