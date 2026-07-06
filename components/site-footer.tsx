export function SiteFooter() {
  return (
    <footer>
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <h2 className="text-balance text-4xl font-bold uppercase leading-none tracking-tight md:text-7xl">
          {'Начни'}
          <br />
          {'сегодня.'}
        </h2>
        <p className="mt-6 max-w-md text-pretty leading-relaxed text-muted-foreground">
          {
            'Лучший день для старта был вчера. Второй лучший — сегодня. Выбери направление, поставь таймер на один час и сделай первый шаг.'
          }
        </p>
        <a
          href="#professions"
          className="mt-8 inline-block border-b-2 border-foreground pb-1 font-mono text-sm font-bold tracking-widest hover:border-accent hover:text-accent"
        >
          {'ВЫБРАТЬ ПРОФЕССИЮ ↗'}
        </a>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 font-mono text-xs tracking-widest text-muted-foreground md:flex-row md:items-center md:justify-between md:px-6">
          <span>{'СТАРТ18 ® — СТУДЕНЧЕСКИЙ ИССЛЕДОВАТЕЛЬСКИЙ ПРОЕКТ'}</span>
          <span>{'2026 / РЫНОК ТРУДА И ДОХОД МОЛОДЁЖИ 18+'}</span>
        </div>
      </div>
    </footer>
  )
}
