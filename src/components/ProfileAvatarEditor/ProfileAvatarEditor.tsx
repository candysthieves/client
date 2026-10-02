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
  avatarSource: null | string
  userName?: string
}

export const ProfileAvatarEditor = ({
  avatarSource,
  userName = 'UserName',
}: ProfileAvatarEditorProps) => {
  const queryClient = useQueryClient()

  const { mutate: deleteAvatar } = useDeleteAvatar()

  const [isAvatarEditModalOpen, setIsAvatarEditModalOpen] = useState(false)
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)
  // Включается только после подтверждения удаления. До этого момента
  // getAvatar не вызывается вообще (чтобы не было конфликта с avatarSource полученным из родителя)
  const [isAvatarQueryActive, setIsAvatarQueryActive] = useState(false)

  const { data: avatarData } = useAvatar({ enabled: isAvatarQueryActive })

  const resolvedAvatarSource = isAvatarQueryActive
    ? (avatarData?.avatarUrl?.url ?? null)
    : avatarSource

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

  const handleAvatarUpdated = () => {
    setIsAvatarQueryActive(true)
  }

  const handleConfirm = () => {
    /*
     * Перед переключением на avatar query кладём
     * текущее значение из Profile в его cache.
     */
    queryClient.setQueryData<Avatar | null>(
      avatarKeys.avatar(),
      avatarSource ? ({ avatarUrl: { url: avatarSource } } as Avatar) : null
    )

    /*
     * Теперь запрос useAvatar становится активным.
     */
    setIsAvatarQueryActive(true)

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

      <ProfileAvatarModal
        open={isAvatarEditModalOpen}
        onClose={closeProfileAvatarEditorModal}
        onAvatarUpdated={handleAvatarUpdated}
      />

      <ConfirmDeleteProfileAvatarModal
        open={isConfirmDeleteModalOpen}
        onCloseClick={closeConfirmDeleteModal}
        onCancel={closeConfirmDeleteModal}
        onConfirm={handleConfirm}
      />
    </div>
  )
}
