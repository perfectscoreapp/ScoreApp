'use client'

import { ReactNode, useState } from 'react'

interface TooltipProps {
  children: ReactNode
  content: string
}

export function Tooltip({ children, content }: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false)

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute z-50 w-48 p-2 -mt-2 text-sm text-white transform -translate-x-1/2 bg-gray-900 rounded-md shadow-lg left-1/2">
          {content}
        </div>
      )}
    </div>
  )
} 