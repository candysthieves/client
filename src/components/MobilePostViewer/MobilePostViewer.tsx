'use client'

import { useState } from 'react'
import { DeletePostModal } from '@/components'
import { Post } from '@/mocks/posts'
import { MobilePostEdit } from './MobilePostEdit/MobilePostEdit'
import { MobilePostFeed } from './MobilePostFeed/MobilePostFeed'
import s from './MobilePostViewer.module.scss'

type Props = {
  posts: Post[]
  startIndex: number
  onClose: () => void
}

export const MobilePostViewer = ({ posts, startIndex, onClose }: Props) => {
  const [isEditing, setIsEditing] = useState(false)
  const [editingIndex, setEditingIndex] = useState(startIndex)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleConfirmDelete = () => {
    // TODO: API soft delete
    setIsDeleteModalOpen(false)
    onClose()
  }

  if (isEditing && posts[editingIndex]) {
    return (
      <>
        <div className={s.backdrop} />

        <div className={s.viewer}>
          <MobilePostEdit
            post={posts[editingIndex]}
            onCancel={() => setIsEditing(false)}
            onSave={() => setIsEditing(false)}
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
          onDelete={() => setIsDeleteModalOpen(true)}
          onEdit={index => {
            setEditingIndex(index)
            setIsEditing(true)
          }}
          posts={posts}
          startIndex={startIndex}
        />
      </div>

      <DeletePostModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
      />
    </>
  )
}
