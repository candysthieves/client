import { request } from '@/lib/api/request'
import { LocationCity, LocationCountry } from '@/lib/model'
import { CITY_SORT, COUNTRY_SORT, SORT_DIRECTION } from '@/lib/profileLocation/constants'
import { GetCitiesParams, GetCountriesParams } from '@/lib/profileLocation/types'

export const getCountries = ({
  sortBy = COUNTRY_SORT.countryNameEn,
  sortDirection = SORT_DIRECTION.asc,
}: GetCountriesParams = {}): Promise<LocationCountry[]> => {
  const params = new URLSearchParams({ sortBy, sortDirection })
  return request(`/locations/countries?${params}`)
}

export const getCities = (
  countryId: number,
  { sortBy = CITY_SORT.cityNameEn, sortDirection = SORT_DIRECTION.asc }: GetCitiesParams = {}
): Promise<LocationCity[]> => {
  const params = new URLSearchParams({ sortBy, sortDirection })
  return request(`/locations/cities/${countryId}?${params}`)
}
