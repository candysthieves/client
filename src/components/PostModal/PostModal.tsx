'use client'

import { useState } from 'react'
import type { Post } from '@/mocks/posts'
import { EditPostModal } from '@/components/EditPostModal/EditPostModal'
import { PostDetailsModal } from '@/components/PostDetailsModal/PostDetailsModal'

type Props = {
  post: Post
  open: boolean
  onClose: () => void
}

type Mode = 'edit' | 'view'

export const PostModal = ({ post, open, onClose }: Props) => {
  const [mode, setMode] = useState<Mode>('view')

  const handleClose = () => {
    setMode('view')
    onClose()
  }

  const handleEdit = () => {
    setMode('edit')
  }

  const handleCancelEdit = () => {
    setMode('view')
  }

  const handleSave = (description: string) => {
    // TODO: update post via API
    console.log('New description:', description)

    setMode('view')
  }

  if (mode === 'edit') {
    return (
      <EditPostModal
        post={post}
        open={open}
        onClose={handleClose}
        onCancel={handleCancelEdit}
        onSave={handleSave}
      />
    )
  }

  return <PostDetailsModal post={post} open={open} onClose={handleClose} onEdit={handleEdit} />
}
