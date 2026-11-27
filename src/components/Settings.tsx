import type { Exercise, Unit } from '../types'
import { PlusIcon, TrashIcon } from './Icons'

type Props = {
  exercises: Exercise[]
  onChange: (exercises: Exercise[]) => void
  onClearLogs: () => void
  hasLogs: boolean
}

export default function Settings({ exercises, onChange, onClearLogs, hasLogs }: Props) {
  const patch = (id: string, values: Partial<Exercise>) => {
    onChange(exercises.map((exercise) => (exercise.id === id ? { ...exercise, ...values } : exercise)))
  }

  const remove = (id: string) => {
    onChange(exercises.filter((exercise) => exercise.id !== id))
  }

  const add = () => {
    onChange([
      ...exercises,
      {
        id: `ex-${Date.now().toString(36)}`,
        name: 'Ejercicio nuevo',
        unit: 'reps',
        target: 10,
        step: 1,
      },
    ])
  }

  return (
    <div className="page">
      <section className="card">
        <header className="card-head row">
          <div>
            <h2>Tu rutina</h2>
            <p>Cambia metas y pasos. Los registros anteriores se conservan.</p>
          </div>
          <button type="button" className="btn btn-ghost" onClick={add}>
            <PlusIcon size={16} />
            Añadir ejercicio
          </button>
        </header>

        <div className="table-scroll">
          <table className="data-table editable">
            <thead>
              <tr>
                <th>Ejercicio</th>
                <th>Unidad</th>
                <th className="num">Meta</th>
                <th className="num">Paso</th>
                <th aria-label="Acciones" />
              </tr>
            </thead>
            <tbody>
              {exercises.map((exercise) => (
                <tr key={exercise.id}>
                  <td>
                    <input
                      type="text"
                      value={exercise.name}
                      onChange={(event) => patch(exercise.id, { name: event.target.value })}
                      aria-label="Nombre del ejercicio"
                    />
                  </td>
                  <td>
                    <select
                      value={exercise.unit}
                      onChange={(event) => patch(exercise.id, { unit: event.target.value as Unit })}
                      aria-label={`Unidad de ${exercise.name}`}
                    >
                      <option value="reps">Repeticiones</option>
                      <option value="seg">Segundos</option>
                    </select>
                  </td>
                  <td className="num">
                    <input
                      type="number"
                      min={1}
                      value={exercise.target}
                      onChange={(event) => patch(exercise.id, { target: Number(event.target.value) })}
                      aria-label={`Meta de ${exercise.name}`}
                    />
                  </td>
                  <td className="num">
                    <input
                      type="number"
                      min={1}
                      value={exercise.step}
                      onChange={(event) => patch(exercise.id, { step: Number(event.target.value) })}
                      aria-label={`Paso de ${exercise.name}`}
                    />
                  </td>
                  <td>
                    <button
                      type="button"
                      className="icon-btn danger"
                      onClick={() => remove(exercise.id)}
                      aria-label={`Eliminar ${exercise.name}`}
                    >
                      <TrashIcon size={15} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card danger-zone">
        <header className="card-head">
          <h2>Datos</h2>
          <p>
            Tu rutina y tus registros se guardan solo en este navegador. Si borras los datos del
            sitio, se pierden.
          </p>
        </header>
        <button
          type="button"
          className="btn btn-danger"
          onClick={onClearLogs}
          disabled={!hasLogs}
        >
          Borrar todos los registros
        </button>
      </section>
    </div>
  )
}
