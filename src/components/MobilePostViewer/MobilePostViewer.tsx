'use client'

import { useState } from 'react'
import { ConfirmDeletePostModal } from '@/components'
import { useDeletePost, useUpdatePost } from '@/lib/posts'
import { Post } from '@/mocks/posts'
import { MobilePostEdit } from './MobilePostEdit/MobilePostEdit'
import { MobilePostFeed } from './MobilePostFeed/MobilePostFeed'
import s from './MobilePostViewer.module.scss'

type Props = {
  posts: Post[]
  startIndex: number
  userId: string
  onClose: () => void
}

export const MobilePostViewer = ({ posts, startIndex, userId, onClose }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingIndex, setEditingIndex] = useState(startIndex)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState<null | string>(null)
  const { mutate: deletePost, isPending } = useDeletePost(userId)
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost()

  const handleConfirmDelete = () => {
    if (!postIdToDelete) return

    setIsDeleteModalOpen(false)
    onClose()
    deletePost(postIdToDelete)
  }

  if (isEditing && posts[editingIndex]) {
    return (
      <>
        <div className={s.backdrop} />

        <div className={s.viewer}>
          <MobilePostEdit
            post={posts[editingIndex]}
            onCancel={() => setIsEditing(false)}
            isSaving={isUpdating}
            onSave={description => {
              updatePost(
                {
                  postId: posts[editingIndex].postId,
                  userId: posts[editingIndex].userId,
                  description,
                },
                { onSuccess: () => setIsEditing(false) }
              )
            }}
          />
        </div>
      </>
    )
  }

  return (
    <>
      <div className={s.backdrop} />

      <div className={s.viewer}>
        <MobilePostFeed
          onClose={onClose}
          onDelete={postId => {
            setPostIdToDelete(postId)
            setIsDeleteModalOpen(true)
          }}
          onEdit={index => {
            setEditingIndex(index)
            setIsEditing(true)
          }}
          posts={posts}
          startIndex={startIndex}
        />
      </div>

      <ConfirmDeletePostModal
        isDeleting={isPending}
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
