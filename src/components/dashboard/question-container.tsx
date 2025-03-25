"use client"

import { useState } from "react"
import { IQuestion } from '@/models/Question'
import { TypingText } from './typing-text'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CheckCircle2, XCircle } from "lucide-react"

interface QuestionContainerProps {
  questions: IQuestion[]
  currentIndex: number
  onAnswer: (questionId: string, answer: any, isCorrect: boolean) => void
  onQuestionChange: (newIndex: number) => void
}

export function QuestionContainer({ 
  questions, 
  currentIndex, 
  onAnswer,
  onQuestionChange 
}: QuestionContainerProps) {
  const currentQuestion = questions[currentIndex]
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [textAnswer, setTextAnswer] = useState("")
  const [showPopover, setShowPopover] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)

  if (!currentQuestion) {
    return <div>No question available</div>
  }

  const progress = ((currentIndex + 1) / questions.length) * 100

  const handleSubmit = () => {
    if (!selectedAnswer && !textAnswer) return

    const answer = currentQuestion.type === 'text' ? textAnswer : selectedAnswer
    const correct = currentQuestion.type === 'text' 
      ? textAnswer.toLowerCase() === currentQuestion.correctAnswer?.toLowerCase()
      : currentQuestion.choices?.find(c => c.text === selectedAnswer)?.isCorrect || false

    setIsCorrect(correct)
    setShowPopover(true)
    onAnswer(currentQuestion._id.toString(), answer, correct)
    setIsSubmitted(true)

    // Auto-hide the popover after 2 seconds
    setTimeout(() => {
      setShowPopover(false)
    }, 2000)
  }

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setSelectedAnswer(null)
      setTextAnswer("")
      setIsSubmitted(false)
      setShowPopover(false)
      onQuestionChange(currentIndex - 1)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setSelectedAnswer(null)
      setTextAnswer("")
      setIsSubmitted(false)
      setShowPopover(false)
      onQuestionChange(currentIndex + 1)
    }
  }

  const renderAnswerAndRationale = () => {
    if (!isSubmitted) return (
      <div className="h-full flex items-center justify-center text-muted-foreground">
        Submit your answer to see the explanation
      </div>
    )

    const correctAnswer = currentQuestion.type === 'text' 
      ? currentQuestion.correctAnswer 
      : currentQuestion.choices?.find(c => c.isCorrect)?.text

    const selectedChoice = currentQuestion.type === 'multiple-choice' 
      ? currentQuestion.choices?.find(c => c.text === selectedAnswer)
      : null

    return (
      <div className="h-full flex flex-col space-y-6 overflow-y-auto">
        <div>
          <h4 className="font-medium text-lg mb-3">Correct Answer:</h4>
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
            <TypingText 
              text={correctAnswer || ''} 
              speed={50}
              className="text-green-700 font-medium text-lg"
            />
          </div>
        </div>

        <div>
          <h4 className="font-medium text-lg mb-3">Explanation:</h4>
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg space-y-4">
            {currentQuestion.type === 'multiple-choice' && selectedChoice && (
              <div>
                <h5 className="font-medium mb-2">Your Choice:</h5>
                <TypingText 
                  text={selectedChoice.rationale} 
                  speed={30}
                  className="text-blue-700"
                />
              </div>
            )}
            <div>
              <h5 className="font-medium mb-2">General Explanation:</h5>
              <TypingText 
                text={currentQuestion.answerRationale || ''} 
                speed={30}
                className="text-blue-700"
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

  const renderQuestion = () => {
    switch (currentQuestion.type) {
      case 'multiple-choice':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">{currentQuestion.text}</h3>
            <div className="space-y-3">
              {currentQuestion.choices?.map((choice) => (
                <button
                  key={choice.id}
                  onClick={() => setSelectedAnswer(choice.text)}
                  className={`w-full text-left p-4 rounded-lg border transition-colors ${
                    selectedAnswer === choice.text 
                      ? 'bg-blue-50 border-blue-500' 
                      : 'hover:bg-gray-50'
                  }`}
                  disabled={isSubmitted}
                >
                  {choice.text}
                </button>
              ))}
            </div>
            <div className="relative">
              <Popover open={showPopover}>
                <PopoverTrigger asChild>
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer || isSubmitted}
                    className={`w-full px-6 py-3 rounded-lg text-white text-lg font-medium ${
                      !selectedAnswer || isSubmitted
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-600'
                    }`}
                  >
                    Submit Answer
                  </button>
                </PopoverTrigger>
                <PopoverContent 
                  className={`${
                    isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  } p-4 w-[300px] animate-in fade-in-0 zoom-in-95`}
                  align="center"
                  side="top"
                >
                  <div className="flex items-center gap-2">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="h-5 w-5 text-green-600" />
                        <p className="text-green-700 font-medium">Correct Answer!</p>
                      </>
                    ) : (
                      <>
                        <XCircle className="h-5 w-5 text-red-600" />
                        <p className="text-red-700 font-medium">Incorrect Answer</p>
                      </>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        )

      case 'text':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">{currentQuestion.text}</h3>
            <div className="space-y-4">
              <input
                type="text"
                className="w-full p-4 border rounded-lg text-lg"
                placeholder="Type your answer here..."
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                disabled={isSubmitted}
              />
              <div className="relative">
                <Popover open={showPopover}>
                  <PopoverTrigger asChild>
                    <button
                      onClick={handleSubmit}
                      disabled={!textAnswer || isSubmitted}
                      className={`w-full px-6 py-3 rounded-lg text-white text-lg font-medium ${
                        !textAnswer || isSubmitted
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-blue-500 hover:bg-blue-600'
                      }`}
                    >
                      Submit Answer
                    </button>
                  </PopoverTrigger>
                  <PopoverContent 
                    className={`${
                      isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                    } p-4 w-[300px] animate-in fade-in-0 zoom-in-95`}
                    align="center"
                    side="top"
                  >
                    <div className="flex items-center gap-2">
                      {isCorrect ? (
                        <>
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <p className="text-green-700 font-medium">Correct Answer!</p>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-5 w-5 text-red-600" />
                          <p className="text-red-700 font-medium">Incorrect Answer</p>
                        </>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        )

      case 'highlight':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">{currentQuestion.text}</h3>
            <div className="p-6 border rounded-lg bg-gray-50 text-lg">
              {currentQuestion.text.split(' ').map((word, index) => (
                <span
                  key={index}
                  onClick={() => {
                    if (!isSubmitted) {
                      const isCorrect = word.toLowerCase() === currentQuestion.correctAnswer?.toLowerCase()
                      onAnswer(currentQuestion._id.toString(), word, isCorrect)
                      setIsSubmitted(true)
                    }
                  }}
                  className={`cursor-pointer px-1 ${
                    isSubmitted 
                      ? 'cursor-default' 
                      : 'hover:bg-yellow-200'
                  }`}
                >
                  {word}{' '}
                </span>
              ))}
            </div>
          </div>
        )

      case 'drag-drop':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-medium">{currentQuestion.text}</h3>
            <div className="space-y-3">
              {currentQuestion.choices?.map((choice) => (
                <div
                  key={choice.id}
                  className={`p-4 border rounded-lg bg-white text-lg ${
                    isSubmitted ? 'cursor-default' : 'cursor-move'
                  }`}
                  draggable={!isSubmitted}
                  onDragEnd={() => {
                    if (!isSubmitted) {
                      const isCorrect = choice.isCorrect
                      onAnswer(currentQuestion._id.toString(), choice.text, isCorrect)
                      setIsSubmitted(true)
                    }
                  }}
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

  return (
    <div className="grid grid-cols-3 gap-8 h-full">
      <div className="col-span-2 bg-white rounded-lg border shadow-sm flex flex-col">
        <div className="relative h-2 bg-gray-100 rounded-t-lg overflow-hidden">
          <div 
            className="absolute inset-y-0 left-0 bg-blue-500 transition-all duration-300 ease-in-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between px-8 py-4 border-b">
          <span className="text-sm text-muted-foreground">
            Question {currentIndex + 1} of {questions.length}
          </span>
          <div className="flex gap-4">
            {currentIndex > 0 && (
              <button
                onClick={handlePrevious}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Previous
              </button>
            )}
            {currentIndex < questions.length - 1 && (
              <button
                onClick={handleNext}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Next
              </button>
            )}
          </div>
        </div>
        <div className="p-8">
          {renderQuestion()}
        </div>
      </div>
      <div className="h-full">
        {renderAnswerAndRationale()}
      </div>
    </div>
  )
} 