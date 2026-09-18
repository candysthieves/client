'use client'

import { useEffect, useState } from 'react'
import { TIME_AGO_TICK_INTERVAL_MS } from '@/constants'
import { getTimeAgo } from './getTimeAgo'

export const useTimeAgo = (date: string): string => {
  const [timeAgo, setTimeAgo] = useState(() => getTimeAgo(date))

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTimeAgo(getTimeAgo(date))
    }, TIME_AGO_TICK_INTERVAL_MS)

    return () => clearInterval(intervalId)
  }, [date])

  return timeAgo
}
