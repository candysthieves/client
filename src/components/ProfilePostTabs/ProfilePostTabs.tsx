'use client'

import type { ReactNode } from 'react'
import { List, RecycleBin, Tabs } from '@candy.thieves/ui-kit-lumos'
import s from './ProfilePostTabs.module.scss'

type ProfilePostTabsProps = {
  postsFeed: ReactNode
  deletedPosts: ReactNode
  deletedPostsCount: number
}

export const ProfilePostTabs = ({
  postsFeed,
  deletedPosts,
  deletedPostsCount,
}: ProfilePostTabsProps) => {
  const tabs = [
    {
      value: 'publications',
      label: 'Publications',
      icon: <List size={20} svgProps={{ 'aria-hidden': true }} />,
      content: <div className={s.content}>{postsFeed}</div>,
    },
    {
      value: 'recently-deleted',
      label: `Recently deleted (${deletedPostsCount})`,
      icon: <RecycleBin size={20} svgProps={{ 'aria-hidden': true }} />,
      content: <div className={s.content}>{deletedPosts}</div>,
    },
  ]

  return <Tabs className={s.tabs} tabs={tabs} defaultValue={'publications'} />
}
