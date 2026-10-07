import type { FieldNamesMarkedBoolean } from 'react-hook-form'
import {
  EditProfileRequest,
  MyProfileResponse,
  RefinedEditProfileRequest,
  UpdateMyProfileRequest,
} from '@/lib/model'

export const toFormValues = (profile: MyProfileResponse): EditProfileRequest => {
  return {
    username: profile.username,
    firstName: profile.firstName ?? '',
    lastName: profile.lastName ?? '',
    aboutMe: profile.aboutMe ?? '',
    countryId: profile.country?.countryId ?? null,
    cityId: profile.city?.cityId ?? null,
    dateOfBirth: profile.dateOfBirth ?? '',
  }
}

// Only changed fields are sent; a cleared optional field is sent as null.
// Date of birth, country and city are visual placeholders for now and are not sent.
export const getChangedProfileFields = (
  values: EditProfileRequest,
  dirtyFields: Partial<Readonly<FieldNamesMarkedBoolean<RefinedEditProfileRequest>>>
): UpdateMyProfileRequest => {
  const changed: UpdateMyProfileRequest = {}

  if (dirtyFields.username) changed.username = values.username
  if (dirtyFields.firstName) changed.firstName = values.firstName || null
  if (dirtyFields.lastName) changed.lastName = values.lastName || null
  if (dirtyFields.aboutMe) changed.aboutMe = values.aboutMe || null
  if (dirtyFields.countryId) changed.countryId = values.countryId || null
  if (dirtyFields.cityId) changed.cityId = values.cityId || null
  if (dirtyFields.dateOfBirth) changed.dateOfBirth = values.dateOfBirth || null

  return changed
}
