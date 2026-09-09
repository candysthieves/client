'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostCard } from '@/components/PostCard'
import { PostModal } from '@/components/PostModal/PostModal'
import { RegisteredUsersCounter } from '@/components/RegisteredUsersCounter'
import { LATEST_POSTS_LIMIT, useFeedPosts } from '@/lib/feed'
import { useAuth } from '@/lib/hooks/useAuth'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { useUsersCount } from '@/lib/users'
import { getTimeAgo } from '@/lib/utils'
import s from './MainPage.module.scss'

export const MainPage = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const isMobile = useIsMobileViewport()
  const { user } = useAuth()

  const { data: usersCount, isError: isUsersCountError } = useUsersCount()
  const { data: posts, isError: isPostsError } = useFeedPosts(LATEST_POSTS_LIMIT)

  const postList = posts ?? []

  const postId = searchParams.get('postId')
  const selectedPost = postId ? (postList.find(post => post.id === postId) ?? null) : null

  const selectedIndex = selectedPost ? postList.findIndex(post => post.id === selectedPost.id) : 0

  const handleClose = () => router.push('/')

  return (
    <div className={s.root}>
      {isUsersCountError ? (
        <p className={s.errorMessage}>Failed to load registered users count</p>
      ) : (
        <RegisteredUsersCounter count={usersCount?.count ?? 0} />
      )}

      {isPostsError ? (
        <p className={s.errorMessage}>Failed to load posts. Try refreshing the page.</p>
      ) : (
        <div className={s.postsGrid} data-hidden={!!selectedPost}>
          {postList.map(post => (
            <PostCard
              caption={post.description ?? ''}
              images={post.images.map(image => image.url)}
              key={post.id}
              postId={post.id}
              timeAgo={getTimeAgo(post.createdAt)}
              username={post.author.username}
            />
          ))}
        </div>
      )}

      {selectedPost &&
        (isMobile ? (
          <MobilePostViewer
            onClose={handleClose}
            posts={postList}
            startIndex={selectedIndex}
            userId={user?.id ?? ''}
          />
        ) : (
          <PostModal onClose={handleClose} open post={selectedPost} />
        ))}
    </div>
  )
}
