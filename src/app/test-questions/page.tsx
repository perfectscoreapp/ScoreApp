"use client"

import { useState } from "react"
import { sampleQuestions } from "@/data/sample-questions"
import { QuestionComponent } from "@/components/questions/question"
import { StatsCounter } from "@/components/questions/stats-counter"

export default function TestQuestionsPage() {
  const [answers, setAnswers] = useState<Record<string, any>>({})

  const handleAnswer = (questionId: string, answer: any) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: answer,
    }))
  }

  // Calculate total points available
  const totalPoints = sampleQuestions.reduce((sum, q) => sum + q.points, 0)

  // Calculate earned points
  const earnedPoints = sampleQuestions.reduce((sum, question) => {
    const answer = answers[question.id]
    if (!answer) return sum

    switch (question.type) {
      case "multiple-choice": {
        const correctAnswers = new Set(question.correctAnswers)
        const userAnswers = new Set(answer)
        const isCorrect =
          correctAnswers.size === userAnswers.size &&
          [...correctAnswers].every((a) => userAnswers.has(a))
        return sum + (isCorrect ? question.points : 0)
      }
      case "single-choice": {
        return sum + (answer === question.correctAnswer ? question.points : 0)
      }
      case "text-input": {
        const isCorrect = question.caseSensitive
          ? answer === question.correctAnswer
          : answer.toLowerCase() === question.correctAnswer.toLowerCase()
        return sum + (isCorrect ? question.points : 0)
      }
      case "drag-drop": {
        const isCorrect = question.correctPlacements.every((placement) =>
          answer.some(
            (a: { itemId: string; zoneId: string }) =>
              a.itemId === placement.itemId && a.zoneId === placement.zoneId
          )
        )
        return sum + (isCorrect ? question.points : 0)
      }
      case "highlight-text": {
        const correctHighlights = new Set(
          question.correctHighlights.map((h) => h.text.toLowerCase())
        )
        const userHighlights = new Set(
          answer.map((h: { text: string }) => h.text.toLowerCase())
        )
        const isCorrect =
          correctHighlights.size === userHighlights.size &&
          [...correctHighlights].every((h) => userHighlights.has(h))
        return sum + (isCorrect ? question.points : 0)
      }
      default:
        return sum
    }
  }, 0)

  return (
    <div className="container py-8">
      <div className="mb-12">
        <StatsCounter
          totalQuestions={sampleQuestions.length}
          answeredQuestions={Object.keys(answers).length}
          totalPoints={totalPoints}
          earnedPoints={earnedPoints}
        />
      </div>

      <h1 className="text-3xl font-bold mb-8">Sample Questions</h1>
      <div className="space-y-12">
        {sampleQuestions.map((question) => (
          <div key={question.id} className="space-y-4">
            <div className="p-6 rounded-lg border">
              <QuestionComponent
                question={question}
                onAnswer={(answer) => handleAnswer(question.id, answer)}
              />
            </div>
            <div className="pl-6 space-y-2">
              <div className="text-sm text-muted-foreground">
                Your answer: {JSON.stringify(answers[question.id])}
              </div>
              <div className="text-sm text-muted-foreground">
                Correct answer: {JSON.stringify(
                  "correctAnswers" in question
                    ? question.correctAnswers
                    : "correctAnswer" in question
                    ? question.correctAnswer
                    : "correctPlacements" in question
                    ? question.correctPlacements
                    : "correctHighlights" in question
                    ? question.correctHighlights
                    : null
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 