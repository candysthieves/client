import type { ReactNode } from 'react'
import styles from './HeaderWrapper.module.scss'

export const HeaderWrapper = ({ children }: { children: ReactNode }) => {
  return <div className={styles.wrapper}>{children}</div>
}
