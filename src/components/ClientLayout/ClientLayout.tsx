'use client'

import { LinearProgress } from '@candy.thieves/ui-kit-lumos'
import { ReactNode } from 'react'
import { ToastContainer } from '@/components'
import { AppHeader } from '@/components/AppHeader'
import { QueryProviders } from '@/providers'
import s from './layout.module.scss'

export const ClientLayout = ({ children }: { children: ReactNode }) => {
  return (
    <QueryProviders>
      <div className={s.headerWrapper}>
        <AppHeader />
        <LinearProgress size={'sm'} className={s.progress} />
      </div>
      <ToastContainer />
      {children}
    </QueryProviders>
  )
}
