'use client'

import { CircularProgress } from '@candy.thieves/ui-kit-lumos'
import { useIsFetching } from '@tanstack/react-query'
import s from './GlobalSpinner.module.scss'

export const GlobalSpinner = () => {
  return (
    <div className={s.spinnerContainer}>
      <CircularProgress size={'lg'} color={'primary'} className={s.spinner} />
    </div>
  )
}
