import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { Question } from '@/models/Question'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const topicId = searchParams.get('topicId')

  if (!topicId) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    await connectToDatabase()
    
    const stats = await Question.aggregate([
      { $match: { topicId, isActive: true } },
      {
        $group: {
          _id: '$difficulty',
          count: { $sum: 1 },
          totalPoints: { $sum: '$points' },
          questions: {
            $push: {
              id: '$_id',
              type: '$type',
              points: '$points'
            }
          }
        }
      },
      {
        $group: {
          _id: null,
          totalQuestions: { $sum: '$count' },
          totalPoints: { $sum: '$totalPoints' },
          byDifficulty: {
            $push: {
              difficulty: '$_id',
              count: '$count',
              points: '$totalPoints',
              questions: '$questions'
            }
          }
        }
      }
    ])

    return NextResponse.json(stats[0] || {
      totalQuestions: 0,
      totalPoints: 0,
      byDifficulty: []
    })
  } catch (error) {
    console.error('Error fetching question stats:', error)
    return NextResponse.json({ error: 'Failed to fetch question stats' }, { status: 500 })
  }
} 