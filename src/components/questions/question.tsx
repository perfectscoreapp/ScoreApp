"use client"

import { Question } from "@/types/question"
import { MultipleChoiceQuestionComponent } from "./multiple-choice"
import { SingleChoiceQuestionComponent } from "./single-choice"
import { TextInputQuestionComponent } from "./text-input"
import { DragDropQuestionComponent } from "./drag-drop"
import { HighlightTextQuestionComponent } from "./highlight-text"

interface QuestionProps {
  question: Question
  onAnswer: (answer: any) => void
}

export function QuestionComponent({ question, onAnswer }: QuestionProps) {
  switch (question.type) {
    case "multiple-choice":
      return (
        <MultipleChoiceQuestionComponent
          question={question}
          onAnswer={onAnswer}
        />
      )
    case "single-choice":
      return (
        <SingleChoiceQuestionComponent
          question={question}
          onAnswer={onAnswer}
        />
      )
    case "text-input":
      return (
        <TextInputQuestionComponent
          question={question}
          onAnswer={onAnswer}
        />
      )
    case "drag-drop":
      return (
        <DragDropQuestionComponent
          question={question}
          onAnswer={onAnswer}
        />
      )
    case "highlight-text":
      return (
        <HighlightTextQuestionComponent
          question={question}
          onAnswer={onAnswer}
        />
      )
    default:
      return (
        <div className="p-4 border rounded-lg bg-red-50 text-red-700">
          <p>Unsupported question type: {(question as any).type}</p>
        </div>
      )
  }
} 