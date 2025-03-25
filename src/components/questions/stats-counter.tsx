"use client"

import { useEffect, useState } from "react"

interface StatsCounterProps {
  totalQuestions: number
  answeredQuestions: number
  totalPoints: number
  earnedPoints: number
}

export function StatsCounter({
  totalQuestions,
  answeredQuestions,
  totalPoints,
  earnedPoints,
}: StatsCounterProps) {
  const [timeElapsed, setTimeElapsed] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const startTime = Date.now()
    const timer = setInterval(() => {
      const elapsedMs = Date.now() - startTime
      const hours = Math.floor(elapsedMs / (1000 * 60 * 60))
      const minutes = Math.floor((elapsedMs % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((elapsedMs % (1000 * 60)) / 1000)
      setTimeElapsed({ hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="grid grid-cols-1 gap-4 max-w-[300px] mx-auto">
      {/* Questions answered */}
      <div className="bg-[#99CC00] text-white p-4 rounded-t-lg">
        <div className="text-center text-xl font-semibold">
          Questions answered
        </div>
        <div className="text-center text-6xl font-bold py-4">
          {answeredQuestions}
        </div>
      </div>

      {/* Time elapsed */}
      <div className="bg-[#33B5E5] text-white p-4">
        <div className="text-center text-xl font-semibold">
          Time elapsed
        </div>
        <div className="flex justify-center items-center gap-2 py-4">
          <div className="text-center">
            <div className="text-4xl font-bold leading-none">
              {String(timeElapsed.hours).padStart(2, "0")}
            </div>
            <div className="text-sm uppercase">HR</div>
          </div>
          <div className="text-4xl font-bold">:</div>
          <div className="text-center">
            <div className="text-4xl font-bold leading-none">
              {String(timeElapsed.minutes).padStart(2, "0")}
            </div>
            <div className="text-sm uppercase">MIN</div>
          </div>
          <div className="text-4xl font-bold">:</div>
          <div className="text-center">
            <div className="text-4xl font-bold leading-none">
              {String(timeElapsed.seconds).padStart(2, "0")}
            </div>
            <div className="text-sm uppercase">SEC</div>
          </div>
        </div>
      </div>

      {/* SmartScore */}
      <div className="bg-[#FF6B42] text-white p-4 rounded-b-lg relative">
        <div className="text-center text-xl font-semibold flex items-center justify-center gap-2">
          SmartScore
          <div className="relative group">
            <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-sm cursor-help">
              ?
            </div>
            <div className="absolute bottom-full mb-2 hidden group-hover:block w-48 bg-black/90 text-white text-xs p-2 rounded">
              Score based on correct answers and time taken to complete
            </div>
          </div>
        </div>
        <div className="text-center text-6xl font-bold py-4">
          {earnedPoints}
        </div>
        <div className="text-center text-lg">
          out of {totalPoints}
        </div>
      </div>
    </div>
  )
} 