import s from './GeneralInformation.module.scss'
import { GeneralInformationForm } from './GeneralInformationForm'

export const GeneralInformation = () => {
  return (
    <div className={s.content}>
      {/* TODO: profile photo with "Select Profile Photo" button — component is built by another developer. */}
      <div className={s.photoSlot} />

      <div className={s.form}>
        <GeneralInformationForm />
      </div>
    </div>
  )
}
