import { Reveal } from '@/components/reveal'

const steps = [
  {
    phase: '0–3 МЕС.',
    title: 'Первые деньги',
    income: '20–60 тыс. ₽/мес.',
    items: [
      'Подработка с быстрым входом: курьер, промоутер, репетиторство',
      'Регистрация самозанятости (налог 4–6%, легальный доход)',
      'Параллельно — 1–2 часа в день на изучение выбранного навыка',
    ],
  },
  {
    phase: '3–9 МЕС.',
    title: 'Навык и портфолио',
    income: '40–90 тыс. ₽/мес.',
    items: [
      'Первые 5–10 фриланс-заказов по низкой ставке ради отзывов',
      'Портфолио из 3–5 реальных работ вместо диплома',
      'Финансовая подушка: откладывать 10–20% любого дохода',
    ],
  },
  {
    phase: '9–24 МЕС.',
    title: 'Специализация',
    income: '80–200 тыс. ₽/мес.',
    items: [
      'Джуниор-позиция в компании или стабильный поток клиентов',
      'Рост ставки в 2–3 раза за счёт узкой специализации',
      'Нетворкинг: комьюнити, конференции, менторы',
    ],
  },
  {
    phase: '2–5 ЛЕТ',
    title: 'Масштаб и активы',
    income: '200+ тыс. ₽/мес.',
    items: [
      'Middle/Senior-уровень или собственное дело / агентство',
      'Источники дохода 2–3 типа: зарплата, проекты, инвестиции',
      'Деньги начинают работать: индексные фонды, реинвестирование',
    ],
  },
]

export function Roadmap() {
  return (
    <section id="roadmap" className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            {'РАЗДЕЛ 02 — СТРАТЕГИЯ'}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold uppercase tracking-tight md:text-5xl">
            {'Дорожная карта: 18 → доход'}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {
              'Универсальная модель роста дохода, применимая к любой из профессий выше. Ключевой принцип: быстрые деньги финансируют обучение, навык создаёт капитал.'
            }
          </p>
        </Reveal>

        <ol className="mt-10 grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <Reveal key={s.phase} as="li" delay={i * 130} className="hover-card hover-card-flat flex flex-col bg-background p-6 hover:bg-card">
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs font-bold tracking-widest text-accent">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {s.phase}
                </span>
              </div>
              <h3 className="mt-4 text-xl font-bold">{s.title}</h3>
              <div className="mt-1 font-mono text-xs tracking-wide text-muted-foreground">
                {s.income}
              </div>
              <ul className="mt-4 flex flex-col gap-3">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="border-l-2 border-lime pl-3 text-sm leading-relaxed"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  )
}
