import { type RefObject, useEffect } from 'react'

type InfiniteScrollOptions = {
  hasNextPage: boolean
  isLoadingNextPage: boolean
  isLoadMoreError: boolean
  onLoadMore: () => void
}

const SCROLLABLE_OVERFLOW = /(auto|scroll|overlay)/
const LOAD_MORE_ROOT_MARGIN = '0px 0px 50px 0px'

const getScrollParent = (element: HTMLElement): HTMLElement | null => {
  let parent = element.parentElement

  while (parent && parent !== document.body) {
    if (SCROLLABLE_OVERFLOW.test(getComputedStyle(parent).overflowY)) {
      return parent
    }

    parent = parent.parentElement
  }

  return null
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
      { root: getScrollParent(loadMoreElement), rootMargin: LOAD_MORE_ROOT_MARGIN }
    )

    observer.observe(loadMoreElement)

    return () => observer.disconnect()
  }, [ref, hasNextPage, isLoadingNextPage, isLoadMoreError, onLoadMore])
}
