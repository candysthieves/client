'use client'

import { Button, clsx, Modal, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { ToastError } from '@/components'
import { ApiError, registration } from '@/lib/api'
import {
  RegistrationRequest,
  registrationSchema,
  VALIDATION_ERROR_COMMON_MESSAGE,
} from '@/lib/model'
import { isErrorResponse, mapRegistrationError } from '@/lib/utils'
import s from './page.module.scss'

export default function SignUpPage() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    register,
    setError,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isValid },
  } = useForm<RegistrationRequest>({
    mode: 'all',
    // resolver: zodResolver(registrationSchema),
    defaultValues: {
      isTermsAccepted: false,
    },
  })

  const emailValue = watch('email')

  // useEffect is a temporary solution to render new errors field values
  useEffect(() => {
    console.table(errors)
  }, [errors, errors.email, errors.username])

  const openModal = () => setIsOpen(true)
  const closeModal = () => {
    reset() // check
    setIsOpen(false)
  }

  const onSubmit: SubmitHandler<RegistrationRequest> = async data => {
    try {
      await registration(data)
      // router.push('/login') ??
      openModal()
    } catch (error) {
      if (error instanceof ApiError && isErrorResponse(error.data)) {
        const isValidationError = mapRegistrationError(error, setError)

        if (isValidationError) {
          ToastError({
            messages: error.data.errorsMessages, // решим оставлять ли при добавлении интернационализации
            // messages: VALIDATION_ERROR_COMMON_MESSAGE, // решим оставлять ли при добавлении интернационализации
          })

          return
        }
      }
      throw error
    }
  }

  const onClickHandler = () => {
    closeModal()
  }

  return (
    <>
      <div>
        {/*Temporary jsx code starts here*/}
        <Typography variant={'h2'}>{'Sign up'}</Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{ display: 'flex', flexDirection: 'column', width: '30rem', color: '#000' }}
        >
          <Typography variant={'caption1'} color={'var(--color-light-100)'}>
            {'User name'}
          </Typography>

          {/* TODO: error={!!errors?.username} - add this in the future to input an delete clsx className condition*/}
          <input
            type={'text'}
            id={'username'}
            className={clsx(s.name, !!errors?.username && s.errorInput)}
            {...register('username')}
          />
          {errors?.username && (
            <Typography variant={'body1'} color={'var(--color-danger-500)'}>
              {errors.username.message}
            </Typography>
          )}
          <Typography variant={'caption1'} color={'var(--color-light-100)'}>
            {'Email'}
          </Typography>

          {/* TODO: error={!!errors?.email} - add this in the future to input an delete clsx className condition*/}
          <input
            type={'text'}
            id={'emailSignUp'}
            className={clsx(s.email, !!errors?.email && s.errorInput)}
            {...register('email')}
          />
          {errors?.email && (
            <Typography variant={'body2'} color={'var(--color-danger-500)'}>
              {errors.email.message}
            </Typography>
          )}

          <label htmlFor={'passwordSignUp'}>Password</label>

          {/* TODO: change to type={'password'} */}
          <input
            id={'passwordSignUp'}
            type={'text'}
            defaultValue={'qwQW12!@'}
            className={clsx(s.email, !!errors?.password && s.errorInput)}
            {...register('password')}
            autoComplete={'current-password'}
          />
          {errors?.password && (
            <Typography variant={'body2'} color={'var(--color-danger-500)'}>
              {errors.password.message}
            </Typography>
          )}

          <label htmlFor={'passwordConfirmation'}>{'Confirm password'}</label>

          {/* TODO: change to type={'password'} */}
          <input
            id={'passwordConfirmation'}
            type={'text'}
            defaultValue={'qwQW12!@'}
            className={clsx(s.email, !!errors?.passwordConfirmation && s.errorInput)}
            {...register('passwordConfirmation')}
          />
          {errors?.passwordConfirmation && (
            <Typography variant={'body2'} color={'var(--color-danger-500)'}>
              {errors.passwordConfirmation.message}
            </Typography>
          )}

          <div className={s.termsBlock}>
            <input type={'checkbox'} id={'isTermsAccepted'} {...register('isTermsAccepted')} />
            <label htmlFor={'isTermsAccepted'} className={s.terms}>
              I agree to the Terms of Service and Privacy Policy
            </label>
          </div>
          {/* TODO: Also add a "disabled" state for the loading period — when the POST request with form data is sending */}
          <Button type={'submit'} variant={'primary'} disabled={!isValid}>
            Submit sign-up form
          </Button>
        </form>
      </div>
      {/*Temporary jsx code ends here*/}

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
    </>
  )
}
