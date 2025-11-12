// src/components/Dashboard.jsx
import { ClipboardList, Users, Wrench, ArrowRightCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="rounded-2xl border border-border bg-card/50 p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-xl border border-border p-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-semibold text-foreground">{value}</p>
        </div>
      </div>
    </div>
  )
}

function QuickLink({ to, label }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm hover:bg-accent"
    >
      <span className="font-medium">{label}</span>
      <ArrowRightCircle className="h-4 w-4" />
    </Link>
  )
}

export default function Dashboard({ projects, architects, contractors }) {
  const safeProjects = Array.isArray(projects) ? projects : []
  const recent = [...safeProjects]
    .sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
    .slice(0, 4)

  return (
    <section className="space-y-8">
      <h2 className="text-xl font-semibold text-foreground">Преглед</h2>

      {/* СЕКЦИЈА 1: статистика (2 по ред од мал екран па нагоре) */}
      <div className="grid grid-cols-2 gap-6">
        <StatCard title="Проекти"    value={projects?.length ?? 0}   icon={ClipboardList} />
        <StatCard title="Архитекти"  value={architects?.length ?? 0} icon={Users} />
        <StatCard title="Изведувачи" value={contractors?.length ?? 0} icon={Wrench} />

        {/* Брза белешка / инфо */}
        <div className="rounded-2xl border border-border bg-card/50 p-5 shadow-sm">
          <p className="text-sm font-medium text-foreground">Брза белешка</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Користи го копчето <b>Sync</b> (горе десно) за да ги запишеш сите измени во GitHub.
          </p>
        </div>
      </div>

      {/* СЕКЦИЈА 2: брзи линкови (нов сегмент) */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Брзи линкови</h3>
        <div className="grid grid-cols-2 gap-4">
          <QuickLink to="/projects"     label="Сите проекти" />
          <QuickLink to="/architects"   label="Сите архитекти" />
          <QuickLink to="/contractors"  label="Сите изведувачи" />
          <QuickLink to="/dashboard"    label="Освежи преглед" />
        </div>
      </div>

      {/* СЕКЦИЈА 3: неодамнешни проекти (нов сегмент) */}
      <div className="space-y-4">
        <h3 className="text-base font-semibold text-foreground">Неодамнешни проекти</h3>
        {recent.length === 0 ? (
          <div className="rounded-xl border border-border bg-card/50 p-6 text-sm text-muted-foreground">
            Нема неодамнешни записи.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-6">
            {recent.map((p, i) => (
              <div key={i} className="rounded-2xl border border-border bg-card/50 p-5 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-muted-foreground">Проект</p>
                    <h4 className="text-base font-semibold text-foreground">
                      {p?.name || `Проект #${i + 1}`}
                    </h4>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {p?.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—'}
                    </p>
                  </div>
                  <Link
                    to={`/projects/${i}`}
                    className="rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
                  >
                    Отвори
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
