import { request } from '@/lib/api/request'
import { LocationCity, LocationCountry } from '@/lib/model'

export const getCountries = (): Promise<LocationCountry[]> => request('/locations/countries')

export const getCities = (countryId: number): Promise<LocationCity[]> =>
  request(`/locations/cities/${countryId}`)

// export const updateMyLocation = (body: { countryId: string; cityId: string }) =>
//   request('/users/my-location', { method: 'PUT', body: JSON.stringify(body) })
