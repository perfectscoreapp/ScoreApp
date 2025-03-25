"use client"

import { useEffect, useState } from "react"
import { Tooltip } from "@/components/ui/tooltip"

interface StatsCounterProps {
  userId: string
  gradeSlug: string
  subjectSlug: string
  topicSlug: string
  totalQuestions: number
}

export function StatsCounter({
  userId,
  gradeSlug,
  subjectSlug,
  topicSlug,
  totalQuestions,
}: StatsCounterProps) {
  const [stats, setStats] = useState({
    questionsAnswered: 0,
    timeSpent: 0,
    score: 0,
  })

  useEffect(() => {
    let timer: NodeJS.Timeout
    const startTime = Date.now()

    const updateTimeSpent = () => {
      setStats((prev) => ({
        ...prev,
        timeSpent: Math.floor((Date.now() - startTime) / 1000),
      }))
    }

    timer = setInterval(updateTimeSpent, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="flex items-center gap-2">
      <div className="bg-[#8BC34A] text-white px-4 py-2 rounded-lg">
        <div className="text-sm">Questions</div>
        <div className="text-xl font-bold">
          {stats.questionsAnswered}/{totalQuestions}
        </div>
      </div>

      <div className="bg-[#29B6F6] text-white px-4 py-2 rounded-lg">
        <div className="text-sm">Time</div>
        <div className="text-xl font-bold">
          {formatTime(stats.timeSpent)}
        </div>
      </div>

      <div className="bg-[#FF7043] text-white px-4 py-2 rounded-lg">
        <div className="text-sm flex items-center">
          Score
          <Tooltip content="Your score based on accuracy and time taken">
            <span className="ml-1 cursor-help text-xs">?</span>
          </Tooltip>
        </div>
        <div className="text-xl font-bold">
          {stats.score}
        </div>
      </div>
    </div>
  )
} 