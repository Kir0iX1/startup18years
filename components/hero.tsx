import { Reveal } from '@/components/reveal'

export function Hero() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="mb-6 flex items-center justify-between font-mono text-xs tracking-widest text-muted-foreground">
            <span>{'НА ОСНОВЕ ОТКРЫТЫХ ДАННЫХ РЫНКА ТРУДА'}</span>
            <span className="hidden md:inline">{'ВОЗРАСТ СТАРТА: 18+'}</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h1 className="text-balance text-5xl font-bold uppercase leading-none tracking-tight md:text-8xl">
            {'Архитектура'}
            <br />
            {'твоего дохода.'}
          </h1>
        </Reveal>

        <Reveal delay={220}>
          <p className="mt-8 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            {
              'СТАРТ18 — исследовательская платформа о том, как человек с 18 лет строит доход системно: от первых заказов на фрилансе до востребованной профессии. Без мифов о «лёгких деньгах» — только рынок, цифры и последовательность шагов.'
            }
          </p>
        </Reveal>

        <Reveal delay={320}>
          <a
            href="#calculator"
            className="mt-8 inline-block border-b-2 border-foreground pb-1 font-mono text-sm font-bold tracking-widest transition-colors duration-300 hover:border-accent hover:text-accent"
          >
            {'РАССЧИТАТЬ ПОТЕНЦИАЛ ↗'}
          </a>
        </Reveal>
      </div>

      <div className="grid grid-cols-1 border-t border-border md:grid-cols-3">
        <Reveal delay={150}>
          <div className="h-full bg-lime p-6 text-lime-foreground transition-transform duration-300 ease-out hover:-translate-y-1 md:p-8">
            <div className="font-mono text-xs tracking-widest">ШАГ 01 — НАВЫК</div>
            <p className="mt-3 text-lg font-semibold leading-snug">
              {'Выбери навык, за который рынок платит уже сегодня.'}
            </p>
          </div>
        </Reveal>
        <Reveal delay={280}>
          <div className="h-full bg-secondary p-6 transition-transform duration-300 ease-out hover:-translate-y-1 md:p-8">
            <div className="font-mono text-xs tracking-widest text-muted-foreground">
              ШАГ 02 — ПРАКТИКА
            </div>
            <p className="mt-3 text-lg font-semibold leading-snug">
              {'Первые деньги через фриланс, стажировки и подработку.'}
            </p>
          </div>
        </Reveal>
        <Reveal delay={410}>
          <div className="h-full bg-accent p-6 text-accent-foreground transition-transform duration-300 ease-out hover:-translate-y-1 md:p-8">
            <div className="font-mono text-xs tracking-widest">ШАГ 03 — МАСШТАБ</div>
            <p className="mt-3 text-lg font-semibold leading-snug">
              {'Рост ставки, специализация и собственные проекты.'}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
