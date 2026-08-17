'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import { FormEvent } from 'react'
import s from './page.module.scss'

export default function ForgotPasswordPage() {
  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <div className={s.pageWrapper}>
      <form className={s.formContainer} onSubmit={onSubmit}>
        <Typography
          variant={'h1'}
          color={'var(--color-text-primary)'}
          align={'center'}
          mb={'1.25rem'}
        >
          Forgot Password
        </Typography>

        <div className={s.fieldsGroup}>
          <Typography variant={'caption1'} color={'var(--color-light-100)'}>
            Email
          </Typography>
          <input type={'email'} placeholder={'Epam@epam.com'} />
        </div>

        <Button type={'submit'} fullWidth>
          Send Link
        </Button>
      </form>
    </div>
  )
}
