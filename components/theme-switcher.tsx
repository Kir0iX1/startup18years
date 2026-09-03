'use client'

import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

type Theme = 'cream' | 'night'

export const THEME_STORAGE_KEY = 'start18-theme'

function readTheme(): Theme {
  return document.documentElement.getAttribute('data-theme') === 'night' ? 'night' : 'cream'
}

function setThemeAttribute(theme: Theme) {
  const html = document.documentElement
  if (theme === 'night') html.setAttribute('data-theme', 'night')
  else html.removeAttribute('data-theme')
  window.localStorage.setItem(THEME_STORAGE_KEY, theme)
}

/**
 * Smooth theme change without per-element repaint cost.
 *
 * Preferred path: View Transitions API. The browser snapshots the page before
 * and after the swap and cross-fades the two snapshots as GPU textures —
 * nothing in the DOM animates, so it stays smooth on weak hardware.
 *
 * Fallback: a single opacity fade on <body> (see globals.css).
 */
function applyTheme(theme: Theme) {
  const html = document.documentElement
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    setThemeAttribute(theme)
    return
  }

  if (typeof document.startViewTransition === 'function') {
    html.setAttribute('data-theme-switching', '')
    const transition = document.startViewTransition(() => setThemeAttribute(theme))
    transition.finished.finally(() => html.removeAttribute('data-theme-switching'))
    return
  }

  html.setAttribute('data-theme-switching', '')
  setThemeAttribute(theme)
  // Matches the body fade duration in globals.css
  window.setTimeout(() => html.removeAttribute('data-theme-switching'), 400)
}

/**
 * Light / dark toggle for the header.
 * The initial theme is applied by an inline script in layout.tsx before paint,
 * so here we only read the current state after mount to avoid a hydration mismatch.
 */
export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null)

  useEffect(() => {
    setTheme(readTheme())
  }, [])

  function toggle() {
    const next: Theme = theme === 'night' ? 'cream' : 'night'
    applyTheme(next)
    setTheme(next)
  }

  const isNight = theme === 'night'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isNight ? 'Включить светлую тему' : 'Включить тёмную тему'}
      aria-pressed={isNight}
      title={isNight ? 'Светлая тема' : 'Тёмная тема'}
      className="hover-card group flex items-center gap-2 border border-border bg-card px-2.5 py-1.5 hover:border-foreground!"
    >
      {/* Mini palette swatch: background / foreground / accent */}
      <span aria-hidden="true" className="flex h-4 w-9 overflow-hidden border border-border">
        <span className="flex-1 bg-background" />
        <span className="flex-1 bg-foreground" />
        <span className="flex-1 bg-lime" />
      </span>
      <span className="relative flex size-4 items-center justify-center">
        <Sun
          className={`absolute size-4 transition-[transform,opacity] duration-500 ease-out ${
            theme === null || !isNight ? 'rotate-0 opacity-100' : 'rotate-90 opacity-0'
          }`}
        />
        <Moon
          className={`absolute size-4 transition-[transform,opacity] duration-500 ease-out ${
            isNight ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'
          }`}
        />
      </span>
      <span className="hidden font-mono text-[10px] font-semibold tracking-widest md:inline">
        {theme === null ? 'ТЕМА' : isNight ? 'НОЧЬ' : 'КРЕМ'}
      </span>
    </button>
  )
}
