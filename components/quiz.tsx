'use client'

import { useState } from 'react'

import { Reveal } from '@/components/reveal'

type TrackKey = 'it' | 'creative' | 'service' | 'business'

const tracks: Record<
  TrackKey,
  { title: string; desc: string; examples: string }
> = {
  it: {
    title: 'IT и цифровые профессии',
    desc: 'Тебе подходит системная работа с технологиями: высокий порог входа окупается самым быстрым ростом дохода на рынке.',
    examples: 'Веб-разработка, тестирование, аналитика данных, DevOps',
  },
  creative: {
    title: 'Креатив и контент',
    desc: 'Твоя сила — визуальное мышление и создание нового. Портфолио здесь важнее диплома, а первые заказы доступны почти сразу.',
    examples: 'Дизайн, видеомонтаж, SMM, копирайтинг',
  },
  service: {
    title: 'Сервис и работа с людьми',
    desc: 'Ты быстро находишь общий язык с людьми. Это самый быстрый вход в доход: работать можно уже на этой неделе.',
    examples: 'Логистика, бариста, продажи, администрирование',
  },
  business: {
    title: 'Предпринимательство',
    desc: 'Тебе тесно в рамках найма. Начни с малого: перепродажа, услуги, микробизнес — и масштабируй то, что сработало.',
    examples: 'Перепродажа, свои услуги, дропшиппинг, авито-бизнес',
  },
}

const questions: {
  q: string
  answers: { text: string; track: TrackKey }[]
}[] = [
  {
    q: 'Как тебе комфортнее работать?',
    answers: [
      { text: 'Один на один с задачей и компьютером', track: 'it' },
      { text: 'Создавать что-то, что увидят другие', track: 'creative' },
      { text: 'В движении и общении с людьми', track: 'service' },
      { text: 'Самому решать, что и как делать', track: 'business' },
    ],
  },
  {
    q: 'Что для тебя важнее на старте?',
    answers: [
      { text: 'Максимальный доход через 2–3 года', track: 'it' },
      { text: 'Заниматься тем, что нравится', track: 'creative' },
      { text: 'Деньги уже на этой неделе', track: 'service' },
      { text: 'Не иметь начальника', track: 'business' },
    ],
  },
  {
    q: 'Какая задача тебе интереснее?',
    answers: [
      { text: 'Разобраться, почему не работает код', track: 'it' },
      { text: 'Сделать обложку, ролик или пост', track: 'creative' },
      { text: 'Организовать процесс или помочь клиенту', track: 'service' },
      { text: 'Найти, где купить дешевле и продать дороже', track: 'business' },
    ],
  },
  {
    q: 'Сколько ты готов учиться до первых денег?',
    answers: [
      { text: '6–12 месяцев ради высокой ставки', track: 'it' },
      { text: '2–4 месяца, дальше учусь на заказах', track: 'creative' },
      { text: 'Хочу начать без обучения', track: 'service' },
      { text: 'Учусь сразу на практике и своих ошибках', track: 'business' },
    ],
  },
]

export function Quiz() {
  const [step, setStep] = useState(0)
  const [scores, setScores] = useState<Record<TrackKey, number>>({
    it: 0,
    creative: 0,
    service: 0,
    business: 0,
  })

  const finished = step >= questions.length

  const result: TrackKey = (Object.keys(scores) as TrackKey[]).reduce((a, b) =>
    scores[b] > scores[a] ? b : a
  )

  function answer(track: TrackKey) {
    setScores((s) => ({ ...s, [track]: s[track] + 1 }))
    setStep((s) => s + 1)
  }

  function restart() {
    setStep(0)
    setScores({ it: 0, creative: 0, service: 0, business: 0 })
  }

  const trackToCategory: Record<TrackKey, string> = {
    it: 'IT',
    creative: 'КРЕАТИВ',
    service: 'СЕРВИС',
    business: 'БИЗНЕС',
  }

  function goToProfessions() {
    window.dispatchEvent(
      new CustomEvent('start18:select-category', {
        detail: trackToCategory[result],
      })
    )
  }

  return (
    <section id="quiz" className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            {'РАЗДЕЛ 07 — ТЕСТ'}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold uppercase tracking-tight md:text-5xl">
            {'Подбери своё направление'}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {
              'Четыре вопроса — и модель определит, с какой категории профессий тебе логичнее начинать. Основано на матрице «скорость входа × потенциал дохода».'
            }
          </p>
        </Reveal>

        <Reveal delay={120} className="mt-10">
          <div className="mx-auto max-w-3xl border border-border bg-background">
            {!finished ? (
              <div key={step} className="animate-card-in p-6 md:p-10">
                <div className="flex items-center justify-between font-mono text-xs tracking-widest text-muted-foreground">
                  <span>{`ВОПРОС ${step + 1} / ${questions.length}`}</span>
                  <span className="text-accent">{`${Math.round((step / questions.length) * 100)}%`}</span>
                </div>
                <div className="mt-3 h-1 w-full bg-secondary">
                  <div
                    className="h-full bg-accent transition-all duration-500"
                    style={{ width: `${(step / questions.length) * 100}%` }}
                  />
                </div>
                <h3 className="mt-8 text-balance text-xl font-bold md:text-2xl">
                  {questions[step].q}
                </h3>
                <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {questions[step].answers.map((a) => (
                    <button
                      key={a.text}
                      type="button"
                      onClick={() => answer(a.track)}
                      className="border border-border bg-card p-4 text-left text-sm leading-relaxed transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:shadow-md"
                    >
                      {a.text}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="animate-card-in">
                <div className="bg-lime p-6 text-lime-foreground md:p-10">
                  <div className="font-mono text-xs font-bold tracking-widest">
                    {'ТВОЙ РЕЗУЛЬТАТ'}
                  </div>
                  <div className="mt-2 text-balance text-2xl font-bold uppercase tracking-tight md:text-4xl">
                    {tracks[result].title}
                  </div>
                </div>
                <div className="p-6 md:p-10">
                  <p className="text-pretty leading-relaxed">{tracks[result].desc}</p>
                  <p className="mt-4 font-mono text-xs tracking-wide text-muted-foreground">
                    {'ПРИМЕРЫ: ' + tracks[result].examples}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <a
                      href="#professions"
                      onClick={goToProfessions}
                      className="bg-primary px-5 py-3 font-mono text-xs font-bold tracking-widest text-primary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                    >
                      {'СМОТРЕТЬ ПРОФЕССИИ →'}
                    </a>
                    <button
                      type="button"
                      onClick={restart}
                      className="border border-border px-5 py-3 font-mono text-xs font-bold tracking-widest transition-colors hover:border-accent hover:text-accent"
                    >
                      {'ПРОЙТИ ЗАНОВО'}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
