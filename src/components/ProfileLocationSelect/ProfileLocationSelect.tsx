'use client'

import { SearchableSelect, Typography } from '@candy.thieves/ui-kit-lumos'
import { useMemo } from 'react'
import { SELECT_SEARCH_DEBOUNCE } from '@/constants'
import { CityId, CountryId } from '@/lib/model'
import { useCities, useCountries } from '@/lib/profileLocation'
import s from './ProfileLocationSelect.module.scss'

export type ProfileLocationValue = {
  countryId: CountryId
  cityId: CityId
}

export type ProfileLocationSelectProps = {
  value: ProfileLocationValue
  onChange: (value: ProfileLocationValue) => void
  disabled?: boolean
  onBlur?: () => void
  countryError?: string
  cityError?: string
}

export const ProfileLocationSelect = ({
  value,
  onChange,
  disabled,
  countryError,
  cityError,
  onBlur,
}: ProfileLocationSelectProps) => {
  const { data: countries = [], isPending: isCountriesPending } = useCountries()
  const { data: cities = [], isPending: isCitiesPending } = useCities(value.countryId, {
    enabled: value.countryId != null,
  })

  const countryOptions = useMemo(
    () =>
      countries.map(country => ({
        value: String(country.countryId),
        label: country.countryNameEn,
      })),
    [countries]
  )

  const cityOptions = useMemo(
    () => cities.map(city => ({ value: String(city.cityId), label: city.cityNameEn })),
    [cities]
  )

  const handleCountryChange = (newValue: string) => {
    const newCountryId = Number(newValue)
    if (Number.isNaN(newCountryId)) return
    onChange({ countryId: newCountryId, cityId: null })
    // onBlur?.()
  }

  const handleCityChange = (newValue: string) => {
    const newCityId = Number(newValue)
    if (Number.isNaN(newCityId)) return
    onChange({ countryId: value.countryId, cityId: newCityId })
    // onBlur?.()
  }

  const isCityDisabled = disabled || value.countryId == null || isCitiesPending

  return (
    <div className={s.locationContainer} onBlur={onBlur}>
      <div className={s.selectItem}>
        <SearchableSelect
          label={'Select your country'}
          placeholder={isCountriesPending ? 'Loading…' : 'Country'}
          options={countryOptions}
          value={value.countryId != null ? String(value.countryId) : undefined}
          debounceDelay={SELECT_SEARCH_DEBOUNCE}
          onValueChange={handleCountryChange}
          disabled={disabled || isCountriesPending}
          aria-invalid={Boolean(countryError)}
          className={s.locationSelect}
          viewportProps={{ className: s.locationViewport }}
        />

        {countryError && (
          <Typography
            className={s.errorMessage}
            variant={'form-error'}
            color={'var(--color-danger-500)'}
            role={'alert'}
          >
            {countryError}
          </Typography>
        )}
      </div>

      <div className={s.selectItem}>
        <SearchableSelect
          label={'Select your city'}
          placeholder={
            value.countryId == null ? 'Select country first' : isCitiesPending ? 'Loading…' : 'City'
          }
          options={cityOptions}
          value={value.cityId != null ? String(value.cityId) : undefined}
          debounceDelay={SELECT_SEARCH_DEBOUNCE}
          onValueChange={handleCityChange}
          disabled={isCityDisabled}
          aria-invalid={Boolean(cityError)}
          className={s.locationSelect}
          viewportProps={{ className: s.locationViewport }}
        />

        {cityError && (
          <Typography
            className={s.errorMessage}
            variant={'form-error'}
            color={'var(--color-danger-500)'}
            role={'alert'}
          >
            {cityError}
          </Typography>
        )}
      </div>
    </div>
  )
}
