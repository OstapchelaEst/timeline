import gsap from 'gsap'
import { useEffect, useRef } from 'react'
import { useTimeline } from '@/providers/timeline-provider'
import { CIRCLE_ANIMATION_DURATION } from '@/utils/constants'

import styles from './timeline-years.module.scss'

const getDuration = (text?: string) => (text ? CIRCLE_ANIMATION_DURATION : 0)

export const TimelineYears = () => {
  const { currentTimeLine } = useTimeline()

  const startRef = useRef<HTMLSpanElement>(null)
  const endRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    gsap.to(startRef.current, {
      duration: getDuration(startRef.current?.textContent),
      textContent: currentTimeLine?.period.startYear,
      roundProps: 'textContent',
      ease: 'none',
    })

    gsap.to(endRef.current, {
      duration: getDuration(endRef.current?.textContent),
      textContent: currentTimeLine?.period.endYear,
      roundProps: 'textContent',
      ease: 'none',
    })
  }, [currentTimeLine])

  return (
    <div className={styles.years}>
      <span
        ref={startRef}
        className={styles.start}
      ></span>
      <span
        ref={endRef}
        className={styles.end}
      ></span>
    </div>
  )
}
