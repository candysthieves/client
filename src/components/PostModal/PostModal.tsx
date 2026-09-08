'use client'

import { useState } from 'react'
import type { Post } from '@/mocks/posts'
import { ConfirmDeletePostModal } from '@/components'
import { EditPostModal } from '@/components/EditPostModal/EditPostModal'
import { PostDetailsModal } from '@/components/PostDetailsModal/PostDetailsModal'
import { useDeletePost, useUpdatePost } from '@/lib/posts'
import { useHardDeletePost } from '@/lib/posts/mutations/useHardDeletePost'

export type PostViewMode = 'deleted' | 'published'

type PostModalProps = {
  post: Post
  mode?: PostViewMode
  open: boolean
  onClose: () => void
}

type ModalState = 'edit' | 'view'

export const PostModal = ({ post, mode = 'published', open, onClose }: PostModalProps) => {
  const { mutate: softDeletePost, isPending: isSoftDeleting } = useDeletePost(post.userId)
  const { mutate: hardDeletePost, isPending: isHardDeleting } = useHardDeletePost(post.userId)
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost()
  const [modalState, setModalState] = useState<ModalState>('view')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const isDeleted = mode === 'deleted'
  const isDeleting = isSoftDeleting || isHardDeleting
  const handleClose = () => {
    setModalState('view')
    setIsDeleteModalOpen(false)
    onClose()
  }

  const handleEdit = () => {
    setModalState('edit')
  }

  const handleDelete = () => {
    setIsDeleteModalOpen(true)
  }

  const handleCancelEdit = () => {
    setModalState('view')
  }

  const handleSave = (description: string) => {
    updatePost(
      { postId: post.postId, userId: post.userId, description },
      {
        onSuccess: () => setModalState('view'),
      }
    )
  }

  const handleConfirmDelete = () => {
    const deletePost = isDeleted ? hardDeletePost : softDeletePost
    handleClose()
    deletePost(post.postId)
  }

  if (modalState === 'edit' && !isDeleted) {
    return (
      <EditPostModal
        post={post}
        open={open}
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
        onClose={handleClose}
        onEdit={handleEdit}
        onDelete={handleDelete}
        canEdit={!isDeleted}
        deleteLabel={isDeleted ? 'Delete permanently' : 'Delete Post'}
      />

      <ConfirmDeletePostModal
        isDeleting={isDeleting}
        isPermanent={isDeleted}
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
