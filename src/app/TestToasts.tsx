'use client'

import { ToastSuccess, ToastWarning, ToastError } from '@/components' // check the path to toasts

export const TestToasts = () => {
  return (
    <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
      <button
        type={'button'}
        onClick={() =>
          ToastSuccess({
            title: 'Success',
            message: 'Operation completed successfully!',
          })
        }
      >
        Success
      </button>

      <button
        type={'button'}
        onClick={() =>
          ToastWarning({
            title: 'Warning',
            message: 'Warning message',
          })
        }
      >
        Warning
      </button>

      <button
        type={'button'}
        onClick={() =>
          ToastError({
            title: 'Form Error',
            messages: [
              { type: 'required', message: 'Username is required' },
              { type: 'minLength', message: 'Password is too short' },
            ],
          })
        }
      >
        Error (Array)
      </button>
    </div>
  )
}
