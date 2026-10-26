'use client'

import { useSubscriptionHistory } from '@/lib/subscriptions/queries/useSubscriptionHistory'
import { PaymentsEmptyState } from './PaymentsEmptyState'
import { PaymentsError } from './PaymentsError'
import { PaymentsListMobile } from './PaymentsListMobile'
import { PAYMENTS_TABLE_COLUMNS } from './PaymentsTab.constants'
import s from './PaymentsTab.module.scss'
import { PaymentsTableDesktop } from './PaymentsTableDesktop'
import { PaymentsTabSkeleton } from './PaymentsTabSkeleton'

export const PaymentsTab = () => {
  const { data, isLoading, isError } = useSubscriptionHistory()

  if (isLoading) {
    return <PaymentsTabSkeleton columns={PAYMENTS_TABLE_COLUMNS} />
  }

  if (isError || !data) {
    return <PaymentsError />
  }

  if (data.length === 0) {
    return <PaymentsEmptyState />
  }

  return (
    <div className={s.wrapper}>
      <PaymentsTableDesktop data={data} />
      <PaymentsListMobile data={data} />
    </div>
  )
}
