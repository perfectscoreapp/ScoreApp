"use client"

import { useState, useRef, useEffect } from "react"
import { HighlightTextQuestion } from "@/types/question"

interface HighlightTextProps {
  question: HighlightTextQuestion
  onAnswer: (highlights: { start: number; end: number; text: string }[]) => void
}

export function HighlightTextQuestionComponent({
  question,
  onAnswer,
}: HighlightTextProps) {
  const [highlights, setHighlights] = useState<
    { start: number; end: number; text: string }[]
  >([])
  const contentRef = useRef<HTMLDivElement>(null)

  const handleMouseUp = () => {
    const selection = window.getSelection()
    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)
    const content = contentRef.current

    if (!content || !content.contains(range.commonAncestorContainer)) return

    // Calculate the start and end positions relative to the content
    const preSelectionRange = range.cloneRange()
    preSelectionRange.selectNodeContents(content)
    preSelectionRange.setEnd(range.startContainer, range.startOffset)
    const start = preSelectionRange.toString().length

    const text = range.toString()
    if (!text) return

    const newHighlight = {
      start,
      end: start + text.length,
      text,
    }

    // Remove any overlapping highlights
    const nonOverlappingHighlights = highlights.filter(
      (h) =>
        (newHighlight.start >= h.end || newHighlight.end <= h.start) &&
        newHighlight.text !== h.text
    )

    const updatedHighlights = [...nonOverlappingHighlights, newHighlight]
    setHighlights(updatedHighlights)
    onAnswer(updatedHighlights)

    // Clear the selection
    selection.removeAllRanges()
  }

  const renderHighlightedText = () => {
    let lastIndex = 0
    const parts: JSX.Element[] = []
    const sortedHighlights = [...highlights].sort((a, b) => a.start - b.start)

    sortedHighlights.forEach((highlight, index) => {
      // Add non-highlighted text before this highlight
      if (highlight.start > lastIndex) {
        parts.push(
          <span key={`text-${index}`}>
            {question.content.slice(lastIndex, highlight.start)}
          </span>
        )
      }

      // Add highlighted text
      parts.push(
        <mark
          key={`highlight-${index}`}
          className="bg-yellow-200 rounded px-1 cursor-pointer"
          onClick={() => {
            const newHighlights = highlights.filter((h) => h !== highlight)
            setHighlights(newHighlights)
            onAnswer(newHighlights)
          }}
        >
          {question.content.slice(highlight.start, highlight.end)}
        </mark>
      )

      lastIndex = highlight.end
    })

    // Add any remaining non-highlighted text
    if (lastIndex < question.content.length) {
      parts.push(
        <span key="text-end">
          {question.content.slice(lastIndex)}
        </span>
      )
    }

    return parts
  }

  return (
    <div className="space-y-4">
      <p className="text-lg font-medium">{question.question}</p>
      <div
        ref={contentRef}
        onMouseUp={handleMouseUp}
        className="prose max-w-none rounded-lg border p-4"
      >
        {renderHighlightedText()}
      </div>
      <p className="text-sm text-muted-foreground">
        Select text to highlight. Click on highlighted text to remove it.
      </p>
    </div>
  )
} 