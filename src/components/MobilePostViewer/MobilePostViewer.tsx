'use client'

import { useState } from 'react'
import type { Post, UserProfile } from '@/lib/model'
import { ConfirmDeletePostModal } from '@/components'
import { useDeletePost, useUpdatePost } from '@/lib/posts'
import { useHardDeletePost } from '@/lib/posts/mutations/useHardDeletePost'
import { MobilePostEdit } from './MobilePostEdit/MobilePostEdit'
import { MobilePostFeed } from './MobilePostFeed/MobilePostFeed'
import s from './MobilePostViewer.module.scss'

type Props = {
  userProfile: UserProfile
  posts: Post[]
  startIndex: number
  userId: string
  onClose: () => void
  mode?: 'deleted' | 'published'
}

export const MobilePostViewer = ({
  userProfile,
  posts,
  startIndex,
  userId,
  onClose,
  mode = 'published',
}: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingIndex, setEditingIndex] = useState(startIndex)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [postIdToDelete, setPostIdToDelete] = useState<null | string>(null)
  const { mutate: deletePost, isPending } = useDeletePost(userId)
  const { mutate: hardDeletePost, isPending: isHardDeleting } = useHardDeletePost(userId)
  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost()
  const isDeleted = mode === 'deleted'
  const isDeleting = isPending || isHardDeleting

  const handleConfirmDelete = () => {
    if (!postIdToDelete) return

    const deleteAction = isDeleted ? hardDeletePost : deletePost

    setIsDeleteModalOpen(false)
    onClose()
    deleteAction(postIdToDelete, {
      onSuccess: () => {
        setPostIdToDelete(null)
      },
    })
  }

  if (isEditing && posts[editingIndex]) {
    return (
      <>
        <div className={s.backdrop} />

        <div className={s.viewer}>
          <MobilePostEdit
            userProfile={userProfile}
            post={posts[editingIndex]}
            onCancel={() => setIsEditing(false)}
            isSaving={isUpdating}
            onSave={description => {
              updatePost(
                {
                  postId: posts[editingIndex].id,
                  userId: posts[editingIndex].author.id,
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
          userProfile={userProfile}
          onClose={onClose}
          onDelete={postId => {
            setPostIdToDelete(postId)
            setIsDeleteModalOpen(true)
          }}
          canEdit={!isDeleted}
          deleteLabel={isDeleted ? 'Delete permanently' : 'Delete Post'}
          onEdit={index => {
            setEditingIndex(index)
            setIsEditing(true)
          }}
          posts={posts}
          startIndex={startIndex}
        />
      </div>

      <ConfirmDeletePostModal
        isDeleting={isDeleting}
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
