'use client'

import { Select } from '@candy.thieves/ui-kit-lumos'
import { useMemo } from 'react'
import { CityId, CountryId } from '@/lib/model'
import { useCountries, useCities } from '@/lib/profileLocation'
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
  error?: string
}

export const ProfileLocationSelect = ({
  value,
  onChange,
  disabled,
  error,
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
    <div className={s.locationRow} onBlur={onBlur}>
      <Select
        label={'Select your country'}
        placeholder={isCountriesPending ? 'Loading…' : 'Country'}
        options={countryOptions}
        value={value.countryId != null ? String(value.countryId) : undefined}
        onValueChange={handleCountryChange}
        disabled={disabled || isCountriesPending}
        aria-invalid={Boolean(error)}
        viewportProps={{ className: s.locationViewport }}
      />
      <Select
        label={'Select your city'}
        placeholder={
          value.countryId == null ? 'Select country first' : isCitiesPending ? 'Loading…' : 'City'
        }
        options={cityOptions}
        value={value.cityId != null ? String(value.cityId) : undefined}
        onValueChange={handleCityChange}
        disabled={isCityDisabled}
        aria-invalid={Boolean(error)}
        viewportProps={{ className: s.locationViewport }}
      />

      {error ? (
        <span className={s.error} role={'alert'}>
          {error}
        </span>
      ) : null}
    </div>
  )
}
