'use client'

import { useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/reveal'

const stats = [
  {
    prefix: '',
    target: 73,
    suffix: '%',
    decimals: 0,
    label: 'работодателей ценят практический опыт выше диплома при найме джуниоров',
  },
  {
    prefix: 'x',
    target: 2.4,
    suffix: '',
    decimals: 1,
    label: 'рост дохода специалиста в первые 3 года при системном развитии навыка',
  },
  {
    prefix: '',
    target: 18,
    suffix: '–24',
    decimals: 0,
    label: 'возраст самой быстрорастущей группы фрилансеров на цифровых платформах',
  },
  {
    prefix: '',
    target: 40,
    suffix: '%',
    decimals: 0,
    label: 'вакансий 2026 года допускают полностью удалённый формат работы',
  },
]

function CountUp({
  target,
  prefix,
  suffix,
  decimals,
}: {
  target: number
  prefix: string
  suffix: string
  decimals: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let frame = 0
    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()
        const duration = 1400
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 3)
          setValue(target * eased)
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 }
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [target])

  return (
    <div ref={ref} className="text-4xl font-bold tabular-nums tracking-tight">
      {prefix}
      {value.toFixed(decimals).replace('.', ',')}
      {suffix}
    </div>
  )
}

export function Stats() {
  return (
    <section aria-label="Ключевые цифры" className="border-b border-border">
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.label}
            delay={i * 120}
            className={`hover-card hover-card-flat p-6 hover:bg-card md:p-8 ${i > 0 ? 'border-t border-border md:border-l md:border-t-0' : ''}`}
          >
            <CountUp target={s.target} prefix={s.prefix} suffix={s.suffix} decimals={s.decimals} />
            <p className="mt-2 font-mono text-xs uppercase leading-relaxed tracking-wide text-muted-foreground">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
