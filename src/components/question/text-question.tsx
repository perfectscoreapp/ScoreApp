'use client'

import { useState } from 'react'

interface TextQuestionProps {
  question: string
  onAnswer: (answer: string) => void
  answer?: string
}

export function TextQuestion({
  question,
  onAnswer,
  answer
}: TextQuestionProps) {
  const [input, setInput] = useState(answer || '')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onAnswer(input)
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{question}</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Type your answer here..."
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </div>
  )
} 