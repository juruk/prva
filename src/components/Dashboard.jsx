// src/components/Dashboard.jsx
import { ClipboardList, Users, Wrench } from 'lucide-react'

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

export default function Dashboard({ projects, architects, contractors }) {
  return (
    <section className="space-y-6">
      <h2 className="text-xl font-semibold text-foreground">Преглед</h2>

      {/* 2-колонски распоред на блокови */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatCard title="Проекти" value={projects?.length ?? 0} icon={ClipboardList} />
        <StatCard title="Архитекти" value={architects?.length ?? 0} icon={Users} />
        <StatCard title="Изведувачи" value={contractors?.length ?? 0} icon={Wrench} />

        {/* Дополнителен блок: примери/совети или брза листа */}
        <div className="rounded-2xl border border-border bg-card/50 p-5 shadow-sm">
          <p className="text-sm font-medium text-foreground">Брза белешка</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Користи го копчето <b>Sync</b> (горе десно) за да ги запишеш сите измени во GitHub.
          </p>
        </div>
      </div>
    </section>
  )
}
