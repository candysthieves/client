import { useEffect } from 'react'
import { NEXT_PUBLIC_API_URL } from '@/constants'
import { PostCreatedEvent } from '@/features/createPost'
import { isError } from '@/lib/utils'

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
        const data = JSON.parse(event.data) as PostCreatedEvent
        onPostCreated(data.postId)
      } catch (error) {
        if (isError(error)) {
          console.error(`SSE parse error: ${error.name} - ${error.message}`)
        } else {
          console.error('Unknown error type:', error)
        }
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
// import { useEffect } from 'react'
// import { ToastError } from '@/components'
// import { NEXT_PUBLIC_API_URL } from '@/constants'
// import { PostCreatedEventSchema } from '@/lib/model'
// import { isError } from '@/lib/utils'
//
// type UsePostEventsProps = {
//   onPostCreated: (postId: string) => void
// }
//
// const handleErrorSSE = (event: Event) => {
//   console.error('SSE connection error:', event)
// }
//
// export const usePostEvents = ({ onPostCreated }: UsePostEventsProps) => {
//   useEffect(() => {
//     const eventSource = new EventSource(`${NEXT_PUBLIC_API_URL}/events`, {
//       withCredentials: true,
//     })
//
//     const handlePostCreated = (event: MessageEvent) => {
//       try {
//         const data = PostCreatedEventSchema.parse(JSON.parse(event.data))
//         onPostCreated(data.postId)
//       } catch (error) {
//         if (isError(error)) {
//           ToastError({
//             title: 'SSE parse error:',
//             messages: `${error.name} - ${error.message}`,
//           })
//         } else {
//           ToastError({
//             title: 'SSE event error',
//             messages: 'Unknown error occurred while processing SSE event',
//           })
//         }
//       }
//     }
//
//     eventSource.addEventListener('post-created', handlePostCreated)
//     eventSource.addEventListener('error', handleErrorSSE)
//
//     return () => {
//       eventSource.removeEventListener('post-created', handlePostCreated)
//       eventSource.removeEventListener('error', handleErrorSSE)
//       eventSource.close()
//     }
//   }, [onPostCreated])
// }
