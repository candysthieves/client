'use client'

import { Typography } from '@candy.thieves/ui-kit-lumos'
import { ProfileAvatarEditor } from '@/components/ProfileAvatarEditor'

const AVATAR =
  'https://images.unsplash.com/photo-1790354760502-5a64e3cdfa45?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

export default function Search() {
  return (
    <main>
      <h1>Search</h1>
      <Typography variant={'caption1'}>Search content</Typography>
      <ProfileAvatarEditor avatarSource={AVATAR} />
      <ProfileAvatarEditor avatarSource={null} />
    </main>
  )
}
