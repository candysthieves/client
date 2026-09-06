'use client'

import type { ReactNode } from 'react'
import { List, RecycleBin, Tabs } from '@candy.thieves/ui-kit-lumos'
import type { Post } from '@/mocks/posts'
import { DeletedPosts } from '@/components/DeletedPosts'
import s from './ProfilePostTabs.module.scss'

type ProfilePostTabsProps = {
  publicationsContent?: ReactNode
  deletedPosts: Post[]
  userId: string
}

export const ProfilePostTabs = ({
  publicationsContent,
  deletedPosts,
  userId,
}: ProfilePostTabsProps) => {
  const tabs = [
    {
      value: 'publications',
      label: 'Publications',
      icon: <List size={20} svgProps={{ 'aria-hidden': true }} />,
      content: <div className={s.content}>{publicationsContent}</div>,
    },
    {
      value: 'recently-deleted',
      label: `Recently deleted (${deletedPosts.length})`,
      icon: <RecycleBin size={20} svgProps={{ 'aria-hidden': true }} />,
      content: (
        <div className={s.content}>
          <DeletedPosts posts={deletedPosts} userId={userId} />
        </div>
      ),
    },
  ]

  return <Tabs className={s.tabs} tabs={tabs} defaultValue={'publications'} />
}
