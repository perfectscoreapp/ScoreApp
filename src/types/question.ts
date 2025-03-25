export type QuestionType = 
  | 'multiple-choice'
  | 'single-choice'
  | 'text-input'
  | 'drag-drop'
  | 'highlight-text'

interface BaseQuestion {
  id: string
  type: QuestionType
  question: string
  explanation: string
  points: number
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple-choice'
  options: {
    id: string
    text: string
  }[]
  correctAnswers: string[] // Array of correct option IDs
}

export interface SingleChoiceQuestion extends BaseQuestion {
  type: 'single-choice'
  options: {
    id: string
    text: string
  }[]
  correctAnswer: string // Single correct option ID
}

export interface TextInputQuestion extends BaseQuestion {
  type: 'text-input'
  correctAnswer: string
  caseSensitive?: boolean
  allowPartialMatch?: boolean
}

export interface DragDropQuestion extends BaseQuestion {
  type: 'drag-drop'
  items: {
    id: string
    text: string
  }[]
  zones: {
    id: string
    label: string
  }[]
  correctPlacements: {
    itemId: string
    zoneId: string
  }[]
}

export interface HighlightTextQuestion extends BaseQuestion {
  type: 'highlight-text'
  content: string
  correctHighlights: {
    start: number
    end: number
    text: string
  }[]
}

export type Question =
  | MultipleChoiceQuestion
  | SingleChoiceQuestion
  | TextInputQuestion
  | DragDropQuestion
  | HighlightTextQuestion 