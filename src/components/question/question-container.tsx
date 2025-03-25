'use client'

import { useState } from 'react'
import { IQuestion } from '@/models/Question'
import { MultipleChoiceQuestion } from './multiple-choice-question'
import { TextQuestion } from './text-question'
import { HighlightTextQuestion } from './highlight-text-question'
import { DragDropQuestion } from './drag-drop-question'

interface QuestionContainerProps {
  questions: IQuestion[]
  currentIndex: number
  onAnswer: (questionId: string, answer: any, isCorrect: boolean) => void
}

export function QuestionContainer({ questions, currentIndex, onAnswer }: QuestionContainerProps) {
  const currentQuestion = questions[currentIndex]

  if (!currentQuestion) {
    return <div>No question available</div>
  }

  // Render the question based on its type
  switch (currentQuestion.type) {
    case 'multiple-choice':
      return (
        <div>
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
          <div className="space-y-2">
            {currentQuestion.choices?.map((choice) => (
              <button
                key={choice.id}
                onClick={() => onAnswer(currentQuestion._id.toString(), choice.text, choice.isCorrect)}
                className="w-full text-left p-3 rounded-lg border hover:bg-gray-50 transition-colors"
              >
                {choice.text}
              </button>
            ))}
          </div>
        </div>
      )

    case 'text':
      return (
        <div>
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
          <input
            type="text"
            className="w-full p-2 border rounded-lg"
            placeholder="Type your answer here..."
            onChange={(e) => {
              const isCorrect = e.target.value.toLowerCase() === currentQuestion.correctAnswer?.toLowerCase()
              onAnswer(currentQuestion._id.toString(), e.target.value, isCorrect)
            }}
          />
        </div>
      )

    case 'highlight':
      return (
        <div>
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
          <div className="p-4 border rounded-lg bg-gray-50">
            {currentQuestion.text.split(' ').map((word, index) => (
              <span
                key={index}
                onClick={() => {
                  const isCorrect = word.toLowerCase() === currentQuestion.correctAnswer?.toLowerCase()
                  onAnswer(currentQuestion._id.toString(), word, isCorrect)
                }}
                className="cursor-pointer hover:bg-yellow-200 px-1"
              >
                {word}{' '}
              </span>
            ))}
          </div>
        </div>
      )

    case 'drag-drop':
      return (
        <div>
          <h3 className="text-lg font-medium mb-4">{currentQuestion.text}</h3>
          <div className="space-y-2">
            {currentQuestion.choices?.map((choice) => (
              <div
                key={choice.id}
                className="p-3 border rounded-lg bg-white cursor-move"
                draggable
              >
                {choice.text}
              </div>
            ))}
          </div>
        </div>
      )

    default:
      return <div>Unsupported question type</div>
  }
} 