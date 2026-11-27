import type { Exercise } from '../types'
import { CheckIcon, FlameIcon, MinusIcon, PlusIcon, RotateIcon } from './Icons'

type Props = {
  exercises: Exercise[]
  log: Record<string, number>
  streak: number
  best: number
  onSet: (exerciseId: string, value: number) => void
  onResetDay: () => void
}

const unitLabel = (unit: Exercise['unit']) => (unit === 'seg' ? 'seg' : 'reps')

export default function Today({ exercises, log, streak, best, onSet, onResetDay }: Props) {
  const completed = exercises.filter((exercise) => (log[exercise.id] ?? 0) >= exercise.target).length
  const percent = exercises.length > 0 ? Math.round((completed / exercises.length) * 100) : 0
  const hasData = Object.values(log).some((value) => value > 0)

  return (
    <div className="page">
      <section className="streak-hero card">
        <div className="streak-main">
          <span className="streak-flame">
            <FlameIcon size={30} />
          </span>
          <div>
            <p className="eyebrow">Racha actual</p>
            <p className="streak-number">
              {streak} <span>{streak === 1 ? 'día' : 'días'}</span>
            </p>
            <p className="muted small">
              {streak === 0
                ? 'Marca al menos un ejercicio hoy para empezar.'
                : completed === exercises.length
                  ? 'Rutina completa. Así se mantiene.'
                  : 'Un ejercicio cuenta para la racha.'}
            </p>
          </div>
        </div>

        <div className="streak-side">
          <div>
            <span className="side-label">Hoy</span>
            <strong>
              {completed}/{exercises.length}
            </strong>
          </div>
          <div>
            <span className="side-label">Récord</span>
            <strong>{best} d</strong>
          </div>
        </div>
      </section>

      <section className="card">
        <header className="card-head row">
          <div>
            <h2>Rutina de hoy</h2>
            <p>Suma repeticiones o segundos hasta llegar a la meta.</p>
          </div>
          <span className={`status-pill ${percent === 100 ? 'on' : ''}`}>
            {percent}% completado
          </span>
        </header>

        <div className="day-progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${percent / 100})` }} />
        </div>

        <ul className="exercise-list">
          {exercises.map((exercise) => {
            const value = log[exercise.id] ?? 0
            const done = value >= exercise.target
            const ratio = exercise.target > 0 ? Math.min(1, value / exercise.target) : 0

            return (
              <li key={exercise.id} className={`exercise ${done ? 'is-done' : ''}`}>
                <div className="exercise-info">
                  <span className="exercise-name">
                    {done && <CheckIcon size={15} />}
                    {exercise.name}
                  </span>
                  <span className="exercise-meta">
                    Meta {exercise.target} {unitLabel(exercise.unit)}
                  </span>
                </div>

                <div className="exercise-bar" aria-hidden="true">
                  <span style={{ transform: `scaleX(${ratio})` }} />
                </div>

                <div className="exercise-value">
                  <strong>{value}</strong>
                  <small>{unitLabel(exercise.unit)}</small>
                </div>

                <div className="exercise-actions">
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => onSet(exercise.id, Math.max(0, value - exercise.step))}
                    aria-label={`Quitar ${exercise.step} a ${exercise.name}`}
                  >
                    <MinusIcon size={15} />
                  </button>
                  <button
                    type="button"
                    className="icon-btn"
                    onClick={() => onSet(exercise.id, value + exercise.step)}
                    aria-label={`Sumar ${exercise.step} a ${exercise.name}`}
                  >
                    <PlusIcon size={15} />
                  </button>
                  <button
                    type="button"
                    className="btn btn-ghost btn-small"
                    onClick={() => onSet(exercise.id, exercise.target)}
                    disabled={done}
                  >
                    Meta
                  </button>
                </div>
              </li>
            )
          })}
        </ul>

        {hasData && (
          <button type="button" className="link-btn reset-day" onClick={onResetDay}>
            <RotateIcon size={14} />
            Reiniciar el día
          </button>
        )}
      </section>
    </div>
  )
}
