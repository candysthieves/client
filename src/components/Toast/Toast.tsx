'use client'

import toast from 'react-hot-toast'
import type { ApiErrorResponse } from '@/features/auth/model'
import s from './Toast.module.scss'

type ToastMessageProps = {
  duration?: number
  message: string
  title?: string
}

type ToastErrorProps = {
  duration?: number
  messages: ApiErrorResponse['errorsMessages'] | string
  title?: string
}

export const ToastSuccess = ({
  duration = 3000,
  message,
  title = 'Success',
}: ToastMessageProps) => {
  toast.success(
    () => (
      <div className={s.content}>
        <p className={s.title}>{title}</p>
        <div className={s.message}>{message}</div>
      </div>
    ),
    { duration }
  )
}

export const ToastWarning = ({
  duration = 3000,
  message,
  title = 'Warning',
}: ToastMessageProps) => {
  toast(
    () => (
      <div className={s.content}>
        <p className={s.title}>{title}</p>
        <div className={s.message}>{message}</div>
      </div>
    ),
    {
      duration,
      icon: '!',
    }
  )
}

export const ToastError = ({
  duration = 3000,
  messages,
  title = 'Validation error',
}: ToastErrorProps) => {
  const isFieldErrors = Array.isArray(messages) && messages.length > 0 && 'field' in messages[0]

  toast.error(
    () => (
      <div className={s.content}>
        <p className={s.title}>{title}</p>

        {typeof messages === 'string' ? (
          <div className={s.message}>{messages}</div>
        ) : isFieldErrors ? (
          <ul className={s.list}>
            {messages.map(({ field, message }, index) => (
              <li key={`${field}-${index}`} className={s.message}>
                <span className={s.field}>{field}:</span> {message}
              </li>
            ))}
          </ul>
        ) : (
          <div className={s.message}>No message provided</div>
        )}
      </div>
    ),
    { duration }
  )
}
