'use client'

import { Suspense } from 'react'
import { CreateNewPasswordContent } from '@/app/(auth)/create-new-password/CreateNewPasswordContent'

export default function CreateNewPasswordPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CreateNewPasswordContent />
    </Suspense>
  )
}
