import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import { Topic } from "@/models/Topic"

interface RouteParams {
  params: {
    topicSlug: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    await connectToDatabase()

    const topic = await Topic.findOne({ 
      slug: params.topicSlug,
      isActive: true,
    })

    if (!topic) {
      return NextResponse.json(
        { error: "Topic not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(topic)
  } catch (error) {
    console.error("Error fetching topic:", error)
    return NextResponse.json(
      { error: "Failed to fetch topic" },
      { status: 500 }
    )
  }
} 