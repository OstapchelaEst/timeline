import clsx from 'clsx'
import { useCircleTimelineSelect } from '@/hooks/use-circle-timeline-select'

import styles from './circle-navigation.module.scss'

export const CircleNavigation = () => {
  const {
    currentTimeId,
    circleId,
    buttonsData,
    setInitialButtonPosition,
    handleButtonClick,
    handleHover,
  } = useCircleTimelineSelect()

  return (
    <div className={styles.wrapper}>
      <div
        id={circleId}
        className={styles.circle}
      >
        {buttonsData.map((data, index) => (
          <button
            onMouseEnter={handleHover}
            onClick={() => handleButtonClick(data.id)}
            ref={setInitialButtonPosition}
            id={data.id}
            key={data.id}
            data-index={index}
            className={clsx(styles.button_wrapper, {
              [styles.active]: currentTimeId === data.id,
            })}
          >
            <div className={styles.button}>{data.label_number}</div>
            <p className={styles.button_title}>{data.title}</p>
          </button>
        ))}
      </div>
    </div>
  )
}
