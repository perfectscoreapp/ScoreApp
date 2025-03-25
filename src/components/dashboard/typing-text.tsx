"use client"

import { useEffect, useState } from 'react'

interface TypingTextProps {
  text: string
  speed?: number
  className?: string
}

export function TypingText({ text, speed = 30, className = '' }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, speed)

      return () => clearTimeout(timer)
    }
  }, [currentIndex, text, speed])

  return (
    <div className={`font-mono ${className}`}>
      {displayedText}
      {currentIndex < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </div>
  )
}