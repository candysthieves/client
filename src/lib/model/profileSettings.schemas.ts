import { z } from 'zod'
import { MAX_ABOUT_ME_LENGTH } from '@/constants'
import { isUnderAge } from '@/lib/utils'
import { usernameSchema } from './auth.schemas'
import {
  MIN_USER_AGE,
  NAME_PATTERN,
  NAME_PATTERN_MESSAGE,
  UNDER_AGE_ERROR_MESSAGE,
} from './constants'

// Empty first/last name is allowed: the user may save any single field without filling the rest.
export const firstNameSchema = z
  .string()
  .max(50, 'First name must be shorter than or equal to 50 characters')
  .regex(NAME_PATTERN, NAME_PATTERN_MESSAGE)
  .or(z.literal(''))

export const lastNameSchema = z
  .string()
  .max(50, 'Last name must be shorter than or equal to 50 characters')
  .regex(NAME_PATTERN, NAME_PATTERN_MESSAGE)
  .or(z.literal(''))

export const aboutMeSchema = z
  .string()
  .max(
    MAX_ABOUT_ME_LENGTH,
    `About me must be shorter than or equal to ${MAX_ABOUT_ME_LENGTH} characters`
  )

// UI: dd.mm.yyyy
export const dateOfBirthInputSchema = z
  .string()
  .optional()
  .superRefine((value, ctx) => {
    if (!value) return

    if (isUnderAge(value, MIN_USER_AGE)) {
      ctx.addIssue({
        code: 'custom',
        message: UNDER_AGE_ERROR_MESSAGE,
      })
    }
  })

// API: yyyy-mm-dd
export const dateOfBirthApiSchema = z.iso.date().optional().nullable()

export const countryIdSchema = z.number().int().positive().nullable() // check nullable() in response
export const cityIdSchema = z.number().int().positive().nullable() // check nullable() in response

export const locationCountrySchema = z.object({
  countryId: countryIdSchema,
  countryNameRu: z.string(),
  countryNameEn: z.string(),
})

export const locationCitySchema = z.object({
  countryId: countryIdSchema,
  cityId: cityIdSchema.nullable(),
  cityNameRu: z.string(),
  cityNameEn: z.string(),
})

// Response
export const myProfileResponseSchema = z.object({
  username: usernameSchema,
  firstName: firstNameSchema.nullable(),
  lastName: lastNameSchema.nullable(),
  dateOfBirth: dateOfBirthApiSchema,
  country: locationCountrySchema.nullable(),
  city: locationCitySchema.nullable(),
  aboutMe: aboutMeSchema.nullable(),
})

// React hook form inputs validation schema
export const editProfileSchema = z.object({
  username: usernameSchema,
  firstName: firstNameSchema.nullable(),
  lastName: lastNameSchema.nullable(),
  dateOfBirth: dateOfBirthInputSchema.nullable(),
  countryId: countryIdSchema.nullable(),
  cityId: cityIdSchema.nullable(),
  aboutMe: aboutMeSchema.nullable(),
})

export const refinedEditProfileSchema = editProfileSchema.superRefine((data, ctx) => {
  if (data.countryId != null && data.cityId == null) {
    ctx.addIssue({
      code: 'custom',
      path: ['cityId'],
      message: 'Select a city',
    })
  }
  if (data.countryId == null && data.cityId != null) {
    ctx.addIssue({
      code: 'custom',
      path: ['countryId'],
      message: 'Select a country first',
    })
  }
})

// Request
export const updateMyProfileRequestSchema = editProfileSchema.partial()
