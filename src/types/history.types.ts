export interface TimePeriod {
  startYear: number
  endYear: number
}

export interface AnnualEvent {
  year: number
  description: string
}

export interface HistoricalEvent {
  theme: 'Музыка' | 'Кино' | 'Литература' | 'Поэзия' | 'Наука' | 'Культура'
  id: string
  period: TimePeriod
  annualEvents: AnnualEvent[]
}
