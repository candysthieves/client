'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import { useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ProfileHeader } from '@/app/(public)/profile/[id]/ProfileHeader/ProfileHeader'
import { ProfilePostContent } from '@/app/(public)/profile/[id]/ProfilePostContent/ProfilePostContent'
import { ProfilePostModals } from '@/app/(public)/profile/[id]/ProfilePostModals/ProfilePostModals'
import { getUserProfile } from '@/lib/api'
import { useAuth } from '@/lib/hooks'
import { UserProfile } from '@/lib/model'
import { postsKeys } from '@/lib/posts'
import { profileKeys, useProfile } from '@/lib/profile'
import s from './ProfileClient.module.scss'
import { ProfileHeaderSkeleton } from './ProfileHeader/ProfileHeaderSkeleton'

type ProfileClientProps = {
  userId: string
  postId?: string
  action?: string
}

export function ProfileClient({ userId, postId, action }: ProfileClientProps) {
  const searchParams = useSearchParams()

  const { isAuthenticated, isHydrated } = useAuth()
  const isAuth = isHydrated && isAuthenticated

  const [personalizedProfile, setPersonalizedProfile] = useState<null | UserProfile>(null)

  const { data: profile, isError: isProfileError, isLoading: isProfileLoading } = useProfile(userId)

  const displayedProfile = personalizedProfile ?? profile

  const isProfilePersonalized = isAuth && personalizedProfile !== null
  const isOwner = isProfilePersonalized && displayedProfile?.viewerStatus === 'owner'

  const postType = searchParams.get('type')
  const isDeletedPost = postType === 'deleted'

  const queryClient = useQueryClient()

  useEffect(() => {
    if (!isAuth) {
      return
    }

    let cancelled = false
    const queryKey = profileKeys.detail(userId)

    const loadPersonalizedProfile = async () => {
      void queryClient.invalidateQueries({
        queryKey,
        refetchType: 'none',
      })

      if (cancelled) {
        return
      }

      const result = await queryClient.fetchQuery({
        queryKey,
        queryFn: () => getUserProfile(userId),
        staleTime: 0,
      })

      if (!cancelled) {
        setPersonalizedProfile(result)
      }
    }

    void loadPersonalizedProfile().catch(() => undefined)

    if (postId && !isDeletedPost) {
      void queryClient.invalidateQueries({
        queryKey: postsKeys.post(postId),
      })
    }

    return () => {
      cancelled = true
    }
  }, [isAuth, isHydrated, isAuthenticated, queryClient, userId, postId, isDeletedPost])

  if (isProfileError) {
    return (
      <section className={s.profileError} role={'alert'}>
        <Typography color={'var(--color-light-100)'} variant={'h1'}>
          Unable to load profile
        </Typography>
        <Typography color={'var(--color-light-900)'} variant={'body1'}>
          Profile not found. Please check the link or try again later
        </Typography>
      </section>
    )
  }
  return (
    <>
      <div className={s.profile}>
        {isProfileLoading ? (
          <ProfileHeaderSkeleton userId={userId} />
        ) : (
          profile && (
            <ProfileHeader
              profile={displayedProfile ?? profile}
              userId={userId}
              isPersonalized={isProfilePersonalized}
            />
          )
        )}

        <ProfilePostContent userId={userId} isOwner={isOwner} />
      </div>

      {profile && (
        <ProfilePostModals
          userId={userId}
          postId={postId}
          action={action}
          isOwner={isOwner}
          profile={profile}
          displayedProfile={displayedProfile ?? profile}
        />
      )}
    </>
  )
}
