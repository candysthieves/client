'use client'

import { ProfileAvatarEditor } from '@/components/ProfileAvatarEditor'
import { GeneralInformationForm } from './GeneralInformationForm'
import s from './InfoTab.module.scss'

export const InfoTab = () => {
  return (
    <div className={s.layout}>
      <div className={s.photo}>
        <ProfileAvatarEditor />
      </div>

      <GeneralInformationForm />
      <div className={s.divider} />
    </div>
  )
}
