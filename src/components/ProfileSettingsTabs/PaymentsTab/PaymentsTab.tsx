'use client'

import { Pagination } from '@candy.thieves/ui-kit-lumos'
import { useState } from 'react'
import { useSubscriptionHistory } from '@/lib/subscriptions/queries/useSubscriptionHistory'
import { PaymentsEmptyState } from './PaymentsEmptyState'
import { PaymentsError } from './PaymentsError'
import { PaymentsListMobile } from './PaymentsListMobile'
import {
  PAYMENTS_PAGE_SIZE,
  PAYMENTS_PAGE_SIZE_OPTIONS,
  PAYMENTS_TABLE_COLUMNS,
} from './PaymentsTab.constants'
import s from './PaymentsTab.module.scss'
import { PaymentsTableDesktop } from './PaymentsTableDesktop'
import { PaymentsTabSkeleton } from './PaymentsTabSkeleton'

export const PaymentsTab = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(PAYMENTS_PAGE_SIZE)
  const { data, isLoading, isError } = useSubscriptionHistory(currentPage, pageSize)

  if (isLoading) {
    return <PaymentsTabSkeleton columns={PAYMENTS_TABLE_COLUMNS} rowsCount={pageSize} />
  }

  if (isError || !data) {
    return <PaymentsError />
  }

  if (data.items.length === 0) {
    return <PaymentsEmptyState />
  }

  const pageCount = Math.ceil(data.totalCount / pageSize)

  const handlePageSizeChange = (nextPageSize: number) => {
    setPageSize(nextPageSize)
    setCurrentPage(1)
  }

  return (
    <div className={s.wrapper}>
      <PaymentsTableDesktop items={data.items} />
      <PaymentsListMobile items={data.items} />
      <Pagination
        className={s.pagination}
        currentPage={currentPage}
        pageCount={pageCount}
        pageSize={pageSize}
        pageSizeOptions={PAYMENTS_PAGE_SIZE_OPTIONS}
        onPageChange={setCurrentPage}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  )
}
