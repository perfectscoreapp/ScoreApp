"use client"

import { useState } from "react"
import { DragDropQuestion } from "@/types/question"
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "@hello-pangea/dnd"

interface DragDropProps {
  question: DragDropQuestion
  onAnswer: (placements: { itemId: string; zoneId: string }[]) => void
}

export function DragDropQuestionComponent({
  question,
  onAnswer,
}: DragDropProps) {
  const [placements, setPlacements] = useState<{ itemId: string; zoneId: string }[]>([])

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return

    const itemId = result.draggableId
    const zoneId = result.destination.droppableId

    // Remove any existing placement for this item
    const newPlacements = placements.filter((p) => p.itemId !== itemId)

    // Add the new placement
    newPlacements.push({ itemId, zoneId })
    setPlacements(newPlacements)
    onAnswer(newPlacements)
  }

  return (
    <div className="space-y-6">
      <p className="text-lg font-medium">{question.question}</p>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Items to drag */}
          <Droppable droppableId="items">
            {(provided: DroppableProvided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="space-y-2 rounded-lg border p-4"
              >
                <h3 className="font-medium">Items</h3>
                {question.items
                  .filter((item) => !placements.find((p) => p.itemId === item.id))
                  .map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided: DraggableProvided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="rounded-lg border bg-card p-3"
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

          {/* Drop zones */}
          <div className="space-y-4">
            {question.zones.map((zone) => (
              <Droppable key={zone.id} droppableId={zone.id}>
                {(provided: DroppableProvided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="rounded-lg border p-4"
                  >
                    <h3 className="mb-2 font-medium">{zone.label}</h3>
                    <div className="min-h-[100px] space-y-2">
                      {placements
                        .filter((p) => p.zoneId === zone.id)
                        .map((placement, index) => {
                          const item = question.items.find(
                            (i) => i.id === placement.itemId
                          )
                          if (!item) return null
                          return (
                            <Draggable
                              key={item.id}
                              draggableId={item.id}
                              index={index}
                            >
                              {(provided: DraggableProvided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="rounded-lg border bg-card p-3"
                                >
                                  {item.text}
                                </div>
                              )}
                            </Draggable>
                          )
                        })}
                      {provided.placeholder}
                    </div>
                  </div>
                )}
              </Droppable>
            ))}
          </div>
        </div>
      </DragDropContext>
    </div>
  )
} 