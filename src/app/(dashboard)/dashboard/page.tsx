import { auth } from "@clerk/nextjs"

export default async function DashboardPage() {
  const { userId } = auth()

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome to PerfectScore</h1>
        <p className="mt-2 text-muted-foreground">
          Your personalized learning dashboard
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold">Continue Learning</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Pick up where you left off
          </p>
          <div className="mt-4">
            <a
              href="/dashboard/topics"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              Go to Topics
            </a>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold">Your Progress</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Track your learning journey
          </p>
          <div className="mt-4">
            <a
              href="/dashboard/progress"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              View Progress
            </a>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="font-semibold">Subscription Status</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Manage your subscription
          </p>
          <div className="mt-4">
            <a
              href="/dashboard/subscription"
              className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
            >
              View Plan
            </a>
          </div>
        </div>
      </div>
    </div>
  )
} 