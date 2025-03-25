"use client"

import { useState } from "react"
import { MultipleChoiceQuestion } from "@/types/question"
import { Checkbox } from "@/components/ui/checkbox"

interface MultipleChoiceProps {
  question: MultipleChoiceQuestion
  onAnswer: (answers: string[]) => void
}

export function MultipleChoiceQuestionComponent({
  question,
  onAnswer,
}: MultipleChoiceProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([])

  const handleOptionChange = (optionId: string, checked: boolean) => {
    const newAnswers = checked
      ? [...selectedAnswers, optionId]
      : selectedAnswers.filter((id) => id !== optionId)
    setSelectedAnswers(newAnswers)
    onAnswer(newAnswers)
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      <div className="space-y-2">
        {question.options.map((option) => (
          <label
            key={option.id}
            className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50"
          >
            <Checkbox
              checked={selectedAnswers.includes(option.id)}
              onCheckedChange={(checked) =>
                handleOptionChange(option.id, checked as boolean)
              }
            />
            <span>{option.text}</span>
          </label>
        ))}
      </div>
    </div>
  )
} 