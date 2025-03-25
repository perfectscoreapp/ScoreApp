import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import { Topic } from "@/models/Topic"

export async function GET(request: Request) {
  try {
    await connectToDatabase()

    const { searchParams } = new URL(request.url)
    const gradeSlug = searchParams.get('gradeSlug')
    const subjectSlug = searchParams.get('subjectSlug')

    if (!gradeSlug || !subjectSlug) {
      return NextResponse.json(
        { error: "Grade and subject slugs are required" },
        { status: 400 }
      )
    }

    const topics = await Topic.find({
      gradeSlug,
      subjectSlug,
      isActive: true,
    }).sort({ name: 1 })

    return NextResponse.json(topics)
  } catch (error) {
    console.error("Error fetching topics:", error)
    return NextResponse.json(
      { error: "Failed to fetch topics" },
      { status: 500 }
    )
  }
} 