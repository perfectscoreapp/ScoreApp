"use client"

import { useState } from "react"
import { SingleChoiceQuestion } from "@/types/question"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface SingleChoiceProps {
  question: SingleChoiceQuestion
  onAnswer: (answer: string) => void
}

export function SingleChoiceQuestionComponent({
  question,
  onAnswer,
}: SingleChoiceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")

  const handleOptionChange = (value: string) => {
    setSelectedAnswer(value)
    onAnswer(value)
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      <RadioGroup
        value={selectedAnswer}
        onValueChange={handleOptionChange}
        className="space-y-2"
      >
        {question.options.map((option) => (
          <div
            key={option.id}
            className="flex items-center space-x-3 rounded-lg border p-4 hover:bg-muted/50"
          >
            <RadioGroupItem value={option.id} id={option.id} />
            <Label htmlFor={option.id}>{option.text}</Label>
          </div>
        ))}
      </RadioGroup>
    </div>
  )
} 