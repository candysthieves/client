import { Button, MainAvatar } from '@candy.thieves/ui-kit-lumos'
import { useState } from 'react'
import { ProfileAvatarModal } from '@/features/editProfileAvatar'
import { ConfirmDeleteProfileAvatarModal } from '@/features/editProfileAvatar/EditProfileAvatarModal'
import { useDeleteAvatar } from '@/lib/avatar'
import { useDeletePost } from '@/lib/posts'
import s from './ProfileAvatarEditor.module.scss'

type ProfileAvatarEditorProps = {
  avatarSource: null | string
  userName?: string
}

export const ProfileAvatarEditor = ({
  avatarSource,
  userName = 'UserName',
}: ProfileAvatarEditorProps) => {
  const { mutate: deleteAvatar, isPending: isDeletingAvatar } = useDeleteAvatar()

  const [isAvatarEditModalOpen, setIsAvatarEditModalOpen] = useState(false)
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false)

  const openProfileAvatarEditorModal = () => setIsAvatarEditModalOpen(true)
  const closeProfileAvatarEditorModal = () => setIsAvatarEditModalOpen(false)

  const openConfirmDeleteModal = () => setIsConfirmDeleteModalOpen(true)
  const closeConfirmDeleteModal = () => setIsConfirmDeleteModalOpen(false)

  const isAvatarSet = !!avatarSource

  const addAvatarHandler = () => {
    openProfileAvatarEditorModal()
  }

  const deleteAvatarHandler = () => {
    openConfirmDeleteModal()
  }

  const handleConfirm = async () => {
    await deleteAvatar()
    closeConfirmDeleteModal()
  }

  return (
    <div className={s.avatarContainer}>
      <MainAvatar
        src={avatarSource}
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
