import type { AppState, Exercise, Logs } from '../types'

const KEY = 'rutina:v1'

export const DEFAULT_EXERCISES: Exercise[] = [
  { id: 'ex-pushups', name: 'Flexiones', unit: 'reps', target: 30, step: 5 },
  { id: 'ex-squats', name: 'Sentadillas', unit: 'reps', target: 40, step: 5 },
  { id: 'ex-plank', name: 'Plancha', unit: 'seg', target: 60, step: 10 },
  { id: 'ex-burpees', name: 'Burpees', unit: 'reps', target: 15, step: 5 },
]

export const DEFAULT_STATE: AppState = {
  exercises: DEFAULT_EXERCISES,
  logs: {},
}

export function uid(): string {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID()
  }
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

export function loadState(): AppState {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return DEFAULT_STATE
    const parsed = JSON.parse(raw) as Partial<AppState>
    return {
      exercises: Array.isArray(parsed.exercises) ? parsed.exercises : DEFAULT_EXERCISES,
      logs:
        parsed.logs && typeof parsed.logs === 'object' ? (parsed.logs as Logs) : {},
    }
  } catch {
    return DEFAULT_STATE
  }
}

export function saveState(state: AppState): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(state))
  } catch {
    // Sin almacenamiento la app sigue funcionando en memoria.
  }
}
