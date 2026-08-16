'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { SubmitHandler, useForm } from 'react-hook-form'
import { FormInput } from '@/components/FormInput'
import s from './RecoveryLinkExpired.module.scss'

type FormValues = {
  email: string
}

export default function RecoveryLinkExpired() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit: SubmitHandler<FormValues> = data => {
    console.log(data.email)
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
        Password recovery link expired
      </Typography>

      <Typography
        variant={'subtitle1'}
        color={'white'}
        align={'center'}
        mx={'auto'}
        className={s.caption}
      >
        Looks like the password recovery link has expired. We can send the link again
      </Typography>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          control={control}
          name={'email'}
          type={'email'}
          placeholder={'example@mail.com'}
          label={'Email'}
        />

        <div className={s.submit}>
          <Button type={'submit'} fullWidth disabled={isSubmitting}>
            Resend recovery link
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
