'use client'

import { Header } from '@candy.thieves/ui-kit-lumos'
import { isAuthenticated } from '@/shared/config/isAuthenticated'

export const AppHeader = () => {
  return <Header isAuthenticated={isAuthenticated} />
}
