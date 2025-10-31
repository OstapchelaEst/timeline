import { useTimeline } from '@/providers/timeline-provider'

const formatTimelineValue = (value: number) => String(value).padStart(2, '0')

export const useButtonsTimelineSelect = () => {
  const { historicalTimeline, currentTimeId, setCurrentTimeId } = useTimeline()

  const maxTimelines = historicalTimeline.length
  const currentTimeline = historicalTimeline.findIndex(
    (line) => line.id === currentTimeId
  )

  const isEnded = currentTimeline === maxTimelines - 1
  const isBeginning = currentTimeline === 0

  const nextTimeline = () => {
    if (isEnded) return

    setCurrentTimeId(historicalTimeline[currentTimeline + 1].id)
  }
  const prevTimeline = () => {
    if (isBeginning) return

    setCurrentTimeId(historicalTimeline[currentTimeline - 1].id)
  }

  return {
    maxTimelines: formatTimelineValue(maxTimelines),
    currentTimeline: formatTimelineValue(currentTimeline + 1),
    isBeginning,
    isEnded,
    historicalTimeline,
    currentTimeId,
    setCurrentTimeId,
    nextTimeline,
    prevTimeline,
  }
}
