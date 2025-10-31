import { Title } from '@/components/ui'
import { TimelineProvider } from '@/providers/timeline-provider'
import { ButtonsNavigation, CircleNavigation } from './navigation'
import { TimelineSlider } from './timeline-slider'
import { TimelineYears } from './timeline-years/timeline-years'

import styles from './timeline.module.scss'

export const TimeLine = () => {
  return (
    <TimelineProvider>
      <section className={styles.paddings}>
        <div className={styles.wrapper}>
          <Title>
            Исторические <br /> даты
          </Title>

          <div className={styles.circle_wrapper}>
            <CircleNavigation />
            <TimelineYears />
          </div>

          <div className={styles.bottom_wrapper}>
            <ButtonsNavigation />

            <TimelineSlider />
          </div>
        </div>
      </section>
    </TimelineProvider>
  )
}
