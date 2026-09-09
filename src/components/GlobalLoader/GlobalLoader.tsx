'use client'

import { LinearProgress } from '@candy.thieves/ui-kit-lumos'
import { useIsFetching } from '@tanstack/react-query'
import s from './GlobalLoader.module.scss' // ваш компонент лоадера

export const GlobalLoader = () => {
  const isFetching = useIsFetching()

  if (!isFetching) return null

  return <LinearProgress size={'sm'} className={s.progress} />
}
