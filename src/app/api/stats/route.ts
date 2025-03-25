import { NextResponse } from 'next/server'
import { getQuestionStats, updateQuestionStats } from '@/services/questionStatsService'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get('userId')
  const gradeSlug = searchParams.get('gradeSlug')
  const subjectSlug = searchParams.get('subjectSlug')
  const topicSlug = searchParams.get('topicSlug')

  if (!userId || !gradeSlug || !subjectSlug || !topicSlug) {
    return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
  }

  try {
    const stats = await getQuestionStats(userId, gradeSlug, subjectSlug, topicSlug)
    return NextResponse.json(stats)
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { userId, gradeSlug, subjectSlug, topicSlug, stats } = body

    if (!userId || !gradeSlug || !subjectSlug || !topicSlug || !stats) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 })
    }

    const updatedStats = await updateQuestionStats(userId, gradeSlug, subjectSlug, topicSlug, stats)
    return NextResponse.json(updatedStats)
  } catch (error) {
    console.error('Error updating stats:', error)
    return NextResponse.json({ error: 'Failed to update stats' }, { status: 500 })
  }
} 