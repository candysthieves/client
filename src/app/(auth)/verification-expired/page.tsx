'use client'

import { Button, FormInput, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { ApiError, resendConfirmationEmail, ResendConfirmationEmailDto } from '@/lib/api'
import { isErrorResponse, mapRegistrationError } from '@/lib/utils'
import s from './page.module.scss'

type FormValues = {
  email: string
}

export default function VerificationExpiredPage() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    setError,
    handleSubmit,
    formState: { isValid },
  } = useForm<ResendConfirmationEmailDto>({
    mode: 'all',
  })

  const onSubmit = async (data: FormValues) => {
    setIsLoading(true)
    try {
      await resendConfirmationEmail(data)
      // show Alert snackbar message "Verification email has been sent"
    } catch (error) {
      if (error instanceof ApiError && isErrorResponse(error.data)) {
        mapRegistrationError(error, setError)
        // show Alert snackbar message "Verification email error: ..."
        return
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className={s.container}>
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
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          control={control}
          name={'email'}
          type={'email'}
          placeholder={'example@mail.com'}
          label={'Enter'}
        />
        <div className={s.submit}>
          {/* TODO: "disabled" state for the loading period — when the POST request with form data is sending, change isLoading from using useState */}
          <Button type={'submit'} fullWidth disabled={!isValid || isLoading}>
            {isLoading ? 'Sending...' : 'Resend verification link'}
          </Button>
        </div>
      </form>

      <Image
        className={s.image}
        src={'/auth/verification-expired.svg'}
        width={473}
        height={352}
        alt={''}
        aria-hidden
      />
    </div>
  )
}

// email-verification-expired
// verification-expired
