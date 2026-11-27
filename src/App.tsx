import { useEffect, useMemo, useState } from 'react'
import type { AppState, Tab } from './types'
import { loadState, saveState } from './lib/storage'
import { bestStreak, computeStreak, todayKey } from './lib/stats'
import Today from './components/Today'
import Plan from './components/Plan'
import Meals from './components/Meals'
import Progress from './components/Progress'
import Settings from './components/Settings'
import { DumbbellIcon, FlameIcon } from './components/Icons'

const TABS: Array<{ id: Tab; label: string }> = [
  { id: 'hoy', label: 'Hoy' },
  { id: 'plan', label: 'Plan' },
  { id: 'comidas', label: 'Comidas' },
  { id: 'progreso', label: 'Progreso' },
  { id: 'ajustes', label: 'Ajustes' },
]

function longToday(): string {
  const text = new Date().toLocaleDateString('es-PE', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  })
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export default function App() {
  const [state, setState] = useState<AppState>(loadState)
  const [tab, setTab] = useState<Tab>('hoy')

  const today = todayKey()

  useEffect(() => {
    saveState(state)
  }, [state])

  const streak = useMemo(() => computeStreak(state.logs, today), [state.logs, today])
  const best = useMemo(() => bestStreak(state.logs), [state.logs])
  const todayLog = state.logs[today] ?? {}

  const setValue = (exerciseId: string, value: number) => {
    setState((current) => ({
      ...current,
      logs: {
        ...current.logs,
        [today]: { ...(current.logs[today] ?? {}), [exerciseId]: Math.max(0, value) },
      },
    }))
  }

  const resetDay = () => {
    setState((current) => {
      const logs = { ...current.logs }
      delete logs[today]
      return { ...current, logs }
    })
  }

  const clearLogs = () => {
    if (!window.confirm('¿Borrar todos los registros? Esta acción no se puede deshacer.')) return
    setState((current) => ({ ...current, logs: {} }))
  }

  const hasLogs = Object.keys(state.logs).some((day) =>
    Object.values(state.logs[day] ?? {}).some((value) => value > 0),
  )

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand-mark">
            <DumbbellIcon size={18} />
          </span>
          <div className="brand-text">
            <strong>Rutina</strong>
            <span>Ejercicios y racha</span>
          </div>
        </div>
        <div className="topbar-right">
          <span className="streak-pill" title="Racha actual">
            <FlameIcon size={15} />
            {streak}
            <small>{streak === 1 ? 'día' : 'días'}</small>
          </span>
          <span className="today-chip">{longToday()}</span>
        </div>
      </header>

      <nav className="tabs" aria-label="Secciones">
        {TABS.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`tab ${tab === item.id ? 'active' : ''}`}
            onClick={() => setTab(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <main>
        {tab === 'hoy' && (
          <Today
            exercises={state.exercises}
            log={todayLog}
            streak={streak}
            best={best}
            onSet={setValue}
            onResetDay={resetDay}
          />
        )}

        {tab === 'plan' && <Plan />}

        {tab === 'comidas' && <Meals />}

        {tab === 'progreso' && (
          <Progress exercises={state.exercises} logs={state.logs} streak={streak} best={best} />
        )}

        {tab === 'ajustes' && (
          <Settings
            exercises={state.exercises}
            onChange={(exercises) => setState((current) => ({ ...current, exercises }))}
            onClearLogs={clearLogs}
            hasLogs={hasLogs}
          />
        )}
      </main>

      <footer className="footer">
        Tus datos viven solo en este navegador (localStorage). Nada se envía a un servidor.
      </footer>
    </div>
  )
}
