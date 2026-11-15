import {
  Cards,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@candy.thieves/ui-kit-lumos'
import Skeleton from 'react-loading-skeleton'
import s from './PaymentsTab.module.scss'

type PaymentsTabSkeletonProps = {
  columns: readonly string[]
  rowsCount: number
}

export const PaymentsTabSkeleton = ({ columns, rowsCount }: PaymentsTabSkeletonProps) => {
  return (
    <div className={s.wrapper} aria-busy>
      <div className={s.tableWrapper}>
        <Table>
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableHeaderCell key={column}>{column}</TableHeaderCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {Array.from({ length: rowsCount }, (_, rowIndex) => (
              <TableRow key={rowIndex}>
                {columns.map(column => (
                  <TableCell key={column}>
                    <Skeleton width={'80%'} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className={s.cardsWrapper}>
        {Array.from({ length: rowsCount }, (_, rowIndex) => (
          <Cards className={s.card} key={rowIndex}>
            {columns.map(column => (
              <div className={s.cardRow} key={column}>
                <Skeleton width={'60%'} />
                <Skeleton width={'40%'} />
              </div>
            ))}
          </Cards>
        ))}
      </div>
    </div>
  )
}
