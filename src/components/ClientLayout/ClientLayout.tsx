'use client'

import { ReactNode } from 'react'
import { ToastContainer } from '@/components'
import { QueryProviders } from '@/providers'

export const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProviders>
      <ToastContainer />
      {children}
    </QueryProviders>
  )
}
