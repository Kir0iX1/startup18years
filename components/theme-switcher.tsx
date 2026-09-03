'use client'

import { useEffect, useState } from 'react'

type ThemeId = 'cream' | 'night' | 'paper' | 'fire'

interface Theme {
  id: ThemeId
  label: string
  note: string
  /** Swatch colors: background, foreground, accent */
  swatch: [string, string, string]
}

const themes: Theme[] = [
  {
    id: 'cream',
    label: 'A · Крем',
    note: 'Текущая. Тёплый крем, чёрный, лайм + оранжевый',
    swatch: ['oklch(0.945 0.012 85)', 'oklch(0.16 0.005 80)', 'oklch(0.9 0.2 118)'],
  },
  {
    id: 'night',
    label: 'B · Ночь',
    note: 'Тёмный графит, электрик-лайм, янтарь',
    swatch: ['oklch(0.17 0.008 260)', 'oklch(0.96 0.005 90)', 'oklch(0.88 0.22 125)'],
  },
  {
    id: 'paper',
    label: 'C · Бумага',
    note: 'Холодный белый, чернильный синий, кобальт',
    swatch: ['oklch(0.975 0.004 240)', 'oklch(0.2 0.03 262)', 'oklch(0.55 0.2 262)'],
  },
  {
    id: 'fire',
    label: 'D · Огонь',
    note: 'Тёплый песок, эспрессо, один коралловый акцент',
    swatch: ['oklch(0.955 0.02 70)', 'oklch(0.22 0.02 40)', 'oklch(0.66 0.21 30)'],
  },
]

const STORAGE_KEY = 'start18-theme-preview'

export function ThemeSwitcher() {
  const [active, setActive] = useState<ThemeId>('cream')
  const [open, setOpen] = useState(true)

  // Restore the previously previewed theme on load
  useEffect(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY) as ThemeId | null
    if (saved && themes.some((t) => t.id === saved)) {
      apply(saved, false)
      setActive(saved)
    }
  }, [])

  function apply(id: ThemeId, animate = true) {
    const html = document.documentElement
    if (animate) {
      html.setAttribute('data-theme-switching', '')
      window.setTimeout(() => html.removeAttribute('data-theme-switching'), 700)
    }
    if (id === 'cream') html.removeAttribute('data-theme')
    else html.setAttribute('data-theme', id)
    window.localStorage.setItem(STORAGE_KEY, id)
  }

  function choose(id: ThemeId) {
    setActive(id)
    apply(id)
  }

  const current = themes.find((t) => t.id === active) ?? themes[0]

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4"
      role="region"
      aria-label="Выбор цветовой схемы"
    >
      <div className="w-full max-w-2xl border border-foreground bg-card text-card-foreground shadow-[0_24px_60px_-24px_oklch(0_0_0/0.45)]">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="flex w-full items-center justify-between px-4 py-2.5 text-left"
        >
          <span className="flex items-center gap-3">
            <span className="font-mono text-[10px] tracking-widest text-muted-foreground">ПРЕВЬЮ ПАЛИТРЫ</span>
            <span className="font-mono text-xs font-semibold tracking-widest">{current.label}</span>
          </span>
          <span className="font-mono text-xs text-muted-foreground">{open ? 'СВЕРНУТЬ' : 'РАЗВЕРНУТЬ'}</span>
        </button>

        {open && (
          <div className="border-t border-border p-3">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {themes.map((t) => {
                const isActive = t.id === active
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => choose(t.id)}
                    aria-pressed={isActive}
                    className={`hover-card flex flex-col gap-2 border p-3 text-left ${
                      isActive ? 'border-foreground bg-background' : 'border-border bg-card'
                    }`}
                  >
                    <span className="flex h-8 w-full overflow-hidden border border-border">
                      {t.swatch.map((c, i) => (
                        <span key={i} className="flex-1" style={{ backgroundColor: c }} />
                      ))}
                    </span>
                    <span className="font-mono text-xs font-semibold tracking-widest">{t.label}</span>
                  </button>
                )
              })}
            </div>
            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{current.note}</p>
          </div>
        )}
      </div>
    </div>
  )
}
