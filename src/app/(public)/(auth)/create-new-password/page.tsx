'use client'

import { Suspense } from 'react'
import { VerifyNewPasswordContent } from '@/app/(public)/(auth)/create-new-password/VerifyNewPasswordContent'

export default function CreateNewPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyNewPasswordContent />
    </Suspense>
  )
}
