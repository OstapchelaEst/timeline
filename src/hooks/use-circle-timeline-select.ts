import { gsap } from 'gsap'
import { useEffect, useId, useRef } from 'react'
import { historicalTimeline } from '@/data/historical-timeline'
import { useTimeline } from '@/providers/timeline-provider'
import {
  CIRCLE_ANIMATION_DURATION,
  CIRCLE_ADDITIONAL_DURATION_PER_STEP,
} from '@/utils/constants'
import { useMediaQuery } from './use-media-query'

interface RotationParams {
  index: number
  currentRotation: number
}

interface GetElementParams {
  currentTimeId: string
  circleId: string
  prevTimeId: string
}

const NUM_BUTTONS = historicalTimeline.length
const ANGLE_PER_BUTTON = 360 / NUM_BUTTONS
const TARGET_ANGLE_DEG = 300

const getElements = ({
  currentTimeId,
  circleId,
  prevTimeId,
}: GetElementParams) => {
  const circle = document.getElementById(circleId)
  const button = circle?.querySelector<HTMLButtonElement>(`#${currentTimeId}`)
  const buttonTitle = button?.querySelector('p')
  const prevButton = circle?.querySelector<HTMLButtonElement>(`#${prevTimeId}`)
  const prevTitle = prevButton?.querySelector('p')

  return { button, circle, buttonTitle, prevButton, prevTitle }
}

const calculateRotation = ({ index, currentRotation }: RotationParams) => {
  const initialAngle = index * ANGLE_PER_BUTTON
  const currentAngleAbsolute = initialAngle + currentRotation
  const rotationDifference = currentAngleAbsolute % 360

  let requiredRotation = TARGET_ANGLE_DEG - rotationDifference

  if (requiredRotation > 180) requiredRotation -= 360
  if (requiredRotation < -180) requiredRotation += 360

  const steps = Math.abs(requiredRotation) / ANGLE_PER_BUTTON
  const duration =
    CIRCLE_ANIMATION_DURATION +
    (steps === 1 ? 0 : steps * CIRCLE_ADDITIONAL_DURATION_PER_STEP)

  const newRotation = currentRotation + requiredRotation

  return { newRotation, duration }
}

function allElementsExist<
  T extends Record<string, HTMLElement | null | undefined>
>(obj: T): obj is { [K in keyof T]: Exclude<T[K], null | undefined> } {
  return Object.values(obj).every((el) => el !== null && el !== undefined)
}

export const useCircleTimelineSelect = () => {
  const { currentTimeId, setCurrentTimeId } = useTimeline()
  const isTable = useMediaQuery('(max-width: 1040px)')

  const circleId = useId()

  const currentRotationRef = useRef(0)
  const prevTimeIdRef = useRef(currentTimeId)

  const buttonsData = historicalTimeline.map((data, i) => ({
    id: data.id,
    label_number: i + 1,
    title: data.theme,
    angleRad: (i * 2 * Math.PI) / NUM_BUTTONS,
  }))

  useEffect(() => {
    const elements = getElements({
      currentTimeId: currentTimeId,
      circleId,
      prevTimeId: prevTimeIdRef.current,
    })

    if (!allElementsExist(elements)) return
    const { button, circle, buttonTitle, prevButton, prevTitle } = elements

    const index = Number(button.getAttribute('data-index'))
    const currentRotation = currentRotationRef.current
    const isPrevButtonSameAsCurrent = prevTimeIdRef.current === currentTimeId

    const { newRotation, duration } = calculateRotation({
      index,
      currentRotation,
    })

    if (!isPrevButtonSameAsCurrent) {
      gsap.to(prevButton, {
        rotation: -newRotation,
        duration,
      })

      gsap.to(prevTitle, {
        opacity: 0,
        duration: 0.2,
        ease: 'ease',
      })
    }

    gsap.to(circle, {
      rotation: newRotation,
      duration: isPrevButtonSameAsCurrent ? 0 : duration,
      ease: 'ease',
    })

    gsap.to(button, {
      rotation: -currentRotation,
      duration: 0,
    })

    gsap.to(button, {
      rotation: -newRotation,
      duration,
      delay: 0,
      ease: 'ease',
    })

    const titleAnimation = gsap.to(buttonTitle, {
      delay: isPrevButtonSameAsCurrent ? 0 : duration,
      duration: 0.2,
      opacity: 1,
    })

    currentRotationRef.current = newRotation
    prevTimeIdRef.current = currentTimeId

    return () => {
      titleAnimation.kill()
    }
  }, [currentTimeId, isTable])

  const setInitialButtonPosition = (button: HTMLButtonElement | null) => {
    const circle = document.getElementById(circleId)

    if (!circle || !button) return

    const angleRad = buttonsData.find((item) => item.id === button.id)?.angleRad

    if (angleRad === undefined) return

    const radius = circle.offsetWidth / 2

    gsap.set(button, {
      x: radius + Math.cos(angleRad) * radius,
      y: radius + Math.sin(angleRad) * radius,
      xPercent: -50,
      yPercent: -50,
      duration: 0,
    })
  }

  const handleButtonClick = (id: string) => {
    setCurrentTimeId(id)
  }

  const handleHover = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const button = e.currentTarget

    if (button.id === currentTimeId) return

    gsap.set(button, {
      rotation: -currentRotationRef.current,
    })
  }

  return {
    currentTimeId,
    buttonsData,
    circleId,
    handleHover,
    setInitialButtonPosition,
    handleButtonClick,
  }
}
