import mongoose from 'mongoose'

export interface IQuestionStats {
  userId: string
  gradeId: string
  subjectId: string
  subtopicId: string
  totalQuestions: number
  answeredQuestions: number
  totalPoints: number
  earnedPoints: number
  timeSpent: number
  lastUpdated: Date
}

const QuestionStatsSchema = new mongoose.Schema<IQuestionStats>({
  userId: { type: String, required: true },
  gradeId: { type: String, required: true },
  subjectId: { type: String, required: true },
  subtopicId: { type: String, required: true },
  totalQuestions: { type: Number, required: true },
  answeredQuestions: { type: Number, required: true, default: 0 },
  totalPoints: { type: Number, required: true },
  earnedPoints: { type: Number, required: true, default: 0 },
  timeSpent: { type: Number, required: true, default: 0 },
  lastUpdated: { type: Date, required: true, default: Date.now }
}, {
  timestamps: true
})

// Create a compound index for efficient querying
QuestionStatsSchema.index({ userId: 1, gradeId: 1, subjectId: 1, subtopicId: 1 }, { unique: true })

// Check if the model exists before creating it
export const QuestionStats = (mongoose.models?.QuestionStats as mongoose.Model<IQuestionStats>) || 
  mongoose.model<IQuestionStats>('QuestionStats', QuestionStatsSchema) 