"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { IGrade } from "@/models/Grade"

export default function GradesPage() {
  const [grades, setGrades] = useState<IGrade[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchGrades() {
      try {
        setLoading(true)
        const response = await fetch('/api/grades')
        const data = await response.json()

        if (data.error) {
          throw new Error(data.error)
        }

        setGrades(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load grades')
      } finally {
        setLoading(false)
      }
    }

    fetchGrades()
  }, [])

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
          <h1 className="text-3xl font-bold">Grade Levels</h1>
          <p className="mt-2 text-muted-foreground">
            Select your grade level to view available subjects
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {grades.map((grade) => (
            <Link
              key={grade.slug}
              href={`/dashboard/subjects/${grade.slug}`}
              className="group relative rounded-lg border p-6 hover:shadow-md transition-all"
            >
              <h2 className="text-2xl font-semibold">{grade.name}</h2>
              <p className="mt-2 text-muted-foreground">
                {grade.description}
              </p>
              <div className="mt-4">
                <h3 className="text-sm font-medium">Available Subjects:</h3>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {grade.subjects.map((subject) => (
                    <li
                      key={subject.slug}
                      className="rounded-full bg-blue-500 px-3 py-1 text-xs text-white"
                    >
                      {subject.name}
                    </li>
                  ))}
                </ul>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
} 