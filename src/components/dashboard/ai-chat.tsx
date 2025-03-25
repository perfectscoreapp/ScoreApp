"use client"

import { useState } from "react"
import { toast } from "@/components/ui/use-toast"

interface Message {
  role: "user" | "assistant"
  content: string
}

export function AiChat() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!input.trim()) {
      return
    }

    const userMessage: Message = {
      role: "user",
      content: input,
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      // In production, this would call your AI service
      const response = "I'm a placeholder AI response. In production, this would be a real AI-generated response."

      const assistantMessage: Message = {
        role: "assistant",
        content: response,
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex h-[600px] flex-col rounded-lg border bg-background">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${
                message.role === "assistant" ? "justify-start" : "justify-end"
              }`}
            >
              <div
                className={`rounded-lg px-4 py-2 ${
                  message.role === "assistant"
                    ? "bg-muted"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {message.content}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="rounded-lg bg-muted px-4 py-2">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />
              </div>
            </div>
          )}
        </div>
      </div>
      <form onSubmit={handleSubmit} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything..."
            className="flex-1 rounded-lg border bg-background px-4 py-2"
            disabled={isLoading}
          />
          <button
            type="submit"
            className="rounded-lg bg-primary px-4 py-2 font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  )
} 