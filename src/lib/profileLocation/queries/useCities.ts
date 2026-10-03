import { useQuery } from '@tanstack/react-query'
import { getCities } from '@/lib/api/profileLocation'
import { locationKeys } from '@/lib/profileLocation'

export const useCities = (countryId: null | number, options?: { enabled?: boolean }) =>
  useQuery({
    queryKey: locationKeys.cities(countryId ?? null),
    queryFn: () => getCities(countryId!),
    enabled: !!countryId && (options?.enabled ?? true),
  })
