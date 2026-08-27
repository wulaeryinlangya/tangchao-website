interface ChatMessage {
  role: 'user' | 'ai'
  text: string
}

interface ChatResponse {
  message: string
  usage?: {
    input_tokens: number
    output_tokens: number
  }
}

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  try {
    const response = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message,
        history,
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({}))
      throw new Error(error.error || '网络请求失败')
    }

    const data: ChatResponse = await response.json()
    return data.message
  } catch (error) {
    console.error('Chat API error:', error)
    throw error
  }
}
