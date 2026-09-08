'use client'

import { useState } from 'react'
import type { Post } from '@/lib/model'
import { ConfirmDeletePostModal } from '@/components'
import { EditPostModal } from '@/components/EditPostModal/EditPostModal'
import { PostDetailsModal } from '@/components/PostDetailsModal/PostDetailsModal'
import { Post } from '@/features/createPost'
import { UserProfile } from '@/lib/model'
import { useDeletePost, useUpdatePost } from '@/lib/posts'

type PostModalProps = {
  userProfile: UserProfile
  post: Post
  open: boolean
  onClose: () => void
}

type Mode = 'edit' | 'view'

export const PostModal = ({ userProfile, post, open, onClose }: PostModalProps) => {
  const { mutate: deletePost, isPending } = useDeletePost(post.userId)
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost()
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
    updatePost(
      { postId: post.id, userId: post.author.id, description },
      {
        onSuccess: () => setMode('view'),
      }
    )
  }

  const handleConfirmDelete = () => {
    deletePost(post.id, {
      onSuccess: handleClose,
    })
  }

  if (mode === 'edit') {
    return (
      <EditPostModal
        post={post}
        open={open}
        userProfile={userProfile}
        onClose={handleClose}
        onCancel={handleCancelEdit}
        onSave={handleSave}
        isSaving={isUpdating}
      />
    )
  }

  return (
    <>
      <PostDetailsModal
        post={post}
        open={open}
        userProfile={userProfile}
        onClose={handleClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />

      <ConfirmDeletePostModal
        isDeleting={isPending}
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
