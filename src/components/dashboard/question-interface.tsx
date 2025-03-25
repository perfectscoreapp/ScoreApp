"use client"

import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface Option {
  id: string
  text: string
}

interface QuestionInterfaceProps {
  onAnswer: (answer: string) => void
}

export function QuestionInterface({ onAnswer }: QuestionInterfaceProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedAnswer) {
      onAnswer(selectedAnswer)
    }
  }

  // Placeholder question data (will be replaced with real data)
  const question = {
    content: "What is 2 + 2?",
    options: [
      { id: "a", text: "3" },
      { id: "b", text: "4" },
      { id: "c", text: "5" },
      { id: "d", text: "6" },
    ],
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="rounded-lg border p-4">
        <p className="text-lg font-medium">{question.content}</p>
      </div>

      <div className="space-y-2">
        {question.options.map((option) => (
          <label
            key={option.id}
            className={`flex cursor-pointer items-center rounded-lg border p-4 hover:bg-muted/50 ${
              selectedAnswer === option.id ? "border-primary bg-primary/10" : ""
            }`}
          >
            <input
              type="radio"
              name="answer"
              value={option.id}
              checked={selectedAnswer === option.id}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className="sr-only"
            />
            <span>{option.text}</span>
          </label>
        ))}
      </div>

      <button
        type="submit"
        disabled={!selectedAnswer}
        className="w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
      >
        Submit Answer
      </button>
    </form>
  )
} 