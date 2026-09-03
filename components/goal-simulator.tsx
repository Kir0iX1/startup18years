'use client'

import { useMemo, useState } from 'react'
import { BriefcaseBusiness, GraduationCap, Laptop, ShieldCheck } from 'lucide-react'

import { Reveal } from '@/components/reveal'

const goals = [
  { name: 'Ноутбук', price: 120000, icon: Laptop },
  { name: 'Обучение', price: 180000, icon: GraduationCap },
  { name: 'Подушка', price: 300000, icon: ShieldCheck },
  { name: 'Первый бизнес', price: 500000, icon: BriefcaseBusiness },
]

const money = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 })

export function GoalSimulator() {
  const [goalIndex, setGoalIndex] = useState(0)
  const [income, setIncome] = useState(70000)
  const [share, setShare] = useState(20)
  const goal = goals[goalIndex]
  const monthly = Math.max(1, Math.round(income * share / 100))
  const months = Math.ceil(goal.price / monthly)
  const chart = useMemo(() => Array.from({ length: Math.min(months, 12) }, (_, i) => Math.min(100, ((i + 1) * monthly / goal.price) * 100)), [months, monthly, goal.price])
  const yearProgress = Math.min(100, (monthly * 12 / goal.price) * 100)

  return (
    <section id="goal" className="border-b border-border bg-card">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="font-mono text-xs tracking-widest text-muted-foreground">РАЗДЕЛ 05 — ФИНАНСОВАЯ ЦЕЛЬ</div>
          <h2 className="mt-4 text-balance text-3xl font-bold uppercase tracking-tight md:text-5xl">От зарплаты к конкретной цели</h2>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">Настрой доход и долю накоплений — модель покажет достижимый срок и траекторию первых двенадцати месяцев.</p>
        </Reveal>

        <div className="mt-10 grid border border-border lg:grid-cols-5">
          <Reveal delay={100} className="flex flex-col gap-7 p-6 lg:col-span-3 md:p-8">
            <fieldset>
              <legend className="font-mono text-xs font-bold tracking-widest">01 / ВЫБЕРИ ЦЕЛЬ</legend>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {goals.map((item, index) => { const Icon = item.icon; return <button key={item.name} type="button" onClick={() => setGoalIndex(index)} aria-pressed={index === goalIndex} className={`flex min-h-24 flex-col items-start justify-between border p-3 text-left transition-colors ${index === goalIndex ? 'border-primary bg-primary text-primary-foreground' : 'border-border hover:bg-secondary'}`}><Icon size={20} /><span className="text-sm font-bold">{item.name}</span></button> })}
              </div>
            </fieldset>

            <label className="block">
              <span className="flex justify-between gap-4 font-mono text-xs font-bold tracking-widest"><span>02 / ДОХОД В МЕСЯЦ</span><strong>{money.format(income)} ₽</strong></span>
              <input className="mt-4 w-full accent-primary" type="range" min="30000" max="250000" step="5000" value={income} onChange={(e) => setIncome(Number(e.target.value))} />
            </label>
            <label className="block">
              <span className="flex justify-between gap-4 font-mono text-xs font-bold tracking-widest"><span>03 / ДОЛЯ НАКОПЛЕНИЙ</span><strong>{share}%</strong></span>
              <input className="mt-4 w-full accent-primary" type="range" min="5" max="60" step="5" value={share} onChange={(e) => setShare(Number(e.target.value))} />
            </label>
          </Reveal>

          <Reveal delay={220} className="flex flex-col justify-between bg-lime p-6 text-lime-foreground lg:col-span-2 md:p-8">
            <div aria-live="polite">
              <div className="font-mono text-xs font-bold tracking-widest">ЦЕЛЬ: {goal.name.toUpperCase()}</div>
              <div key={`${goalIndex}-${income}-${share}`} className="animate-value mt-3 text-5xl font-bold tracking-tight">{months}</div>
              <div className="mt-1 text-lg font-bold">{months === 1 ? 'месяц' : months < 5 ? 'месяца' : 'месяцев'} до цели</div>
              <dl className="mt-7 grid grid-cols-2 gap-4 border-t border-lime-foreground/30 pt-5">
                <div><dt className="font-mono text-[10px] tracking-widest">ЦЕНА ЦЕЛИ</dt><dd className="mt-1 font-bold">{money.format(goal.price)} ₽</dd></div>
                <div><dt className="font-mono text-[10px] tracking-widest">ВЗНОС / МЕС.</dt><dd className="mt-1 font-bold">{money.format(monthly)} ₽</dd></div>
              </dl>
            </div>

            <div className="mt-10">
              <div className="flex h-28 items-end gap-1" aria-label={`За год будет накоплено ${Math.round(yearProgress)} процентов цели`}>
                {chart.map((height, index) => <div key={index} className="flex-1 bg-lime-foreground transition-[height] duration-500" style={{ height: `${Math.max(5, height)}%`, opacity: 0.35 + index / 20 }} />)}
              </div>
              <div className="mt-3 flex justify-between font-mono text-[10px] tracking-widest"><span>СТАРТ</span><span>{Math.min(months, 12)} МЕС.</span></div>
            </div>
          </Reveal>
        </div>
        <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-wide text-muted-foreground">МОДЕЛЬ НЕ УЧИТЫВАЕТ ИНФЛЯЦИЮ И ИЗМЕНЕНИЕ ДОХОДА. РЕЗУЛЬТАТ — ОРИЕНТИР ДЛЯ ЛИЧНОГО ПЛАНА.</p>
      </div>
    </section>
  )
}
