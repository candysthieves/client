import { z } from 'zod'
import { MAX_ABOUT_ME_LENGTH } from '@/constants'
import { isUnderAge } from '@/lib/utils/isUnderAge'
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

// Placeholder fields: country and city are not yet backed by real pickers
// (owned by other in-progress tasks), so for now they're just optional free-form strings.
export const countrySchema = z.string().optional()
export const citySchema = z.string().optional()

export const editProfileSchema = z.object({
  username: usernameSchema,
  firstName: firstNameSchema,
  lastName: lastNameSchema,
  dateOfBirth: dateOfBirthInputSchema,
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

export const updateMyProfileSchema = myProfileResponseSchema.partial().extend({
  dateOfBirth: dateOfBirthApiSchema,
})
