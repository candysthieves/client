'use client'

import type ReCAPTCHA from 'react-google-recaptcha'
import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { type FormEvent, useRef, useState } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'
import { FormRecaptcha } from '@/components/FormRecaptcha'
import { ToastError } from '@/components/Toast/Toast'
import { NEXT_PUBLIC_RECAPTCHA_SITE_KEY } from '@/constants'
import { ApiError } from '@/lib/api'
import { usePasswordRecovery } from '@/lib/auth'
import { type PasswordRecoveryRequest, passwordRecoverySchema } from '@/lib/model'
import {
  isErrorResponse,
  mapPasswordRecoveryDomainError,
  mapPasswordRecoveryValidationError,
} from '@/lib/utils'
import s from './page.module.scss'

export default function ForgotPasswordPage() {
  const [isLinkSent, setIsLinkSent] = useState(false)
  const [sentEmail, setSentEmail] = useState('')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isRecaptchaVisible, setIsRecaptchaVisible] = useState(true)
  const recaptchaRef = useRef<ReCAPTCHA>(null)
  const { mutate: recoverPassword } = usePasswordRecovery()

  const {
    control,
    handleSubmit,
    setError,
    resetField,
    formState: { isValid, isSubmitting, errors },
  } = useForm<PasswordRecoveryRequest>({
    mode: 'onChange',
    resolver: zodResolver(passwordRecoverySchema),
    defaultValues: {
      email: '',
      recaptchaToken: '',
    },
  })

  // Recaptcha tokens are single-use, so the widget must be solved again after every request.
  const resetRecaptcha = () => {
    resetField('recaptchaToken')
    recaptchaRef.current?.reset()
  }

  const onSubmit: SubmitHandler<PasswordRecoveryRequest> = data => {
    recoverPassword(data, {
      onSuccess: () => {
        resetRecaptcha()
        setIsRecaptchaVisible(false)
        setSentEmail(data.email)
        setIsLinkSent(true)
        setIsModalOpen(true)
      },

      onError: error => {
        // Reset before mapping so a server recaptcha error set below is not overwritten.
        resetRecaptcha()

        if (error instanceof ApiError && isErrorResponse(error.data)) {
          const isValidationError = mapPasswordRecoveryValidationError(error, setError)
          const isDomainError = mapPasswordRecoveryDomainError(error, setError)

          if (isDomainError) {
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
        }
        throw error
      },
    })
  }

  // Wrapped so handleSubmit runs in the event handler, not during render (onSubmit touches recaptchaRef).
  const submitForm = (event: FormEvent<HTMLFormElement>) => void handleSubmit(onSubmit)(event)

  const resendLink = () => void handleSubmit(onSubmit)()

  const showRecaptcha = () => {
    setIsRecaptchaVisible(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }

  return (
    <main className={s.container}>
      <div className={s.card}>
        <Typography variant={'h1'} align={'center'} mb={'1.5rem'}>
          Forgot Password
        </Typography>

        <form className={s.form} onSubmit={submitForm} noValidate>
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

            {isLinkSent && (
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

          {isRecaptchaVisible ? (
            <Button type={'submit'} fullWidth disabled={!isValid || isSubmitting}>
              {isLinkSent ? 'Send Link Again' : 'Send Link'}
            </Button>
          ) : (
            <Button
              type={'button'}
              fullWidth
              disabled={Boolean(errors.email)}
              onClick={showRecaptcha}
            >
              Send Link Again
            </Button>
          )}

          <div className={s.backLink}>
            <Button as={Link} href={'/sign-in'} variant={'text'}>
              Back to Sign In
            </Button>
          </div>

          {isRecaptchaVisible && (
            <FormRecaptcha
              ref={recaptchaRef}
              control={control}
              name={'recaptchaToken'}
              className={s.recaptcha}
              siteKey={NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ''}
              onVerify={isLinkSent ? resendLink : undefined}
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
          <Button onClick={closeModal}>OK</Button>
        </div>
      </Modal>
    </main>
  )
}
