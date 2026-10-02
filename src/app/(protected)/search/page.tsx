'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import { ProfileAvatarEditor } from '@/components/ProfileAvatarEditor'
import { useDeleteAvatar } from '@/lib/avatar'
import { useAuth } from '@/lib/hooks'
import { useProfile } from '@/lib/profile'

const AVATAR =
  'https://images.unsplash.com/photo-1790354760502-5a64e3cdfa45?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export default function Search() {
  const { user, isLoading } = useAuth()

  const {
    data: TEMPORARY_PROFILE_DATA,
    isError: isProfileError,
    isLoading: isProfileLoading,
  } = useProfile(user?.id ?? '')

  console.log(TEMPORARY_PROFILE_DATA)
  console.log(TEMPORARY_PROFILE_DATA?.avatarUrl?.url)

  return (
    <main>
      <h1>Search</h1>
      <Typography variant={'caption1'}>Search content</Typography>
      <ProfileAvatarEditor avatarSource={TEMPORARY_PROFILE_DATA?.avatarUrl?.url ?? null} />
      <ProfileAvatarEditor avatarSource={AVATAR} />
      <ProfileAvatarEditor avatarSource={null} />
    </main>
  )
}
