import { useEffect, useRef, useState } from 'react'
import { suggestions } from '../data/faq'
import { matchFaq } from '../utils/faqMatch'
import { ArrowUpRight } from './icons'

interface Message {
  role: 'user' | 'ai'
  text: string
}

const welcome: Message = {
  role: 'ai',
  text: '你好呀，我是「智慧糖巢 · AI 顾问」。我可以为你介绍社区、业态、特色空间、参访信息等。点击下方问题，或直接输入你想了解的。',
}

export default function ChatAgent() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([welcome])
  const [input, setInput] = useState('')
  const bodyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight
    }
  }, [messages, open])

  const ask = (q: string) => {
    const trimmed = q.trim()
    if (!trimmed) return
    const { answer } = matchFaq(trimmed)
    setMessages((m) => [...m, { role: 'user', text: trimmed }, { role: 'ai', text: answer }])
    setInput('')
  }

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') ask(input)
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-24 right-6 z-[75] flex h-[480px] w-[360px] max-w-[90vw] flex-col overflow-hidden rounded-[1.5rem] border border-rule bg-paper-2/90 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-rule px-5 py-4">
            <div>
              <div className="font-heading text-lg italic text-ink">智慧糖巢 · AI 顾问</div>
              <div className="font-body text-[10px] uppercase tracking-wider text-honey">
                东江畔的创客之乡
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="press flex h-9 w-9 items-center justify-center rounded-full border border-rule bg-paper-2 text-ink/70 hover:text-ink"
              aria-label="关闭对话"
            >
              ×
            </button>
          </div>

          <div ref={bodyRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-3 font-body text-sm font-light leading-relaxed ${
                    m.role === 'user'
                      ? 'rounded-br-sm bg-white text-[#0a1513]'
                      : 'rounded-bl-sm border border-rule bg-paper-2 text-ink/90'
                  }`}
                >
                  {m.text}
                </div>
              </div>
            ))}
          </div>

          {messages.length <= 1 && (
            <div className="flex flex-wrap gap-2 px-4 pb-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => ask(s)}
                  className="press rounded-full border border-honey/30 px-3 py-1 font-body text-xs text-honey hover:bg-honey/10"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 border-t border-rule p-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="输入你的问题…"
              className="min-w-0 flex-1 rounded-full border border-rule bg-paper-2 px-4 py-2 font-body text-sm text-ink placeholder-ink-faint outline-none focus:border-honey/50"
            />
            <button
              type="button"
              onClick={() => ask(input)}
              className="press flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-honey text-white hover:bg-honey/90"
              aria-label="发送"
            >
              <ArrowUpRight size={16} />
            </button>
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="press fixed bottom-6 right-6 z-[75] flex h-14 w-14 items-center justify-center rounded-full border border-rule bg-paper-2/90 text-ink shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-xl"
        aria-label="智慧糖巢 AI 顾问"
      >
        {open ? (
          <span className="text-xl leading-none">×</span>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            <path d="M8 9h8M8 13h5" />
          </svg>
        )}
      </button>
    </>
  )
}
