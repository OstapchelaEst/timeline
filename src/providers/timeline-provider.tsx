import {
  createContext,
  useContext,
  useState,
  useMemo,
  PropsWithChildren,
} from 'react'
import { HistoricalEvent } from '@/types/history.types'
import { historicalTimeline, initialPeriodId } from '@/data/historical-timeline'

interface TimelineContextType {
  currentTimeId: string
  currentTimeLine: HistoricalEvent | undefined
  historicalTimeline: HistoricalEvent[]
  setCurrentTimeId: (id: string) => void
}

const TimelineContext = createContext<TimelineContextType | undefined>(
  undefined
)

export const TimelineProvider = ({ children }: PropsWithChildren) => {
  const [currentTimeId, setCurrentTimeId] = useState<string>(initialPeriodId)

  const currentTimeLine = useMemo(() => {
    return historicalTimeline.find((item) => item.id === currentTimeId)
  }, [currentTimeId])

  const contextValue = useMemo(
    () => ({
      currentTimeId,
      currentTimeLine,
      historicalTimeline,
      setCurrentTimeId,
    }),
    [currentTimeId, currentTimeLine]
  )

  return (
    <TimelineContext.Provider value={contextValue}>
      {children}
    </TimelineContext.Provider>
  )
}

export const useTimeline = () => {
  const context = useContext(TimelineContext)
  if (context === undefined) {
    throw new Error('useTimeline must be used within a TimelineProvider')
  }
  return context
}
