import { TARIFF_LABELS } from '@/constants'
import { SubscriptionType } from '@/lib/model'
import { formatPrice } from '@/lib/utils/formatPrice'

export const getTariffLabel = (
  tariff_name: SubscriptionType,
  priceInMinorUnits: number,
  currency: string
) => {
  if (tariff_name === '') return ''
  const price = formatPrice(priceInMinorUnits, currency)
  return `${price} per ${TARIFF_LABELS[tariff_name]}`
}
