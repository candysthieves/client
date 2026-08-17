'use client'

import type ReCAPTCHA from 'react-google-recaptcha'
import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'
import { FormRecaptcha } from '@/components/FormRecaptcha'
import { ToastError } from '@/components/Toast/Toast'
import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } from '@/constants'
import { ApiError, passwordRecovery } from '@/lib/api'
import { type PasswordRecoveryRequest, passwordRecoverySchema } from '@/lib/model'
import {
  isErrorResponse,
  mapPasswordRecoveryDomainError,
  mapPasswordRecoveryValidationError,
} from '@/lib/utils'
import s from './page.module.scss'

export default function ForgotPasswordPage() {
  const [isSent, setIsSent] = useState(false)
  const [sentEmail, setSentEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const recaptchaRef = useRef<ReCAPTCHA>(null)

  const {
    control,
    handleSubmit,
    setError,
    setValue,
    formState: { isValid, isSubmitting },
  } = useForm<PasswordRecoveryRequest>({
    mode: 'onChange',
    resolver: zodResolver(passwordRecoverySchema),
    defaultValues: {
      email: '',
      recaptchaToken: '',
    },
  })

  const onSubmit: SubmitHandler<PasswordRecoveryRequest> = async data => {
    try {
      await passwordRecovery(data)

      setSentEmail(data.email)
      setIsSent(true)
      setIsModalOpen(true)
    } catch (error) {
      if (error instanceof ApiError && isErrorResponse(error.data)) {
        const isValidationError = mapPasswordRecoveryValidationError(error, setError)
        const isDomainError = mapPasswordRecoveryDomainError(error, setError)

        if (isDomainError) {
          // The recaptcha token backend rejected is now stale; clear it and reset
          // the widget so it must be solved again before the next submit.
          setValue('recaptchaToken', '')
          recaptchaRef.current?.reset()

          ToastError({
            title: 'Domain Error',
            messages: error.data.errorsMessages,
          })
        } else if (isValidationError) {
          ToastError({
            title: 'Validation Error',
            messages: error.data.errorsMessages,
          })
        }
        return
      } else {
        throw error
      }
    }
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  const onClickHandler = () => {
    closeModal()
  }

  return (
    <main className={s.container}>
      <div className={s.card}>
        <Typography variant={'h1'} align={'center'} mb={'1.5rem'}>
          Forgot Password
        </Typography>

        {/* eslint-disable-next-line react-hooks/refs -- recaptchaRef.current is only read inside
        the async onSubmit handler (real submit event), never during render; the linter can't see
        into react-hook-form's handleSubmit to know it doesn't invoke the callback synchronously */}
        <form className={s.form} onSubmit={handleSubmit(onSubmit)} noValidate>
          <div>
            <div className={s.inputBlock}>
              <FormInput
                control={control}
                name={'email'}
                type={'email'}
                placeholder={'Epam@epam.com'}
                label={'Email'}
              />

              <Typography variant={'body2'} color={'var(--color-light-900)'}>
                Enter your email address and we will send you further instructions
              </Typography>
            </div>

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

          <Button type={'submit'} fullWidth disabled={!isValid || isSubmitting}>
            {isSent ? 'Send Link Again' : 'Send Link'}
          </Button>

          <div className={s.backLink}>
            <Button as={Link} href={'/sign-in'} variant={'text'}>
              Back to Sign In
            </Button>
          </div>

          {!isSent && (
            <FormRecaptcha
              ref={recaptchaRef}
              control={control}
              name={'recaptchaToken'}
              className={s.recaptcha}
              siteKey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
            />
          )}
        </form>
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        size={'s'}
        showHeader
        modalTitle={'Email sent'}
        className={s.modal}
      >
        <Typography variant={'body1'} color={'var(--color-light-100)'} mb={'1.5rem'}>
          We have sent a link to confirm your email to {sentEmail}
        </Typography>

        <div className={s.modalActions}>
          <Button onClick={onClickHandler}>OK</Button>
        </div>
      </Modal>
    </main>
  )
}
