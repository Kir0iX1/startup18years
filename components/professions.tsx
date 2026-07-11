'use client'

import { useEffect, useState, type CSSProperties } from 'react'

import { Reveal } from '@/components/reveal'

type Category = 'ВСЕ' | 'IT' | 'КРЕАТИВ' | 'СЕРВИС' | 'БИЗНЕС'

interface Profession {
  title: string
  category: Exclude<Category, 'ВСЕ'>
  entry: string
  salary: string
  demand: 'ВЫСОКИЙ' | 'РАСТУЩИЙ' | 'СТАБИЛЬНЫЙ'
  description: string
  noDegree: boolean
}

const professions: Profession[] = [
  {
    title: 'AI-инженер / промпт-разработчик',
    category: 'IT',
    entry: '6–12 мес. обучения',
    salary: '120–350 тыс. ₽',
    demand: 'ВЫСОКИЙ',
    description:
      'Интеграция нейросетей в продукты компаний. Самый быстрорастущий сегмент рынка труда.',
    noDegree: true,
  },
  {
    title: 'Веб-разработчик',
    category: 'IT',
    entry: '6–9 мес. обучения',
    salary: '80–300 тыс. ₽',
    demand: 'ВЫСОКИЙ',
    description:
      'Создание сайтов и веб-приложений. Первые фриланс-заказы доступны уже на этапе обучения.',
    noDegree: true,
  },
  {
    title: 'Аналитик данных',
    category: 'IT',
    entry: '6–12 мес. обучения',
    salary: '90–280 тыс. ₽',
    demand: 'ВЫСОКИЙ',
    description:
      'Работа с данными и метриками бизнеса. Требуются SQL, Python и умение делать выводы.',
    noDegree: true,
  },
  {
    title: 'Специалист по кибербезопасности',
    category: 'IT',
    entry: '12–18 мес. обучения',
    salary: '110–400 тыс. ₽',
    demand: 'РАСТУЩИЙ',
    description:
      'Защита систем и данных. Хронический дефицит кадров во всём мире.',
    noDegree: false,
  },
  {
    title: 'Дизайнер интерфейсов (UX/UI)',
    category: 'КРЕАТИВ',
    entry: '4–8 мес. обучения',
    salary: '70–250 тыс. ₽',
    demand: 'СТАБИЛЬНЫЙ',
    description:
      'Проектирование удобных приложений и сайтов. Портфолио важнее диплома.',
    noDegree: true,
  },
  {
    title: 'Видеомейкер / монтажёр',
    category: 'КРЕАТИВ',
    entry: '2–4 мес. практики',
    salary: '50–200 тыс. ₽',
    demand: 'РАСТУЩИЙ',
    description:
      'Контент для брендов и блогеров. Низкий порог входа, доход растёт с личным брендом.',
    noDegree: true,
  },
  {
    title: 'SMM / контент-маркетолог',
    category: 'КРЕАТИВ',
    entry: '2–4 мес. практики',
    salary: '50–180 тыс. ₽',
    demand: 'СТАБИЛЬНЫЙ',
    description:
      'Ведение соцсетей бизнеса. Один из самых доступных стартов с 18 лет.',
    noDegree: true,
  },
  {
    title: 'Курьер / логистика (старт)',
    category: 'СЕРВИС',
    entry: 'Сразу',
    salary: '60–140 тыс. ₽',
    demand: 'ВЫСОКИЙ',
    description:
      'Быстрые первые деньги без навыков. Стратегия: зарабатывать здесь, параллельно учиться профессии.',
    noDegree: true,
  },
  {
    title: 'Бариста / сфера гостеприимства',
    category: 'СЕРВИС',
    entry: '2–4 недели',
    salary: '45–90 тыс. ₽',
    demand: 'СТАБИЛЬНЫЙ',
    description:
      'Развивает коммуникацию и дисциплину — базу для любой карьеры. Гибкий график для студентов.',
    noDegree: true,
  },
  {
    title: 'Продавец на маркетплейсах',
    category: 'БИЗНЕС',
    entry: '1–3 мес. практики',
    salary: 'от 0 до 500+ тыс. ₽',
    demand: 'РАСТУЩИЙ',
    description:
      'Своё дело с минимальным капиталом. Высокий риск, но и высокий потолок дохода.',
    noDegree: true,
  },
  {
    title: 'Таргетолог / трафик-менеджер',
    category: 'БИЗНЕС',
    entry: '3–6 мес. обучения',
    salary: '60–250 тыс. ₽',
    demand: 'СТАБИЛЬНЫЙ',
    description:
      'Настройка рекламы для бизнеса. Оплата часто привязана к результату — % от бюджета.',
    noDegree: true,
  },
  {
    title: 'Репетитор / наставник',
    category: 'СЕРВИС',
    entry: 'Сразу (по своему предмету)',
    salary: '40–150 тыс. ₽',
    demand: 'СТАБИЛЬНЫЙ',
    description:
      'Монетизация школьных знаний: ЕГЭ, языки, программирование. Идеальный старт для студента.',
    noDegree: true,
  },
]

const categories: Category[] = ['ВСЕ', 'IT', 'КРЕАТИВ', 'СЕРВИС', 'БИЗНЕС']

const demandColor: Record<Profession['demand'], string> = {
  ВЫСОКИЙ: 'bg-accent text-accent-foreground',
  РАСТУЩИЙ: 'bg-lime text-lime-foreground',
  СТАБИЛЬНЫЙ: 'bg-secondary text-secondary-foreground',
}

export function Professions() {
  const [active, setActive] = useState<Category>('ВСЕ')

  const filtered =
    active === 'ВСЕ' ? professions : professions.filter((p) => p.category === active)

  return (
    <section id="professions" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            {'РАЗДЕЛ 01 — ИССЛЕДОВАНИЕ РЫНКА'}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold uppercase tracking-tight md:text-5xl">
            {'Актуальные профессии 2026'}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {
              'Отобраны по трём критериям: доступность входа с 18 лет, устойчивый спрос на рынке и потенциал роста дохода. Зарплатные вилки — по данным открытых агрегаторов вакансий.'
            }
          </p>
        </Reveal>

        <div className="mt-8 flex flex-wrap gap-2" role="tablist" aria-label="Фильтр по категориям">
          {categories.map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={active === c}
              onClick={() => setActive(c)}
              className={`border border-border px-4 py-2 font-mono text-xs font-semibold tracking-widest transition-colors ${
                active === c
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card hover:bg-secondary'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div key={active} className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <article
              key={p.title}
              style={{ '--card-delay': `${i * 60}ms` } as CSSProperties}
              className="animate-card-in flex flex-col border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-xs tracking-widest text-muted-foreground">
                  {p.category}
                </span>
                <span
                  className={`px-2 py-1 font-mono text-[10px] font-bold tracking-widest ${demandColor[p.demand]}`}
                >
                  {'СПРОС: ' + p.demand}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold leading-snug">{p.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {p.description}
              </p>
              <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-border pt-4">
                <div>
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    ВХОД
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">{p.entry}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] tracking-widest text-muted-foreground">
                    ДОХОД / МЕС.
                  </dt>
                  <dd className="mt-1 text-sm font-semibold">{p.salary}</dd>
                </div>
              </dl>
              {p.noDegree && (
                <div className="mt-3 font-mono text-[10px] tracking-widest text-accent">
                  {'✓ ДИПЛОМ НЕ ОБЯЗАТЕЛЕН'}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
