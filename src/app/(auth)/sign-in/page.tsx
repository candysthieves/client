'use client'

import { GitHubButton } from '@/components'
import { GoogleButton } from '@/components/GoogleButton/GoogleButton'

export default function SignInPage() {
  return (
    <>
      <h1>Sign In</h1>
      <div
        style={{
          width: '90px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <GoogleButton />
        <GitHubButton />
      </div>
    </>
  )
}
