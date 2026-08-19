'use client'

import { Suspense } from 'react'
import { NewPasswordContent } from '@/app/(public)/(auth)/new-password/NewPasswordContent'

export default function NewPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewPasswordContent />
    </Suspense>
  )
}
