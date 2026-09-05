import { useEffect } from 'react'
import { NEXT_PUBLIC_API_URL } from '@/constants'
import { PostCreatedEvent } from '@/features/createPost'

type UsePostEventsProps = {
  onPostCreated: (postId: string) => void
}

export const usePostEvents = ({ onPostCreated }: UsePostEventsProps) => {
  useEffect(() => {
    const eventSource = new EventSource(`${NEXT_PUBLIC_API_URL}/events`, {
      withCredentials: true,
    })

    const handlePostCreated = (event: MessageEvent) => {
      try {
        console.log('Raw SSE event:', event.data)
        console.log('Event type:', event.type)

        const data = JSON.parse(event.data) as PostCreatedEvent

        console.log('Parsed event data:', JSON.stringify(data, null, 2))

        onPostCreated(data.data.postId)
      } catch (error) {
        console.error('Failed to parse SSE event:', error)
      }
    }

    eventSource.addEventListener('post-created', handlePostCreated)

    eventSource.onerror = error => {
      console.error('SSE connection error:', error)
    }

    return () => {
      eventSource.removeEventListener('post-created', handlePostCreated)
      eventSource.close()
    }
  }, [onPostCreated])
}
