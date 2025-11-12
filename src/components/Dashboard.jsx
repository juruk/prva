// src/components/Dashboard.jsx
import { Link } from 'react-router-dom'
import { ClipboardList, UsersRound, Wrench, ArrowRight } from 'lucide-react'

export default function Dashboard({ projects = [], architects = [], contractors = [] }) {
  // --- Helpers ---
  const safeProjects = Array.isArray(projects) ? projects : []
  const safeArchitects = Array.isArray(architects) ? architects : []
  const safeContractors = Array.isArray(contractors) ? contractors : []

  const totalProjects = safeProjects.length
  const statusCount = (status) =>
    safeProjects.filter(p => (p?.status || '').toLowerCase() === status).length

  const startedCount  = statusCount('started')
  const finishedCount = statusCount('finished')
  const onHoldCount   = statusCount('on hold')

  // sort by createdAt desc (fallback by name)
  const recentProjects = [...safeProjects].sort((a, b) => {
    const ad = a?.createdAt ? new Date(a.createdAt).getTime() : 0
    const bd = b?.createdAt ? new Date(b.createdAt).getTime() : 0
    if (bd !== ad) return bd - ad
    return (a?.name || '').localeCompare(b?.name || '')
  }).slice(0, 8)

  // --- UI card helper ---
  const Card = ({ children, className = '' }) => (
    <div className={`rounded-2xl border border-border bg-card/60 p-5 shadow-sm ${className}`}>
      {children}
    </div>
  )

  const SectionTitle = ({ children }) => (
    <h2 className="text-lg font-semibold text-foreground">{children}</h2>
  )

  const Stat = ({ label, value }) => (
    <div className="flex items-baseline justify-between rounded-xl border border-border bg-background/60 px-4 py-3">
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-xl font-bold text-foreground">{value}</span>
    </div>
  )

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Почетна табла</h1>
          <p className="text-sm text-muted-foreground">Преглед на проекти и тим</p>
        </div>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
          title="Кон листа на проекти"
        >
          Отвори проекти <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* KPI + Status breakdown (две колони секогаш) */}
      <div className="grid grid-cols-2 gap-6">
        <Card>
          <SectionTitle>Клучни показатели</SectionTitle>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <Stat label="Вкупно проекти" value={totalProjects} />
            <Stat label="Активни" value={startedCount} />
            <Stat label="Завршени" value={finishedCount} />
            <Stat label="Пауза" value={onHoldCount} />
          </div>
        </Card>

        <Card>
          <SectionTitle>Распределба по статус</SectionTitle>
          <div className="mt-4">
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              {/* проста „бар“ распределба */}
              {(() => {
                const total = Math.max(1, totalProjects)
                const wStarted  = `${(startedCount  / total) * 100}%`
                const wFinished = `${(finishedCount / total) * 100}%`
                const wOnHold   = `${(onHoldCount   / total) * 100}%`
                return (
                  <div className="flex h-2 w-full">
                    <div className="h-2 bg-primary" style={{ width: wStarted }} />
                    <div className="h-2 bg-green-500/70" style={{ width: wFinished }} />
                    <div className="h-2 bg-yellow-500/70" style={{ width: wOnHold }} />
                  </div>
                )
              })()}
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
              <div>Активни: <span className="font-medium text-foreground">{startedCount}</span></div>
              <div>Завршени: <span className="font-medium text-foreground">{finishedCount}</span></div>
              <div>Пауза: <span className="font-medium text-foreground">{onHoldCount}</span></div>
            </div>
          </div>
        </Card>

        {/* Quick links */}
        <Card>
          <SectionTitle>Кратки врски</SectionTitle>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
            <Link
              to="/projects"
              className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 hover:bg-accent"
              title="Проекти"
            >
              <ClipboardList className="h-4 w-4 text-muted-foreground" />
              Проекти
            </Link>
            <Link
              to="/architects"
              className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 hover:bg-accent"
              title="Архитекти"
            >
              <UsersRound className="h-4 w-4 text-muted-foreground" />
              Архитекти
            </Link>
            <Link
              to="/contractors"
              className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 hover:bg-accent"
              title="Изведувачи"
            >
              <Wrench className="h-4 w-4 text-muted-foreground" />
              Изведувачи
            </Link>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-2 hover:bg-accent"
              title="Дашборд"
            >
              🏠 Почетна
            </Link>
          </div>
        </Card>

        {/* Recent projects */}
        <Card>
          <SectionTitle>Последни проекти</SectionTitle>
          <div className="mt-4 space-y-3">
            {recentProjects.length === 0 && (
              <div className="rounded-xl border border-border bg-background/60 px-4 py-6 text-center text-sm text-muted-foreground">
                Нема внесени проекти.
              </div>
            )}
            {recentProjects.map((p, idx) => (
              <Link
                key={idx}
                to={`/projects/${idx}`}
                className="flex items-center justify-between rounded-xl border border-border bg-background/60 px-4 py-3 hover:bg-accent"
                title="Отвори проект"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium text-foreground">{p?.name || `Проект #${idx + 1}`}</div>
                  <div className="mt-0.5 text-xs text-muted-foreground">
                    {p?.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—'} {p?.status ? `• ${p.status}` : ''}
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Link>
            ))}
          </div>
        </Card>

        {/* Architects */}
        <Card>
          <SectionTitle>Архитекти</SectionTitle>
          <div className="mt-3 text-sm text-muted-foreground">
            Вкупно: <span className="font-semibold text-foreground">{safeArchitects.length}</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {safeArchitects.slice(0, 6).map((a, i) => (
              <div key={i} className="truncate rounded-lg border border-border bg-background/60 px-3 py-2">
                {a?.name || `Архитект #${i + 1}`}
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link
              to="/architects"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
            >
              Сите архитектi <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>

        {/* Contractors */}
        <Card>
          <SectionTitle>Изведувачи</SectionTitle>
          <div className="mt-3 text-sm text-muted-foreground">
            Вкупно: <span className="font-semibold text-foreground">{safeContractors.length}</span>
          </div>
          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {safeContractors.slice(0, 6).map((c, i) => (
              <div key={i} className="truncate rounded-lg border border-border bg-background/60 px-3 py-2">
                {c?.name || `Изведувач #${i + 1}`}
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link
              to="/contractors"
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
            >
              Сите изведувачи <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
