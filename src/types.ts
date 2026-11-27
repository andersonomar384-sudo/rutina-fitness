export type Unit = 'reps' | 'seg'

export type Exercise = {
  id: string
  name: string
  unit: Unit
  target: number
  step: number
}

export type DayLog = Record<string, number>

export type Logs = Record<string, DayLog>

export type AppState = {
  exercises: Exercise[]
  logs: Logs
}

export type Tab = 'hoy' | 'plan' | 'comidas' | 'progreso' | 'ajustes'
