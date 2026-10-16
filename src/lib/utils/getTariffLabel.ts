import { TARIFF_LABELS } from '@/constants'
import { SubscriptionType } from '@/lib/model'

export const getTariffLabel = (
  tariff_name: SubscriptionType,
  priceInMinorUnits: number,
  currency: string
) => {
  const hasCents = priceInMinorUnits % 100 !== 0

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits: hasCents ? 2 : 0,
  }).format(priceInMinorUnits / 100)

  return `${price} per ${TARIFF_LABELS[tariff_name]}`
}
