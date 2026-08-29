'use client'

import { useState } from 'react'
import { PostCard } from '@/components/PostCard'
import { PostViewModal } from '@/components/PostViewModal'
import { RegisteredUsersCounter } from '@/components/RegisteredUsersCounter'
import s from './MainPage.module.scss'
import { mockPosts } from './mockPosts'

export const MainPage = () => {
  const [selectedPostId, setSelectedPostId] = useState<null | string>(null)
  const selectedPost = mockPosts.find(post => post.id === selectedPostId) ?? null

  return (
    <div className={s.root}>
      <RegisteredUsersCounter count={9213} />

      <div className={s.postsGrid} data-hidden={!!selectedPost}>
        {mockPosts.map(post => (
          <PostCard
            caption={post.caption}
            images={post.images}
            key={post.id}
            onOpen={() => setSelectedPostId(post.id)}
            timeAgo={post.timeAgo}
            username={post.username}
          />
        ))}
      </div>

      <PostViewModal onClose={() => setSelectedPostId(null)} post={selectedPost} />
    </div>
  )
}
