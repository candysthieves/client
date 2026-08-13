// 'use client'
//
// import toast from 'react-hot-toast'
//
// type ToastMessageProps = {
//   message: string
//   title?: string
//   duration?: number
// }
//
// type ToastErrorProps = {
//   messages: string | { field: string; message: string }[]
//   title?: string
//   duration?: number
// }
//
// export const ToastSuccess = ({
//   message,
//   title = 'Success',
//   duration = 3000,
// }: ToastMessageProps) => {
//   toast.success(t => {
//     t.duration = duration
//
//     return (
//       <div className={'flex flex-col gap-1'}>
//         <p className={'font-semibold'}>{title}</p>
//         <div className={'text-sm'}>{message}</div>
//       </div>
//     )
//   })
// }
//
// export const ToastWarning = ({
//   message,
//   title = 'Warning',
//   duration = 3000,
// }: ToastMessageProps) => {
//   toast(
//     t => {
//       t.duration = duration
//
//       return (
//         <div className={'flex flex-col gap-1'}>
//           <p className={'font-semibold'}>{title}</p>
//           <div className={'text-sm'}>{message}</div>
//         </div>
//       )
//     },
//     {
//       icon: '⚠️',
//     }
//   )
// }
//
// export const ToastError = ({
//   messages,
//   title = 'Validation error',
//   duration = 3000,
// }: ToastErrorProps) => {
//   const isFieldErrors = Array.isArray(messages) && messages.length > 0 && 'field' in messages[0]
//
//   toast.error(t => {
//     t.duration = duration
//
//     return (
//       <div className={'flex flex-col gap-1'}>
//         <p className={'font-semibold'}>{title}</p>
//         {typeof messages === 'string' ? (
//           <div className={'text-sm'}>{messages}</div>
//         ) : isFieldErrors ? (
//           <ul className={'list-disc pl-4'}>
//             {messages.map((err, index) => (
//               <li key={index} className={'text-sm'}>
//                 <span className={'font-medium capitalize'}>{err.field}:</span> {err.message}
//               </li>
//             ))}
//           </ul>
//         ) : (
//           <div className={'text-sm'}>No message provided</div>
//         )}
//       </div>
//     )
//   })
// }

'use client'

import { Alert } from '@candy.thieves/ui-kit-lumos'
import toast from 'react-hot-toast'
import { ErrorMessageResponse } from '@/lib/model'

type ToastMessageProps = {
  duration?: number
  message: string
  title?: string
}

type ToastErrorProps = {
  duration?: number
  messages: ErrorMessageResponse[] | string
  title?: string
}

export const ToastSuccess = ({
  duration = 3000,
  message,
  title = 'Success',
}: ToastMessageProps) => {
  toast.custom(
    t => (
      <div style={{ pointerEvents: 'auto' }}>
        <Alert variant={'success'} title={title} onClose={() => toast.remove(t.id)}>
          {message}
        </Alert>
      </div>
    ),
    {
      duration,
      position: 'bottom-left',
    }
  )
}

export const ToastWarning = ({
  duration = 3000,
  message,
  title = 'Warning',
}: ToastMessageProps) => {
  toast.custom(
    t => (
      <div style={{ pointerEvents: 'auto' }}>
        <Alert variant={'warning'} title={title} onClose={() => toast.remove(t.id)}>
          {message}
        </Alert>
      </div>
    ),
    {
      duration,
      position: 'bottom-left',
    }
  )
}

export const ToastError = ({
  duration = 3000,
  messages,
  title = 'Validation error',
}: ToastErrorProps) => {
  const formattedMessages =
    typeof messages === 'string'
      ? messages
      : messages.map(({ field, message }) => ({
          field,
          message,
        }))

  const isMessagesArray = Array.isArray(formattedMessages)

  return toast.custom(
    t => (
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
          onClose={() => toast.remove(t.id)}
          errors={isMessagesArray ? formattedMessages : undefined}
        >
          {isMessagesArray ? undefined : formattedMessages}
        </Alert>
      </div>
    ),
    {
      duration,
      position: 'bottom-right',
    }
  )
}
