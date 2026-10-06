'use client'

import { Button, MainAvatar } from '@candy.thieves/ui-kit-lumos'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { ProfileAvatarModal } from '@/features/editProfileAvatar'
import { ConfirmDeleteProfileAvatarModal } from '@/features/editProfileAvatar/EditProfileAvatarModal'
import { avatarKeys, useAvatar, useDeleteAvatar } from '@/lib/avatar'
import { Avatar } from '@/lib/model'
import s from './ProfileAvatarEditor.module.scss'

type ProfileAvatarEditorProps = {
  userName?: string
}

export const ProfileAvatarEditor = ({ userName = 'UserName' }: ProfileAvatarEditorProps) => {
  const queryClient = useQueryClient()
  const { data: avatarData } = useAvatar()
  const { mutate: deleteAvatar } = useDeleteAvatar()

  const [isAvatarEditModalOpen, setIsAvatarEditModalOpen] = useState(false)
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)

  const resolvedAvatarSource = avatarData?.avatarUrl?.url ?? null

  const openProfileAvatarEditorModal = () => setIsAvatarEditModalOpen(true)
  const closeProfileAvatarEditorModal = () => {
    setIsAvatarEditModalOpen(false)
  }

  const openConfirmDeleteModal = () => setIsConfirmDeleteModalOpen(true)
  const closeConfirmDeleteModal = () => setIsConfirmDeleteModalOpen(false)

  const addAvatarHandler = () => {
    openProfileAvatarEditorModal()
  }

  const deleteAvatarHandler = () => {
    openConfirmDeleteModal()
  }

  const handleConfirm = () => {
    /*
     * Перед переключением на avatar query кладём
     * текущее значение из Profile в его cache.
     */
    queryClient.setQueryData<Avatar | null>(
      avatarKeys.avatar(),
      resolvedAvatarSource ? ({ avatarUrl: { url: resolvedAvatarSource } } as Avatar) : null
    )

    /*
     * useDeleteAvatar.onMutate ->
     * cache Avatar -> null (optimistic update)
     */
    deleteAvatar()
    closeConfirmDeleteModal()
  }

  const isAvatarSet = !!resolvedAvatarSource

  return (
    <div className={s.avatarContainer}>
      <MainAvatar
        src={resolvedAvatarSource}
        alt={`${userName}-avatar`}
        size={'xl'}
        userName={userName}
        isScalable={isAvatarSet}
        showCloseButton={isAvatarSet}
        onClose={deleteAvatarHandler}
      />
      <Button variant={'outlined'} onClick={addAvatarHandler}>
        Select Profile Photo
      </Button>

      <ProfileAvatarModal open={isAvatarEditModalOpen} onClose={closeProfileAvatarEditorModal} />

      <ConfirmDeleteProfileAvatarModal
        open={isConfirmDeleteModalOpen}
        onCloseClick={closeConfirmDeleteModal}
        onCancel={closeConfirmDeleteModal}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
