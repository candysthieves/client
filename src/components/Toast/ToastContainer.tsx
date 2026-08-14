'use client'

import { Toaster } from 'react-hot-toast'

export const ToastContainer = () => {
  return (
    <Toaster
      position={'top-right'}
      toastOptions={{
        style: {
          background: 'var(--color-dark-500)',
          border: '1px solid var(--color-dark-300)',
          color: 'var(--color-light-100)',
        },
      }}
    />
  )
}
