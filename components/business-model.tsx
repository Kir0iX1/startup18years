'use client'

import { useState } from 'react'

import { Reveal } from '@/components/reveal'

const market = [
  {
    label: 'TAM',
    title: 'Весь рынок',
    value: '11,2 млн',
    desc: 'молодых людей 18–25 лет в России, ищущих первый доход или смену профессии',
  },
  {
    label: 'SAM',
    title: 'Доступный рынок',
    value: '3,4 млн',
    desc: 'активно используют онлайн-курсы, фриланс-биржи и карьерные сервисы',
  },
  {
    label: 'SOM',
    title: 'Цель на 3 года',
    value: '120 тыс.',
    desc: 'платящих пользователей при конверсии 3,5% из бесплатной версии',
  },
]

const plans = [
  {
    name: 'Free',
    price: '0 ₽',
    audience: 'Точка входа',
    features: ['Каталог профессий', 'Калькулятор дохода', 'Тест на профиль', '5 вопросов ментору в день'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '490 ₽/мес',
    audience: 'Основной доход',
    features: [
      'Безлимитный ИИ-ментор',
      'Персональная дорожная карта',
      'Трекер целей и прогресса',
      'Разбор портфолио и резюме',
      'Закрытое сообщество',
    ],
    highlight: true,
  },
  {
    name: 'B2B',
    price: 'от 90 000 ₽/год',
    audience: 'Вузы и колледжи',
    features: [
      'Кабинет учебного заведения',
      'Аналитика трудоустройства',
      'Интеграция с карьерным центром',
      'Брендирование под вуз',
    ],
    highlight: false,
  },
]

const unitEconomics = [
  { label: 'CAC', value: '380 ₽', note: 'стоимость привлечения через контент и рефералов' },
  { label: 'ARPU', value: '490 ₽', note: 'средний доход с платящего пользователя в месяц' },
  { label: 'Retention 6 мес.', value: '58%', note: 'удержание за счёт трекера целей' },
  { label: 'LTV', value: '4 100 ₽', note: 'пожизненная ценность клиента' },
  { label: 'LTV / CAC', value: '10,8x', note: 'здоровый показатель — выше 3x' },
  { label: 'Payback', value: '< 1 мес.', note: 'окупаемость привлечения' },
]

const roadmap = [
  {
    quarter: 'Q4 2026',
    title: 'MVP и первые 1 000 пользователей',
    items: ['Запуск платформы (готово)', 'ИИ-ментор (готово)', 'Первые пилоты в 2 вузах'],
    status: 'now',
  },
  {
    quarter: 'Q1 2027',
    title: 'Монетизация',
    items: ['Подписка Pro', 'Личный кабинет и трекер целей', 'Мобильное приложение'],
    status: 'next',
  },
  {
    quarter: 'Q2–Q3 2027',
    title: 'B2B и партнёрства',
    items: ['Кабинет вуза', 'Интеграции с hh.ru и биржами', 'Партнёрка с курсами'],
    status: 'later',
  },
  {
    quarter: '2028',
    title: 'Масштабирование',
    items: ['Выход на СНГ', '100 000+ платящих', 'Раунд А'],
    status: 'later',
  },
]

export function BusinessModel() {
  const [activePlan, setActivePlan] = useState(1)

  return (
    <section id="business" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            {'РАЗДЕЛ 08 — БИЗНЕС-МОДЕЛЬ'}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold uppercase tracking-tight md:text-5xl">
            {'Почему это стартап, а не сайт'}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {
              'СТАРТ18 — платформа с понятной моделью монетизации, измеримым рынком и юнит-экономикой, которая сходится уже на первом платящем пользователе.'
            }
          </p>
        </Reveal>

        {/* Market size */}
        <div className="mt-12 grid grid-cols-1 gap-px bg-border md:grid-cols-3">
          {market.map((m, i) => (
            <Reveal key={m.label} delay={i * 120} className="bg-background p-6 md:p-8">
              <div className="flex items-baseline justify-between">
                <span className="font-mono text-xs tracking-widest text-accent">{m.label}</span>
                <span className="font-mono text-xs tracking-wide text-muted-foreground">{m.title}</span>
              </div>
              <div className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">{m.value}</div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
            </Reveal>
          ))}
        </div>

        {/* Pricing */}
        <Reveal className="mt-16">
          <h3 className="font-mono text-xs tracking-widest text-muted-foreground">{'МОНЕТИЗАЦИЯ — ТРИ ИСТОЧНИКА ДОХОДА'}</h3>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {plans.map((p, i) => {
            const active = activePlan === i
            return (
              <Reveal key={p.name} delay={i * 100}>
                <button
                  type="button"
                  onClick={() => setActivePlan(i)}
                  aria-pressed={active}
                  className={`flex h-full w-full flex-col border p-6 text-left transition-all duration-300 ${
                    active
                      ? 'border-primary bg-primary text-primary-foreground shadow-[8px_8px_0_0_var(--lime)]'
                      : 'border-border bg-card hover:border-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{p.name}</span>
                    {p.highlight && (
                      <span className="bg-lime px-2 py-1 font-mono text-[10px] font-bold tracking-widest text-lime-foreground">
                        ЯДРО
                      </span>
                    )}
                  </div>
                  <div className="mt-1 font-mono text-xs tracking-wide opacity-70">{p.audience}</div>
                  <div className="mt-6 text-3xl font-bold tracking-tight">{p.price}</div>
                  <ul className="mt-6 flex flex-col gap-2 text-sm leading-relaxed">
                    {p.features.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span className={active ? 'text-lime' : 'text-accent'}>+</span>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </button>
              </Reveal>
            )
          })}
        </div>

        {/* Unit economics */}
        <Reveal className="mt-16">
          <h3 className="font-mono text-xs tracking-widest text-muted-foreground">{'ЮНИТ-ЭКОНОМИКА — ПОДПИСКА PRO'}</h3>
        </Reveal>
        <div className="mt-6 grid grid-cols-2 gap-px bg-border md:grid-cols-3 lg:grid-cols-6">
          {unitEconomics.map((u, i) => (
            <Reveal key={u.label} delay={i * 80} className="bg-background p-5">
              <div className="font-mono text-xs tracking-widest text-muted-foreground">{u.label}</div>
              <div className="mt-2 text-2xl font-bold tracking-tight">{u.value}</div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{u.note}</p>
            </Reveal>
          ))}
        </div>

        {/* Product roadmap */}
        <Reveal className="mt-16">
          <h3 className="font-mono text-xs tracking-widest text-muted-foreground">{'ПЛАН РАЗВИТИЯ ПРОДУКТА'}</h3>
        </Reveal>
        <ol className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-4">
          {roadmap.map((r, i) => (
            <Reveal key={r.quarter} delay={i * 120} as="li" className="flex">
              <div
                className={`flex w-full flex-col border p-5 ${
                  r.status === 'now' ? 'border-lime bg-card' : 'border-border'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs tracking-widest text-accent">{r.quarter}</span>
                  {r.status === 'now' && (
                    <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-widest text-muted-foreground">
                      <span className="size-1.5 rounded-full bg-lime" />
                      СЕЙЧАС
                    </span>
                  )}
                </div>
                <div className="mt-3 font-bold leading-snug">{r.title}</div>
                <ul className="mt-4 flex flex-col gap-1.5 text-sm leading-relaxed text-muted-foreground">
                  {r.items.map((it) => (
                    <li key={it} className="flex gap-2">
                      <span>—</span>
                      <span>{it}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ol>

        {/* Ask */}
        <Reveal delay={200} className="mt-16 border border-foreground bg-card p-6 md:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="font-mono text-xs tracking-widest text-accent">{'ЗАПРОС НА ИНВЕСТИЦИИ'}</div>
              <div className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
                {'1 000 000 ₽ на 12 месяцев'}
              </div>
              <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                {
                  'Цель раунда — довести продукт до 10 000 активных пользователей и первых 500 подписчиков Pro, подтвердив юнит-экономику на реальных данных.'
                }
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs tracking-wide">
              <span className="text-muted-foreground">Разработка</span>
              <span className="text-right font-bold">45%</span>
              <span className="text-muted-foreground">Маркетинг</span>
              <span className="text-right font-bold">30%</span>
              <span className="text-muted-foreground">ИИ-инфраструктура</span>
              <span className="text-right font-bold">15%</span>
              <span className="text-muted-foreground">Юр. и операционка</span>
              <span className="text-right font-bold">10%</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
