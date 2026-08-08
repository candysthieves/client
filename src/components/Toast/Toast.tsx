'use client'

import toast from 'react-hot-toast'

type ToastMessageProps = {
  message: string
  title?: string
  duration?: number
}

type ToastErrorProps = {
  messages: string | { field: string; message: string }[]
  title?: string
  duration?: number
}

export const ToastSuccess = ({
  message,
  title = 'Success',
  duration = 3000,
}: ToastMessageProps) => {
  toast.success(t => {
    t.duration = duration

    return (
      <div className={'flex flex-col gap-1'}>
        <p className={'font-semibold'}>{title}</p>
        <div className={'text-sm'}>{message}</div>
      </div>
    )
  })
}

export const ToastWarning = ({
  message,
  title = 'Warning',
  duration = 3000,
}: ToastMessageProps) => {
  toast(
    t => {
      t.duration = duration

      return (
        <div className={'flex flex-col gap-1'}>
          <p className={'font-semibold'}>{title}</p>
          <div className={'text-sm'}>{message}</div>
        </div>
      )
    },
    {
      icon: '⚠️',
    }
  )
}

export const ToastError = ({
  messages,
  title = 'Validation error',
  duration = 3000,
}: ToastErrorProps) => {
  const isFieldErrors = Array.isArray(messages) && messages.length > 0 && 'field' in messages[0]

  toast.error(t => {
    t.duration = duration

    return (
      <div className={'flex flex-col gap-1'}>
        <p className={'font-semibold'}>{title}</p>
        {typeof messages === 'string' ? (
          <div className={'text-sm'}>{messages}</div>
        ) : isFieldErrors ? (
          <ul className={'list-disc pl-4'}>
            {messages.map((err, index) => (
              <li key={index} className={'text-sm'}>
                <span className={'font-medium capitalize'}>{err.field}:</span> {err.message}
              </li>
            ))}
          </ul>
        ) : (
          <div className={'text-sm'}>No message provided</div>
        )}
      </div>
    )
  })
}
