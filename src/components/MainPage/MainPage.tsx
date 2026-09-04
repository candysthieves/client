'use client'

import { useMemo, useState } from 'react'
import type { Post } from '@/mocks/posts'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostCard } from '@/components/PostCard'
import { PostModal } from '@/components/PostModal/PostModal'
import { RegisteredUsersCounter } from '@/components/RegisteredUsersCounter'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { usePosts } from '@/lib/posts'
import { getTimeAgo } from '@/lib/utils'
import s from './MainPage.module.scss'

const LATEST_POSTS_LIMIT = 4

type MainPageProps = {
  initialUsersCount: number
}

export const MainPage = ({ initialUsersCount }: MainPageProps) => {
  const [selectedPost, setSelectedPost] = useState<null | Post>(null)
  const isMobile = useIsMobileViewport()
  const { data: posts = [] } = usePosts()

  const latestPosts = useMemo(
    () =>
      [...posts]
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, LATEST_POSTS_LIMIT),
    [posts]
  )

  const selectedIndex = selectedPost
    ? latestPosts.findIndex(post => post.postId === selectedPost.postId)
    : 0

  return (
    <div className={s.root}>
      <RegisteredUsersCounter count={initialUsersCount} />

      <div className={s.postsGrid} data-hidden={!!selectedPost}>
        {latestPosts.map(post => (
          <PostCard
            caption={post.description ?? ''}
            images={post.images.map(image => image.url)}
            key={post.postId}
            onOpen={() => setSelectedPost(post)}
            timeAgo={getTimeAgo(post.createdAt)}
            username={post.userName}
          />
        ))}
      </div>

      {selectedPost &&
        (isMobile ? (
          <MobilePostViewer
            onClose={() => setSelectedPost(null)}
            posts={latestPosts}
            startIndex={selectedIndex}
          />
        ) : (
          <PostModal onClose={() => setSelectedPost(null)} open post={selectedPost} />
        ))}
    </div>
  )
}
