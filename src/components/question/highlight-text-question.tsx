'use client'

interface HighlightTextQuestionProps {
  text: string
  onHighlight: (text: string) => void
  selectedText?: string
}

export function HighlightTextQuestion({
  text,
  onHighlight,
  selectedText
}: HighlightTextQuestionProps) {
  const handleMouseUp = () => {
    const selection = window.getSelection()
    if (!selection || selection.isCollapsed) return

    const highlighted = selection.toString().trim()
    if (highlighted) {
      onHighlight(highlighted)
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">
        Highlight the correct part in the text below:
      </h3>
      <div 
        onMouseUp={handleMouseUp}
        className="p-4 border rounded-lg bg-gray-50 cursor-text select-text"
      >
        {text.split('').map((char, index) => {
          const isHighlighted = selectedText?.includes(char)
          return (
            <span
              key={index}
              className={isHighlighted ? 'bg-yellow-200' : undefined}
            >
              {char}
            </span>
          )
        })}
      </div>
      {selectedText && (
        <div className="mt-4 p-2 bg-yellow-50 border border-yellow-200 rounded">
          Selected: <span className="font-medium">{selectedText}</span>
        </div>
      )}
    </div>
  )
} 