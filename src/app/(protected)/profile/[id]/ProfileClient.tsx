'use client'

import { CreatePostModal } from '@/features/createPost'

type ProfileClientProps = {
  userId: string
  postId?: string
  action?: string
}

export function ProfileClient({ userId, postId, action }: ProfileClientProps) {
  const showPostModal = !!postId
  const showCreateModal = !postId && action === 'create'

  return (
    <>
      <div>Profile content for user: {userId}</div>

      {showPostModal && (
        <div>
          Post Modal with ID: {postId}
          {/*<PostModal postId={postId} /> */}
        </div>
      )}

      {showCreateModal && <CreatePostModal userId={userId} />}
    </>
  )
}
