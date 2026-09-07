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
  initialUsersCount: null | number
  posts: null | Post[]
}

export const MainPage = ({ initialUsersCount, posts }: MainPageProps) => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useIsMobileViewport()

  const postList = posts ?? []

  const postId = searchParams.get('postId')
  const selectedPost = postId ? (postList.find(post => post.postId === postId) ?? null) : null

  const selectedIndex = selectedPost
    ? postList.findIndex(post => post.postId === selectedPost.postId)
    : 0

  const handleClose = () => router.push('/')

  return (
    <div className={s.root}>
      {initialUsersCount === null ? (
        <p className={s.errorMessage}>Failed to load registered users count</p>
      ) : (
        <RegisteredUsersCounter count={initialUsersCount} />
      )}

      {posts === null ? (
        <p className={s.errorMessage}>Failed to load posts. Try refreshing the page.</p>
      ) : (
        <div className={s.postsGrid} data-hidden={!!selectedPost}>
          {postList.map(post => (
            <PostCard
              caption={post.description ?? ''}
              images={post.images.map(image => image.url)}
              key={post.postId}
              postId={post.postId}
              timeAgo={getTimeAgo(post.createdAt)}
              username={post.userName}
            />
          ))}
        </div>
      )}

      {selectedPost &&
        (isMobile ? (
          <MobilePostViewer onClose={handleClose} posts={postList} startIndex={selectedIndex} />
        ) : (
          <PostModal onClose={handleClose} open post={selectedPost} />
        ))}
    </div>
  )
}
