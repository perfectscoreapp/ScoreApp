'use client'

import { IChoice } from '@/models/Question'

interface MultipleChoiceQuestionProps {
  question: string
  choices: IChoice[]
  onAnswer: (choiceId: string) => void
  answer?: string
}

export function MultipleChoiceQuestion({
  question,
  choices,
  onAnswer,
  answer
}: MultipleChoiceQuestionProps) {
  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{question}</h3>
      <div className="space-y-2">
        {choices.map((choice) => (
          <button
            key={choice.id}
            onClick={() => onAnswer(choice.id)}
            className={`w-full text-left p-3 rounded-lg border ${
              answer === choice.id
                ? 'bg-blue-50 border-blue-500 text-blue-700'
                : 'border-gray-200 hover:bg-gray-50'
            }`}
          >
            {choice.text}
          </button>
        ))}
      </div>
    </div>
  )
} 