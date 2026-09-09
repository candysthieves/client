'use client'

import { Button, MainAvatar, Typography } from '@candy.thieves/ui-kit-lumos'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { MobilePostViewer } from '@/components/MobilePostViewer/MobilePostViewer'
import { PostModal } from '@/components/PostModal/PostModal'
import { CreatePostModal } from '@/features/createPost'
import { useIsMobileViewport } from '@/lib/hooks/useIsMobileViewport'
import { usePost } from '@/lib/posts'
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

  const { data: profile, isError: isProfileError, isLoading: isProfileLoading } = useProfile(userId)

  const {
    data: profilePostsResponse,
    isError: isPostsError,
    isLoading: isPostsLoading,
  } = useProfilePosts(userId)

  const { data: postDetails } = usePost(postId)
  const isOwner = profile?.isOwner ?? false
  const profilePosts = profilePostsResponse?.items ?? []

  // Check if this useEffect is needed
  useEffect(() => {
    if (postDetails && postDetails.author.id !== userId) {
      router.replace(`/profile/${userId}`)
    }
  }, [postDetails, router, userId])

  const selectedIndex = profilePosts.findIndex(post => post.id === postId)
  const modalPost = postDetails?.author.id === userId ? postDetails : undefined
  const mobilePosts = selectedIndex === -1 && modalPost ? [modalPost] : profilePosts
  const showCreateModal = !postId && action === 'create'
  const handleClosePost = () => router.replace(`/profile/${userId}`)

  if (isProfileLoading) {
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

        <PostsFeed isLoading={isPostsLoading} posts={profilePosts} userId={userId} />
      </div>

      {postId &&
        profile &&
        (isMobile
          ? mobilePosts.length > 0 && (
              <MobilePostViewer
                userProfile={profile}
                onClose={handleClosePost}
                posts={mobilePosts}
                startIndex={selectedIndex === -1 ? 0 : selectedIndex}
                userId={userId}
              />
            )
          : modalPost && (
              <PostModal userProfile={profile} post={modalPost} open onClose={handleClosePost} />
            ))}

      {showCreateModal && isOwner && profile && <CreatePostModal userProfile={profile} />}
    </>
  )
}
