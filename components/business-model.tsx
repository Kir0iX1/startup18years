'use client'

import { useState } from 'react'

import { Reveal } from '@/components/reveal'

const market = [
  {
    label: 'АУДИТОРИЯ',
    title: 'Вся Россия',
    value: '11,2 млн',
    desc: 'молодых людей 18–25 лет, ищущих первый доход или понятный путь в профессию',
  },
  {
    label: 'ОНЛАЙН',
    title: 'Активные в сети',
    value: '3,4 млн',
    desc: 'уже используют онлайн-курсы, фриланс-биржи и карьерные сервисы',
  },
  {
    label: 'ЦЕЛЬ',
    title: 'На 3 года',
    value: '500 тыс.',
    desc: 'пользователей, которые нашли первый доход с помощью платформы — бесплатно',
  },
]

const principles = [
  {
    name: 'Бесплатно',
    tag: 'Навсегда',
    audience: 'Для каждого пользователя',
    features: [
      'Каталог профессий и зарплат',
      'Калькулятор и симулятор цели',
      'ИИ-ментор без лимитов',
      'Тест на профиль',
      'Дорожная карта роста',
    ],
    highlight: true,
  },
  {
    name: 'Без рекламы',
    tag: 'Принцип',
    audience: 'Никаких баннеров и продаж курсов',
    features: [
      'Не продаём данные пользователей',
      'Не рекламируем платные курсы',
      'Не берём комиссию с заработка',
      'Открытый исходный код на GitHub',
    ],
    highlight: false,
  },
  {
    name: 'Для вузов',
    tag: 'Партнёрство',
    audience: 'Тоже бесплатно',
    features: [
      'Внедрение в карьерные центры',
      'Материалы для кураторов',
      'Статистика трудоустройства',
      'Совместные мероприятия',
    ],
    highlight: false,
  },
]

export function BusinessModel() {
  const [activeCard, setActiveCard] = useState(0)

  return (
    <section id="business" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            {'РАЗДЕЛ 08 — МОДЕЛЬ ПРОЕКТА'}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold uppercase tracking-tight md:text-5xl">
            {'Почему это стартап, а не сайт'}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {
              'СТАРТ18 — социальный стартап. Мы не берём денег с пользователей: платформа полностью бесплатна, без рекламы и скрытых платежей. Задача — дать каждому 18-летнему честный старт в заработке.'
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

        {/* Principles */}
        <Reveal className="mt-16">
          <h3 className="font-mono text-xs tracking-widest text-muted-foreground">{'ТРИ ПРИНЦИПА — ВСЁ БЕСПЛАТНО'}</h3>
        </Reveal>
        <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          {principles.map((p, i) => {
            const active = activeCard === i
            return (
              <Reveal key={p.name} delay={i * 100}>
                <button
                  type="button"
                  onClick={() => setActiveCard(i)}
                  aria-pressed={active}
                  className={`flex h-full w-full flex-col border p-6 text-left transition-[background-color,border-color,color,transform] duration-500 ease-out hover:-translate-y-1 ${
                    active
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border bg-card hover:border-foreground'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold">{p.name}</span>
                    {p.highlight && (
                      <span className="bg-lime px-2 py-1 font-mono text-[10px] font-bold tracking-widest text-lime-foreground">
                        0 ₽
                      </span>
                    )}
                  </div>
                  <div className="mt-1 font-mono text-xs tracking-wide opacity-70">{p.audience}</div>
                  <div className="mt-6 text-3xl font-bold tracking-tight">{p.tag}</div>
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

        {/* Social impact */}
        <Reveal delay={200} className="mt-16 border border-foreground bg-card p-6 md:p-10">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="font-mono text-xs tracking-widest text-accent">{'СОЦИАЛЬНЫЙ ЭФФЕКТ'}</div>
              <div className="mt-3 text-3xl font-bold uppercase tracking-tight md:text-4xl">
                {'1 000 первых зарплат за год'}
              </div>
              <p className="mt-3 max-w-xl text-pretty leading-relaxed text-muted-foreground">
                {
                  'Цель первого года — помочь тысяче молодых людей получить первый честный доход. Каждая история успеха — это подтверждение, что платформа работает, и аргумент для грантов на развитие.'
                }
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 font-mono text-xs tracking-wide">
              <span className="text-muted-foreground">Плата за доступ</span>
              <span className="text-right font-bold">0 ₽</span>
              <span className="text-muted-foreground">Реклама</span>
              <span className="text-right font-bold">Нет</span>
              <span className="text-muted-foreground">Комиссия</span>
              <span className="text-right font-bold">Нет</span>
              <span className="text-muted-foreground">Исходный код</span>
              <span className="text-right font-bold">Открыт</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
