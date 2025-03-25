import { NextResponse } from 'next/server'
import connectToDatabase from '@/lib/mongodb'
import { Grade } from '@/models/Grade'

export async function GET() {
  try {
    await connectToDatabase()
    
    const grades = await Grade.find({ isActive: true })
      .sort({ order: 1 })
      .select('-__v')

    return NextResponse.json(grades)
  } catch (error) {
    console.error('Error fetching grades:', error)
    return NextResponse.json({ error: 'Failed to fetch grades' }, { status: 500 })
  }
} 