interface GameProps {
  photo: string
  onScore: (score: number) => void
}

interface GameInfo {
  id: string
  name: string
  component: React.ComponentType<GameProps>
}

import QuizGame from './QuizGame'
import MatchGame from './MatchGame'
import FoodGame from './FoodGame'
import PuzzleGame from './PuzzleGame'
import OrderGame from './OrderGame'
import FindGame from './FindGame'
import PaintGame from './PaintGame'
import BubbleGame from './BubbleGame'

export const games: GameInfo[] = [
  { id: 'maker', name: '企业拼图', component: PuzzleGame },
  { id: 'study', name: '研学问答', component: QuizGame },
  { id: 'craft', name: '文创配对', component: MatchGame },
  { id: 'exp', name: '泡泡点击', component: BubbleGame },
  { id: 'food', name: '食材挑选', component: FoodGame },
  { id: 'wedding', name: '祝福拼句', component: OrderGame },
  { id: 'holiday', name: '风景找茬', component: FindGame },
  { id: 'street', name: '光影涂色', component: PaintGame },
]

export function getGame(id: string) {
  return games.find((g) => g.id === id)
}
