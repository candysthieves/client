'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import type { PostAuthor, UserProfile } from '@/lib/model'
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

const EMPTY_AVATAR = { fileId: '', height: 0, url: '', width: 0 }

// PostDetailsModal/MobilePostFeed (built for the single-author /profile page)
// need a full UserProfile just to show the author's name/avatar — our feed only
// has PostAuthor ({id, username}) per post, so fill in the rest with placeholders.
// TEMP: on the mobile viewer this is wrong for every post but the one that was
// opened, since one userProfile is applied to the whole (multi-author) list —
// see PR discussion.
const toUserProfile = (author: PostAuthor): UserProfile => ({
  avatarPreviewUrl: EMPTY_AVATAR,
  avatarUrl: EMPTY_AVATAR,
  description: '',
  followersCount: 0,
  followingCount: 0,
  id: author.id,
  isOwner: false,
  publicationsCount: 0,
  username: author.username,
})

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
            userProfile={toUserProfile(selectedPost.author)}
          />
        ) : (
          <PostModal
            onClose={handleClose}
            open
            post={selectedPost}
            userProfile={toUserProfile(selectedPost.author)}
          />
        ))}
    </div>
  )
}
