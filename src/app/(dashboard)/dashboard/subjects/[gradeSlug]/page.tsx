"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { IGrade } from "@/models/Grade"

interface PageProps {
  params: {
    gradeSlug: string
  }
}

export default function SubjectsPage({ params }: PageProps) {
  const [grade, setGrade] = useState<IGrade | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGrade() {
      try {
        setLoading(true)
        const response = await fetch(`/api/grades/${params.gradeSlug}`)
        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setGrade(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load grade')
      } finally {
        setLoading(false)
      }
    }

    fetchGrade()
  }, [params.gradeSlug])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    )
  }

  if (!grade) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Grade not found</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-8">
        <div>
          <Link
            href="/dashboard/grades"
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Grades
          </Link>
          <h1 className="text-3xl font-bold mt-4">{grade.name} Subjects</h1>
          <p className="mt-2 text-muted-foreground">
            Select a subject to view available topics
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grade.subjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/dashboard/topics/${grade.slug}/${subject.slug}`}
              className="group relative rounded-lg border p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-3 mb-4">
                {subject.icon && (
                  <span className="text-2xl">{subject.icon}</span>
                )}
                <h2 className="text-2xl font-semibold">{subject.name}</h2>
              </div>
              <p className="text-muted-foreground">
                {subject.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 