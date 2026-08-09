'use client'

import { Button, FormInput, Typography } from '@candy.thieves/ui-kit-lumos'
import Image from 'next/image'
import { useForm } from 'react-hook-form'
import s from './page.module.scss'

type FormValues = {
  email: string
}

export default function VerificationExpiredPage() {
  const { control, handleSubmit } = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = (data: FormValues) => {
    console.log(data.email)
  }

  return (
    <div className={s.container}>
      <Typography variant={'h1'} color={'white'} align={"center"} mt={"2.188rem"} mb={"1.25rem"}>
        Email verification link expired
      </Typography>

      <Typography
        variant={'subtitle1'}
        color={'white'}
        align={"center"}
        mx={"auto"}
        className={s.caption}
      >
        Looks like the verification link has expired. Not to worry, we can send the link again
      </Typography>

      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <FormInput control={control} name={"email"} placeholder={"example@mail.com"} label={"Enter"} />
        <div className={s.submit}>
          <Button type={"submit"} fullWidth>
            Resend verification link
          </Button>
        </div>
      </form>

      <Image
        className={s.image}
        src={"/auth/verification-expired.svg"}
        width={473}
        height={352}
        alt={""}
        aria-hidden
      />
    </div>
  )
}
