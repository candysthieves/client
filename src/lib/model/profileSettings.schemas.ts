import { z } from 'zod'
import { MAX_ABOUT_ME_LENGTH } from '@/constants'
import { usernameSchema } from '@/lib/model/auth.schemas'
import { NAME_PATTERN, NAME_PATTERN_MESSAGE } from '@/lib/model/constants'

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

// TODO: change this schema
export const dateOfBirthSchema = z.string().optional()

export const locationCountrySchema = z.object({
  countryId: z.number().nonnegative(),
  countryNameRu: z.string(),
  countryNameEn: z.string(),
})

export const countryIdSchema = z.number().int().positive().nullable() // check nullable() in response
export const cityIdSchema = z.number().int().positive().nullable() // check nullable() in response

export const locationCitySchema = z.object({
  countryId: countryIdSchema,
  cityId: cityIdSchema,
  cityNameRu: z.string(),
  cityNameEn: z.string(),
})

export const editProfileSchema = z
  .object({
    // username: usernameSchema,            // uncomment later
    // firstName: firstNameSchema,          // uncomment later
    // lastName: lastNameSchema,            // uncomment later
    // dateOfBirth: dateOfBirthSchema,      // uncomment later
    countryId: countryIdSchema,
    cityId: cityIdSchema,
    // aboutMe: aboutMeSchema,              // uncomment later
  })
  .superRefine((data, ctx) => {
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
