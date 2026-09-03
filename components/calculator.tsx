'use client'

import { useMemo, useState } from 'react'

import { Reveal } from '@/components/reveal'

const tracks = [
  { name: 'IT / разработка', base: 80, growth: 0.045 },
  { name: 'Креатив / дизайн', base: 60, growth: 0.035 },
  { name: 'Маркетинг / SMM', base: 55, growth: 0.03 },
  { name: 'Сервис + обучение навыку', base: 50, growth: 0.04 },
  { name: 'Своё дело / маркетплейсы', base: 40, growth: 0.06 },
]

function formatRub(thousands: number) {
  return `${Math.round(thousands).toLocaleString('ru-RU')} тыс. ₽`
}

export function Calculator() {
  const [trackIdx, setTrackIdx] = useState(0)
  const [hours, setHours] = useState(4)
  const [years, setYears] = useState(3)

  const result = useMemo(() => {
    const track = tracks[trackIdx]
    const effort = 0.5 + (hours / 8) * 0.9 // 0.5x при 0ч, ~1.4x при 8ч
    const months = years * 12
    const monthly = track.base * effort * Math.pow(1 + track.growth * effort, months)
    const startMonthly = track.base * effort * 0.5

    // накопленный доход — грубая сумма геометрической прогрессии
    let total = 0
    for (let m = 1; m <= months; m++) {
      total += track.base * effort * 0.5 * Math.pow(1 + track.growth * effort, m)
    }
    return { monthly, startMonthly, total }
  }, [trackIdx, hours, years])

  return (
    <section id="calculator" className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="font-mono text-xs tracking-widest text-muted-foreground">
            {'РАЗДЕЛ 04 — ИНТЕРАКТИВ'}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold uppercase tracking-tight md:text-5xl">
            {'Калькулятор потенциала'}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">
            {
              'Модель оценивает потенциальный доход исходя из направления, вложенного времени и горизонта. Это иллюстрация принципа сложного процента в навыках, а не финансовая гарантия.'
            }
          </p>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Inputs */}
          <Reveal delay={120} className="hover-card hover-card-flat flex flex-col gap-6 border border-border bg-card p-6 hover:border-foreground! lg:col-span-3 md:p-8">
            <div>
              <label
                htmlFor="track"
                className="font-mono text-xs font-bold tracking-widest text-muted-foreground"
              >
                НАПРАВЛЕНИЕ
              </label>
              <div className="mt-3 flex flex-wrap gap-2">
                {tracks.map((t, i) => (
                  <button
                    key={t.name}
                    type="button"
                    onClick={() => setTrackIdx(i)}
                    aria-pressed={trackIdx === i}
                    className={`border border-border px-3 py-2 text-sm font-semibold transition-colors ${
                      trackIdx === i
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-background hover:bg-secondary'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="hours"
                  className="font-mono text-xs font-bold tracking-widest text-muted-foreground"
                >
                  ЧАСОВ В ДЕНЬ НА РАЗВИТИЕ
                </label>
                <span className="font-mono text-sm font-bold">{hours} ч</span>
              </div>
              <input
                id="hours"
                type="range"
                min={1}
                max={8}
                step={1}
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="mt-3 w-full accent-[oklch(0.72_0.17_45)]"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="years"
                  className="font-mono text-xs font-bold tracking-widest text-muted-foreground"
                >
                  ГОРИЗОНТ ПЛАНИРОВАНИЯ
                </label>
                <span className="font-mono text-sm font-bold">
                  {years} {years === 1 ? 'год' : years < 5 ? 'года' : 'лет'}
                </span>
              </div>
              <input
                id="years"
                type="range"
                min={1}
                max={7}
                step={1}
                value={years}
                onChange={(e) => setYears(Number(e.target.value))}
                className="mt-3 w-full accent-[oklch(0.72_0.17_45)]"
              />
            </div>
          </Reveal>

          {/* Results */}
          <Reveal delay={240} className="flex flex-col gap-4 lg:col-span-2">
            <div className="flex-1 bg-lime p-6 text-lime-foreground md:p-8">
              <div className="font-mono text-xs font-bold tracking-widest">
                {'ДОХОД / МЕС. ЧЕРЕЗ ' + years * 12 + ' МЕС.'}
              </div>
              <div
                key={`m-${trackIdx}-${hours}-${years}`}
                className="animate-value mt-2 text-4xl font-bold tracking-tight md:text-5xl"
              >
                {formatRub(result.monthly)}
              </div>
              <div className="mt-2 font-mono text-xs tracking-wide">
                {'старт: ~' + formatRub(result.startMonthly) + ' / мес.'}
              </div>
            </div>
            <div className="flex-1 bg-accent p-6 text-accent-foreground md:p-8">
              <div className="font-mono text-xs font-bold tracking-widest">
                {'НАКОПЛЕННЫЙ ДОХОД ЗА ПЕРИОД'}
              </div>
              <div
                key={`t-${trackIdx}-${hours}-${years}`}
                className="animate-value mt-2 text-4xl font-bold tracking-tight md:text-5xl"
              >
                {result.total >= 1000
                  ? `${(result.total / 1000).toFixed(1).replace('.', ',')} млн ₽`
                  : formatRub(result.total)}
              </div>
              <div className="mt-2 font-mono text-xs tracking-wide">
                {'при регулярной практике ' + hours + ' ч/день'}
              </div>
            </div>
          </Reveal>
        </div>

        <p className="mt-4 font-mono text-[10px] tracking-wide text-muted-foreground">
          {
            '* Модель иллюстративная: базовые ставки основаны на медианных вилках рынка, рост — на эффекте накопления экспертизы. Реальный результат зависит от региона, ниши и качества практики.'
          }
        </p>
      </div>
    </section>
  )
}
