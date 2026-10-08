import { useQuery } from '@tanstack/react-query'
import { getCountries } from '@/lib/api/profileLocation'
import { locationKeys } from '@/lib/profileLocation'

export const useCountries = () =>
  useQuery({
    queryKey: locationKeys.countries(),
    queryFn: () => getCountries(),
  })
