'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { Post } from '@/mocks/posts'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostCard } from '@/components/PostCard'
import { PostModal } from '@/components/PostModal/PostModal'
import { RegisteredUsersCounter } from '@/components/RegisteredUsersCounter'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { getTimeAgo } from '@/lib/utils'
import s from './MainPage.module.scss'

type MainPageProps = {
  initialUsersCount: number
  posts: Post[]
}

export const MainPage = ({ initialUsersCount, posts }: MainPageProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useIsMobileViewport()

  const postId = searchParams.get('postId')
  const selectedPost = postId ? (posts.find(post => post.postId === postId) ?? null) : null

  const selectedIndex = selectedPost
    ? posts.findIndex(post => post.postId === selectedPost.postId)
    : 0

  const handleClose = () => router.push('/')

  return (
    <div className={s.root}>
      <RegisteredUsersCounter count={initialUsersCount} />

      <div className={s.postsGrid} data-hidden={!!selectedPost}>
        {posts.map(post => (
          <PostCard
            caption={post.description ?? ''}
            images={post.images.map(image => image.url)}
            key={post.postId}
            onOpen={() => router.push(`/?postId=${post.postId}`)}
            timeAgo={getTimeAgo(post.createdAt)}
            username={post.userName}
          />
        ))}
      </div>

      {selectedPost &&
        (isMobile ? (
          <MobilePostViewer onClose={handleClose} posts={posts} startIndex={selectedIndex} />
        ) : (
          <PostModal onClose={handleClose} open post={selectedPost} />
        ))}
    </div>
  )
}
