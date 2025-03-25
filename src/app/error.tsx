"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Something went wrong!</h1>
        <p className="mt-4 text-muted-foreground">
          An error occurred while processing your request.
        </p>
      </div>
      <div className="flex gap-4">
        <button
          onClick={() => reset()}
          className="rounded-lg border bg-background px-4 py-2 font-medium transition-colors hover:bg-secondary"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border bg-background px-4 py-2 font-medium transition-colors hover:bg-secondary"
        >
          Go home
        </Link>
      </div>
    </div>
  )
} 