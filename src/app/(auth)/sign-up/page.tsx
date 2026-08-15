'use client'

import { Button, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { type SubmitHandler, useForm, useWatch } from 'react-hook-form'
import { ToastError } from '@/components'
import { FormCheckbox } from '@/components/FormCheckbox'
import { FormInput } from '@/components/FormInput'
import { FormPasswordInput } from '@/components/FormPasswordInput'
import { GitHubButton } from '@/components/GitHubButton'
import { GoogleButton } from '@/components/GoogleButton'
import { ApiError, registration } from '@/lib/api'
import { RegistrationRequest, registrationSchema } from '@/lib/model'
import {
  isErrorResponse,
  mapRegistrationDomainError,
  mapRegistrationValidationError,
} from '@/lib/utils'
import s from './page.module.scss'

export default function SignUpPage() {
  const [isOpen, setIsOpen] = useState(false)

  const {
    control,
    handleSubmit,
    reset,
    trigger,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationRequest>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
      isTermsAccepted: false,
    },
  })

  const emailValue = useWatch({ control, name: 'email' })

  const openModal = () => setIsOpen(true)

  const closeModal = () => {
    reset() // check
    // router.push('/sign-in') ??
    setIsOpen(false)
  }

  const onClickHandler = () => {
    closeModal()
  }

  const password = useWatch({ control, name: 'password' })
  const passwordConfirmation = useWatch({
    control,
    name: 'passwordConfirmation',
  })

  useEffect(() => {
    if (password && passwordConfirmation) {
      void trigger('passwordConfirmation')
    }
  }, [password, passwordConfirmation, trigger])

  const onSubmit: SubmitHandler<RegistrationRequest> = async data => {
    try {
      await registration(data)
      openModal()
    } catch (error) {
      if (error instanceof ApiError && isErrorResponse(error.data)) {
        const isValidationError = mapRegistrationValidationError(error, setError)
        const isDomainError = mapRegistrationDomainError(error, setError)

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
      }
      throw error
    }
  }

  return (
    <main className={s.page}>
      <form className={s.card} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant={'h1'} color={'var(--color-light-100)'} align={'center'}>
          Sign Up
        </Typography>

        <div className={s.socials} aria-label={'Sign up with social account'}>
          <GoogleButton />
          <GitHubButton />
        </div>

        <div className={s.fields}>
          <div className={s.field}>
            <FormInput
              control={control}
              name={'username'}
              label={'Username'}
              placeholder={'Epam11'}
              autoComplete={'username'}
              aria-invalid={Boolean(errors.username)}
            />
          </div>

          <div className={s.field}>
            <FormInput
              control={control}
              name={'email'}
              label={'Email'}
              type={'email'}
              placeholder={'Epam@epam.com'}
              autoComplete={'email'}
              aria-invalid={Boolean(errors.email)}
            />
          </div>

          <div className={s.field}>
            <FormPasswordInput
              control={control}
              name={'password'}
              label={'Password'}
              placeholder={'******************'}
              autoComplete={'new-password'}
              aria-invalid={Boolean(errors.password)}
            />
          </div>

          <div className={s.field}>
            <FormPasswordInput
              control={control}
              name={'passwordConfirmation'}
              label={'Password confirmation'}
              placeholder={'******************'}
              autoComplete={'new-password'}
              aria-invalid={Boolean(errors.passwordConfirmation)}
            />
          </div>
        </div>

        <div className={s.agreement}>
          <FormCheckbox
            control={control}
            name={'isTermsAccepted'}
            aria-invalid={Boolean(errors.isTermsAccepted)}
            label={
              <>
                <Typography variant={'caption1'}>I agree to the </Typography>
                <Link className={s.legalLink} href={'/terms'}>
                  <Typography variant={'caption1'}>Terms of Service</Typography>
                </Link>
                <Typography variant={'caption2'}> and </Typography>

                <Link className={s.legalLink} href={'/privacy-policy'}>
                  <Typography variant={'caption1'}>Privacy Policy</Typography>
                </Link>
              </>
            }
          />
          {errors?.isTermsAccepted && (
            <Typography className={s.error} variant={'form-error'}>
              {errors.isTermsAccepted.message}
            </Typography>
          )}
        </div>

        <Button type={'submit'} fullWidth disabled={!isValid || isSubmitting}>
          Sign Up
        </Button>

        <div className={s.footer}>
          {/*<Typography variant={'caption1'} align={'center'}>*/}
          {/*  Have you already registered but didn&#39;t receive the confirmation email?*/}
          {/*</Typography>*/}
          <Button as={'a'} variant={'text'} href={'/verification-expired'} className={s.resendLink}>
            <Typography variant={'caption1'} align={'center'}>
              Resend the registration confirmation link
            </Typography>
          </Button>

          <Typography variant={'subtitle1'} color={'var(--color-light-100)'} align={'center'}>
            Do you have an account?
          </Typography>
          <Button as={'a'} variant={'text'} href={'/sign-in'}>
            Sign In
          </Button>
        </div>
      </form>

      <Modal
        open={isOpen}
        onClose={closeModal}
        modalTitle={'Email sent'}
        size={'s'}
        showHeader
        showCloseButton
      >
        <div className={s.triggerContent}>
          <Typography variant={'subtitle1'} color={'var(--color-light-100)'}>
            We have sent a link to confirm your email to {emailValue}
          </Typography>
          <div className={s.triggerControls}>
            <Button variant={'primary'} onClick={onClickHandler}>
              Ok
            </Button>
          </div>
        </div>
      </Modal>
    </main>
  )
}
