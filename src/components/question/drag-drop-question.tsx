'use client'

import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd'

interface DragDropItem {
  id: string
  text: string
}

interface DragDropQuestionProps {
  question: string
  items: DragDropItem[]
  onAnswer: (orderedIds: string[]) => void
  answer?: string[]
}

export function DragDropQuestion({
  question,
  items,
  onAnswer,
  answer
}: DragDropQuestionProps) {
  const [orderedItems, setOrderedItems] = useState(() => {
    if (answer) {
      return answer.map(id => items.find(item => item.id === id)!)
    }
    return [...items].sort(() => Math.random() - 0.5)
  })

  const handleDragEnd = (result: any) => {
    if (!result.destination) return

    const newItems = Array.from(orderedItems)
    const [reorderedItem] = newItems.splice(result.source.index, 1)
    newItems.splice(result.destination.index, 0, reorderedItem)

    setOrderedItems(newItems)
    onAnswer(newItems.map(item => item.id))
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">{question}</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-2"
            >
              {orderedItems.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className="p-3 bg-white border rounded-lg shadow-sm cursor-move hover:bg-gray-50"
                    >
                      {item.text}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
} 