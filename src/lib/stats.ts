import type { Exercise, Logs } from '../types'

export function toKey(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

export function todayKey(): string {
  return toKey(new Date())
}

export function parseKey(key: string): Date {
  const [year, month, day] = key.split('-').map(Number)
  return new Date(year, month - 1, day)
}

export function addDays(key: string, delta: number): string {
  const date = parseKey(key)
  date.setDate(date.getDate() + delta)
  return toKey(date)
}

export function lastDays(count: number, end = todayKey()): string[] {
  return Array.from({ length: count }, (_, index) => addDays(end, index - (count - 1)))
}

export function dayIsActive(log: Record<string, number> | undefined): boolean {
  if (!log) return false
  return Object.values(log).some((value) => value > 0)
}

export function dayIsComplete(
  log: Record<string, number> | undefined,
  exercises: Exercise[],
): boolean {
  if (!log || exercises.length === 0) return false
  return exercises.every((exercise) => (log[exercise.id] ?? 0) >= exercise.target)
}

export function computeStreak(logs: Logs, today = todayKey()): number {
  let cursor = today
  if (!dayIsActive(logs[cursor])) {
    cursor = addDays(today, -1)
    if (!dayIsActive(logs[cursor])) return 0
  }

  let streak = 0
  while (dayIsActive(logs[cursor])) {
    streak += 1
    cursor = addDays(cursor, -1)
  }
  return streak
}

export function bestStreak(logs: Logs): number {
  const days = Object.keys(logs)
    .filter((day) => dayIsActive(logs[day]))
    .sort()
  let best = 0
  let current = 0
  let previous: string | null = null

  for (const day of days) {
    current = previous && addDays(previous, 1) === day ? current + 1 : 1
    best = Math.max(best, current)
    previous = day
  }
  return best
}

export function weekTotal(logs: Logs, exerciseId: string, today = todayKey()): number {
  return lastDays(7, today).reduce((total, day) => total + (logs[day]?.[exerciseId] ?? 0), 0)
}

export function activeDaysIn(logs: Logs, count: number, today = todayKey()): number {
  return lastDays(count, today).filter((day) => dayIsActive(logs[day])).length
}

export function completedToday(
  log: Record<string, number> | undefined,
  exercises: Exercise[],
): number {
  if (!log) return 0
  return exercises.filter((exercise) => (log[exercise.id] ?? 0) >= exercise.target).length
}
