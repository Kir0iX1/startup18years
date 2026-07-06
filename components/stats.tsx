import { Reveal } from '@/components/reveal'

const stats = [
  {
    value: '73%',
    label: 'работодателей ценят практический опыт выше диплома при найме джуниоров',
  },
  {
    value: 'x2.4',
    label: 'рост дохода специалиста в первые 3 года при системном развитии навыка',
  },
  {
    value: '18–24',
    label: 'возраст самой быстрорастущей группы фрилансеров на цифровых платформах',
  },
  {
    value: '40%',
    label: 'вакансий 2026 года допускают полностью удалённый формат работы',
  },
]

export function Stats() {
  return (
    <section
      aria-label="Ключевые цифры"
      className="border-b border-border"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 md:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal
            key={s.value}
            delay={i * 120}
            className={`p-6 md:p-8 ${i > 0 ? 'border-t border-border md:border-l md:border-t-0' : ''}`}
          >
            <div className="text-4xl font-bold tracking-tight">{s.value}</div>
            <p className="mt-2 font-mono text-xs uppercase leading-relaxed tracking-wide text-muted-foreground">
              {s.label}
            </p>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
