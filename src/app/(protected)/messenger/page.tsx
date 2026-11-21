'use client'

import { Button, Typography } from '@candy.thieves/ui-kit-lumos'
import { useRequestUnreadCount } from '@/lib/hooks'

export default function Messenger() {
  const requestUnreadCount = useRequestUnreadCount()

  return (
    <main>
      <h2>Messenger</h2>
      <Typography variant={'caption1'}>Messenger content</Typography>
      <Button type={'button'} onClick={requestUnreadCount}>
        Update Notification count by Websocket
      </Button>
    </main>
  )
}
