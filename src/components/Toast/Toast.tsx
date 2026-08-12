'use client'

import type { FieldError as RHFError } from 'react-hook-form'
import { Alert, type FieldError as UIError } from '@candy.thieves/ui-kit-lumos'
import toast from 'react-hot-toast'

type ToastMessageProps = {
  duration?: number
  message: string
  title?: string
}

type ToastErrorProps = {
  duration?: number
  messages: RHFError[] | string | UIError[]
  title?: string
}

export const ToastSuccess = ({
  duration = 5000,
  message,
  title = 'Success',
}: ToastMessageProps) => {
  const toastId = Math.random().toString()

  toast.custom(
    () => (
      <div style={{ pointerEvents: 'auto' }}>
        <Alert variant={'success'} title={title} onClose={() => toast.remove(toastId)}>
          {message}
        </Alert>
      </div>
    ),
    {
      id: toastId,
      duration,
      position: 'bottom-left',
    }
  )
}

export const ToastWarning = ({
  duration = 5000,
  message,
  title = 'Warning',
}: ToastMessageProps) => {
  const toastId = Math.random().toString()

  toast.custom(
    () => (
      <div style={{ pointerEvents: 'auto' }}>
        <Alert variant={'warning'} title={title} onClose={() => toast.remove(toastId)}>
          {message}
        </Alert>
      </div>
    ),
    {
      id: toastId,
      duration,
      position: 'bottom-left', // 👈 По центру сверху
    }
  )
}

export const ToastError = ({
  duration = 5000,
  messages,
  title = 'Validation error',
}: ToastErrorProps) => {
  const toastId = Math.random().toString()

  const formattedMessages = Array.isArray(messages)
    ? messages.map((err, index) => {
        if (typeof err === 'string') {
          return { field: `field_${index}`, message: err }
        }

        const fieldName =
          'field' in err && err.field
            ? err.field
            : 'ref' in err && err.ref?.name
              ? err.ref.name
              : `field_${index}`

        return {
          field: fieldName,
          message: err.message || 'Error',
        }
      })
    : messages

  const isMessagesArray = Array.isArray(formattedMessages)

  return toast.custom(
    () => (
      <div
        style={{
          pointerEvents: 'auto',
          display: 'flex',
          justifyContent: 'flex-end',
          width: '100%',
        }}
      >
        <Alert
          variant={'error'}
          title={title}
          onClose={() => toast.remove(toastId)}
          errors={isMessagesArray ? formattedMessages : undefined}
        >
          {isMessagesArray ? undefined : formattedMessages}
        </Alert>
      </div>
    ),
    {
      id: toastId,
      duration,
      position: 'bottom-right',
    }
  )
}
