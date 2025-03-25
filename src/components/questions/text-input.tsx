"use client"

import { useState } from "react"
import { TextInputQuestion } from "@/types/question"
import { Input } from "@/components/ui/input"

interface TextInputProps {
  question: TextInputQuestion
  onAnswer: (answer: string) => void
}

export function TextInputQuestionComponent({
  question,
  onAnswer,
}: TextInputProps) {
  const [answer, setAnswer] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setAnswer(value)
    onAnswer(value)
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      <Input
        type="text"
        value={answer}
        onChange={handleChange}
        placeholder="Type your answer here..."
        className="max-w-md"
      />
    </div>
  )
} 