import { QuestionStats, IQuestionStats } from '@/models/QuestionStats'
import connectToDatabase from '@/lib/mongodb'

export async function getQuestionStats(
  userId: string,
  gradeId: string,
  subjectId: string,
  subtopicId: string
): Promise<IQuestionStats | null> {
  await connectToDatabase()
  
  return QuestionStats.findOne({
    userId,
    gradeId,
    subjectId,
    subtopicId
  })
}

export async function updateQuestionStats(
  userId: string,
  gradeId: string,
  subjectId: string,
  subtopicId: string,
  stats: {
    totalQuestions: number
    answeredQuestions: number
    totalPoints: number
    earnedPoints: number
    timeSpent: number
  }
): Promise<IQuestionStats> {
  await connectToDatabase()

  const update = {
    ...stats,
    lastUpdated: new Date()
  }

  return QuestionStats.findOneAndUpdate(
    {
      userId,
      gradeId,
      subjectId,
      subtopicId
    },
    update,
    {
      new: true,
      upsert: true,
      setDefaultsOnInsert: true
    }
  )
} 