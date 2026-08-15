'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import clsx from 'clsx'
import { forwardRef } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import s from './Recaptcha.module.scss'

export type RecaptchaProps = {
  siteKey: string
  onChange?: (token: null | string) => void
  onExpired?: () => void
  onError?: () => void
  errorMessage?: string
  expiredMessage?: string
  theme?: 'dark' | 'light'
  className?: string
}

export const Recaptcha = forwardRef<ReCAPTCHA, RecaptchaProps>(
  (
    {
      siteKey,
      onChange,
      onExpired,
      onError,
      errorMessage,
      expiredMessage,
      theme = 'dark',
      className,
    },
    ref
  ) => {
    const showError = Boolean(errorMessage) && !expiredMessage

    return (
      <div className={className}>
        <div className={clsx(s.widget, { [s.errorBorder]: showError })}>
          {expiredMessage && <Typography variant={'caution-error'}>{expiredMessage}</Typography>}

          <ReCAPTCHA
            ref={ref}
            sitekey={siteKey}
            onChange={onChange}
            onExpired={onExpired}
            onErrored={onError}
            theme={theme}
          />

          {showError && <Typography variant={'caution-error'}>{errorMessage}</Typography>}
        </div>
      </div>
    )
  }
)

Recaptcha.displayName = 'Recaptcha'
