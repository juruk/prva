// src/components/ProjectsList.jsx
import { Link } from 'react-router-dom'
import { Plus, Trash2, FolderOpen } from 'lucide-react'

export default function ProjectsList({
  projects,
  setProjects,
  architects,
  contractors,
  isAdmin
}) {
  const handleAdd = () => {
    if (!isAdmin) return
    const p = {
      name: `Нов проект ${projects.length + 1}`,
      createdAt: new Date().toISOString()
    }
    setProjects(prev => [...prev, p])
  }

  const handleRemove = (idx) => {
    if (!isAdmin) return
    setProjects(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Проекти <span className="text-muted-foreground">({projects?.length ?? 0})</span>
        </h2>
        {isAdmin && (
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
          >
            <Plus className="h-4 w-4" />
            Додади проект
          </button>
        )}
      </div>

      {/* 2 по ред од мал екран па нагоре */}
      <div className="grid grid-cols-2 gap-6">
        {(projects ?? []).map((p, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card/50 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-base font-semibold text-foreground">
                  {p?.name || `Проект #${i + 1}`}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p?.createdAt ? new Date(p.createdAt).toLocaleDateString() : '—'}
                </p>
              </div>
              <Link
                to={`/projects/${i}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
                title="Отвори"
              >
                <FolderOpen className="h-4 w-4" />
                Отвори
              </Link>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-md border border-border/70 bg-background/40 p-2">
                <p className="text-muted-foreground">Архитекти</p>
                <p className="font-medium">{architects?.length ?? 0}</p>
              </div>
              <div className="rounded-md border border-border/70 bg-background/40 p-2">
                <p className="text-muted-foreground">Изведувачи</p>
                <p className="font-medium">{contractors?.length ?? 0}</p>
              </div>
            </div>

            {isAdmin && (
              <div className="mt-4 flex items-center justify-end">
                <button
                  onClick={() => handleRemove(i)}
                  className="inline-flex items-center gap-2 rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive hover:bg-destructive/20"
                  title="Избриши"
                >
                  <Trash2 className="h-4 w-4" />
                  Избриши
                </button>
              </div>
            )}
          </div>
        ))}

        {projects?.length === 0 && (
          <div className="col-span-full rounded-2xl border border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
            Нема проекти. {isAdmin ? 'Кликни „Додади проект“ за да внесеш.' : ''}
          </div>
        )}
      </div>
    </section>
  )
}
