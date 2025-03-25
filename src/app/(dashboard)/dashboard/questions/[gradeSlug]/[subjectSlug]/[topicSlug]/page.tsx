"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { ITopic } from "@/models/Topic"
import { IQuestion } from "@/models/Question"
import { QuestionContainer } from "@/components/dashboard/question-container"
import { AiChat } from "@/components/dashboard/ai-chat"
import { StatsCounter } from "@/components/dashboard/stats-counter"
import { Button } from "@/components/ui/button"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { InfoIcon } from "@/components/icons/InfoIcon"

interface PageProps {
  params: {
    gradeSlug: string
    subjectSlug: string
    topicSlug: string
  }
  searchParams: { q?: string }
}

interface Answer {
  answer: any
  isCorrect: boolean
}

export default function QuestionsPage({ params, searchParams }: PageProps) {
  const [topic, setTopic] = useState<ITopic | null>(null)
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [answers, setAnswers] = useState<Record<string, Answer>>({})
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    if (searchParams.q) {
      setCurrentQuestionIndex(parseInt(searchParams.q) - 1)
    }
  }, [searchParams.q])

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        
        const topicResponse = await fetch(`/api/topics/${params.topicSlug}`)
        const topicData = await topicResponse.json()
        
        if (topicData.error) {
          throw new Error(topicData.error)
        }
        
        setTopic(topicData)

        const questionsResponse = await fetch(`/api/questions?topicId=${topicData._id}`)
        const questionsData = await questionsResponse.json()
        
        if (questionsData.error) {
          throw new Error(questionsData.error)
        }
        
        setQuestions(questionsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [params.topicSlug])

  const handleAnswer = (questionId: string, answer: any, isCorrect: boolean) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: { answer, isCorrect },
    }))
  }

  const handleQuestionChange = (newIndex: number) => {
    setCurrentQuestionIndex(newIndex)
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

  if (!topic) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Topic not found</div>
      </div>
    )
  }

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      <div className="flex items-center justify-between p-6 border-b">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">{topic.name}</h1>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <InfoIcon className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Learning Objectives</h4>
                <p className="text-sm text-muted-foreground">
                  {topic.learningObjectives}
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex items-center gap-4">
          <StatsCounter 
            userId={userId}
            gradeSlug={params.gradeSlug}
            subjectSlug={params.subjectSlug}
            topicSlug={params.topicSlug}
            totalQuestions={questions.length}
          />
        </div>
      </div>

      <div className="flex-1 p-6 overflow-hidden">
        {questions.length > 0 ? (
          <QuestionContainer
            questions={questions}
            currentIndex={currentQuestionIndex}
            onAnswer={handleAnswer}
            onQuestionChange={handleQuestionChange}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No questions available</p>
          </div>
        )}
      </div>
    </div>
  )
} 