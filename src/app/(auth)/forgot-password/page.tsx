'use client'

import { Button, clsx, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'
import { FormRecaptcha } from '@/components/FormRecaptcha'
import { passwordRecoverySchema, type PasswordRecoveryRequest } from '@/features/auth/model'
import s from './page.module.scss'

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordRecoveryRequest>({
    mode: 'onSubmit',
    resolver: zodResolver(passwordRecoverySchema),
    defaultValues: {
      email: '',
      recaptchaToken: '',
    },
  })

  const onSubmit = (data: PasswordRecoveryRequest) => {
    // On a "user not found" response, call setError('email', { message: "User with this email doesn't exist" })
    // and setIsSent(false) instead of setIsSent(true).
    setIsSent(true)
  }

  return (
    <div className={s.container}>
      <div className={s.card}>
        <Typography variant={'h1'} align={'center'} mb={'1.5rem'}>
          Forgot Password
        </Typography>

        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <div>
            <FormInput
              control={control}
              name={'email'}
              type={'email'}
              placeholder={'Epam@epam.com'}
              label={'Email'}
            />

            <Typography
              variant={'body2'}
              color={'var(--color-light-900)'}
              className={clsx(s.hint, errors.email && s.hintWithError)}
            >
              Enter your email address and we will send you further instructions
            </Typography>

            {isSent && (
              <Typography
                variant={'body2'}
                color={'var(--color-light-100)'}
                className={s.sentMessage}
              >
                The link has been sent by email.
                <br />
                If you don&apos;t receive an email send link again
              </Typography>
            )}
          </div>

          <Button type={'submit'} fullWidth>
            {isSent ? 'Send Link Again' : 'Send Link'}
          </Button>

          <div className={s.backLink}>
            <Button as={Link} href={'/sign-in'} variant={'text'}>
              Back to Sign In
            </Button>
          </div>

          {!isSent && (
            <FormRecaptcha
              control={control}
              name={'recaptchaToken'}
              className={s.recaptcha}
              siteKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
            />
          )}
        </form>
      </div>
    </div>
  )
}
