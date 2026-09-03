import {
  convertToModelMessages,
  createUIMessageStream,
  createUIMessageStreamResponse,
  generateText,
  type UIMessage,
} from 'ai'

import { getOfflineAnswer } from '@/lib/mentor-knowledge'

export const maxDuration = 30

const INSTRUCTIONS = `Ты — ИИ-ментор платформы СТАРТ18. Твоя задача — помогать молодым людям 18–25 лет начать зарабатывать деньги и выбрать востребованную профессию в 2026 году.

Правила:
- Отвечай только на русском языке.
- Будь конкретным и практичным: давай шаги, цифры, названия платформ, сроки. Никакой воды и мотивационных лозунгов.
- Отвечай кратко: 3–6 предложений или короткий список из 3–5 пунктов. Используй markdown-списки с дефисом и **жирный** для ключевых цифр.
- Опирайся на реальный рынок труда России и СНГ 2026 года: фриланс-биржи, самозанятость (налог 4–6%), стажировки, удалёнка, IT, дизайн, маркетинг, контент, сервисные профессии.
- Честно предупреждай о рисках: мошенничество, «лёгкие деньги», финансовые пирамиды, казино, крипто-схемы. Никогда не рекомендуй азартные игры и сомнительные схемы.
- Если вопрос не касается заработка, карьеры, навыков, финансов или образования — мягко верни разговор к теме платформы.
- Не давай юридических и инвестиционных гарантий. Формулируй как ориентиры, а не обещания.`

/** Splits text into small chunks so the fallback feels like live streaming. */
function* chunk(text: string, size = 6) {
  const words = text.split(/(\s+)/)
  let buffer = ''
  for (const w of words) {
    buffer += w
    if (buffer.length >= size) {
      yield buffer
      buffer = ''
    }
  }
  if (buffer) yield buffer
}

function lastUserText(messages: UIMessage[]): string {
  const last = [...messages].reverse().find((m) => m.role === 'user')
  if (!last) return ''
  return last.parts
    .filter((p) => p.type === 'text')
    .map((p) => (p as { text: string }).text)
    .join(' ')
}

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()
  const recent = messages.slice(-12)

  const stream = createUIMessageStream({
    execute: async ({ writer }) => {
      const id = `msg-${Date.now()}`
      let text: string
      let source: 'model' | 'offline' = 'model'

      try {
        const result = await generateText({
          model: 'openai/gpt-5.4-mini',
          instructions: INSTRUCTIONS,
          messages: await convertToModelMessages(recent),
          maxOutputTokens: 600,
        })
        text = result.text.trim()
        if (!text) throw new Error('Empty model response')
      } catch {
        // Model unavailable (no gateway credits, network, etc.) — degrade gracefully
        source = 'offline'
        text = getOfflineAnswer(lastUserText(recent))
      }

      writer.write({ type: 'text-start', id })
      for (const delta of chunk(text)) {
        writer.write({ type: 'text-delta', id, delta })
        // Small pacing so typing feels natural even for instant offline answers
        if (source === 'offline') await new Promise((r) => setTimeout(r, 18))
      }
      writer.write({ type: 'text-end', id })
    },
  })

  return createUIMessageStreamResponse({ stream })
}
