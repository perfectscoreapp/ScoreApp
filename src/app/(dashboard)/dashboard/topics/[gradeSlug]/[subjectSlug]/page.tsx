"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ITopic } from "@/models/Topic"

interface PageProps {
  params: {
    gradeSlug: string
    subjectSlug: string
  }
}

export default function TopicsPage({ params }: PageProps) {
  const [topics, setTopics] = useState<ITopic[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchTopics() {
      try {
        setLoading(true)
        const response = await fetch(
          `/api/topics?gradeSlug=${params.gradeSlug}&subjectSlug=${params.subjectSlug}`
        )
        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setTopics(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load topics')
      } finally {
        setLoading(false)
      }
    }

    fetchTopics()
  }, [params.gradeSlug, params.subjectSlug])

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

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex flex-col gap-8">
        <div>
          <Link
            href={`/dashboard/subjects/${params.gradeSlug}`}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            ← Back to Subjects
          </Link>
          <h1 className="text-3xl font-bold mt-4">Available Topics</h1>
          <p className="mt-2 text-muted-foreground">
            Select a topic to start practicing
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/dashboard/questions/${params.gradeSlug}/${params.subjectSlug}/${topic.slug}`}
              className="group relative rounded-lg border p-6 hover:shadow-md transition-all"
            >
              <h2 className="text-2xl font-semibold mb-3">{topic.name}</h2>
              <p className="text-muted-foreground mb-4">
                {topic.description}
              </p>
              
              {topic.learningObjectives && topic.learningObjectives.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-sm font-medium mb-2">Learning Objectives:</h3>
                  <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                    {topic.learningObjectives.slice(0, 2).map((objective, index) => (
                      <li key={index}>{objective}</li>
                    ))}
                    {topic.learningObjectives.length > 2 && (
                      <li>+ {topic.learningObjectives.length - 2} more...</li>
                    )}
                  </ul>
                </div>
              )}

              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                {topic.difficultyLevel && (
                  <span>Difficulty: {topic.difficultyLevel}</span>
                )}
                {topic.estimatedTimeMinutes && (
                  <>
                    <span>•</span>
                    <span>{topic.estimatedTimeMinutes} min</span>
                  </>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 