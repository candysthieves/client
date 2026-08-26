'use client'

import { Button } from '@candy.thieves/ui-kit-lumos'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

interface ProfileClientProps {
  userId: string
  postId?: string
  action?: string
}

export function ProfileClient({ userId, postId, action }: ProfileClientProps) {
  const router = useRouter()

  // Дополнительная клиентская логика при необходимости
  useEffect(() => {
    // Клиентская логика
  }, [])

  const showPostModal = !!postId
  const showCreateModal = !postId && action === 'create'

  return (
    <>
      <div>Profile content for user: {userId}</div>

      {showPostModal && <div>Post Modal with ID: {postId}</div>}
      {showCreateModal && <div>Create Post Modal</div>}

      <Button onClick={() => router.push(`/profile/${userId}?action=create`)}>Create Post</Button>
    </>
  )
}
