import type { Exercise, Logs } from '../types'
import {
  activeDaysIn,
  dayIsActive,
  dayIsComplete,
  lastDays,
  todayKey,
  weekTotal,
} from '../lib/stats'

type Props = {
  exercises: Exercise[]
  logs: Logs
  streak: number
  best: number
}

const DAY_SHORT = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export default function Progress({ exercises, logs, streak, best }: Props) {
  const today = todayKey()
  const days = lastDays(14, today)
  const activeWeek = activeDaysIn(logs, 7, today)

  return (
    <div className="page">
      <div className="stat-grid">
        <article className="card stat">
          <span className="stat-label">Racha actual</span>
          <strong>{streak} días</strong>
        </article>
        <article className="card stat">
          <span className="stat-label">Mejor racha</span>
          <strong>{best} días</strong>
        </article>
        <article className="card stat">
          <span className="stat-label">Días activos (7)</span>
          <strong>{activeWeek}/7</strong>
        </article>
      </div>

      <section className="card">
        <header className="card-head">
          <h2>Últimos 14 días</h2>
          <p>Altura = ejercicios completados sobre el total de la rutina.</p>
        </header>
        <div className="history-strip">
          {days.map((day) => {
            const log = logs[day]
            const done = exercises.filter((exercise) => (log?.[exercise.id] ?? 0) >= exercise.target)
              .length
            const ratio = exercises.length > 0 ? done / exercises.length : 0
            const active = dayIsActive(log)
            const complete = dayIsComplete(log, exercises)
            const date = new Date(`${day}T12:00:00`)

            return (
              <div
                key={day}
                className={`strip-day ${active ? 'is-active' : ''} ${complete ? 'is-complete' : ''} ${day === today ? 'is-today' : ''}`}
                title={`${day}: ${done} de ${exercises.length} completados`}
              >
                <div className="strip-bar">
                  <span style={{ transform: `scaleY(${Math.max(ratio, active ? 0.08 : 0)})` }} />
                </div>
                <span className="strip-label">{DAY_SHORT[date.getDay()]}</span>
                <span className="strip-day-num">{date.getDate()}</span>
              </div>
            )
          })}
        </div>
      </section>

      <section className="card">
        <header className="card-head">
          <h2>Esta semana por ejercicio</h2>
          <p>Total registrado en los últimos 7 días.</p>
        </header>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Ejercicio</th>
                <th className="num">Meta diaria</th>
                <th className="num">Esta semana</th>
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise) => (
                <tr key={exercise.id}>
                  <td>{exercise.name}</td>
                  <td className="num mono">
                    {exercise.target} {exercise.unit === 'seg' ? 'seg' : 'reps'}
                  </td>
                  <td className="num mono">
                    {weekTotal(logs, exercise.id, today)}{' '}
                    {exercise.unit === 'seg' ? 'seg' : 'reps'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}
