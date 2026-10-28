import { TARIFF_LABELS } from '@/constants'
import { SubscriptionType } from '@/lib/model'
import { formatPrice } from '@/lib/utils/formatPrice'

export const getTariffLabel = (tariff_name: SubscriptionType, price: number, currency: string) => {
  if (tariff_name === '') return ''
  const priceFormatted = formatPrice(price, currency)
  return `${priceFormatted} per ${TARIFF_LABELS[tariff_name]}`
}
