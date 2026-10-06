export const locationKeys = {
  all: ['location'] as const,
  countries: () => [...locationKeys.all, 'countries'] as const,
  cities: (countryId: null | number) => [...locationKeys.all, 'cities', countryId] as const,
}
