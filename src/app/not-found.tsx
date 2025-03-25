import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex h-[calc(100vh-80px)] flex-col items-center justify-center gap-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          The page you are looking for does not exist.
        </p>
      </div>
      <Link
        href="/"
        className="rounded-lg border bg-background px-4 py-2 font-medium transition-colors hover:bg-secondary"
      >
        Go home
      </Link>
    </div>
  )
} 