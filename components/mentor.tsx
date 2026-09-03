'use client'

import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useEffect, useRef, useState } from 'react'

import { Reveal } from '@/components/reveal'

const suggestions = [
  'С чего начать зарабатывать в 18 лет без опыта?',
  'Какая IT-профессия быстрее всего даёт первые деньги?',
  'Стоит ли оформлять самозанятость сразу?',
  'Как за 3 месяца выйти на 40 000 ₽ в месяц?',
]

function renderText(text: string) {
  // Light markdown: bullets and bold
  const lines = text.split('\n')
  return lines.map((line, i) => {
    const isBullet = /^\s*[-*•]\s+/.test(line)
    const clean = line.replace(/^\s*[-*•]\s+/, '')
    const segments = clean.split(/(\*\*[^*]+\*\*)/g).map((seg, j) =>
      seg.startsWith('**') && seg.endsWith('**') ? (
        <strong key={j} className="font-semibold">
          {seg.slice(2, -2)}
        </strong>
      ) : (
        <span key={j}>{seg}</span>
      )
    )
    if (isBullet) {
      return (
        <div key={i} className="flex gap-2">
          <span className="text-accent">—</span>
          <span>{segments}</span>
        </div>
      )
    }
    if (clean.trim() === '') return <div key={i} className="h-2" />
    return <p key={i}>{segments}</p>
  })
}

export function Mentor() {
  const { messages, sendMessage, status, error } = useChat({
    transport: new DefaultChatTransport({ api: '/api/mentor' }),
  })
  const [input, setInput] = useState('')
  const scrollRef = useRef<HTMLDivElement>(null)
  const busy = status === 'submitted' || status === 'streaming'

  useEffect(() => {
    const el = scrollRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [messages, status])

  function submit(text: string) {
    const value = text.trim()
    if (!value || busy) return
    sendMessage({ text: value })
    setInput('')
  }

  return (
    <section id="mentor" className="border-b border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-6xl px-4 py-14 md:px-6 md:py-20">
        <Reveal>
          <div className="flex items-center gap-3 font-mono text-xs tracking-widest opacity-70">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-lime opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-lime" />
            </span>
            {'РАЗДЕЛ 06 — ИИ-МЕНТОР · ОНЛАЙН'}
          </div>
          <h2 className="mt-4 text-balance text-3xl font-bold uppercase tracking-tight md:text-5xl">
            {'Спроси ИИ-ментора'}
          </h2>
          <p className="mt-4 max-w-2xl text-pretty leading-relaxed opacity-80">
            {
              'Персональный консультант на базе нейросети. Обучен на данных рынка труда 2026 года, отвечает конкретно: шаги, платформы, сроки, риски. Это ядро продукта — то, за что платят пользователи.'
            }
          </p>
        </Reveal>

        <Reveal delay={150} className="mt-10 border border-primary-foreground/20 bg-background text-foreground">
          {/* Chat window */}
          <div
            ref={scrollRef}
            className="flex h-[420px] flex-col gap-4 overflow-y-auto p-4 md:h-[480px] md:p-6"
            aria-live="polite"
            aria-label="Диалог с ИИ-ментором"
          >
            {messages.length === 0 && (
              <div className="flex h-full flex-col justify-center gap-6">
                <div className="flex gap-3">
                  <div className="flex size-8 shrink-0 items-center justify-center bg-lime font-mono text-xs font-bold text-lime-foreground">
                    AI
                  </div>
                  <div className="max-w-xl bg-card p-4 text-sm leading-relaxed">
                    {
                      'Привет! Я ментор СТАРТ18. Расскажи, сколько тебе лет, что умеешь и сколько времени готов уделять — и я предложу конкретный план первых денег. Или выбери вопрос ниже.'
                    }
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 pl-11">
                  {suggestions.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => submit(s)}
                      className="border border-border bg-background px-3 py-2 text-left font-mono text-xs tracking-wide transition-colors hover:border-accent hover:text-accent"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((m) => {
              const isUser = m.role === 'user'
              const text = m.parts
                .filter((p) => p.type === 'text')
                .map((p) => (p as { text: string }).text)
                .join('')
              return (
                <div
                  key={m.id}
                  className={`animate-card-in flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`flex size-8 shrink-0 items-center justify-center font-mono text-xs font-bold ${
                      isUser
                        ? 'bg-accent text-accent-foreground'
                        : 'bg-lime text-lime-foreground'
                    }`}
                  >
                    {isUser ? 'ТЫ' : 'AI'}
                  </div>
                  <div
                    className={`flex max-w-xl flex-col gap-1 p-4 text-sm leading-relaxed ${
                      isUser ? 'bg-primary text-primary-foreground' : 'bg-card'
                    }`}
                  >
                    {text ? renderText(text) : <span className="opacity-50">…</span>}
                  </div>
                </div>
              )
            })}

            {status === 'submitted' && (
              <div className="flex gap-3">
                <div className="flex size-8 shrink-0 items-center justify-center bg-lime font-mono text-xs font-bold text-lime-foreground">
                  AI
                </div>
                <div className="flex items-center gap-1 bg-card px-4 py-3">
                  <span className="size-1.5 animate-bounce rounded-full bg-foreground/60 [animation-delay:0ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-foreground/60 [animation-delay:150ms]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-foreground/60 [animation-delay:300ms]" />
                </div>
              </div>
            )}

            {error && (
              <div className="border border-accent bg-card p-3 font-mono text-xs text-accent">
                {'Ментор временно недоступен. Попробуй ещё раз через минуту.'}
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={(e) => {
              e.preventDefault()
              submit(input)
            }}
            className="flex items-stretch border-t border-border"
          >
            <label htmlFor="mentor-input" className="sr-only">
              Твой вопрос ментору
            </label>
            <input
              id="mentor-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  if (e.nativeEvent.isComposing || e.keyCode === 229) return
                  e.preventDefault()
                  submit(input)
                }
              }}
              placeholder="Напиши свой вопрос…"
              maxLength={500}
              disabled={busy}
              className="min-w-0 flex-1 bg-background px-4 py-4 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="bg-lime px-6 font-mono text-xs font-bold tracking-widest text-lime-foreground transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
            >
              {busy ? '…' : 'СПРОСИТЬ →'}
            </button>
          </form>
        </Reveal>

        <p className="mt-4 font-mono text-xs tracking-wide opacity-50">
          {'Ответы генерируются нейросетью и являются ориентиром, а не гарантией дохода.'}
        </p>
      </div>
    </section>
  )
}
