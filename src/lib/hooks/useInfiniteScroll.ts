import { type RefObject, useEffect } from 'react'

type InfiniteScrollOptions = {
  hasNextPage: boolean
  isLoadingNextPage: boolean
  isLoadMoreError: boolean
  onLoadMore: () => void
}

export const useInfiniteScroll = (
  ref: RefObject<HTMLElement | null>,
  { hasNextPage, isLoadingNextPage, isLoadMoreError, onLoadMore }: InfiniteScrollOptions
) => {
  useEffect(() => {
    const loadMoreElement = ref.current

    if (!loadMoreElement || !hasNextPage || isLoadingNextPage || isLoadMoreError) {
      return
    }

    const observer = new IntersectionObserver(
      entries => {
        if (entries[0]?.isIntersecting) {
          onLoadMore()
        }
      },
      { rootMargin: '0px' }
    )

    observer.observe(loadMoreElement)

    return () => observer.disconnect()
  }, [ref, hasNextPage, isLoadingNextPage, isLoadMoreError, onLoadMore])
}
