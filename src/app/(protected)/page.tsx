'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useState } from 'react'
import { PostDetailsModal } from '@/components/PostDetailsModal/PostDetailsModal'
import { mockPost } from '@/components/PostDetailsModal/PostDetailsModal.mock'
import { PostModal } from '@/components/PostModal/PostModal'

export default function Home() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <main>
      <h1>Welcome to LumosApp</h1>
      <Link href={'/sign-up'} style={{ marginRight: 16 }}>
        <Button>Sign up</Button>
      </Link>
      <Link href={'/sign-in'} style={{ marginRight: 16 }}>
        <Button>Sign in</Button>
      </Link>

      <Button onClick={() => setIsOpen(true)}>Show Post</Button>

      <PostModal post={mockPost} open={isOpen} onClose={() => setIsOpen(false)} />
    </main>
  )
}
