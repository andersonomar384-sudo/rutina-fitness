import { MEAL_DAY, PROTEIN_SOURCES } from '../lib/plan'

export default function Meals() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Come para entrenar</p>
        <h1>Comidas</h1>
        <p className="muted">
          Para bajar grasa y ganar músculo a la vez: déficit pequeño, proteína alta y fuerza
          progresiva. Sin dietas extremas.
        </p>
      </header>

      <div className="stat-grid">
        <article className="card stat">
          <span className="stat-label">Déficit diario</span>
          <strong>300-500 kcal</strong>
        </article>
        <article className="card stat">
          <span className="stat-label">Proteína</span>
          <strong>1.6-2.2 g/kg</strong>
        </article>
        <article className="card stat">
          <span className="stat-label">Comidas</span>
          <strong>3 + 1 snack</strong>
        </article>
      </div>

      <section className="card">
        <header className="card-head">
          <h2>Un día de ejemplo</h2>
          <p>Ajusta las porciones a tu peso y hambre. La proteína es lo que no se negocia.</p>
        </header>
        <ul className="meal-list">
          {MEAL_DAY.map((meal) => (
            <li key={meal.name} className="meal">
              <div className="meal-head">
                <strong>{meal.name}</strong>
                <span className="meal-protein">{meal.protein}</span>
              </div>
              <p className="meal-items">{meal.items}</p>
            </li>
          ))}
        </ul>
        <p className="hint">
          Total aproximado: 120 g de proteína y 1.800-2.000 kcal. Si pesas más o entrenas fuerte,
          añade una porción de carbohidrato (arroz, papa, avena) y una fuente de proteína.
        </p>
      </section>

      <section className="card">
        <header className="card-head">
          <h2>Dónde está la proteína</h2>
          <p>Referencias rápidas para armar tus platos sin contar cada caloría.</p>
        </header>
        <div className="table-scroll">
          <table className="data-table">
            <thead>
              <tr>
                <th>Alimento</th>
                <th className="num">Proteína</th>
              </tr>
            </thead>
            <tbody>
              {PROTEIN_SOURCES.map((item) => (
                <tr key={item.food}>
                  <td>{item.food}</td>
                  <td className="num mono">{item.protein}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="card">
        <header className="card-head">
          <h2>Reglas que sí mueven la aguja</h2>
        </header>
        <ul className="tips">
          <li>Mitad del plato: verduras. Un cuarto: proteína. Un cuarto: carbohidrato.</li>
          <li>Camina 8.000-10.000 pasos al día; es la vía más fácil para el déficit.</li>
          <li>Duerme 7-9 h: sin sueño, el hambre y la pérdida de músculo empeoran.</li>
          <li>Pésate 2-3 veces por semana y mide la cintura; el espejo y la fuerza mandan más que la balanza.</li>
          <li>Si en 3-4 semanas no baja la cintura ni sube tu fuerza, ajusta porciones o pasos, no elimines comidas.</li>
        </ul>
        <p className="hint">
          Información general, no consejo médico ni nutricional individual. Si tienes alguna
          condición de salud, consulta con un nutricionista.
        </p>
      </section>
    </div>
  )
}
