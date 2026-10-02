import { useEffect } from 'react'
import { NEXT_PUBLIC_API_URL } from '@/constants'
import { AvatarEditedEvent } from '@/features/createPost'
import { avatarEditedEventSchema } from '@/lib/model'
import { isError } from '@/lib/utils'

type UseAvatarEventsProps = {
  onAvatarUpdated: (userId: string) => void
}

export const useAvatarEvents = ({ onAvatarUpdated }: UseAvatarEventsProps) => {
  useEffect(() => {
    const eventSource = new EventSource(`${NEXT_PUBLIC_API_URL}/events`, {
      withCredentials: true,
    })

    const _onAvatarUpdated = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as AvatarEditedEvent

        const validatedData = avatarEditedEventSchema.parse(data)

        onAvatarUpdated(validatedData.userId)
      } catch (error) {
        if (isError(error)) {
          console.error(`SSE parse error: ${error.name} - ${error.message}`)
        } else {
          console.error('Unknown error type:', error)
        }
      }
    }

    eventSource.addEventListener('avatar-updated', _onAvatarUpdated)

    eventSource.onerror = error => {
      console.error('SSE connection error:', error)
    }

    return () => {
      eventSource.removeEventListener('avatar-updated', _onAvatarUpdated)
      eventSource.close()
    }
  }, [onAvatarUpdated])
}
