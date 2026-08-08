'use client'

import { Button, clsx, Typography } from '@candy.thieves/ui-kit-lumos'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ApiError, ResendConfirmationEmailDto } from '@/lib/api'
import { resendConfirmationEmail } from '@/lib/api/auth'
import { isErrorResponse, mapRegistrationError } from '@/lib/utils'
import s from './page.module.scss'

export default function EmailVerificationExpiredPage() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    setError,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ResendConfirmationEmailDto>({
    mode: 'all',
  })

  const onSubmit: SubmitHandler<ResendConfirmationEmailDto> = async data => {
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
    <>
      <h1>Email verification link expired</h1>
      <p>Looks like the verification link has expired. Not to worry, we can send the link again</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: 'flex', flexDirection: 'column', width: '30rem', color: '#000' }}
      >
        <Typography variant={'caption1'} color={'var(--color-light-100)'}>
          {'Email'}
        </Typography>

        {/* TODO: error={!!errors?.email} - add this in the future to input an delete clsx className condition*/}
        <input
          type={'email'}
          id={'emailSignUp'}
          className={clsx(s.email, !!errors?.email && s.errorInput)}
          {...register('email')}
        />
        {errors?.email && (
          <Typography variant={'body2'} color={'var(--color-danger-500)'}>
            {errors.email.message}
          </Typography>
        )}

        {/* TODO: Also add a "disabled" state for the loading period — when the POST request with form data is sending,
            change isLoading from using useState
        */}
        <Button type={'submit'} variant={'primary'} disabled={!isValid}>
          {isLoading ? 'Sending...' : 'Resend verification link'}
        </Button>
      </form>
    </>
  )
}
