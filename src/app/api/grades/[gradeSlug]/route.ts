import { NextResponse } from "next/server"
import connectToDatabase from "@/lib/mongodb"
import { Grade } from "@/models/Grade"

interface RouteParams {
  params: {
    gradeSlug: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    await connectToDatabase()

    const grade = await Grade.findOne({ slug: params.gradeSlug })

    if (!grade) {
      return NextResponse.json(
        { error: "Grade not found" },
        { status: 404 }
      )
    }

    return NextResponse.json(grade)
  } catch (error) {
    console.error("Error fetching grade:", error)
    return NextResponse.json(
      { error: "Failed to fetch grade" },
      { status: 500 }
    )
  }
} 