import s from './GeneralInformation.module.scss'
import { GeneralInformationForm } from './GeneralInformationForm'

export const GeneralInformation = () => {
  return (
    <div className={s.root}>
      {/* TODO: profile photo with "Select Profile Photo" button — component is built by another developer. */}
      <GeneralInformationForm photoSlot={<div className={s.photoSlot} />} />
    </div>
  )
}
