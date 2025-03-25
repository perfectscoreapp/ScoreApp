import mongoose from 'mongoose'

export type QuestionType = 'multiple-choice' | 'text' | 'highlight' | 'drag-drop'

export interface IChoice {
  id: string
  text: string
  isCorrect: boolean
  rationale: string
}

export interface IQuestion {
  _id: string
  topicId: string
  type: QuestionType
  text: string
  choices?: IChoice[]
  correctAnswer?: string
  answerRationale: string
  points: number
  difficulty: 'easy' | 'medium' | 'hard'
  keywords: string[]
  order: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

const ChoiceSchema = new mongoose.Schema<IChoice>({
  id: { type: String, required: true },
  text: { type: String, required: true },
  isCorrect: { type: Boolean, required: true },
  rationale: { type: String, required: true }
})

const QuestionSchema = new mongoose.Schema<IQuestion>({
  topicId: { type: String, required: true },
  type: { 
    type: String, 
    required: true,
    enum: ['multiple-choice', 'text', 'highlight', 'drag-drop']
  },
  text: { type: String, required: true },
  choices: [ChoiceSchema],
  correctAnswer: { type: String },
  answerRationale: { type: String, required: true },
  points: { type: Number, required: true, default: 1 },
  difficulty: { 
    type: String, 
    required: true,
    enum: ['easy', 'medium', 'hard'],
    default: 'medium'
  },
  keywords: [{ type: String }],
  order: { type: Number, required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
})

// Create compound index for efficient querying
QuestionSchema.index({ topicId: 1, order: 1 })

// Create index for keywords
QuestionSchema.index({ keywords: 1 })

export const Question = (mongoose.models?.Question as mongoose.Model<IQuestion>) || 
  mongoose.model<IQuestion>('Question', QuestionSchema) 