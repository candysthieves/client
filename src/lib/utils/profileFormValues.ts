import type { FieldNamesMarkedBoolean } from 'react-hook-form'
import type { EditProfileRequest, MyProfileResponse, UpdateMyProfileRequest } from '@/lib/model'

export const toFormValues = (profile: MyProfileResponse): EditProfileRequest => ({
  username: profile.username,
  firstName: profile.firstName ?? '',
  lastName: profile.lastName ?? '',
  aboutMe: profile.aboutMe ?? '',
  countryId: profile.country?.countryId ?? null,
  cityId: profile.city?.cityId ?? null,
  dateOfBirth: profile.dateOfBirth ?? '',
})

// Only changed fields are sent; a cleared optional field is sent as null.
// Date of birth, country and city are visual placeholders for now and are not sent.
export const getChangedProfileFields = (
  values: EditProfileRequest,
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<EditProfileRequest>>>
): UpdateMyProfileRequest => {
  const changed: UpdateMyProfileRequest = {}

  if (dirtyFields.username) changed.username = values.username
  if (dirtyFields.firstName) changed.firstName = values.firstName || null
  if (dirtyFields.lastName) changed.lastName = values.lastName || null
  if (dirtyFields.aboutMe) changed.aboutMe = values.aboutMe || null

  return changed
}
