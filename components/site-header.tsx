export function SiteHeader() {
  return (
    <header className="border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
        <a href="#" className="font-mono text-sm font-bold tracking-widest">
          {'СТАРТ18 ®'}
        </a>
        <div className="hidden font-mono text-xs tracking-widest text-muted-foreground md:block">
          {'РЫНОК ТРУДА — 2026'}
        </div>
      </div>
      <nav
        aria-label="Основная навигация"
        className="border-t border-border"
      >
        <div className="mx-auto flex max-w-6xl items-center gap-6 overflow-x-auto px-4 py-3 md:px-6">
          <a
            href="#professions"
            className="whitespace-nowrap font-mono text-xs font-semibold tracking-widest hover:text-accent"
          >
            ПРОФЕССИИ
          </a>
          <a
            href="#roadmap"
            className="whitespace-nowrap font-mono text-xs font-semibold tracking-widest hover:text-accent"
          >
            ДОРОЖНАЯ КАРТА
          </a>
          <a
            href="#calculator"
            className="whitespace-nowrap font-mono text-xs font-semibold tracking-widest hover:text-accent"
          >
            КАЛЬКУЛЯТОР
          </a>
          <a
            href="#principles"
            className="whitespace-nowrap font-mono text-xs font-semibold tracking-widest hover:text-accent"
          >
            ПРИНЦИПЫ
          </a>
        </div>
      </nav>
    </header>
  )
}
