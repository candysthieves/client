import { CITY_SORT, COUNTRY_SORT, SORT_DIRECTION } from '@/lib/profileLocation/constants'

export type CountrySortKey = (typeof COUNTRY_SORT)[keyof typeof COUNTRY_SORT]
export type CitySortKey = (typeof CITY_SORT)[keyof typeof CITY_SORT]
export type SortDirection = (typeof SORT_DIRECTION)[keyof typeof SORT_DIRECTION]

export type GetCountriesParams = {
  sortBy?: CountrySortKey
  sortDirection?: SortDirection
}

export type GetCitiesParams = {
  sortBy?: CitySortKey
  sortDirection?: SortDirection
}
