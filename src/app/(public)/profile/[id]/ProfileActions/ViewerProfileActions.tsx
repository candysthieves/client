import { Button } from '@candy.thieves/ui-kit-lumos'
import s from './ProfileActions.module.scss'

interface ViewerProfileActionsProps {
  isFriend: boolean
}

export function ViewerProfileActions({ isFriend }: ViewerProfileActionsProps) {
  const handleFollow = () => {
    console.log('Follow clicked (placeholder)')
    // Будущая логика добавления в друзья
  }

  const handleUnfollow = () => {
    console.log('Unfollow clicked (placeholder)')
    // Будущая логика удаления из друзей
  }

  const handleSendMessage = () => {
    console.log('Send Message clicked (placeholder)')
    // Будущая логика открытия чата
  }

  return (
    <div className={s.actions}>
      {isFriend ? (
        <Button onClick={handleUnfollow} variant={'outlined'}>
          Unfollow
        </Button>
      ) : (
        <Button onClick={handleFollow} variant={'primary'}>
          Follow
        </Button>
      )}

      <Button onClick={handleSendMessage} variant={'secondary'}>
        Send Message
      </Button>
    </div>
  )
}
