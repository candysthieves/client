import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow,
} from '@candy.thieves/ui-kit-lumos'
import Skeleton from 'react-loading-skeleton'
import s from './PaymentsTab.module.scss'

const SKELETON_ROWS_COUNT = 8

type PaymentsTabSkeletonProps = {
  columns: readonly string[]
}

export const PaymentsTabSkeleton = ({ columns }: PaymentsTabSkeletonProps) => {
  return (
    <div className={s.wrapper} aria-busy>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableHeaderCell key={column}>{column}</TableHeaderCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {Array.from({ length: SKELETON_ROWS_COUNT }, (_, rowIndex) => (
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
  )
}
