import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@candy.thieves/ui-kit-lumos'
import { SubscriptionHistoryItem } from '@/lib/model'
import { formatPaymentDate, formatPrice } from '@/lib/utils'
import { PAYMENTS_TABLE_COLUMNS } from './PaymentsTab.constants'
import s from './PaymentsTab.module.scss'

type PaymentsTableDesktopProps = {
  items: SubscriptionHistoryItem[]
}

export const PaymentsTableDesktop = ({ items }: PaymentsTableDesktopProps) => {
  return (
    <div className={s.tableWrapper}>
      <Table>
        <TableHead>
          <TableRow>
            {PAYMENTS_TABLE_COLUMNS.map(column => (
              <TableHeaderCell key={column}>{column}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.id}>
              <TableCell>{item.paymentDate ? formatPaymentDate(item.paymentDate) : '—'}</TableCell>
              <TableCell>
                {item.subscriptionEndDate ? formatPaymentDate(item.subscriptionEndDate) : '—'}
              </TableCell>
              <TableCell>{formatPrice(item.price, item.currency)}</TableCell>
              <TableCell>{item.subscriptionName}</TableCell>
              <TableCell>{item.paymentService}</TableCell>
              <TableCell>{item.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
