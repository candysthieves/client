import { useEffect } from 'react'
import { NEXT_PUBLIC_API_URL } from '@/constants'
import { AvatarEditedEvent } from '@/features/createPost'
import { paymentProcessedEventSchema } from '@/lib/model'
import { isError } from '@/lib/utils'

type UsePaymentEventsProps = {
  handlePaymentProcessed: (userId: string, status: string) => void
}

export const usePaymentEvents = ({ handlePaymentProcessed }: UsePaymentEventsProps) => {
  useEffect(() => {
    const eventSource = new EventSource(`${NEXT_PUBLIC_API_URL}/events`, {
      withCredentials: true,
    })

    const onPaymentProcessed = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as AvatarEditedEvent

        const validatedData = paymentProcessedEventSchema.parse(data)

        handlePaymentProcessed(validatedData.userId, validatedData.status)
      } catch (error) {
        if (isError(error)) {
          console.error(`SSE parse error: ${error.name} - ${error.message}`)
        } else {
          console.error('Unknown error type:', error)
        }
      }
    }

    eventSource.addEventListener('payment-processed', onPaymentProcessed) // TODO Change Later

    eventSource.onerror = error => {
      console.error('SSE connection error:', error)
    }

    return () => {
      eventSource.removeEventListener('payment-processed', onPaymentProcessed) // TODO Change Later
      eventSource.close()
    }
  }, [handlePaymentProcessed])
}
