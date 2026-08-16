'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import Image from 'next/image'
import { useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ToastError } from '@/components'
import { FormInput } from '@/components/FormInput'
import { ApiError, resendConfirmationEmail } from '@/lib/api'
import { ResendConfirmationEmailRequest, resendConfirmationEmailSchema } from '@/lib/model'
import { isErrorResponse, mapRegistrationValidationError } from '@/lib/utils'
import { mapConfirmationEmailDomainError } from '@/lib/utils/mapConfirmationEmailDomainError'
import s from './page.module.scss'

export default function VerificationExpiredPage() {
  const [isLoading, setIsLoading] = useState(false)

  const {
    control,
    setError,
    handleSubmit,
    formState: { isValid },
  } = useForm<ResendConfirmationEmailRequest>({
    mode: 'all',
    resolver: zodResolver(resendConfirmationEmailSchema),
  })

  const onSubmit: SubmitHandler<ResendConfirmationEmailRequest> = async data => {
    setIsLoading(true)
    try {
      await resendConfirmationEmail(data)
      // show Alert snackbar message "Verification email has been sent"
    } catch (error) {
      if (error instanceof ApiError && isErrorResponse(error.data)) {
        const isValidationError = mapRegistrationValidationError(error, setError)
        const isDomainError = mapConfirmationEmailDomainError(error, setError)

        if (isValidationError) {
          ToastError({
            title: 'Validation Error',
            messages: error.data.errorsMessages, // решим оставлять ли при добавлении интернационализации
            // messages: VALIDATION_ERROR_COMMON_MESSAGE, // решим оставлять ли при добавлении интернационализации
          })
          return
        } else if (isDomainError) {
          // Show domain errors
          ToastError({
            title: 'Domain Error',
            messages: error.data.errorsMessages, // решим оставлять ли при добавлении интернационализации
            // messages: VALIDATION_ERROR_COMMON_MESSAGE, // решим оставлять ли при добавлении интернационализации
          })
        }
        return
      } else {
        throw error // Проброс в глобальный error handler всех остальных ошибок не связанных с Validation / Domain errors - позже будет доработка логики
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
        loading={'eager'}
      />
    </div>
  )
}

// email-verification-expired
// verification-expired
