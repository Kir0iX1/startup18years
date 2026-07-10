import { Reveal } from '@/components/reveal'

const items = [
  {
    q: 'Меня нигде не берут без опыта. Что делать?',
    a: 'Опыт создаётся, а не ждётся. Сделай 3–5 учебных или бесплатных проектов за 2–4 недели — это уже портфолио. В сервисных профессиях (курьер, бариста, продажи) опыт не требуется вовсе: начни там и параллельно учись.',
  },
  {
    q: 'Нужно ли бросать учёбу ради заработка?',
    a: 'Нет — это ложный выбор. Двухпоточная стратегия рассчитана на 2–3 часа в день, совместимых с учёбой. Диплом плюс востребованный навык сильнее, чем что-то одно. Бросать учёбу ради низкоквалифицированной работы — стратегическая ошибка.',
  },
  {
    q: 'Как не попасться на мошенников и «лёгкие деньги»?',
    a: 'Три красных флага: просят деньги за трудоустройство, обещают доход без навыков и усилий, торопят с решением. Настоящий работодатель платит тебе, а не наоборот. Проверяй компании в открытых реестрах и читай отзывы сотрудников.',
  },
  {
    q: 'Стоит ли оформлять самозанятость сразу?',
    a: 'Да, как только появился первый регулярный заказ. Оформление занимает 10 минут в приложении, налог 4–6% — самый низкий из возможных. Легальный доход открывает кредитную историю и защищает при спорах с заказчиками.',
  },
  {
    q: 'Фриланс или найм — что выбрать в начале?',
    a: 'В найме учат за счёт компании и платят стабильно — это лучший старт для IT и сервиса. Фриланс даёт свободу и быстрый вход в креативных профессиях. Оптимально: первый год — найм или стажировка, дальше — гибрид.',
  },
  {
    q: 'А если через полгода пойму, что направление не моё?',
    a: 'Это нормальный результат, а не провал. Навыки переносятся: дизайнер быстрее освоит вёрстку, продавец — маркетинг. Смена направления в 18–20 лет стоит дёшево, в 30 — дорого. Сейчас лучшее время для экспериментов.',
  },
]

export function Faq() {
  return (
    <section id="faq" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            {'РАЗДЕЛ 06 — ЧАСТЫЕ ВОПРОСЫ'}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold uppercase tracking-tight md:text-5xl">
            {'Ошибки и страхи новичков'}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {
              'Шесть вопросов, которые чаще всего останавливают на старте, — и честные ответы на основе исследования.'
            }
          </p>
        </Reveal>

        <div className="mt-10 flex flex-col gap-px border border-border bg-border">
          {items.map((item, i) => (
            <Reveal key={item.q} delay={i * 60}>
              <details className="group bg-background">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 font-bold transition-colors hover:text-accent md:p-6 [&::-webkit-details-marker]:hidden">
                  <span className="text-pretty">{item.q}</span>
                  <span
                    aria-hidden="true"
                    className="shrink-0 font-mono text-xl leading-none text-accent transition-transform duration-300 group-open:rotate-45"
                  >
                    {'+'}
                  </span>
                </summary>
                <p className="px-5 pb-5 text-sm leading-relaxed text-muted-foreground md:px-6 md:pb-6">
                  {item.a}
                </p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
