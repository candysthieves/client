'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
  Typography,
} from '@candy.thieves/ui-kit-lumos'
import { useSubscriptionHistory } from '@/lib/subscriptions/queries/useSubscriptionHistory'
import { apiDateToFormDate } from '@/lib/utils'
import s from './PaymentsTab.module.scss'
import { PaymentsTabSkeleton } from './PaymentsTabSkeleton'

const PAYMENTS_TABLE_COLUMNS = [
  'Date of payment',
  'End date of subscription',
  'Price',
  'Subscription Type',
  'Payment Type',
] as const

const formatPaymentDate = (date: string) => apiDateToFormDate(date.slice(0, 10))

export const PaymentsTab = () => {
  const { data, isLoading, isError } = useSubscriptionHistory()

  if (isLoading) {
    return <PaymentsTabSkeleton columns={PAYMENTS_TABLE_COLUMNS} />
  }

  if (isError || !data) {
    return (
      <section className={s.error} role={'alert'}>
        <Typography variant={'h2'} color={'var(--color-light-100)'} align={'center'}>
          Unable to load payment history
        </Typography>
        <Typography variant={'body1'} color={'var(--color-light-900)'} align={'center'}>
          Please try again later.
        </Typography>
      </section>
    )
  }

  if (data.length === 0) {
    return (
      <section className={s.empty} aria-label={'Payment history'}>
        <Typography
          className={s.emptyTitle}
          variant={'h2'}
          color={'var(--color-light-100)'}
          align={'center'}
        >
          No payments yet
        </Typography>

        <Typography variant={'body1'} color={'var(--color-light-900)'} align={'center'}>
          Your payment history will appear here.
        </Typography>
      </section>
    )
  }

  return (
    <div className={s.wrapper}>
      <Table>
        <TableHead>
          <TableRow>
            {PAYMENTS_TABLE_COLUMNS.map(column => (
              <TableHeaderCell key={column}>{column}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(item => (
            <TableRow key={item.id}>
              <TableCell>{formatPaymentDate(item.paymentDate)}</TableCell>
              <TableCell>{formatPaymentDate(item.subscriptionEndDate)}</TableCell>
              <TableCell>{`$${item.price}`}</TableCell>
              <TableCell>{item.subscriptionName}</TableCell>
              <TableCell>{item.paymentService}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
