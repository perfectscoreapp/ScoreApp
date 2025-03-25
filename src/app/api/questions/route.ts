import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import { Question } from "@/models/Question"

export async function GET(request: Request) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const topicId = searchParams.get('topicId')

    if (!topicId) {
      return NextResponse.json(
        { error: "Topic ID is required" },
        { status: 400 }
      )
    }

    // Find questions for this topic
    const questions = await Question.find({
      topicId,
      isActive: true,
    }).sort({ order: 1 })

    return NextResponse.json(questions)
  } catch (error) {
    console.error("Error fetching questions:", error)
    return NextResponse.json(
      { error: "Failed to fetch questions" },
      { status: 500 }
    )
  }
} 