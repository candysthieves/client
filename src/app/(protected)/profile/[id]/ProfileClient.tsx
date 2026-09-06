'use client'

import { Button, MainAvatar, Typography } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { Post } from '@/mocks/posts'
import { DeletedPosts } from '@/components/DeletedPosts'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostModal } from '@/components/PostModal/PostModal'
import { ProfilePostTabs } from '@/components/ProfilePostTabs'
import { CreatePostModal } from '@/features/createPost'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { useDeletedPost, useDeletedPosts } from '@/lib/posts'
import { useProfile, useProfilePosts } from '@/lib/profile'
import { PostsFeed } from './PostsFeed'
import s from './ProfileClient.module.scss'
import { ProfileSkeleton } from './ProfileSkeleton'

type ProfileClientProps = {
  userId: string
  postId?: string
  action?: string
}

export function ProfileClient({ userId, postId, action }: ProfileClientProps) {
  const router = useRouter()
  const isMobile = useIsMobileViewport()
  const [dismissedPostId, setDismissedPostId] = useState<string>()
  const { data: profile, isError: isProfileError, isLoading: isProfileLoading } = useProfile(userId)
  const {
    data: profilePostsResponse,
    isError: isPostsError,
    isLoading: isPostsLoading,
  } = useProfilePosts(userId)
  const isOwner = profile?.isOwner ?? false
  const {
    data: deletedPosts = [],
    isError: isDeletedPostsError,
    isLoading: isDeletedPostsLoading,
  } = useDeletedPosts(isOwner ? userId : undefined)
  const activeProfilePosts = (profilePostsResponse?.items ?? []).filter(
    post => post.willBeDeleted === null
  )
  const profilePosts: Post[] = activeProfilePosts.map(post => {
    const fallbackImage = { url: '/post-placeholder.svg' }

    return {
      postId: post.id,
      description: post.description,
      images: post.images.length > 0 ? post.images : [fallbackImage],
      preview: post.preview ?? post.images[0] ?? fallbackImage,
      userId,
      userName: profile?.username ?? userId,
      createdAt: post.createdAt,
      willBeDeletedIn: post.willBeDeleted ? new Date(post.willBeDeleted) : null,
    }
  })

  const selectedPublishedPost = profilePosts.find(post => post.postId === postId)
  const { data: requestedDeletedPost } = useDeletedPost(
    postId,
    isOwner && Boolean(postId) && !selectedPublishedPost
  )
  const selectedDeletedPost =
    requestedDeletedPost ?? deletedPosts.find(post => post.postId === postId)
  const selectedPost = selectedPublishedPost ?? selectedDeletedPost
  const visibleSelectedPost = dismissedPostId === postId ? undefined : selectedPost
  const selectedIndex = selectedPublishedPost
    ? profilePosts.findIndex(post => post.postId === selectedPublishedPost.postId)
    : 0
  const showCreateModal = !postId && action === 'create'
  const handleClosePost = () => {
    setDismissedPostId(postId)
    router.replace(`/profile/${userId}`)
  }

  useEffect(() => {
    if (postId) {
      return
    }

    const timeoutId = window.setTimeout(() => setDismissedPostId(undefined), 0)

    return () => window.clearTimeout(timeoutId)
  }, [postId])

  if (isProfileLoading || isPostsLoading) {
    return <ProfileSkeleton />
  }

  if (isProfileError || isPostsError) {
    return (
      <section className={s.profileError} role={'alert'}>
        <Typography color={'var(--color-light-100)'} variant={'h1'}>
          Unable to load profile
        </Typography>
        <Typography color={'var(--color-light-900)'} variant={'body1'}>
          Please try again later.
        </Typography>
      </section>
    )
  }

  return (
    <>
      <div className={s.profile}>
        <section className={s.profileHeader} aria-labelledby={'profile-name'}>
          <MainAvatar
            className={s.profileAvatar}
            userName={profile?.username ?? userId}
            src={profile?.avatarPreviewUrl.url}
            size={'xxl'}
            delayMs={0}
          />

          <div className={s.profileInfo}>
            <Typography
              id={'profile-name'}
              className={s.profileName}
              color={'white'}
              variant={'h1'}
            >
              {profile?.username ?? userId}
            </Typography>

            {isOwner && (
              <Button
                as={Link}
                className={s.settingsButton}
                href={'/profile/general-information'}
                variant={'secondary'}
              >
                Profile Settings
              </Button>
            )}

            <dl className={s.stats}>
              <div className={s.stat}>
                <dt className={s.statLabel}>Publications</dt>
                <dd className={s.statValue}>{profile?.publicationsCount ?? 0}</dd>
              </div>
            </dl>

            <Typography className={s.about} variant={'body1'}>
              <span className={s.aboutLabel}>About me</span>
              {profile?.description ?? ''}
            </Typography>
          </div>
        </section>

        {isOwner ? (
          <ProfilePostTabs
            postsFeed={<PostsFeed posts={activeProfilePosts} userId={userId} />}
            deletedPosts={
              <DeletedPosts
                posts={deletedPosts}
                userId={userId}
                isError={isDeletedPostsError}
                isLoading={isDeletedPostsLoading}
              />
            }
            deletedPostsCount={deletedPosts.length}
          />
        ) : (
          <PostsFeed posts={activeProfilePosts} userId={userId} />
        )}
      </div>

      {visibleSelectedPost &&
        (isMobile && selectedPublishedPost ? (
          <MobilePostViewer
            onClose={handleClosePost}
            posts={profilePosts}
            startIndex={selectedIndex}
            userId={userId}
          />
        ) : (
          <PostModal
            post={visibleSelectedPost}
            mode={selectedDeletedPost ? 'deleted' : 'published'}
            open
            onClose={handleClosePost}
          />
        ))}

      {showCreateModal && isOwner && <CreatePostModal userId={userId} />}
    </>
  )
}
