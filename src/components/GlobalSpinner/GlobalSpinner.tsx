'use client'

import { CircularProgress } from '@candy.thieves/ui-kit-lumos'
import { useIsFetching } from '@tanstack/react-query'
import s from './GlobalSpinner.module.scss'

export const GlobalSpinner = () => {
  const isFetching = useIsFetching()

  if (!isFetching) return null
  return (
    <div className={s.spinnerContainer}>
      <CircularProgress size={'md'} color={'primary'} className={s.spinner} />
    </div>
  )
}
