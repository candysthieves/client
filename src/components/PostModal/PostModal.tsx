'use client'

import { useState } from 'react'
import type { Post } from '@/mocks/posts'
import { DeletePostModal } from '@/components'
import { EditPostModal } from '@/components/EditPostModal/EditPostModal'
import { PostDetailsModal } from '@/components/PostDetailsModal/PostDetailsModal'
import { useDeletePost } from '@/lib/posts'

type Props = {
  post: Post
  open: boolean
  onClose: () => void
}

type Mode = 'edit' | 'view'

export const PostModal = ({ post, open, onClose }: Props) => {
  const deletePostMutation = useDeletePost()
  const [mode, setMode] = useState<Mode>('view')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleClose = () => {
    setMode('view')
    setIsDeleteModalOpen(false)
    onClose()
  }

  const handleEdit = () => {
    setMode('edit')
  }

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const handleCancelEdit = () => {
    setMode('view')
  }

  const handleSave = (description: string) => {
    // TODO: update post via API
    console.log('New description:', description)

    setMode('view')
  }

  const handleConfirmDelete = () => {
    deletePostMutation.mutate(post.postId, {
      onSuccess: handleClose,
    })
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

  return (
    <>
      <PostDetailsModal
        post={post}
        open={open}
        onClose={handleClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <DeletePostModal
        isDeleting={deletePostMutation.isPending}
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
