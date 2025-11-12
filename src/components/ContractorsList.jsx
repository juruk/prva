// src/components/ContractorsList.jsx
import { Link } from 'react-router-dom'
import { Plus, Wrench, Trash2 } from 'lucide-react'

export default function ContractorsList({
  contractors,
  setContractors,
  projects,
  isAdmin
}) {
  const handleAdd = () => {
    if (!isAdmin) return
    const c = {
      name: `Изведувач ${contractors.length + 1}`,
      createdAt: new Date().toISOString()
    }
    setContractors(prev => [...prev, c])
  }

  const handleRemove = (idx) => {
    if (!isAdmin) return
    setContractors(prev => prev.filter((_, i) => i !== idx))
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">
          Изведувачи <span className="text-muted-foreground">({contractors?.length ?? 0})</span>
        </h2>
        {isAdmin && (
          <button
            onClick={handleAdd}
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
          >
            <Plus className="h-4 w-4" />
            Додади изведувач
          </button>
        )}
      </div>

      {/* 2-колонски grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {(contractors ?? []).map((c, i) => (
          <div key={i} className="rounded-2xl border border-border bg-card/50 p-5 shadow-sm">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="rounded-xl border border-border p-2">
                  <Wrench className="h-5 w-5 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-foreground">
                    {c?.name || `Изведувач #${i + 1}`}
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {c?.createdAt ? new Date(c.createdAt).toLocaleDateString() : '—'}
                  </p>
                </div>
              </div>

              <Link
                to={`/contractors/${i}`}
                className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm hover:bg-accent"
                title="Отвори"
              >
                Детали
              </Link>
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

        {contractors?.length === 0 && (
          <div className="col-span-full rounded-2xl border border-border bg-card/50 p-8 text-center text-sm text-muted-foreground">
            Нема изведувачи. {isAdmin ? 'Кликни „Додади изведувач“ за да внесеш.' : ''}
          </div>
        )}
      </div>
    </section>
  )
}
