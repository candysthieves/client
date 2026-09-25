import { Button, MainAvatar } from '@candy.thieves/ui-kit-lumos'
import s from './ProfileAvatarEditor.module.scss'

export const ProfileAvatarEditor = () => {
  const USERNAME = 'user'
  const isReadyToDelete = true

  const addAvatarHandler = () => {
    console.log('add avatar')
  }

  const deleteAvatarHandler = () => {
    console.log('delete avatar')
  }

  // const canScale = isScalable && !!src

  return (
    <div className={s.avatarContainer}>
      <MainAvatar
        src={''}
        alt={`${USERNAME}-avatar`}
        size={'xl'}
        userName={USERNAME}
        showCloseButton={isReadyToDelete}
        onClose={deleteAvatarHandler}
      />
      <Button variant={'outlined'} onClick={addAvatarHandler}>
        Select Profile Photo
      </Button>
    </div>
  )
}
