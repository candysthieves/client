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

  const { mutate: deleteAvatar, isPending: isDeletingAvatar } = useDeleteAvatar()

  const [isAvatarEditModalOpen, setIsAvatarEditModalOpen] = useState(false)
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)
  // Включается только после подтверждения удаления. До этого момента
  // getAvatar не вызывается вообще.
  const [isDeletionFlowActive, setIsDeletionFlowActive] = useState(false)

  const { data: avatarData } = useAvatar({ enabled: isDeletionFlowActive })

  // До удаления — проп как есть. После старта удаления — только кэш
  // (тот же queryKey, что мутирует useDeleteAvatar через setQueryData).
  // Намеренно НЕ падаем обратно на проп, если кэш пуст: иначе во время
  // optimistic-удаления мелькал бы старый avatarSource.
  const resolvedAvatarSource = isDeletionFlowActive
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

  const handleConfirm = () => {
    /* * Перед включением useAvatar синхронизируем его cache
     * * с avatarSource, который уже получили через Profile.
     * * * Это важно: useAvatar не стартует с пустого cache.
     * */
    queryClient.setQueryData<Avatar | null>(
      avatarKeys.avatar(),
      avatarSource ? ({ avatarUrl: { url: avatarSource } } as Avatar) : null
    )
    /* * Теперь useAvatar начинает смотреть на тот же query,
     * * который будет изменять mutation. */
    setIsDeletionFlowActive(true)
    /* * useDeleteAvatar.onMutate: * * cache: * Avatar -> null * * UI: * старый avatar -> null */
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
