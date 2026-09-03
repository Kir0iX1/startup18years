'use client'

import { useRef, useState, type TouchEvent } from 'react'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'

import { Reveal } from '@/components/reveal'

const scenarios = [
  { name: 'Студент-разработчик', category: 'IT', label: 'КОД / СИСТЕМЫ', result: '120–180 тыс. ₽ / мес.', stages: [['Неделя 1', 'Выбирает frontend и собирает учебный план'], ['Месяц 2', 'Берёт первый лендинг за 12 000 ₽'], ['Месяц 6', 'Стажировка + два клиента на поддержке'], ['Год 1', 'Junior-разработчик с портфолио и заказами']] },
  { name: 'Дизайнер-фрилансер', category: 'КРЕАТИВ', label: 'ВИЗУАЛ / ПРОДУКТ', result: '90–150 тыс. ₽ / мес.', stages: [['Неделя 1', 'Осваивает Figma на реальных редизайнах'], ['Месяц 2', 'Первый заказ через знакомых за 8 000 ₽'], ['Месяц 6', 'Узкая специализация на лендингах'], ['Год 1', 'Постоянные клиенты и ставка 2 000 ₽ / час']] },
  { name: 'Специалист SMM', category: 'КРЕАТИВ', label: 'КОНТЕНТ / МАРКЕТИНГ', result: '80–140 тыс. ₽ / мес.', stages: [['Неделя 1', 'Берёт соцсети студенческого проекта'], ['Месяц 2', 'Получает первый кейс с цифрами роста'], ['Месяц 6', 'Ведёт три коммерческих аккаунта'], ['Год 1', 'Собирает мини-команду из дизайнера и автора']] },
  { name: 'Сотрудник сервиса', category: 'СЕРВИС', label: 'ЛЮДИ / ОПЕРАЦИИ', result: '65–110 тыс. ₽ / мес.', stages: [['Неделя 1', 'Выходит на гибкую смену без опыта'], ['Месяц 2', 'Становится старшим смены'], ['Месяц 6', 'Изучает продажи и управление'], ['Год 1', 'Переходит в администратора или продажи B2B']] },
  { name: 'Начинающий предприниматель', category: 'БИЗНЕС', label: 'ПРОДАЖИ / МАСШТАБ', result: 'от 150 тыс. ₽ / мес.', stages: [['Неделя 1', 'Находит одну дорогую проблему аудитории'], ['Месяц 2', 'Продаёт услугу первым трём клиентам'], ['Месяц 6', 'Описывает процесс и делегирует задачи'], ['Год 1', 'Строит систему повторных продаж']] },
] as const

export function Scenarios() {
  const [active, setActive] = useState(0)
  const touchStart = useRef<number | null>(null)
  const scenario = scenarios[active]

  function move(direction: number) {
    setActive((current) => (current + direction + scenarios.length) % scenarios.length)
  }

  function onTouchEnd(event: TouchEvent) {
    if (touchStart.current === null) return
    const delta = event.changedTouches[0].clientX - touchStart.current
    if (Math.abs(delta) > 45) move(delta < 0 ? 1 : -1)
    touchStart.current = null
  }

  function openCategory() {
    window.dispatchEvent(new CustomEvent('start18:select-category', { detail: scenario.category }))
    document.querySelector('#professions')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="scenarios" className="overflow-hidden border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="font-mono text-xs tracking-widest opacity-70">РАЗДЕЛ 03 — СЦЕНАРИИ</div>
          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h2 className="text-balance text-3xl font-bold uppercase tracking-tight md:text-5xl">Пять маршрутов к доходу</h2>
              <p className="mt-4 max-w-2xl leading-relaxed opacity-70">Не идеальные истории успеха, а реалистичные последовательности действий на первый год.</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => move(-1)} aria-label="Предыдущий сценарий" className="grid size-11 place-items-center border border-primary-foreground/30 transition-colors hover:bg-primary-foreground hover:text-primary"><ArrowLeft size={18} /></button>
              <button type="button" onClick={() => move(1)} aria-label="Следующий сценарий" className="grid size-11 place-items-center border border-primary-foreground/30 transition-colors hover:bg-primary-foreground hover:text-primary"><ArrowRight size={18} /></button>
            </div>
          </div>
        </Reveal>

        <div className="mt-10" onTouchStart={(e) => { touchStart.current = e.touches[0].clientX }} onTouchEnd={onTouchEnd}>
          <div key={active} className="animate-card-in border border-primary-foreground/25">
            <div className="flex flex-col justify-between gap-5 bg-accent p-6 text-accent-foreground md:flex-row md:items-end md:p-8">
              <div><div className="font-mono text-xs font-bold tracking-widest">{scenario.label}</div><h3 className="mt-2 text-2xl font-bold uppercase md:text-4xl">{scenario.name}</h3></div>
              <div className="font-mono text-sm font-bold">{scenario.result}</div>
            </div>
            <ol className="grid bg-primary-foreground/20 md:grid-cols-4 md:gap-px">
              {scenario.stages.map(([period, text], index) => (
                <li key={period} className="border-b border-primary-foreground/20 bg-primary p-6 last:border-b-0 md:border-b-0">
                  <div className="flex items-center gap-3"><span className="grid size-7 place-items-center bg-lime font-mono text-xs font-bold text-lime-foreground">{index + 1}</span><span className="font-mono text-xs tracking-widest opacity-60">{period}</span></div>
                  <p className="mt-4 text-sm font-semibold leading-relaxed">{text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className="mt-6 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div className="flex gap-2" role="tablist" aria-label="Выбор сценария">
            {scenarios.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={index === active} aria-label={item.name} onClick={() => setActive(index)} className={`h-1.5 transition-all duration-300 ${index === active ? 'w-12 bg-lime' : 'w-6 bg-primary-foreground/30 hover:bg-primary-foreground/60'}`} />)}
          </div>
          <button type="button" onClick={openCategory} className="flex items-center justify-center gap-2 bg-lime px-5 py-3 font-mono text-xs font-bold tracking-widest text-lime-foreground transition-transform hover:-translate-y-0.5">ПРОФЕССИИ ЭТОГО МАРШРУТА <ExternalLink size={15} /></button>
        </div>
      </div>
    </section>
  )
}
