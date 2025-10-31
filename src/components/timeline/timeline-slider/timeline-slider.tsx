import clsx from 'clsx'
import { Navigation, FreeMode } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { SlideItem } from './slide-item'
import { useTimeline } from '@/providers/timeline-provider'
import { Fade } from '@/components/ui'
import { CIRCLE_ANIMATION_DURATION } from '@/utils/constants'

import styles from './timeline-slider.module.scss'
import { TimelineTitle } from './timeline-title'

export const TimelineSlider = () => {
  const { currentTimeLine, currentTimeId } = useTimeline()

  return (
    <Fade delayFadeIn={CIRCLE_ANIMATION_DURATION}>
      <TimelineTitle>{currentTimeLine?.theme}</TimelineTitle>

      <Swiper
        freeMode
        key={currentTimeId}
        modules={[Navigation, FreeMode]}
        className={clsx(styles.swiper)}
        navigation
        breakpoints={{
          1400: {
            slidesPerView: 3,
            spaceBetween: 80,
            freeMode: false,
          },

          640: {
            slidesPerView: 2,
            spaceBetween: 40,
            freeMode: false,
          },

          100: {
            slidesPerView: 1.5,
            spaceBetween: 25,
          },
        }}
      >
        {currentTimeLine?.annualEvents.map((item) => (
          <SwiperSlide key={item.year}>
            <SlideItem
              title={item.year.toString()}
              text={item.description}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Fade>
  )
}
