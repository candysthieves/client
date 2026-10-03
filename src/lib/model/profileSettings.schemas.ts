import { z } from 'zod'
import { MAX_ABOUT_ME_LENGTH } from '@/constants'
import { usernameSchema } from './auth.schemas'
import { NAME_PATTERN, NAME_PATTERN_MESSAGE } from './constants'

export const firstNameSchema = z
  .string()
  .min(1, 'First name must be longer than or equal to 1 character')
  .max(50, 'First name must be shorter than or equal to 50 characters')
  .regex(NAME_PATTERN, NAME_PATTERN_MESSAGE)

export const lastNameSchema = z
  .string()
  .min(1, 'Last name must be longer than or equal to 1 character')
  .max(50, 'Last name must be shorter than or equal to 50 characters')
  .regex(NAME_PATTERN, NAME_PATTERN_MESSAGE)

export const aboutMeSchema = z
  .string()
  .max(
    MAX_ABOUT_ME_LENGTH,
    `About me must be shorter than or equal to ${MAX_ABOUT_ME_LENGTH} characters`
  )

// Placeholder fields: date of birth, country, and city are not yet backed by real pickers
// (owned by other in-progress tasks), so for now they're just optional free-form strings.
export const dateOfBirthSchema = z.string().optional()
export const countrySchema = z.string().optional()
export const citySchema = z.string().optional()

export const editProfileSchema = z.object({
  username: usernameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  dateOfBirth: dateOfBirthSchema,
  country: countrySchema,
  city: citySchema,
  aboutMe: aboutMeSchema,
})

export const myProfileResponseSchema = z.object({
  username: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  dateOfBirth: z.string().nullable(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  aboutMe: z.string().nullable(),
})

export const updateMyProfileSchema = myProfileResponseSchema.partial()
