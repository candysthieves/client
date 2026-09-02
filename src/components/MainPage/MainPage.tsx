'use client'

import { useState } from 'react'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostCard } from '@/components/PostCard'
import { PostModal } from '@/components/PostModal/PostModal'
import { RegisteredUsersCounter } from '@/components/RegisteredUsersCounter'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { mockPosts, type Post } from '@/mocks/posts'
import s from './MainPage.module.scss'

type MainPageProps = {
  initialUsersCount: number
}

export const MainPage = ({ initialUsersCount }: MainPageProps) => {
  const [selectedPost, setSelectedPost] = useState<null | Post>(null)
  const isMobile = useIsMobileViewport()

  const selectedIndex = selectedPost
    ? mockPosts.findIndex(post => post.postId === selectedPost.postId)
    : 0

  return (
    <div className={s.root}>
      <RegisteredUsersCounter count={initialUsersCount} />

      <div className={s.postsGrid} data-hidden={!!selectedPost}>
        {mockPosts.map(post => (
          <PostCard
            caption={post.description ?? ''}
            images={post.images.map(image => image.url)}
            key={post.postId}
            onOpen={() => setSelectedPost(post)}
            timeAgo={post.createdAt}
            username={post.userName}
          />
        ))}
      </div>

      {selectedPost &&
        (isMobile ? (
          <MobilePostViewer
            onClose={() => setSelectedPost(null)}
            posts={mockPosts}
            startIndex={selectedIndex}
          />
        ) : (
          <PostModal onClose={() => setSelectedPost(null)} open post={selectedPost} />
        ))}
    </div>
  )
}
