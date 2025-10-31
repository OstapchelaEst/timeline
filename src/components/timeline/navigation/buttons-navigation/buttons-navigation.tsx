import clsx from 'clsx'
import { useButtonsTimelineSelect } from '@/hooks/use-buttons-timeline-select'

import Arrow from '@/assets/arrow.svg'

import styles from './buttons-navigation.module.scss'

export const ButtonsNavigation = () => {
  const {
    currentTimeline,
    maxTimelines,
    isBeginning,
    isEnded,
    currentTimeId,
    historicalTimeline,
    setCurrentTimeId,
    nextTimeline,
    prevTimeline,
  } = useButtonsTimelineSelect()

  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.progress}>
          {currentTimeline}/{maxTimelines}
        </p>

        <div className={styles.buttons}>
          <button
            disabled={isBeginning}
            onClick={prevTimeline}
            className={styles.button}
          >
            <Arrow />
          </button>
          <button
            disabled={isEnded}
            onClick={nextTimeline}
            className={clsx(styles.button, styles.next)}
          >
            <Arrow />
          </button>
        </div>
      </div>

      <div className={styles.pagination}>
        {historicalTimeline.map((data, index) => (
          <button
            key={index}
            className={clsx(styles.pagination_button, {
              [styles.active]: currentTimeId === data.id,
            })}
            onClick={() => setCurrentTimeId(data.id)}
          />
        ))}
      </div>
    </div>
  )
}
