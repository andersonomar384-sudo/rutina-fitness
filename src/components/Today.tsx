import type { Exercise } from '../types'
import { SPLIT_6 } from '../lib/plan'
import { CheckIcon, FlameIcon, RotateIcon } from './Icons'

type Props = {
  exercises: Exercise[]
  log: Record<string, number>
  streak: number
  best: number
  onCompleteDay: () => void
  onResetDay: () => void
}

/** 0 = lunes … 6 = domingo */
function todayIndex(): number {
  return (new Date().getDay() + 6) % 7
}

export default function Today({
  exercises,
  log,
  streak,
  best,
  onCompleteDay,
  onResetDay,
}: Props) {
  const index = todayIndex()
  const current = SPLIT_6[index]
  const done =
    exercises.length > 0 && exercises.every((exercise) => (log[exercise.id] ?? 0) >= exercise.target)
  const hasData = Object.values(log).some((value) => value > 0)

  return (
    <div className="page">
      <section className={`streak-hero card ${done ? 'is-done' : ''}`}>
        <div className="streak-main">
          <span className="streak-flame">
            <FlameIcon size={30} />
          </span>
          <div>
            <p className="eyebrow">Racha actual</p>
            <p className="streak-number" key={streak}>
              {streak} <span>{streak === 1 ? 'día' : 'días'}</span>
            </p>
            <p className="muted small">
              {current ? `Hoy toca ${current.focus.toLowerCase()}.` : 'Hoy es descanso activo.'}
            </p>
          </div>
        </div>

        <div className="streak-side">
          <div>
            <span className="side-label">Hoy</span>
            <strong>{done ? 'Hecho' : 'Pendiente'}</strong>
          </div>
          <div>
            <span className="side-label">Récord</span>
            <strong>{best} d</strong>
          </div>
        </div>
      </section>

      <section className="card">
        <header className="card-head">
          <h2>Plan semanal</h2>
          <p>
            Empuje, tirón y pierna con dos mancuernas. Pulsa un día para ver sus ejercicios.
          </p>
        </header>

        <div className="week-list">
          {SPLIT_6.map((day, position) => (
            <details
              key={day.day}
              className={`week-day ${position === index ? 'is-today' : ''}`}
              open={position === index}
            >
              <summary>
                <span className="week-day-name">{day.day}</span>
                <span className="week-focus">{day.focus}</span>
                {position === index && <span className="today-tag">Hoy</span>}
                <span className="week-toggle" aria-hidden="true">
                  +
                </span>
              </summary>
              <ul className="plan-exercises">
                {day.exercises.map((exercise) => (
                  <li key={exercise.name}>
                    <span>{exercise.name}</span>
                    <small>{exercise.sets}</small>
                  </li>
                ))}
              </ul>
            </details>
          ))}

          <div className={`week-day is-rest ${index === 6 ? 'is-today' : ''}`}>
            <span className="week-day-name">Domingo</span>
            <span className="week-focus">Descanso activo: caminar 30-45 min</span>
            {index === 6 && <span className="today-tag">Hoy</span>}
          </div>
        </div>

        <div className="plan-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={onCompleteDay}
            disabled={done}
          >
            <CheckIcon size={16} />
            {done ? 'Entrenamiento completado' : 'Marcar entrenamiento de hoy'}
          </button>
          {hasData && (
            <button type="button" className="link-btn" onClick={onResetDay}>
              <RotateIcon size={14} />
              Reiniciar el día
            </button>
          )}
        </div>
      </section>
    </div>
  )
}
