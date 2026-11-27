import { RECOMMENDED, SPLIT_6 } from '../lib/plan'

export default function Plan() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Fuerza en casa</p>
        <h1>Plan semanal</h1>
        <p className="muted">
          Todo con dos mancuernas y tu peso corporal. Elige el plan de 4 días o el split de 6 de
          la imagen; no hagas los dos a la vez.
        </p>
      </header>

      <section className="callout">
        <strong>Recomendación para adelgazar y ganar músculo:</strong> empieza con el plan de 4
        días. Permite recuperar, permite progresar en cargas y encaja mejor con un déficit
        moderado. El split de 6 días sirve si ya entrenas y quieres más volumen por grupo.
      </section>

      <section className="card">
        <header className="card-head">
          <h2>Plan recomendado · 4 días</h2>
          <p>Superior / inferior alternado. Deja al menos un día de descanso entre sesiones.</p>
        </header>
        <div className="plan-grid">
          {RECOMMENDED.map((day) => (
            <article key={day.day} className="plan-day">
              <header className="plan-day-head">
                <span className="plan-day-name">{day.day}</span>
                <span className="plan-focus">{day.focus}</span>
              </header>
              <ul className="plan-exercises">
                {day.exercises.map((exercise) => (
                  <li key={exercise.name}>
                    <span>{exercise.name}</span>
                    <small>{exercise.sets}</small>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="card">
        <header className="card-head">
          <h2>Split de 6 días · estilo imagen</h2>
          <p>
            La misma estructura de la imagen (empuje / tirón / pierna) repetida dos veces, con
            ejercicios posibles usando solo dos mancuernas.
          </p>
        </header>
        <div className="week-list">
          {SPLIT_6.map((day) => (
            <details key={day.day} className="week-day">
              <summary>
                <span className="week-day-name">{day.day}</span>
                <span className="week-focus">{day.focus}</span>
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
          <div className="week-day is-rest">
            <span className="week-day-name">Domingo</span>
            <span className="week-focus">Descanso activo: caminar 30-45 min</span>
          </div>
        </div>
      </section>

      <section className="card">
        <header className="card-head">
          <h2>Cómo progresar con 2 mancuernas</h2>
          <p>Si el peso se queda corto, sube la dificultad sin comprar nada.</p>
        </header>
        <ul className="tips">
          <li>
            <strong>Más repeticiones y series:</strong> cuando llegues al tope del rango con buena
            técnica, añade 1-2 repeticiones por serie.
          </li>
          <li>
            <strong>Tempo lento:</strong> baja en 3 segundos y sube en 1. El músculo trabaja más
            tiempo con el mismo peso.
          </li>
          <li>
            <strong>Unilateral:</strong> pasa a una mano o una pierna; duplicas la carga relativa.
          </li>
          <li>
            <strong>Pausas:</strong> 2 segundos abajo en sentadilla, press o remo antes de subir.
          </li>
          <li>
            <strong>Descanso:</strong> 60-90 s en aislamientos, 2 min en básicos. Dormir 7-9 h.
          </li>
        </ul>
      </section>
    </div>
  )
}
