'use client'

import { Button, GithubRepo, Google, Typography } from '@candy.thieves/ui-kit-lumos'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { FormCheckbox } from '@/components/FormCheckbox'
import { FormInput } from '@/components/FormInput'
import { FormPasswordInput } from '@/components/FormPasswordInput'
import { type RegistrationRequest, registrationSchema } from '@/features/auth/model'
import s from './page.module.scss'

export default function SignUpPage() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
  } = useForm<RegistrationRequest>({
    resolver: zodResolver(registrationSchema),
    mode: 'onChange',
    defaultValues: {
      username: '',
      email: '',
      password: '',
      passwordConfirmation: '',
    },
  })

  const onSubmit: SubmitHandler<RegistrationRequest> = async () => {}

  return (
    <main className={s.page}>
      <form className={s.card} onSubmit={handleSubmit(onSubmit)} noValidate>
        <Typography variant={'h1'} color={'var(--color-light-100)'} align={'center'}>
          Sign Up
        </Typography>

        <div className={s.socials} aria-label={'Sign up with social account'}>
          <button className={s.socialButton} type={'button'} aria-label={'Sign up with Google'}>
            <Google />
          </button>
          <button className={s.socialButton} type={'button'} aria-label={'Sign up with GitHub'}>
            <GithubRepo />
          </button>
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
              <span className={s.agreementText}>
                I agree to the{' '}
                <Link className={s.legalLink} href={'/terms'}>
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link className={s.legalLink} href={'/privacy-policy'}>
                  Privacy Policy
                </Link>
              </span>
            }
          />
          {errors.isTermsAccepted && (
            <span className={s.error}>{errors.isTermsAccepted.message}</span>
          )}
        </div>

        <Button type={'submit'} fullWidth disabled={!isValid || isSubmitting}>
          Sign Up
        </Button>

        <div className={s.footer}>
          <Typography variant={'subtitle1'} color={'var(--color-light-100)'} align={'center'}>
            Do you have an account?
          </Typography>
          <Button type={'button'} variant={'text'} fullWidth disabled>
            Sign In
          </Button>
        </div>
      </form>
    </main>
  )
}
