import { Reveal } from '@/components/reveal'

const principles = [
  {
    n: '01',
    title: 'Навык — главный актив',
    text: 'В 18 лет у тебя нет капитала, но есть время. Час, вложенный в востребованный навык, окупается годами растущей ставки. Диплом даёт допуск, навык даёт деньги.',
  },
  {
    n: '02',
    title: 'Двухпоточная стратегия',
    text: 'Поток А — быстрые деньги без квалификации (сервис, подработка) закрывают базовые расходы. Поток Б — обучение профессии. Через 6–12 месяцев поток Б обгоняет поток А.',
  },
  {
    n: '03',
    title: 'Легальность с первого рубля',
    text: 'Самозанятость оформляется за 10 минут в приложении, налог 4–6%. Легальный доход — это кредитная история, ипотека и защита от блокировок в будущем.',
  },
  {
    n: '04',
    title: 'Портфолио вместо резюме',
    text: '3–5 реальных кейсов убеждают работодателя сильнее любых строк в резюме. Первые заказы можно делать бесплатно или дёшево — это инвестиция, а не потеря.',
  },
  {
    n: '05',
    title: 'Правило 10–20%',
    text: 'С любого дохода откладывается 10–20%. Подушка на 3 месяца расходов даёт свободу выбирать работу, а не хвататься за первую попавшуюся.',
  },
  {
    n: '06',
    title: 'Осторожность к «лёгким деньгам»',
    text: 'Схемы «доход без усилий» — казино, пирамиды, сомнительный трейдинг — статистически ведут к потерям. Устойчивый доход всегда стоит на реальной ценности для людей.',
  },
]

export function Principles() {
  return (
    <section id="principles" className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="font-mono text-xs tracking-widest opacity-70">
            {'РАЗДЕЛ 04 — ВЫВОДЫ ИССЛЕДОВАНИЯ'}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold uppercase tracking-tight md:text-5xl">
            {'Шесть принципов дохода'}
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-8 md:grid-cols-2 lg:grid-cols-3">
          {principles.map((p, i) => (
            <Reveal key={p.n} delay={(i % 3) * 120} className="border-t border-primary-foreground/20 pt-4">
              <div className="font-mono text-xs font-bold tracking-widest text-accent">
                {p.n}
              </div>
              <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-80">{p.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
