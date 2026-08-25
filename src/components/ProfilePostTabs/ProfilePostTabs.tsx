'use client'

import type { ReactNode } from 'react'
import { Tabs } from '@candy.thieves/ui-kit-lumos'
import { DeletedPosts } from '@/components/DeletedPosts'
import s from './ProfilePostTabs.module.scss'

type ProfilePostTabsProps = {
  publicationsContent?: ReactNode
}

export const ProfilePostTabs = ({ publicationsContent }: ProfilePostTabsProps) => {
  const tabs = [
    {
      value: 'publications',
      label: 'Publications',
      content: <div className={s.content}>{publicationsContent}</div>,
    },
    {
      value: 'recently-deleted',
      label: 'Recently deleted',
      content: (
        <div className={s.content}>
          <DeletedPosts />
        </div>
      ),
    },
  ]

  return <Tabs className={s.tabs} tabs={tabs} defaultValue={'publications'} />
}
