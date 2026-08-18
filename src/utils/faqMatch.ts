import { faq, fallbackAnswer, type FaqEntry } from '../data/faq'

/** Match a user query against the FAQ knowledge base by keyword hits. */
export function matchFaq(query: string): { answer: string; tag: string; hit: FaqEntry | null } {
  const q = query.toLowerCase().trim()
  if (!q) {
    return { answer: fallbackAnswer, tag: '', hit: null }
  }

  let best: FaqEntry | null = null
  let bestScore = 0

  for (const entry of faq) {
    let score = 0
    for (const kw of entry.keywords) {
      const k = kw.toLowerCase()
      if (q.includes(k)) score += k.length > 1 ? 2 : 1
    }
    if (score > bestScore) {
      bestScore = score
      best = entry
    }
  }

  if (best && bestScore > 0) {
    return { answer: best.answer, tag: best.tag, hit: best }
  }

  return { answer: fallbackAnswer, tag: '', hit: null }
}
