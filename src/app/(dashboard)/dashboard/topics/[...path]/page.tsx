"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { gradeTopics } from "@/data/topics-data"
import { QuestionContainer } from "@/components/dashboard/question-container"
import { AiChat } from "@/components/dashboard/ai-chat"
import { StatsCounter } from "@/components/dashboard/stats-counter"
import { useState, useEffect } from "react"
import { ITopic } from '@/models/Topic'
import { IQuestion } from '@/models/Question'

interface PageProps {
  params: {
    path: string[]
  }
  searchParams: { q?: string }
}

interface Answer {
  answer: any
  isCorrect: boolean
}

interface QuestionContainerProps {
  questions: IQuestion[]
  currentIndex: number
  onAnswer: (questionId: string, answer: any, isCorrect: boolean) => void
}

type TopicKey = keyof typeof gradeTopics[keyof typeof gradeTopics]["topics"]

export default function TopicsPage({ params, searchParams }: PageProps) {
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [gradeSlug, subjectSlug, topicSlug] = params.path || []
  const userId = 'temp-user-id' // TODO: Replace with actual user ID from auth
  
  const [topics, setTopics] = useState<ITopic[]>([])
  const [selectedTopic, setSelectedTopic] = useState<ITopic | null>(null)
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    if (searchParams.q) {
      setCurrentQuestionIndex(parseInt(searchParams.q) - 1)
    }
  }, [searchParams.q])

  const handleAnswer = (questionId: string, answer: any, isCorrect: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { answer, isCorrect },
    }))
  }

  useEffect(() => {
    async function fetchTopics() {
      try {
        setLoading(true)
        setError(null)

        const response = await fetch(`/api/topics?gradeSlug=${gradeSlug}&subjectSlug=${subjectSlug}`)
        const data = await response.json()
        
        if (data.error) {
          throw new Error(data.error)
        }
        
        setTopics(data)
        if (data.length > 0) {
          setSelectedTopic(data[0])
          fetchQuestions(data[0].slug)
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load topics')
      } finally {
        setLoading(false)
      }
    }

    if (gradeSlug && subjectSlug) {
      fetchTopics()
    }
  }, [gradeSlug, subjectSlug])

  const fetchQuestions = async (topicSlug: string) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/questions?topicId=${topicSlug}`)
      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }
      
      setQuestions(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load questions')
    } finally {
      setLoading(false)
    }
  }

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

  if (!gradeSlug || !subjectSlug) {
    return notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-8">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <Link
              href="/dashboard/grades"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← Back to Grades
            </Link>
            <h1 className="text-3xl font-bold">
              {selectedTopic ? selectedTopic.name : 'Topics'}
            </h1>
            {selectedTopic && (
              <p className="text-muted-foreground max-w-2xl">{selectedTopic.description}</p>
            )}
          </div>
          
          {selectedTopic && (
            <div className="sticky top-4">
              <StatsCounter
                userId={userId}
                gradeSlug={gradeSlug}
                subjectSlug={subjectSlug}
                topicSlug={selectedTopic._id.toString()}
                totalQuestions={questions.length}
              />
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-4 mt-6">
          {topics.map((topic) => (
            <button
              key={topic._id.toString()}
              onClick={() => {
                setSelectedTopic(topic)
                fetchQuestions(topic.slug)
                setCurrentQuestionIndex(0)
              }}
              className={`px-4 py-2 rounded-lg transition-colors ${
                selectedTopic?._id.toString() === topic._id.toString()
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              {topic.name}
            </button>
          ))}
        </div>

        {selectedTopic && selectedTopic.learningObjectives && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">Learning Objectives</h2>
            <ul className="list-disc list-inside space-y-1">
              {selectedTopic.learningObjectives.map((objective, index) => (
                <li key={index} className="text-gray-700">{objective}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
          {selectedTopic?.difficultyLevel && (
            <span>Difficulty: {selectedTopic.difficultyLevel}</span>
          )}
          {selectedTopic?.estimatedTimeMinutes && (
            <>
              <span>•</span>
              <span>Estimated time: {selectedTopic.estimatedTimeMinutes} minutes</span>
            </>
          )}
        </div>
      </div>

      {selectedTopic && questions.length > 0 && (
        <div className="grid gap-6 lg:grid-cols-[1fr,300px]">
          <div className="flex flex-col gap-6">
            <div className="rounded-lg border">
              <div className="flex items-center justify-between border-b p-4">
                <h2 className="font-semibold">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </h2>
                <div className="flex gap-2">
                  {currentQuestionIndex > 0 && (
                    <Link
                      href={`?q=${currentQuestionIndex}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Previous
                    </Link>
                  )}
                  {currentQuestionIndex < questions.length - 1 && (
                    <Link
                      href={`?q=${currentQuestionIndex + 2}`}
                      className="text-sm text-muted-foreground hover:text-foreground"
                    >
                      Next
                    </Link>
                  )}
                </div>
              </div>
              <div className="p-4">
                <QuestionContainer
                  questions={questions}
                  currentIndex={currentQuestionIndex}
                  onAnswer={handleAnswer}
                />
              </div>
            </div>
          </div>

          <div className="lg:max-h-[calc(100vh-10rem)] lg:sticky lg:top-20">
            <AiChat />
          </div>
        </div>
      )}
    </div>
  )
} 