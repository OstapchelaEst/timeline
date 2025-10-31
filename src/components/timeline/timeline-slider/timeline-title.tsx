import { PropsWithChildren } from 'react'

import styles from './timeline-slider.module.scss'

export const TimelineTitle = ({ children }: PropsWithChildren) => {
  return <h2 className={styles.mobile_title}>{children}</h2>
}
