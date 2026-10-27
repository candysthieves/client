export const formatPrice = (priceInMinorUnits: number, currency: string) => {
  const hasCents = priceInMinorUnits % 100 !== 0

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: hasCents ? 2 : 0,
  }).format(priceInMinorUnits / 100)
}
