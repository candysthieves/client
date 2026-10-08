'use client'

import type { ReactNode } from 'react'
import 'react-loading-skeleton/dist/skeleton.css'
import { SkeletonTheme } from 'react-loading-skeleton'

export function AppSkeleton({ children }: { children: ReactNode }) {
  return (
    <SkeletonTheme
      baseColor={'var(--color-dark-300)'}
      highlightColor={'var(--color-dark-100)'}
      borderRadius={'0.125rem'}
      duration={1.4}
    >
      {children}
    </SkeletonTheme>
  )
}
