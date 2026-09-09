'use client'

import { useState } from 'react'
import type { Post, UserProfile } from '@/lib/model'
import { ConfirmDeletePostModal } from '@/components'
import { EditPostModal } from '@/components/EditPostModal/EditPostModal'
import { PostDetailsModal } from '@/components/PostDetailsModal/PostDetailsModal'
import { useDeletePost, useUpdatePost } from '@/lib/posts'
import { useHardDeletePost } from '@/lib/posts/mutations/useHardDeletePost'

export type PostViewMode = 'deleted' | 'published'

type PostModalProps = {
  userProfile: UserProfile
  post: Post
  mode?: PostViewMode
  open: boolean
  onClose: () => void
}

type ModalState = 'edit' | 'view'

export const PostModal = ({
  userProfile,
  post,
  mode = 'published',
  open,
  onClose,
}: PostModalProps) => {
  // Безопасное извлечение ID автора для исключения undefined ошибок
  const authorId = post?.author?.id ?? userProfile?.id

  const { mutate: softDeletePost, isPending: isSoftDeleting } = useDeletePost(authorId)
  const { mutate: hardDeletePost, isPending: isHardDeleting } = useHardDeletePost(authorId)
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
      // ИСПРАВЛЕНО: Заменили post.author.id на безопасный authorId
      { postId: post.id, userId: authorId, description },
      {
        onSuccess: () => setModalState('view'),
      }
    )
  }

  const handleConfirmDelete = () => {
    const deletePostAction = isDeleted ? hardDeletePost : softDeletePost
    handleClose()
    deletePostAction(post.id)
  }

  if (modalState === 'edit' && !isDeleted) {
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
