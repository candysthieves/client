'use client'

import { Button, MainAvatar, Typography } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { DeletedPosts } from '@/components/DeletedPosts'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostModal } from '@/components/PostModal/PostModal'
import { ProfilePostTabs } from '@/components/ProfilePostTabs'
import { CreatePostModal } from '@/features/createPost'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { usePost } from '@/lib/posts'
import { useDeletedPosts, useProfile, useProfilePosts } from '@/lib/profile'
import { useDeletedPost } from '@/lib/profile/queries/useDeletedPost'
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
  const searchParams = useSearchParams()
  const isMobile = useIsMobileViewport()

  const { data: profile, isError: isProfileError, isLoading: isProfileLoading } = useProfile(userId)

  const postType = searchParams.get('type')
  const isDeletedPost = postType === 'deleted'

  const {
    data: profilePostsResponse,
    isError: isPostsError,
    isLoading: isPostsLoading,
  } = useProfilePosts(userId)
  const { data: postDetails } = usePost(isDeletedPost ? undefined : postId)
  const isOwner = profile?.isOwner ?? false
  const profilePosts = profilePostsResponse?.items ?? []
  const {
    data: deletedPostsResponse,
    isError: isDeletedPostsError,
    isLoading: isDeletedPostsLoading,
  } = useDeletedPosts(userId, isOwner)

  const deletedPosts = deletedPostsResponse?.items ?? []
  const { data: requestedDeletedPostResponse } = useDeletedPost(postId, isOwner && isDeletedPost)

  useEffect(() => {
    // ИСПРАВЛЕНО: Проверка сработает только для активных постов
    if (!isDeletedPost && postDetails && postDetails.author?.id !== userId) {
      router.replace(`/profile/${userId}`)
    }
  }, [postDetails, router, userId, isDeletedPost])

  const modalPost = postDetails?.author?.id === userId ? postDetails : undefined
  const selectedPublishedPost = profilePosts.find(post => post.id === postId)
  const selectedDeletedPost =
    requestedDeletedPostResponse ?? deletedPosts.find(post => post.id === postId)
  const selectedMobilePost = isDeletedPost
    ? selectedDeletedPost
    : (selectedPublishedPost ?? modalPost)
  const mobilePosts = selectedMobilePost ? [selectedMobilePost] : []

  const selectedPost = isDeletedPost ? selectedDeletedPost : selectedPublishedPost

  const showCreateModal = isOwner && action === 'create' && !postId
  const handleClosePost = () => router.replace(`/profile/${userId}`)

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
            src={profile?.avatarPreviewUrl?.url ?? ''}
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
            postsFeed={
              <PostsFeed isLoading={isPostsLoading} posts={profilePosts} userId={userId} />
            }
            deletedPosts={
              <DeletedPosts
                key={deletedPosts.map(post => post.id).join(',')}
                posts={deletedPosts}
                userId={userId}
                isError={isDeletedPostsError}
                isLoading={isDeletedPostsLoading}
              />
            }
            deletedPostsCount={deletedPosts.length}
          />
        ) : (
          <PostsFeed isLoading={isPostsLoading} posts={profilePosts} userId={userId} />
        )}
      </div>

      {selectedPost &&
        profile &&
        (isMobile ? (
          <MobilePostViewer
            userProfile={profile}
            onClose={handleClosePost}
            posts={mobilePosts}
            startIndex={0}
            userId={userId}
            mode={isDeletedPost ? 'deleted' : 'published'}
          />
        ) : (
          <PostModal
            userProfile={profile}
            post={selectedPost}
            mode={isDeletedPost ? 'deleted' : 'published'}
            open
            onClose={handleClosePost}
          />
        ))}

      {showCreateModal && isOwner && profile && <CreatePostModal userProfile={profile} />}
    </>
  )
}
